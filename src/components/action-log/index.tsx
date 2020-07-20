/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import DeckList from "../decklist";
import TopTitle from "../title";
import { WrapperOuter } from "../wrapper";
import css from "./actionlog.css";
import metacss from "../metagame/metagame.css";
import Deck from "../../shared/deck";
import db from "../../shared/database";
import { ExportViewProps } from "../../web-types/shared";
import { InternalMatch } from "../../types/match";
import useHoverCard from "../../hooks/useHoverCard";
import useRequest from "../../hooks/useRequest";

function ActionLogView(props: ExportViewProps): JSX.Element {
  const { setImage } = props;
  const logMatch = useRouteMatch<{ logId: string }>("/action-log/:logId");
  const [matchToDraw, setMatchToDraw] = React.useState<InternalMatch | null>(
    null
  );

  const { response, status, start } = useRequest(
    `https://mtgatool.com/api/get_action_log.php?id=${logMatch?.params.logId}`
  );

  const copyDeck = React.useCallback(() => {
    const str = new Deck(matchToDraw?.playerDeck).getExportArena();
    navigator.clipboard.writeText(str);
  }, [matchToDraw]);

  useEffect(() => {
    if (logMatch && status == null) {
      start();
    } else if (response && matchToDraw == null) {
      const matchData = JSON.parse(response);
      setMatchToDraw(matchData);
      try {
        const cardObj = db.card(matchData.playerDeck.deckTileId);
        if (cardObj?.images.art_crop) {
          setImage(cardObj);
        }
      } catch (e) {
        console.log("Card image not found ", e);
      }
    }
  }, [logMatch, matchToDraw, response, setImage, start, status]);

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
            <ActionLog logStr={matchToDraw?.actionLog} />
          </div>
        </div>
      ) : (
        <></>
      )}
    </WrapperOuter>
  );
}

interface ActionLogProps {
  logStr: string;
}

interface LogLine {
  seat: number;
  time: string;
  groups: RegExpMatchArray[];
  strings: string[];
}

function ActionLog(props: ActionLogProps): JSX.Element {
  const { logStr } = props;
  const actionLog = logStr.split("\n");

  const logP = [css.logPlayer0, css.logPlayer1, css.logPlayer2];

  const elements: LogLine[] = [];
  for (let line = 1; line < actionLog.length - 1; line += 3) {
    const seat = ("" + actionLog[line]).trim();
    const time = actionLog[line + 1];
    const str = actionLog[line + 2];

    const regex = new RegExp(
      /<log-(card|ability) id="(.*?)">.*?<\/log-(card|ability)>/,
      "g"
    );
    const groups = [...str.matchAll(regex)];
    const list = str.replace(regex, "\n").split("\n");

    const newObj: LogLine = {
      seat: parseInt(seat),
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
          <div key={i} className={css["actionlog"] + " " + logP[line.seat]}>
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

interface LogTextProps {
  children: string;
}

function LogText(props: LogTextProps): JSX.Element {
  const { children } = props;
  return <div className={"log-text"}>{children}</div>;
}

interface LogCardProps {
  children: string;
  grpId: number;
}

function LogCard(props: LogCardProps): JSX.Element {
  const { children, grpId } = props;
  const cardObj = db.card(grpId);
  const cardName = cardObj?.name;

  const [hoverIn, hoverOut] = useHoverCard(grpId);

  return (
    <>
      {children !== "" ? <LogText>{children}</LogText> : <></>}
      <div
        onMouseEnter={hoverIn}
        onMouseLeave={hoverOut}
        className={css["log-card"]}
      >
        {cardName}
      </div>
    </>
  );
}

interface LogAbilityProps {
  children: string;
  abId: number;
}

function LogAbility(props: LogAbilityProps): JSX.Element {
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
