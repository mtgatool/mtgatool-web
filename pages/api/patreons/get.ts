// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

interface IPatreon {
  name: string;
  amount: number;
  thumb_url?: string;
  url?: string;
}

type Data = {
  ok: boolean;
  msg: string;
  data?: IPatreon[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    const fileString = fs.readFileSync("patreons.json", "utf8");
    const patreons = JSON.parse(fileString);
    res.json(patreons);
  }
}
