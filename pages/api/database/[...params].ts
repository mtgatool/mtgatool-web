// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";

import {
  getLatestMeta,
  normalizeLanguage,
  streamDatabase,
} from "../../../lib/getMetadataDatabase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  await NextCors(req, res, {
    methods: ["GET", "HEAD", "PUT", "POST"],
    origin: "*",
    optionsSuccessStatus: 200,
  });

  const { params } = req.query;
  const meta = await getLatestMeta();

  if (!meta) {
    res.status(503).json({ ok: false, msg: "database metadata unavailable" });
    return;
  }

  const lang = normalizeLanguage(params && params[1]);

  // "latest" answers from the metadata manifest instead of parsing a 24MB
  // database to read three fields off it.
  if (params && params[0] === "latest") {
    res.status(200).json({
      latest: meta.latest,
      lang,
      updated: meta.updated,
    });
    return;
  }

  if (params && params[0]) {
    const streamed = await streamDatabase(res, lang, meta.latest);
    if (!streamed) {
      res.status(404).json({ ok: false, msg: "not found" });
    }
  }
}

export const config = {
  api: {
    responseLimit: false,
  },
};
