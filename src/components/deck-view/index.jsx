import React from "react";
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
//import NotFound from "../notfound";
//import db from "../../shared/database";
//import CardTile from "../card-tile";

function DeckView() {
  const deckMatch = useRouteMatch("/deck/:deckid");
  const [deckToDraw, setDeckToDraw] = React.useState(null);

  const copyDeck = React.useCallback(() => {
    console.log("Copy");
    console.log(deckToDraw, str);
    const str = new Deck(deckToDraw).getExportArena();
    navigator.clipboard.writeText(str);
  }, [deckToDraw]);

  React.useEffect(() => {
    if (deckMatch) {
      const URL = `https://mtgatool.com/api/get_deck.php?id=${deckMatch.params.deckid}`;
      //setQueryState(STATE_DOWNLOAD);
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        if (xhr.status !== 200) {
          //setQueryState(xhr.status);
        } else {
          try {
            let deckData = JSON.parse(xhr.responseText);
            setDeckToDraw(deckData);
            console.log(deckData);
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
  );
}

export default DeckView;
