import { GITHUB_API, GITHUB_ORG, githubJson, repoApi } from "./github";

/** Repos whose contributors are credited on the home page. */
const CREDIT_REPOS = ["mtgatool-desktop", "mtgatool-metadata"];

export interface Contributor {
  login: string;
  avatarUrl: string;
  htmlUrl: string;
}

interface GithubUser {
  login: string;
  avatar_url: string;
  html_url: string;
  /** Absent on the org members endpoint, which only returns users. */
  type?: string;
  contributions?: number;
}

interface GithubRelease {
  name: string | null;
  tag_name: string;
}

/** One source failing should cost that source only, not the whole section. */
async function safeUsers(url: string, label: string): Promise<GithubUser[]> {
  try {
    const users = await githubJson<GithubUser[]>(url);
    return Array.isArray(users) ? users : [];
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(`Could not load ${label} from GitHub:`, err);
    return [];
  }
}

/**
 * Credits for the home page: contributors to each credited repo, plus members
 * of the org who may not have commits in them.
 *
 * The org endpoint only ever returns members who have set their membership to
 * public — private membership is invisible to a token that is not itself an
 * org member, so it returns an empty list rather than failing.
 *
 * Users are deduped by login, since the same person appears in several repos,
 * and ranked by total contributions across all of them.
 *
 * Trimmed to the three fields actually rendered; the raw objects carry ~18
 * each and would all be serialised into the page.
 */
export async function getContributors(): Promise<Contributor[]> {
  const sources = await Promise.all([
    ...CREDIT_REPOS.map((repo) =>
      safeUsers(`${repoApi(repo)}/contributors?per_page=100`, `${repo} contributors`)
    ),
    safeUsers(
      `https://api.github.com/orgs/${GITHUB_ORG}/public_members?per_page=100`,
      "org members"
    ),
  ]);

  const merged = new Map<string, Contributor & { contributions: number }>();

  sources.flat().forEach((user) => {
    // Bots are not people to credit; dependabot would otherwise appear.
    if (user.type === "Bot") return;

    const key = user.login.toLowerCase();
    const existing = merged.get(key);

    if (existing) {
      existing.contributions += user.contributions || 0;
      return;
    }

    merged.set(key, {
      login: user.login,
      avatarUrl: user.avatar_url,
      htmlUrl: user.html_url,
      contributions: user.contributions || 0,
    });
  });

  // Array.from, not spread: this tsconfig targets ES5, where iterating a Map
  // directly needs downlevelIteration.
  return Array.from(merged.values())
    .sort(
      (a, b) =>
        b.contributions - a.contributions || a.login.localeCompare(b.login)
    )
    .map(({ login, avatarUrl, htmlUrl }) => ({ login, avatarUrl, htmlUrl }));
}

/**
 * Version behind the download buttons. Null when unknown, which the caller
 * must treat as "link to the releases page" rather than building an asset URL
 * with an empty version in it.
 */
export async function getLatestVersion(): Promise<string | null> {
  try {
    const release = await githubJson<GithubRelease>(
      `${GITHUB_API}/releases/latest`
    );
    const version = (release.name || release.tag_name || "").replace(/^v/, "");

    return version.trim() || null;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Could not load the latest release from GitHub:", err);
    return null;
  }
}
