import path from "path";
import fs from "fs";

export default function getDatabase(lang: string, version: number) {
  const dbPath = path.join(
    "resources",
    "database",
    `${version}`,
    `v${version}-${lang}-database.json`
  );

  const dbPathDirname = path.join(
    __dirname,
    "resources",
    "database",
    `${version}`,
    `v${version}-${lang}-database.json`
  );

  const exists = fs.existsSync(dbPath);
  const existsDirname = fs.existsSync(dbPathDirname);
  console.log("getDatabase", dbPath, exists, existsDirname, __dirname);
  if (!exists) {
    return null;
  }

  const dbString = fs.readFileSync(dbPath, "utf8");
  return JSON.parse(dbString);
}
