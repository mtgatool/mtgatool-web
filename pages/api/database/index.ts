// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import getDatabase from "../../../getDatabase";
import getLatestJson from "../../../getLatestJson";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { params } = req.query;
  const latestJson = getLatestJson();

  let version = latestJson.version;
  let lang = params && params[1] ? params[1] : "en";

  const db = getDatabase(lang, version);
  res.status(200).json(db);
}
