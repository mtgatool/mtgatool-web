/* eslint-disable react/prop-types */
import React from "react";
import {useRouteMatch} from "react-router-dom";
import DeckList from "../decklist";
import TopTitle from "../title";
import {WrapperOuter} from "../wrapper";
import css from "./deckview.css";
import metacss from "../metagame/metagame.css";
import Deck from "../../shared/deck";
import DeckManaCurve from "../deck-mana-curve";
import DeckTypesStats from "../deck-types-stats";
import DeckWildcards from "../deck-wildcards";
import db from "../../shared/database";
import NotFound from "../notfound";

import {useWebDispatch} from "../../web-provider";
import {STATE_IDLE, STATE_DOWNLOAD, STATE_ERROR} from "../../shared/constants";
import {ExportViewProps, ServerDeck} from "../../web-types/shared";

function DeckView(props: ExportViewProps): JSX.Element {
  const {setImage} = props;
  const deckMatch = useRouteMatch<{deckid: string}>("/deck/:deckid");
  const [deckToDraw, setDeckToDraw] = React.useState<ServerDeck | null>(null);

  const webDispatch = useWebDispatch();

  const setQueryState = (state): void => {
    webDispatch({type: "setQueryState", queryState: state});
  };

  const copyDeck = React.useCallback(() => {
    console.log("Copy");
    //console.log(deckToDraw, str);
    const str = deckToDraw ? new Deck(deckToDraw).getExportArena() : "";
    navigator.clipboard.writeText(str);
  }, [deckToDraw]);

  React.useEffect(() => {
    if (deckMatch) {
      const URL = `https://mtgatool.com/api/get_deck.php?id=${deckMatch.params.deckid}`;
      setQueryState(STATE_DOWNLOAD);
      const xhr = new XMLHttpRequest();
      xhr.onload = (): void => {
        if (xhr.status !== 200) {
          setQueryState(xhr.status);
        } else {
          try {
            const deckData = JSON.parse(xhr.responseText);
            setDeckToDraw(deckData);
            try {
              const cardObj = deckToDraw
                ? db.card(deckToDraw.deckTileId)
                : undefined;
              if (cardObj?.images.art_crop) {
                setImage(cardObj);
              }
            } catch (e) {
              console.log("Card image not found ", e);
            }
            setQueryState(STATE_IDLE);
          } catch (e) {
            console.log(e);
            setQueryState(STATE_ERROR);
          }
        }
      };
      xhr.onreadystatechange = function(): void {
        if (xhr.readyState === 4) {
          setQueryState(STATE_IDLE);
        }
      };
      xhr.open("GET", URL);
      xhr.send();
    } else {
      setQueryState(STATE_ERROR);
    }
  }, []);

  return (
    <>
      {deckToDraw && deckToDraw.error ? (
        <NotFound setImage={setImage} />
      ) : (
        <WrapperOuter style={{minHeight: "calc(100vh - 5px)"}}>
          <TopTitle
            title={deckToDraw ? deckToDraw.name : ""}
            subtitle={deckToDraw ? "by " + deckToDraw.user : ""}
          />
          {deckToDraw ? (
            <div className={css["deckview-div"]}>
              <div onClick={copyDeck} className={metacss["button-simple"]}>
                Copy to clipboard
              </div>
              <DeckWildcards deck={new Deck(deckToDraw)} />
              <DeckTypesStats deck={new Deck(deckToDraw)} />
              <DeckManaCurve deck={deckToDraw} />
              <DeckList deck={deckToDraw} />
            </div>
          ) : (
            <></>
          )}
        </WrapperOuter>
      )}
    </>
  );
}

export default DeckView;
