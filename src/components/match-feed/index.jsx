/* eslint-disable react/prop-types */
import React from "react";

import css from "./matchfeed.css";
import { ManaCost } from "../card-tile";
import db from "../../shared/database";
import { getRankIndex, utf8Decode } from "../../shared/util";

const FEED_URL = "https://mtgatool.com/api/get_match_feed.php";

function MatchFeed() {
  const [matches, setMatches] = React.useState(null);

  const nextLoad = () => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
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
  };

  const firstLoad = () => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
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
  }, [matches]);

  return (
    <div className={css["match-feed"]}>
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

function MatchBrief(props) {
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
    <div
      className={
        css["match-brief"] + (animate ? " " + css["match-brief-open"] : "")
      }
    >
      <div className={css["match-brief-tile"]} style={tileStyle}>
        <div className={css["rank-left"]}>
          <RankIcon rank={match.player.rank} tier={match.player.tier} />
        </div>
      </div>
      <div className={css["match-brief-column"]}>
        <div className={css["match-brief-title"]}>
          {utf8Decode(match.playerDeck.name)}
          <div
            className={css["match-brief-subtitle"]}
            style={{ marginLeft: "4px" }}
          >
            {" by " + utf8Decode(match.player.name)}
          </div>
        </div>
        <div className={css["match-brief-flex"]}>
          <ManaCost colors={match.playerDeck.colors} />
        </div>
      </div>
      <div
        className={css["match-brief-column"]}
        style={{ alignItems: "center" }}
      >
        <div className={css["match-brief-subtitle"]}>
          {db.eventName(match.eventId)}
        </div>
        <div className={css["match-brief-result"]}>
          {`${match.player.win} - ${match.opponent.win}`}
        </div>
      </div>
      <div
        className={css["match-brief-column"]}
        style={{ alignItems: "flex-end" }}
      >
        <div className={css["match-brief-title"]}>{match.opponent.name}</div>
        <div className={css["match-brief-flex"]}>
          <ManaCost colors={match.oppDeck.colors} />
        </div>
      </div>
    </div>
  );
}

function RankIcon(props) {
  const { rank, tier, format } = props;
  const rankIndex = getRankIndex(rank, tier);

  const rankStyle = {
    backgroundPosition: rankIndex * -48 + "px 0px"
  };

  const rankClass =
    !format || format == "constructed"
      ? css["constructed-rank"]
      : css["limited-rank"];

  return (
    <div
      title={rank + " " + tier}
      className={rankClass}
      style={rankStyle}
    ></div>
  );
}

export default MatchFeed;
