/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import DeckList from "../decklist";
import TopTitle from "../title";
import { WrapperOuter } from "../wrapper";
import css from "./deckview.css";
import metacss from "../metagame/metagame.css";
import Deck from "../../shared/deck";
import DeckManaCurve from "../deck-mana-curve";
import DeckTypesStats from "../deck-types-stats";
import DeckWildcards from "../deck-wildcards";
import db from "../../shared/database";
import NotFound from "../notfound";

import { ExportViewProps, ServerDeck } from "../../web-types/shared";
import useRequest from "../../hooks/useRequest";

function DeckView(props: ExportViewProps): JSX.Element {
  const { setImage } = props;
  const deckMatch = useRouteMatch<{ deckid: string }>("/deck/:deckid");
  const [deckToDraw, setDeckToDraw] = React.useState<ServerDeck | null>(null);

  const { response, status, start } = useRequest(
    `https://mtgatool.com/api/get_deck.php?id=${deckMatch?.params.deckid}`
  );

  const copyDeck = React.useCallback(() => {
    const str = deckToDraw ? new Deck(deckToDraw).getExportArena() : "";
    navigator.clipboard.writeText(str);
  }, [deckToDraw]);

  useEffect(() => {
    if (deckMatch && status == null) {
      start();
    } else if (response && deckToDraw == null) {
      const deckData = JSON.parse(response);
      setDeckToDraw(deckData);
      try {
        const cardObj = deckData ? db.card(deckData.deckTileId) : undefined;
        if (cardObj?.images.art_crop) {
          setImage(cardObj);
        }
      } catch (e) {
        console.log("Card image not found ", e);
      }
    }
  }, [deckMatch, deckToDraw, response, setImage, start, status]);

  return (
    <>
      {deckToDraw && deckToDraw.error ? (
        <NotFound setImage={setImage} />
      ) : (
        <WrapperOuter style={{ minHeight: "calc(100vh - 5px)" }}>
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
