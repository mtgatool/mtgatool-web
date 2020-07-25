/* eslint-disable react/prop-types */
import React, { useCallback } from "react";

import css from "./matchfeed.css";

import ListItemMatchBrief from "../list-item/ListItemMatchBrief";
import Flex from "../flex";
import Section from "../Section";

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
    <Section style={{ padding: "16px", display: "block" }}>
      <Flex
        style={{
          flexDirection: "column",
          height: "592px",
          overflow: "hidden"
        }}
      >
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
      </Flex>
    </Section>
  );
}

interface MatchBriefProps {
  match: InternalMatch;
  index: number;
}

function MatchBrief(props: MatchBriefProps): JSX.Element {
  const { match, index } = props;
  const [animate, setAnimate] = React.useState(index > 0);

  React.useEffect(() => {
    setTimeout(() => {
      setAnimate(true);
    }, 500);
  }, []);

  return (
    <div
      className={css.matchBrief + (animate ? " " + css.matchBriefOpen : "")}
      style={{ zIndex: index, top: index * 74 }}
    >
      <ListItemMatchBrief match={match} key={"match-brief-" + index} />
    </div>
  );
}

export default MatchFeed;
