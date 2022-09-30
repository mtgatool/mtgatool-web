import path from "path";
import fs from "fs";

export default function getDatabase(lang: string, version: number) {
  const dbPath = path.join(
    "resources",
    "database",
    `${version}`,
    `v${version}-${lang}-database.json`
  );

  console.log(dbPath, lang, version);
  const exists = fs.existsSync(dbPath);
  if (!exists) {
    return null;
  }

  const dbString = fs.readFileSync(dbPath, "utf8");
  return JSON.parse(dbString);
}
