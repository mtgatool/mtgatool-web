import type { NextPage } from "next";
import request from "request";
import Home from "../components/home";
import Seo from "../components/Seo";
import { Contributor, getContributors, getLatestVersion } from "../lib/getGithubHome";

/** Refresh the Patreon and GitHub data hourly without a redeploy. */
const REVALIDATE_SECONDS = 3600;

export interface IPatreon {
  name: string;
  amount: number;
  thumb_url?: string;
  url?: string;
}

interface IndexProps {
  patreons: IPatreon[];
  contributors: Contributor[];
  version: string | null;
}

const Index: NextPage<IndexProps> = (props) => {
  const { patreons, contributors, version } = props;

  return (
    <>
      <Seo path="/" />
      <Home patreons={patreons} contributors={contributors} version={version} />
    </>
  );
};

function checkPledges(pledges: any) {
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

  return addedPledges;
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

function getPatreons(): Promise<IPatreon[]> {
  return new Promise((resolve) => {
    if (!process.env.PATREON_ACCESS_TOKEN) {
      resolve([]);
      return;
    }

    request(
      {
        url: "https://www.patreon.com/api/oauth2/api/current_user/campaigns",
        headers: {
          Authorization: "Bearer " + process.env.PATREON_ACCESS_TOKEN,
        },
      },
      (err, _result, body) => {
        if (err) {
          resolve([]);
          return;
        }

        try {
          const campaignData = JSON.parse(body);
          const campaignId = campaignData.data[0].id;
          getPledges(campaignId).then((d: any) => resolve(checkPledges(d)));
        } catch (parseError) {
          // eslint-disable-next-line no-console
          console.error("Could not load Patreon backers:", parseError);
          resolve([]);
        }
      }
    );
  });
}

export async function getStaticProps(): Promise<{
  props: IndexProps;
  revalidate: number;
}> {
  // Independent sources; one being slow or down should not hold up the others.
  const [patreons, contributors, version] = await Promise.all([
    getPatreons(),
    getContributors(),
    getLatestVersion(),
  ]);

  return {
    props: { patreons, contributors, version },
    revalidate: REVALIDATE_SECONDS,
  };
}

export default Index;
