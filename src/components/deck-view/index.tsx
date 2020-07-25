/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import TopTitle from "../title";
import { WrapperOuter, WrapperInner } from "../wrapper";
import { Deck } from "mtgatool-shared";
import NotFound from "../notfound";

import { ServerDeck } from "../../web-types/shared";
import useRequest from "../../hooks/useRequest";
import DeckViewNew from "../deck-view-new";
import Section from "../Section";
import Button from "../button";

function DeckView(): JSX.Element {
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
    }
  }, [deckMatch, deckToDraw, response, start, status]);

  return (
    <>
      {deckToDraw && deckToDraw.error ? (
        <NotFound setImage={(): void => {}} />
      ) : (
        <WrapperOuter style={{ minHeight: "calc(100vh - 5px)" }}>
          <WrapperInner>
            <Section
              style={{
                marginTop: "6em",
                marginBottom: "1em",
                flexDirection: "column",
                paddingBottom: "16px"
              }}
            >
              <TopTitle
                title={deckToDraw ? deckToDraw.name : ""}
                subtitle={deckToDraw ? "by " + deckToDraw.user : ""}
              />
              <Button onClick={copyDeck} text="Copy to clipboard" />
            </Section>
            {deckToDraw ? <DeckViewNew deck={deckToDraw} /> : <></>}
          </WrapperInner>
        </WrapperOuter>
      )}
    </>
  );
}

export default DeckView;
