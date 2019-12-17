/* eslint-disable react/prop-types */
import React from "react";
import { useRouteMatch } from "react-router-dom";
import DeckList from "../decklist";
import TopTitle from "../title";
import { WrapperOuter } from "../wrapper";
import css from "./actionlog.css";
import metacss from "../metagame/metagame.css";
import Deck from "../../shared/deck";
import db from "../../shared/database";
import { useWebDispatch } from "../../web-provider";

function ActionLogView(props) {
  const { setImage } = props;
  const logMatch = useRouteMatch("/action-log/:logId");
  const [matchToDraw, setMatchToDraw] = React.useState(null);

  const copyDeck = React.useCallback(() => {
    console.log("Copy");
    console.log(matchToDraw, str);
    const str = new Deck(matchToDraw.playerDeck).getExportArena();
    navigator.clipboard.writeText(str);
  }, [matchToDraw]);

  React.useEffect(() => {
    if (logMatch) {
      const URL = `https://mtgatool.com/api/get_action_log.php?id=${logMatch.params.logId}`;
      //setQueryState(STATE_DOWNLOAD);
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        if (xhr.status !== 200) {
          //setQueryState(xhr.status);
        } else {
          try {
            let matchData = JSON.parse(xhr.responseText);
            console.log(matchData);
            setMatchToDraw(matchData);
            try {
              const cardObj = db.card(matchData.playerDeck.deckTileId);
              if (cardObj.images.art_crop) {
                setImage(cardObj);
              }
            } catch (e) {
              console.log("Card image not found ", e);
            }
            //setQueryState(STATE_IDLE);
          } catch (e) {
            console.log(e);
            //setQueryState(STATE_ERROR);
          }
        }
      };
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          //setQueryState(STATE_IDLE);
        }
      };
      xhr.open("GET", URL);
      xhr.send();
    } else {
      //
    }
  }, []);

  return (
    <WrapperOuter style={{ minHeight: "calc(100vh - 5px)" }}>
      <TopTitle title="Action Log" subtitle={" "} />
      {matchToDraw ? (
        <div className={css["match-div"]}>
          <div className={css["deckview-div"]}>
            <div className={css["deckview-title"]}>
              {matchToDraw
                ? `${matchToDraw.playerDeck.name} by ${matchToDraw.player.name}`
                : ""}
            </div>
            <div onClick={copyDeck} className={metacss["button-simple"]}>
              Copy to clipboard
            </div>
            <DeckList deck={matchToDraw.playerDeck} />
          </div>
          <div className={css["actionlog-div"]}>
            <ActionLog logStr={matchToDraw.actionLog} />
          </div>
        </div>
      ) : (
        <></>
      )}
    </WrapperOuter>
  );
}

function ActionLog(props) {
  const { logStr } = props;
  const actionLog = logStr.split("\n");

  const log_p = [css["log_p0"], css["log_p1"], css["log_p2"]];

  const elements = [];
  for (let line = 1; line < actionLog.length - 1; line += 3) {
    const seat = ("" + actionLog[line]).trim();
    const time = actionLog[line + 1];
    let str = actionLog[line + 2];

    const regex = new RegExp(
      /<log-(card|ability) id="(?<id>.*?)">.*?<\/log-(card|ability)>/,
      "g"
    );
    const groups = [...str.matchAll(regex)];
    const list = str.replace(regex, "\n").split("\n");

    const newObj = {
      seat: seat,
      time: time,
      groups: groups,
      strings: list
    };

    elements.push(newObj);
  }

  return (
    <>
      {elements.map((line, i) => {
        return (
          <div key={i} className={css["actionlog"] + " " + log_p[line.seat]}>
            <div key={i + 1} className={css["actionlog_time"]}>
              {line.time}
            </div>
            <div key={i + 2} className={css["actionlog_text"]}>
              {line.strings.map((str, ii) => {
                if (line.groups.length == ii && str !== "") {
                  return <LogText key={i + "text" + ii}>{str}</LogText>;
                }
                if (line.groups[ii][1] == "card") {
                  return (
                    <LogCard
                      key={i + "card" + ii}
                      grpId={parseInt(line.groups[ii][2])}
                    >
                      {str}
                    </LogCard>
                  );
                }
                if (line.groups[ii][1] == "ability") {
                  return (
                    <LogAbility
                      key={i + "ability" + ii}
                      abId={parseInt(line.groups[ii][2])}
                    >
                      {str}
                    </LogAbility>
                  );
                }
              })}
            </div>
          </div>
        );
      })}
    </>
  );
}

function LogText(props) {
  const { children } = props;
  return <div className={css["log-text"]}>{children}</div>;
}

function LogCard(props) {
  const { children, grpId } = props;
  const cardObj = db.card(grpId);
  const cardName = cardObj.name;

  const hoverDispatch = useWebDispatch(cardObj);

  const handleMouseEnter = React.useCallback(() => {
    hoverDispatch({ type: "setHoverCard", HoverGrpId: grpId });
    hoverDispatch({ type: "setHoverOpacity", HoverOpacity: 1 });
  }, []);

  const handleMouseLeave = React.useCallback(() => {
    hoverDispatch({ type: "setHoverOpacity", HoverOpacity: 0 });
  }, []);

  return (
    <>
      {children !== "" ? <LogText>{children}</LogText> : <></>}
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={css["log-card"]}
      >
        {cardName}
      </div>
    </>
  );
}

function LogAbility(props) {
  const { children, abId } = props;
  const desc = db.ability(abId);

  return (
    <>
      {children !== "" ? <LogText>{children}</LogText> : <></>}
      <div title={desc} className={css["log-ability"]}>
        ability
      </div>
    </>
  );
}

export default ActionLogView;
