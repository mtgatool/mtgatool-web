/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { useRouteMatch, Link, match } from "react-router-dom";
import css from "./metagame.css";
import topNavCss from "../topnav/topnav.css";
import { ManaCost } from "../card-tile";
import DeckList from "../decklist";
import NotFound from "../notfound";
import TopTitle from "../title";
import { WrapperInner, WrapperOuter } from "../wrapper";
import db from "../../shared/database";
import Deck from "../../shared/deck";
import { utf8Decode } from "../../shared/util";
import keyArt from "../../images/key-art.jpg";
import { ExportViewProps, ServerDeck } from "../../web-types/shared";
import { InternalDeck } from "../../types/Deck";
import { animated, useSpring } from "react-spring";
import useRequest from "../../hooks/useRequest";

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

interface DeckLink {
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
  const [currentMatchId, setCurrentMatchId] = useState("");
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
  const [deckToDraw, setDeckToDraw] = useState<InternalDeck | null>(null);

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

  const ArchURL = `https://mtgatool.com/api/get_match_deck.php?id=${currentMatchId}`;
  const archRequest = useRequest(ArchURL);

  useEffect(() => {
    if (archRequest.status == null && currentMatchId !== "") {
      archRequest.start(ArchURL);
    } else if (archRequest.response) {
      const deckData = JSON.parse(
        decodeURIComponent(escape(archRequest.response))
      );
      if (deckData.id !== deckToDraw?.id) {
        //console.log(deckData);
        setDeckToDraw(deckData);
      }
    }
  }, [ArchURL, archRequest, currentMatchId, deckToDraw]);

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
    const archetypeData = metagameData
      ? metagameData.meta.filter(arch => arch.name == archMatch?.params.arch)[0]
      : null;
    if (archetypeData) {
      setDeckToDraw(archetypeData.best_deck);
    }
    if (archMatch && archMatch.params.arch !== archetype) {
      setArchetype(archMatch.params.arch);
    }
  }, [metagameData, archMatch, archetype]);

  // Deck number match
  useEffect(() => {
    if (deckMatch && metagameData && metagameData.meta) {
      const openedDeck = parseInt(deckMatch.params.deck);
      const archetypeData = metagameData.meta.filter(
        arch => arch.name == archetype
      )[0];
      if (openedDeck < archetypeData.decks.length) {
        const matchId = archetypeData.decks[openedDeck].match;
        if (currentMatchId !== matchId) {
          archRequest.reset();
          setCurrentMatchId(matchId);
        }
      }
    } else if (currentMatchId !== null) {
      setCurrentMatchId("");
    }
  }, [archetype, deckMatch, metagameData, currentMatchId, archRequest]);

  React.useEffect(() => {
    setImage(keyArt);
  }, [setImage]);

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
      <WrapperInner>
        {metagameData && metagameData.meta && archMatch ? (
          <ArchetypeDecks
            setImage={setImage}
            deckToDraw={deckToDraw}
            archMatch={archMatch}
            archName={archMatch.params.arch}
            opened={deckMatch ? parseInt(deckMatch.params.deck) : undefined}
            metagame={metagameData}
          />
        ) : (
          <div className={css["metagame-div"]}>
            {metagameData && metagameData.meta ? (
              metagameData.meta.sort(sortArchetypes).map(
                (arch: Archetype, index: number): JSX.Element => {
                  return (
                    <ArchetypeTile
                      id={metagameData._id}
                      key={arch.name + index}
                      arch={arch}
                    />
                  );
                }
              )
            ) : (
              <></>
            )}
          </div>
        )}
      </WrapperInner>
    </WrapperOuter>
  );
}

export default Metagame;

interface ArchetypeDecksProps {
  setImage: ExportViewProps["setImage"];
  deckToDraw: InternalDeck | null;
  archMatch: match<{
    format: string;
    day: string;
    arch: string;
  }>;
  archName: string;
  opened: number | undefined;
  metagame: MetagameData;
}

function ArchetypeDecks(props: ArchetypeDecksProps): JSX.Element {
  const { setImage, deckToDraw, archName, archMatch, metagame, opened } = props;
  const archetype = metagame.meta.filter(arch => arch.name == archName)[0];

  let deckName, deckOwner, deckWinrate, deckMatches;
  if (!opened) {
    deckName = archetype.best_deck.name;
    deckOwner = archetype.best_deck.owner;
    deckWinrate = archetype.best_deck_wr * 100;
    deckMatches = archetype.best_deck_wrt;
  } else {
    deckName = archetype.decks[opened].name;
    deckOwner = archetype.decks[opened].owner;
    deckWinrate = archetype.decks[opened].wr * 100;
    deckMatches = archetype.decks[opened].wrt;
  }

  if (deckToDraw) {
    try {
      const cardObj = db.card(deckToDraw.deckTileId);
      if (cardObj && cardObj.images.art_crop) {
        setImage(cardObj);
      }
    } catch (e) {
      console.log("Card image not found ", e);
    }
  }

  const copyDeck = React.useCallback(() => {
    //console.log("Copy");
    //console.log(deckToDraw, str);
    let str = "";
    if (deckToDraw) {
      str = new Deck(deckToDraw).getExportArena();
    }
    navigator.clipboard.writeText(str);
  }, [deckToDraw]);

  return (
    <div className={css["archetype-decks-div"]}>
      <div className={css["decklist-div"]}>
        <Link className={topNavCss["nav-link-a"]} to="..">
          {"< Go Back"}
        </Link>
        {deckToDraw && deckWinrate ? (
          <>
            <div className={css["deck-desc"]}>
              {deckName} by {deckOwner}
            </div>
            <div className={css["deck-desc-b"]}>
              {deckWinrate.toFixed(2)}% winrate across {deckMatches} matches.
            </div>
            <div onClick={copyDeck} className={css["button-simple"]}>
              Copy to clipboard
            </div>
            <DeckList deck={deckToDraw} />
          </>
        ) : (
          <></>
        )}
      </div>
      <div className={css["archetype-decks-list-div"]}>
        {archetype.decks.sort(sortDeckLinks).map((deck, index) => {
          return (
            <Link
              to={(): string =>
                `/metagame/${archMatch.params.format}/${archMatch.params.day}/${archMatch.params.arch}/${index}`
              }
              key={deck.name + "-" + index}
              className={css["deck-link"]}
            >
              <ManaCost colors={deck.colors} />
              <div className={css["deck-link-desc"]}>
                {utf8Decode(deck.name + " by " + deck.owner)}
              </div>
              <div className={css["deck-link-wr"]}>
                {Math.round(deck.wr * deck.wrt)} -{" "}
                {Math.round(deck.wrt - deck.wr * deck.wrt)} (
                {(deck.wr * 100).toFixed(2)}%)
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
