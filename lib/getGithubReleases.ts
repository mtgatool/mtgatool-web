import { classifyCommit, cleanSubject, isNoise } from "./classifyCommit";
import { GITHUB_API as API, githubJson as getJson } from "./github";

/** Release pages are 100 each; the repo has ~107. */
const MAX_RELEASE_PAGES = 3;

/**
 * Commit pages are 100 each. Covering every release reaches back to 2021, so
 * this is deliberately generous; the loop stops as soon as a page is short.
 */
const MAX_COMMIT_PAGES = 14;

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
 * Returns null if GitHub is unreachable or rate-limited, so the page can show
 * a link out to GitHub instead of failing the build.
 */
export async function getGithubReleases(): Promise<ReleaseSection[] | null> {
  try {
    const raw: GithubRelease[] = [];
    for (let page = 1; page <= MAX_RELEASE_PAGES; page += 1) {
      // eslint-disable-next-line no-await-in-loop
      const batch = await getJson<GithubRelease[]>(
        `${API}/releases?per_page=100&page=${page}`
      );
      raw.push(...batch);
      if (batch.length < 100) break;
    }

    const live = raw
      .filter((r) => !r.draft && r.published_at)
      .sort(
        (a, b) =>
          new Date(b.published_at as string).getTime() -
          new Date(a.published_at as string).getTime()
      );

    if (live.length === 0) return [];

    // Only commits newer than the oldest release can be attributed to one.
    const cutoff = live[live.length - 1].published_at as string;

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
