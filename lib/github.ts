export const GITHUB_REPO = "mtgatool/mtgatool-desktop";
export const GITHUB_API = `https://api.github.com/repos/${GITHUB_REPO}`;
export const GITHUB_RELEASES_PAGE = `https://github.com/${GITHUB_REPO}/releases/latest`;
export const GITHUB_RELEASES_LIST = `https://github.com/${GITHUB_REPO}/releases`;

/**
 * All GitHub calls run on the server, never in the browser.
 *
 * Unauthenticated requests are limited to 60/hr per IP. On Railway the
 * container's egress IP is shared, so that budget can be spent by other
 * tenants; setting GITHUB_TOKEN moves us to a private 5000/hr. It must stay
 * server-side, which is why nothing here is imported from a component.
 */
export function githubHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "mtgatool-web",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  return headers;
}

export async function githubJson<T>(url: string): Promise<T> {
  const res = await fetch(url, { headers: githubHeaders() });
  if (!res.ok) {
    throw new Error(`GitHub ${res.status} ${res.statusText} for ${url}`);
  }

  return (await res.json()) as T;
}
