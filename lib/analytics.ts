import { event } from "nextjs-google-analytics";

/**
 * Shared so <GoogleAnalytics> and the helpers below cannot drift apart.
 *
 * Passing it explicitly is not optional: the library's `event()` reads only
 * NEXT_PUBLIC_GA_MEASUREMENT_ID from the environment, and returns without
 * sending anything when neither that nor its third argument is set. This site
 * hardcodes the id, so every call has to hand it over.
 */
export const GA_MEASUREMENT_ID = "G-0T0RMGGWLK";

/**
 * The hero and closing download buttons.
 *
 * Worth an explicit event because the automatic `file_download` only fires for
 * extensions on Google's built-in list: `.exe` and `.tar.gz` are on it, `.dmg`
 * is not. Leaning on it would report zero Mac downloads rather than few, which
 * reads as a fact rather than a gap.
 *
 * Named `download_platform` and not `platform`, which GA4 already uses for its
 * own web/android/ios dimension.
 */
export function trackDownloadClick(osName: string): void {
  event("download_click", { download_platform: osName }, GA_MEASUREMENT_ID);
}

/** "Open in your browser", to see the desktop-versus-web split. */
export function trackOpenWebApp(): void {
  event("open_web_app", {}, GA_MEASUREMENT_ID);
}
