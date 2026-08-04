import { GITHUB_API, githubJson } from "./github";

export interface Contributor {
  login: string;
  avatarUrl: string;
  htmlUrl: string;
}

interface GithubContributor {
  login: string;
  avatar_url: string;
  html_url: string;
  type: string;
}

interface GithubRelease {
  name: string | null;
  tag_name: string;
}

/**
 * Credits for the homepage. Trimmed to the three fields actually rendered:
 * the raw objects carry ~18 each and would all be serialised into the page.
 *
 * Returns an empty list rather than throwing, so a GitHub outage costs the
 * credits section and nothing else.
 */
export async function getContributors(): Promise<Contributor[]> {
  try {
    const raw = await githubJson<GithubContributor[]>(
      `${GITHUB_API}/contributors?per_page=100`
    );

    return raw
      // Bots are not contributors to credit; dependabot would otherwise appear.
      .filter((user) => user.type !== "Bot")
      .map((user) => ({
        login: user.login,
        avatarUrl: user.avatar_url,
        htmlUrl: user.html_url,
      }));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Could not load contributors from GitHub:", err);
    return [];
  }
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
