/* eslint-disable react/prop-types */
import React, { useCallback } from "react";

import css from "./matchfeed.css";
import { ManaCost } from "../card-tile";
import db from "../../shared/database";
import { getRankIndex, utf8Decode } from "../../shared/util";
import { InternalMatch } from "../../types/match";

const FEED_URL = "https://mtgatool.com/api/get_match_feed.php";

function MatchFeed(): JSX.Element {
  const [matches, setMatches] = React.useState<InternalMatch[] | null>(null);

  const nextLoad = useCallback((): void => {
    const xhr = new XMLHttpRequest();
    xhr.onload = (): void => {
      if (xhr.status == 200) {
        try {
          const response = xhr.responseText;
          const addMatch = JSON.parse(response);
          // Only update if theres new data
          if (
            matches &&
            addMatch[0].date !== matches[matches.length - 1].date
          ) {
            const newMatches = [...matches, ...addMatch].slice(-9);
            setMatches(newMatches);
          } else {
            setTimeout(nextLoad, 1500);
          }
        } catch (e) {
          console.log(e);
        }
      }
    };
    xhr.open("GET", FEED_URL + "?n=1");
    xhr.send();
  }, [matches]);

  const firstLoad = (): void => {
    const xhr = new XMLHttpRequest();
    xhr.onload = (): void => {
      if (xhr.status == 200) {
        try {
          const response = xhr.responseText;
          const addMatch = JSON.parse(response);
          setMatches(addMatch.slice(-9));
        } catch (e) {
          console.log(e);
        }
      }
    };
    xhr.open("GET", FEED_URL);
    xhr.send();
  };

  React.useEffect(() => {
    setTimeout(firstLoad, 1000);
  }, []);

  React.useEffect(() => {
    if (matches) {
      setTimeout(nextLoad, 1500);
    }
  }, [nextLoad, matches]);

  return (
    <div className={css.matchFeed}>
      {matches ? (
        matches
          .slice(0)
          .reverse()
          .map((match, index) => {
            return (
              <MatchBrief
                key={match.date + match.opponent.name}
                match={match}
                index={index}
              />
            );
          })
      ) : (
        <></>
      )}
    </div>
  );
}

interface MatchBriefProps {
  match: InternalMatch;
  index: number;
}

function MatchBrief(props: MatchBriefProps): JSX.Element {
  const { match, index } = props;
  const [animate, setAnimate] = React.useState(index > 0);

  const cardObj = db.card(match.playerDeck.deckTileId);
  const cardImage = cardObj
    ? `https://img.scryfall.com/cards${cardObj.images.art_crop}`
    : "https://gamepedia.cursecdn.com/mtgsalvation_gamepedia/thumb/c/c4/Fblthp.jpg/250px-Fblthp.jpg";
  const tileStyle = {
    backgroundImage: `url(${cardImage})`
  };

  React.useEffect(() => {
    setTimeout(() => {
      setAnimate(true);
    }, 500);
  }, []);

  return (
    <div className={css.matchBrief + (animate ? " " + css.matchBriefOpen : "")}>
      <div className={css.matchBriefTile} style={tileStyle}>
        <div className={css.rankLeft}>
          <RankIcon
            rank={match.player.rank}
            tier={match.player.tier}
            percentile={match.player.percentile || 0}
            leaderboardPlace={match.player.leaderboardPlace || 1500}
          />
        </div>
      </div>
      <div className={css.matchBriefColumn}>
        <div className={css.matchBriefTitle}>
          {utf8Decode(match.playerDeck.name)}
          <div className={css.matchBriefSubtitle} style={{ marginLeft: "4px" }}>
            {" by " + utf8Decode(match.player.name)}
          </div>
        </div>
        <div className={css.matchBriefFlex}>
          <ManaCost colors={match.playerDeck.colors || []} />
        </div>
      </div>
      <div className={css.matchBriefColumn} style={{ alignItems: "center" }}>
        <div className={css.matchBriefSubtitle}>
          {db.eventName(match.eventId)}
        </div>
        <div className={css.matchBriefResult}>
          {`${match.player.win} - ${match.opponent.win}`}
        </div>
      </div>
      <div className={css.matchBriefColumn} style={{ alignItems: "flex-end" }}>
        <div className={css.matchBriefTitle}>{match.opponent.name}</div>
        <div className={css.matchBriefFlex}>
          <ManaCost colors={match.oppDeck.colors || []} />
        </div>
      </div>
    </div>
  );
}

interface RankIconProps {
  rank: string;
  tier: number;
  percentile: number;
  leaderboardPlace: number;
  format?: string;
}

function RankIcon(props: RankIconProps): JSX.Element {
  const { rank, tier, percentile, leaderboardPlace, format } = props;
  const rankIndex = getRankIndex(rank, tier);

  const rankStyle = {
    backgroundPosition: rankIndex * -48 + "px 0px"
  };

  const rankClass =
    !format || format == "constructed"
      ? css["constructed-rank"]
      : css["limited-rank"];

  const mythicRankTitle =
    rank +
    (leaderboardPlace == 0 ? ` ${percentile}%` : ` #${leaderboardPlace}`);
  const rankTitle = rank == "Mythic" ? mythicRankTitle : rank + " " + tier;

  return <div title={rankTitle} className={rankClass} style={rankStyle}></div>;
}

export default MatchFeed;
