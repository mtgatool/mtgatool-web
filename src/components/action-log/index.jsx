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
      <TopTitle
        title={matchToDraw ? matchToDraw.playerDeck.name : ""}
        subtitle={matchToDraw ? "by " + matchToDraw.player.name : ""}
      />
      {matchToDraw ? (
        <div className={css["match-div"]}>
          <div className={css["deckview-div"]}>
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

    elements.push(
      <div key={line} className={css["actionlog"] + " " + log_p[seat]}>
        <div key={line + 1} className={css["actionlog_time"]}>
          {time}
        </div>
        <div
          key={line + 2}
          className={css["actionlog_text"]}
          dangerouslySetInnerHTML={{ __html: str }}
        ></div>
      </div>
    );
  }

  return <>{elements}</>;
}

export default ActionLogView;
