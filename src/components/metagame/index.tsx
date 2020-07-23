/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { useRouteMatch, Link, match } from "react-router-dom";
import css from "./metagame.css";
import { ManaCost } from "../card-tile";
import NotFound from "../notfound";
import TopTitle from "../title";
import { WrapperInner, WrapperOuter } from "../wrapper";
import db from "../../shared/database";
import { ExportViewProps, ServerDeck } from "../../web-types/shared";
import { InternalDeck } from "../../types/Deck";
import { animated, useSpring } from "react-spring";
import useRequest from "../../hooks/useRequest";
import Section from "../Section";
import ListItemMetagameDeck from "../list-item/ListItemMetagameDeck";
import DeckViewNew from "../deck-view-new";
import Button from "../button";
import Deck from "../../shared/deck";
import Flex from "../flex";

const METAGAME_URL = "https://mtgatool.com/api/get_metagame.php";

interface Archetype {
  best_deck: ServerDeck;
  best_deck_wr: number;
  best_deck_wrt: number;
  colors: number[];
  decks: DeckLink[];
  loss: number;
  name: string;
  share: string;
  tile: number;
  total: number;
  win: number;
  winrate: string;
}

export interface DeckLink {
  best: {
    name: string;
    dev: number;
    high: number;
  };
  colors: number[];
  match: string;
  name: string;
  owner: string;
  wr: number;
  wrt: number;
  tile: number;
  rank: string;
  tier: number;
}

interface MetagameData {
  _id: string;
  format: string;
  date: string;
  date_start: string;
  days: number;
  meta: Archetype[];
}

function sortArchetypes(a: Archetype, b: Archetype): number {
  const an = a.name === "Unknown" ? 0 : a.total;
  const bn = b.name === "Unknown" ? 0 : b.total;
  return bn - an;
}

function sortDeckLinks(a: DeckLink, b: DeckLink): number {
  return b.wr - a.wr;
}

const formats = [
  {
    id: "BO1",
    name: "Standard BO1"
  },
  {
    id: "BO3",
    name: "Standard BO3"
  },
  {
    id: "HBO1",
    name: "Historic BO1"
  },
  {
    id: "HBO3",
    name: "Historic BO3"
  }
];

interface MetagameNavProps {
  format: match<{ format: string }> | null;
}

function MetagameNav(props: MetagameNavProps): JSX.Element {
  const { format } = props;
  const formatId = format ? format.params.format : "BO1";
  return (
    <div className={css["metagame-nav"]}>
      {formats.map(format => {
        if (formatId !== format.id) {
          return (
            <Link key={format.id} to={"/metagame/" + format.id}>
              {format.name}
            </Link>
          );
        }
      })}
    </div>
  );
}

interface ArchetypeTileProps {
  id: string;
  key: string;
  arch: Archetype;
}

function ArchetypeTile(props: ArchetypeTileProps): JSX.Element {
  const { arch, id } = props;
  const cardObj = db.card(arch.tile);
  const [hover, setHover] = useState(0);
  const spring = useSpring({
    backgroundSize: "auto " + Math.round(hover ? 220 : 185) + "px",
    config: { mass: 5, tension: 2000, friction: 150 }
  });

  const cardImage = cardObj
    ? `https://img.scryfall.com/cards${cardObj.images.art_crop}`
    : "https://gamepedia.cursecdn.com/mtgsalvation_gamepedia/thumb/c/c4/Fblthp.jpg/250px-Fblthp.jpg";
  const tileStyle = {
    backgroundImage: `url(${cardImage})`
  };

  const mouseEnter = React.useCallback(() => {
    setHover(1);
  }, []);

  const mouseLeave = React.useCallback(() => {
    setHover(0);
  }, []);

  const winrate = (arch.win / arch.total) * 100;
  return (
    <Link
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
      to={
        "/metagame/" +
        id.split(".")[1] +
        "/" +
        id.split(".")[0] +
        "/" +
        arch.name
      }
    >
      <animated.div
        className={css["archetype-div"]}
        style={{ ...spring, ...tileStyle }}
      >
        <div className={css["archetype-info"]}>
          <div className={css["archetype-name"]}>{arch.name}</div>
          <div className={css["archetype-colors"]}>
            <ManaCost colors={arch.colors} />
          </div>
          <div className={css["archetype-desc"]}>
            {arch.share + "% - " + winrate.toFixed(2) + "% winrate"}
          </div>
          <div className={css["archetype-desc"]}>{arch.total + " matches"}</div>
        </div>
      </animated.div>
    </Link>
  );
}

function Metagame(props: ExportViewProps): JSX.Element {
  const formatMatch = useRouteMatch<{ format: string }>("/metagame/:format");
  const dayMatch = useRouteMatch<{ format: string; day: string }>(
    "/metagame/:format/:day"
  );
  const archMatch = useRouteMatch<{
    format: string;
    day: string;
    arch: string;
  }>("/metagame/:format/:day/:arch");
  const deckMatch = useRouteMatch<{
    format: string;
    day: string;
    arch: string;
    deck: string;
  }>("/metagame/:format/:day/:arch/:deck");
  const { setImage } = props;
  const [metagameData, setMetagameData] = useState<MetagameData | null>(null);
  const [archetype, setArchetype] = useState<string | null>(null);

  const isDeckView = !!deckMatch;
  const isResultsView = !!archMatch && !isDeckView;
  const isArchetypesView = !isResultsView && !isDeckView;

  // Requests and triggers
  let URL = METAGAME_URL;
  if (dayMatch) {
    URL = `${METAGAME_URL}?event=${dayMatch.params.format.toUpperCase()}&days=${
      dayMatch.params.day
    }`;
  } else if (formatMatch) {
    URL = `${METAGAME_URL}?event=${formatMatch.params.format.toUpperCase()}`;
  }
  const metagameRequest = useRequest(URL);

  useEffect(() => {
    if (metagameRequest.status == null) {
      metagameRequest.start();
    } else if (metagameRequest.response && metagameData == null) {
      const response = decodeURIComponent(escape(metagameRequest.response));
      const jsonData = JSON.parse(response);
      setMetagameData(jsonData);
    }
  }, [metagameRequest, metagameData]);

  // format ID match
  useEffect(() => {
    if (
      formatMatch &&
      metagameData &&
      metagameData.format !== formatMatch.params.format
    ) {
      setMetagameData(null);
      metagameRequest.reset(URL);
    }
  }, [URL, formatMatch, metagameData, metagameRequest]);

  // Archetype match
  useEffect(() => {
    if (archMatch && archMatch.params.arch !== archetype) {
      setArchetype(archMatch.params.arch);
    }
  }, [archMatch, archetype]);

  const currentArchetype = archMatch
    ? metagameData?.meta.filter(arch => arch.name == archMatch.params.arch)[0]
    : undefined;

  return archMatch &&
    metagameData &&
    metagameData.meta &&
    (metagameData.meta.filter(arch => arch.name == archMatch.params.arch)
      .length === 0 ||
      (deckMatch &&
        metagameData.meta.filter(arch => arch.name == archMatch.params.arch)[0]
          .decks.length <= parseInt(deckMatch.params.deck))) ? (
    <NotFound setImage={setImage} />
  ) : (
    <WrapperOuter style={{ minHeight: "calc(100vh - 5px)" }}>
      <WrapperInner>
        <Section
          style={{
            marginTop: "6em",
            marginBottom: "1em",
            flexDirection: "column"
          }}
        >
          <TopTitle
            title={
              metagameData
                ? `${
                    formats.filter(f => f.id == metagameData.format)[0].name
                  } Metagame (${new Date(metagameData.date).toUTCString()})`
                : "Metagame"
            }
            subtitle={
              metagameData
                ? `Contains data from the last ${metagameData.days} days`
                : ""
            }
          />
          <MetagameNav format={formatMatch} />
        </Section>
        {isDeckView ? (
          <ArchetypeDeck metagame={metagameData} />
        ) : (
          <Section style={{ padding: "16px", marginBottom: "1em" }}>
            {isArchetypesView ? (
              metagameData && metagameData.meta ? (
                <div className={css.metagameDiv}>
                  {metagameData.meta.sort(sortArchetypes).map(
                    (arch: Archetype, index: number): JSX.Element => {
                      return (
                        <ArchetypeTile
                          id={metagameData._id}
                          key={arch.name + index}
                          arch={arch}
                        />
                      );
                    }
                  )}
                </div>
              ) : (
                <></>
              )
            ) : (
              <></>
            )}
            {isResultsView && currentArchetype && archMatch ? (
              <>
                <div className={css.archetypeDecksListDiv}>
                  <Link to=".">
                    <Button
                      style={{ margin: "0 auto 16px auto" }}
                      onClick={(): void => {}}
                      text="Back"
                    />
                  </Link>
                  {currentArchetype.decks
                    .sort(sortDeckLinks)
                    .map((deck, index) => {
                      return (
                        <Link
                          to={(): string =>
                            `/metagame/${archMatch.params.format}/${archMatch.params.day}/${archMatch.params.arch}/${index}`
                          }
                          key={deck.name + "-" + index}
                        >
                          <ListItemMetagameDeck
                            key={"metagame-id-" + index}
                            decklink={deck}
                          />
                        </Link>
                      );
                    })}
                </div>
              </>
            ) : (
              <></>
            )}
          </Section>
        )}
      </WrapperInner>
    </WrapperOuter>
  );
}

export default Metagame;

interface ArchetypeDecksProps {
  metagame: MetagameData | null;
}

function ArchetypeDeck(props: ArchetypeDecksProps): JSX.Element {
  const { metagame } = props;
  const [deckToDraw, setDeckToDraw] = useState<InternalDeck | undefined>(
    undefined
  );

  const deckMatch = useRouteMatch<{
    format: string;
    day: string;
    arch: string;
    deck: string;
  }>("/metagame/:format/:day/:arch/:deck");

  const arch =
    metagame && metagame.meta && deckMatch
      ? metagame.meta.filter(arch => arch.name == deckMatch.params.arch)[0]
      : null;

  const sortedDecks = arch ? arch.decks.sort(sortDeckLinks) : undefined;

  const currentDeck = deckMatch ? parseInt(deckMatch.params.deck) : 0;

  const deckLink: DeckLink | null = sortedDecks
    ? sortedDecks[currentDeck]
    : null;

  const currentMatchId =
    deckLink?.match ||
    (sortedDecks ? sortedDecks[currentDeck].match : null) ||
    "";
  const deckUrl = `https://mtgatool.com/api/get_match_deck.php?id=${currentMatchId}`;
  const deckRequest = useRequest(deckUrl);

  useEffect(() => {
    if (deckRequest.status == null && currentMatchId !== "") {
      deckRequest.start(deckUrl);
    } else if (deckRequest.response && deckToDraw == undefined) {
      const deckData = JSON.parse(decodeURIComponent(deckRequest.response));
      console.log(deckData);
      setDeckToDraw(deckData);
    }
  }, [deckRequest, currentMatchId, deckToDraw, deckUrl]);

  const copyDeck = React.useCallback(() => {
    const str = deckToDraw ? new Deck(deckToDraw).getExportArena() : "";
    navigator.clipboard.writeText(str);
  }, [deckToDraw]);

  return deckToDraw ? (
    <>
      <Section
        style={{
          flexDirection: "column",
          marginBottom: "16px",
          paddingBottom: "16px"
        }}
      >
        <TopTitle
          title={deckToDraw ? deckToDraw.name : ""}
          subtitle={deckToDraw ? "by " + deckLink?.owner : ""}
        />
        <Flex style={{ justifyContent: "space-around" }}>
          <Link to=".">
            <Button onClick={(): void => {}} text="Back" />
          </Link>
          <Button onClick={copyDeck} text="Copy to clipboard" />
        </Flex>
      </Section>
      <DeckViewNew deck={deckToDraw} />
    </>
  ) : (
    <></>
  );
}
