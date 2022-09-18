import fs from "fs";
import { join } from "path";

const resourcesDir = join(process.cwd(), "resources");

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(resourcesDir, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  return fileContents;
}
