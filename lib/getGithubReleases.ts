import { classifyCommit, cleanSubject, isNoise } from "./classifyCommit";

const REPO = "mtgatool/mtgatool-desktop";
const API = `https://api.github.com/repos/${REPO}`;

/**
 * Newest version covered by the static archive in resources/releasenotes.txt.
 * Everything above it is fetched live; the archive supplies everything below,
 * so the two halves meet without a gap or an overlap.
 */
export const ARCHIVE_NEWEST_VERSION = "6.2.2";

/** Commit pages are 100 each. The whole post-archive range fits in four. */
const MAX_COMMIT_PAGES = 8;

export interface ReleaseCommit {
  type: string;
  desc: string;
  commit: string;
}

export interface ReleaseSection {
  version: string;
  date: string;
  commits: ReleaseCommit[];
}

interface GithubRelease {
  tag_name: string;
  name: string | null;
  draft: boolean;
  published_at: string | null;
}

interface GithubCommit {
  sha: string;
  commit: {
    message: string;
    committer: { date: string };
  };
}

function headers(): Record<string, string> {
  const base: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "mtgatool-web",
  };
  // Optional: lifts the rate limit from 60/hr to 5000/hr on the build host.
  if (process.env.GITHUB_TOKEN) {
    base.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return base;
}

async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(url, { headers: headers() });
  if (!res.ok) {
    throw new Error(`GitHub ${res.status} ${res.statusText} for ${url}`);
  }
  return (await res.json()) as T;
}

const ORDINALS: Record<string, string> = { 1: "st", 2: "nd", 3: "rd" };

/** Matches the archive's existing style, e.g. "September 7th, 2022". */
function formatDate(iso: string): string {
  const date = new Date(iso);
  const month = date.toLocaleString("en-US", { month: "long", timeZone: "UTC" });
  const day = date.getUTCDate();
  const teen = day > 10 && day < 20;
  const suffix = teen ? "th" : ORDINALS[day % 10] || "th";

  return `${month} ${day}${suffix}, ${date.getUTCFullYear()}`;
}

function normalizeVersion(release: GithubRelease): string {
  return (release.name || release.tag_name).replace(/^v/, "").trim();
}

/**
 * Release bodies in mtgatool-desktop are empty, so the per-version commit list
 * has to be reconstructed. Rather than one compare call per release (62 calls,
 * over the unauthenticated hourly limit), fetch the flat commit list once and
 * bucket it: a commit belongs to the oldest release published at or after it.
 *
 * Returns null if GitHub is unreachable or rate-limited, so the page can fall
 * back to the static archive instead of failing the build.
 */
export async function getGithubReleases(): Promise<ReleaseSection[] | null> {
  try {
    const raw = await getJson<GithubRelease[]>(
      `${API}/releases?per_page=100&page=1`
    );

    const releases = raw
      .filter((r) => !r.draft && r.published_at)
      .sort(
        (a, b) =>
          new Date(b.published_at as string).getTime() -
          new Date(a.published_at as string).getTime()
      );

    const cutoffIndex = releases.findIndex(
      (r) => normalizeVersion(r) === ARCHIVE_NEWEST_VERSION
    );
    // Keep only what the archive does not already cover.
    const live =
      cutoffIndex === -1 ? releases : releases.slice(0, cutoffIndex);
    if (live.length === 0) return [];

    const cutoff = releases[
      cutoffIndex === -1 ? releases.length - 1 : cutoffIndex
    ].published_at as string;

    const commits: GithubCommit[] = [];
    for (let page = 1; page <= MAX_COMMIT_PAGES; page += 1) {
      // eslint-disable-next-line no-await-in-loop
      const batch = await getJson<GithubCommit[]>(
        `${API}/commits?per_page=100&page=${page}&since=${encodeURIComponent(
          cutoff
        )}`
      );
      commits.push(...batch);
      if (batch.length < 100) break;
    }

    // Both lists run newest first, so one pass assigns every commit.
    const buckets = live.map((release) => ({
      release,
      commits: [] as ReleaseCommit[],
    }));

    // Oldest first, so "first release published at or after this commit" is
    // just the first match.
    const oldestFirst = buckets
      .slice()
      .reverse()
      .map((bucket) => ({
        bucket,
        at: new Date(bucket.release.published_at as string).getTime(),
      }));

    commits.forEach((entry) => {
      const when = new Date(entry.commit.committer.date).getTime();
      const match = oldestFirst.find((candidate) => candidate.at >= when);
      if (!match) return;
      const { bucket } = match;

      const subject = entry.commit.message.split("\n")[0];
      if (isNoise(subject)) return;

      bucket.commits.push({
        type: classifyCommit(subject),
        desc: cleanSubject(subject),
        commit: entry.sha,
      });
    });

    return buckets
      .filter((b) => b.commits.length > 0)
      .map((b) => ({
        version: normalizeVersion(b.release),
        date: formatDate(b.release.published_at as string),
        commits: b.commits,
      }));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Could not load release notes from GitHub:", err);
    return null;
  }
}
