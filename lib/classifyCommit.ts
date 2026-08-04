export type CommitType =
  | "added"
  | "fixed"
  | "removed"
  | "improved"
  | "breaking";

/**
 * mtgatool-desktop does not use conventional commits, so the release notes
 * category has to be read out of plain imperative subjects like
 * "Add recovery email and forgot-password flow". These rules cover the
 * vocabulary actually used in that repo's history; anything unrecognised
 * falls through to "improved" rather than being dropped.
 */

/** Housekeeping that should never reach a user-facing changelog. */
const NOISE = [
  /^ci\b/i,
  /^chore\b/i,
  /^merge\b/i,
  /^bump version\b/i,
  /^release[\s:]+v?\d/i,
  /^v?\d+\.\d+\.\d+\s*$/,
  /^tests?\b/i,
  /^wip\b/i,
  /^lint\b/i,
  /^prettier\b/i,
  /^formats?\b/i,
  /^typos?\b/i,
  /^try\b/i,
  /^maybe\b/i,
  /^debug\b/i,
  /^revert\s+"?(ci|chore|bump|test)/i,
  /\[skip ci\]/i,
];

/**
 * Subjects are often scoped ("Background: add Art source field",
 * "macOS: sign packaged builds"). The verb that decides the category is the
 * one after the scope, so strip a short leading "scope:" before matching.
 */
const SCOPE = /^[A-Za-z][\w.+-]{0,20}:\s+(?=\S)/;

const RULES: [RegExp, CommitType][] = [
  [/\bbreaking\b/i, "breaking"],
  [/^\w+!:/, "breaking"],
  [
    /^(remove|delete|drop|retire|deprecat|strip|purge|kill|unship|no longer)/i,
    "removed",
  ],
  [
    /^(add|new|introduce|implement|ship|creat|support|expose|enable|bring back)/i,
    "added",
  ],
  [
    /^(fix|repair|correct|patch|resolv|prevent|stop|avoid|don'?t|do not|never|handle|guard|survive|keep|ensure|restor|reviv|unbreak|work ?around)/i,
    "fixed",
  ],
  [/\bfix(es|ed)?\b/i, "fixed"],
];

/** True for commits that are build/repo housekeeping rather than product changes. */
export function isNoise(subject: string): boolean {
  const trimmed = subject.trim();
  if (NOISE.some((re) => re.test(trimmed))) return true;
  // Re-check past the scope so "deps: bump version" is caught too.
  const scoped = trimmed.replace(SCOPE, "");
  return scoped !== trimmed && NOISE.some((re) => re.test(scoped));
}

export function classifyCommit(subject: string): CommitType {
  const trimmed = subject.trim();
  const match = RULES.find(([re]) => re.test(trimmed));
  if (match) return match[1];

  // Retry without the scope prefix, where the real verb usually lives.
  const scoped = trimmed.replace(SCOPE, "");
  if (scoped !== trimmed) {
    const scopedMatch = RULES.find(([re]) => re.test(scoped));
    if (scopedMatch) return scopedMatch[1];
  }

  return "improved";
}

/**
 * Drops the trailing PR reference and capitalises the subject so live commits
 * sit consistently next to the archived notes.
 *
 * Only a first word that is purely lowercase letters is touched: subjects
 * legitimately start with "macOS", "cdp-console" or "v6", and capitalising
 * those mangles them.
 */
export function cleanSubject(subject: string): string {
  const text = subject
    .trim()
    .replace(/\s*\(#\d+\)\s*$/, "")
    .trim();

  const firstWord = text.split(/[\s:]/)[0];
  if (!/^[a-z]+$/.test(firstWord)) return text;

  return text.charAt(0).toUpperCase() + text.slice(1);
}
