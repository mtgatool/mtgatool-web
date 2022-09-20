import fs from "fs";
import { join } from "path";

export function getReleaseNotes() {
  const fullPath = join(
    __dirname,
    "..",
    "..",
    "..",
    "resources",
    `releasenotes.txt`
  );
  const fileContents = fs.readFileSync(fullPath, "utf8");

  return fileContents;
}
