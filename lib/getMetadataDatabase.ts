import { Readable } from "stream";
import type { NextApiResponse } from "next";

const METADATA_REPO = "mtgatool/mtgatool-metadata";
const RELEASES = `https://github.com/${METADATA_REPO}/releases`;

/**
 * Card databases live in mtgatool-metadata's release assets, not in this repo.
 *
 * Asset URLs are predictable and the "latest" alias resolves server-side at
 * GitHub, so none of this touches the REST API and none of it is rate limited.
 */
export const LATEST_META_URL = `${RELEASES}/latest/download/latest.json`;

export interface LatestMeta {
  latest: number;
  updated: number;
}

/** Languages published by mtgatool-metadata. */
const LANGUAGES = ["de", "en", "es", "fr", "it", "ja", "ko", "pt"];

export const DEFAULT_LANGUAGE = "en";

/** The language is interpolated into a URL, so only known values are allowed. */
export function normalizeLanguage(lang: unknown): string {
  return typeof lang === "string" && LANGUAGES.includes(lang)
    ? lang
    : DEFAULT_LANGUAGE;
}

export function databaseAssetUrl(lang: string, version: number): string {
  return `${RELEASES}/download/v${version}/${normalizeLanguage(
    lang
  )}-database.json`;
}

const CACHE_TTL_MS = 10 * 60 * 1000;
let cached: { value: LatestMeta; at: number } | null = null;

/**
 * latest.json is tiny and changes rarely, so it is cached in-process. The
 * databases themselves are never cached; they stream straight through.
 */
export async function getLatestMeta(): Promise<LatestMeta | null> {
  if (cached && Date.now() - cached.at < CACHE_TTL_MS) {
    return cached.value;
  }

  try {
    const res = await fetch(LATEST_META_URL);
    if (!res.ok) throw new Error(`metadata ${res.status} ${res.statusText}`);

    const value = (await res.json()) as LatestMeta;
    cached = { value, at: Date.now() };

    return value;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Could not read latest.json from mtgatool-metadata:", err);
    // Serve a stale version rather than nothing if we ever had one.
    return cached ? cached.value : null;
  }
}

/**
 * Streams an asset to the client without buffering or parsing it. The previous
 * implementation read a 12MB file and JSON.parsed it per request just to
 * re-serialise it; at 24MB per language that is worth avoiding.
 */
export async function streamDatabase(
  res: NextApiResponse,
  lang: string,
  version: number
): Promise<boolean> {
  const upstream = await fetch(databaseAssetUrl(lang, version));

  if (!upstream.ok || !upstream.body) {
    return false;
  }

  res.setHeader("Content-Type", "application/json; charset=utf-8");
  const length = upstream.headers.get("content-length");
  if (length) res.setHeader("Content-Length", length);

  // Node's fetch yields a web stream; Next's polyfill yields a Node one.
  const body = upstream.body as any;
  const stream: Readable =
    typeof body.pipe === "function" ? body : (Readable as any).fromWeb(body);

  await new Promise<void>((resolve, reject) => {
    stream.on("error", reject);
    res.on("close", resolve);
    stream.pipe(res).on("finish", resolve);
  });

  return true;
}
