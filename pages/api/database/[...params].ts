// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";

import getDatabase from "../../../getDatabase";
import getLatestJson from "../../../getLatestJson";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "POST"],
    origin: "*",
    optionsSuccessStatus: 200,
  });

  const { params } = req.query;
  const latestJson = getLatestJson();

  let version = latestJson.version;
  let lang = params && params[1] ? params[1] : "en";

  if (params && params[0] === "latest") {
    const db = getDatabase(lang, version);

    res.status(200).json({
      latest: db.version,
      lang: db.language.toLowerCase(),
      updated: db.updated,
    });
  } else if (params && params[0]) {
    const db = getDatabase(lang, version);

    if (db) {
      res.status(200).json(db);
    } else {
      res.status(404).json({
        ok: false,
        msg: "not found",
      });
    }
  }
}

export const config = {
  api: {
    responseLimit: false,
  },
};
