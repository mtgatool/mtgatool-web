import path from "path";
import fs from "fs";

export default function getLatestJson() {
  const dbPath = path.join("resources", "database", `latest.json`);

  const exists = fs.existsSync(dbPath);
  if (!exists) {
    return null;
  }
  const latest = fs.readFileSync(dbPath, "utf8");
  return JSON.parse(latest);
}
