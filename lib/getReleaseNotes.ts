import fs from "fs";
import { join } from "path";

import { ReleaseSection } from "./getGithubReleases";

export function getReleaseNotes(): string {
  const fullPath = join(process.cwd(), "resources", "releasenotes.txt");

  return fs.readFileSync(fullPath, "utf8");
}

/**
 * The hand-maintained archive of releases up to 6.2.2, kept as a flat file of
 * repeating records:
 *
 *   version / <number> / <date>
 *   <added|fixed|removed|improved> / <description> / <sha>
 *
 * Anything newer than this comes from the GitHub API instead.
 */
export function getArchiveReleases(): ReleaseSection[] {
  const newlines = /(\r\n|\n)/;
  const lines = getReleaseNotes()
    .split(newlines)
    .filter((l) => !newlines.test(l));

  const events = /^(fixed|improved|removed|added|breaking)$/;
  const sections: ReleaseSection[] = [];

  lines.forEach((line, index) => {
    if (line === "version") {
      sections.push({
        version: lines[index + 1],
        date: lines[index + 2],
        commits: [],
      });
      return;
    }

    if (events.test(line) && sections.length > 0) {
      sections[sections.length - 1].commits.push({
        type: line,
        desc: lines[index + 1],
        commit: lines[index + 2],
      });
    }
  });

  return sections;
}
