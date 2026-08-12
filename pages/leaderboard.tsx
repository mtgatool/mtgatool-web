import Leaderboard from "../components/leaderboard";
import Section from "../components/Section";
import Seo from "../components/Seo";
import TopTitle from "../components/title";
import { WrapperInner, WrapperOuter } from "../components/wrapper";
import { getTopRanks, RankedPlayer } from "../lib/getTopRanks";

/**
 * Ranks move all day; refresh well below the hourly cadence of the rest of
 * the site, but not so often that every visit hits the database.
 */
const REVALIDATE_SECONDS = 300;

interface LeaderboardPageProps {
  constructed: RankedPlayer[];
  limited: RankedPlayer[];
}

export default function LeaderboardPage(
  props: LeaderboardPageProps
): JSX.Element {
  const { constructed, limited } = props;

  return (
    <WrapperOuter style={{ minHeight: "calc(100vh - 5px)" }}>
      <Seo
        title="Leaderboard"
        path="/leaderboard"
        description="The top ranked MTG Arena players tracked with MTG Arena Tool, on the Constructed and Limited ladders."
      />
      <WrapperInner style={{ maxWidth: "1000px" }}>
        <Section
          className="topNavMargin"
          style={{
            flexDirection: "column",
            paddingBottom: "2em",
            marginBottom: "1em",
          }}
        >
          <TopTitle
            title="Leaderboard"
            subtitle="The top ranked players tracked with MTG Arena Tool"
          />
          <Leaderboard constructed={constructed} limited={limited} />
        </Section>
      </WrapperInner>
    </WrapperOuter>
  );
}

export async function getStaticProps(): Promise<{
  props: LeaderboardPageProps;
  revalidate: number;
}> {
  try {
    const { constructed, limited } = await getTopRanks(10);
    return {
      props: { constructed, limited },
      revalidate: REVALIDATE_SECONDS,
    };
  } catch (e) {
    // An outage renders the empty state; retry sooner than the normal cycle.
    console.error("[leaderboard] getTopRanks failed:", e);
    return {
      props: { constructed: [], limited: [] },
      revalidate: 60,
    };
  }
}
