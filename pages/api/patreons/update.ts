// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import request from "request";
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

function checkPledges(res: NextApiResponse<Data>, pledges: any) {
  const includedData: Record<string, any> = {};
  pledges.included.map((p: any) => {
    if (p.type == "user") {
      includedData[p.id] = p.attributes;
    }
  });

  const addedPledges: IPatreon[] = pledges.data
    .filter((d: any) => d.attributes.declined_since == null)
    .map((d: any) => {
      const pid = d.relationships.patron.data.id;
      return {
        name: includedData[pid]?.full_name || "unknown",
        amount: d.attributes.amount_cents,
        thumb_url: includedData[pid]?.image_url || "",
        url: includedData[pid]?.url || "",
      } as IPatreon;
    });

  fs.writeFileSync("patreons.json", JSON.stringify(addedPledges));
  res.json({ ok: true, msg: "ok", data: addedPledges });
}

function getPledges(campaignId: number): Promise<any> {
  return new Promise((resolve) => {
    request(
      {
        url: `https://www.patreon.com/api/oauth2/api/campaigns/${campaignId}/pledges?page%5Bcount%5D=200`,
        headers: {
          Authorization: "Bearer " + process.env.PATREON_ACCESS_TOKEN,
        },
      },
      (_err, _result, body) => {
        resolve(JSON.parse(body));
      }
    );
  });
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    request(
      {
        url: "https://www.patreon.com/api/oauth2/api/current_user/campaigns",
        headers: {
          Authorization: "Bearer " + process.env.PATREON_ACCESS_TOKEN,
        },
      },
      (err, _result, body) => {
        if (err)
          res
            .status(500)
            .json({ ok: false, msg: "Internal Error (/campaigns)" });

        const campaignData = JSON.parse(body);
        const campaignId = campaignData.data[0].id;
        getPledges(campaignId).then((d: any) => checkPledges(res, d));
      }
    );
  }
}
