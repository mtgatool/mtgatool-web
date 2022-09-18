import fs from "fs";
import { join } from "path";

const resourcesDir = join(process.cwd(), "resources");

export function getReleaseNotes() {
  const fullPath = join(resourcesDir, `releasenotes.txt`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  return fileContents;
}
