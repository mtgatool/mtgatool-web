import crypto from "crypto";

export default function sha1(str: string): string {
  const shasum = crypto.createHash("sha1");
  shasum.update(str);
  return shasum.digest("hex");
}
