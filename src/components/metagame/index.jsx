/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React from "react";
import {
  BrowserRouter as Router,
  useRouteMatch,
  useLocation,
  Link
} from "react-router-dom";
import { WrapperInner, WrapperOuter } from "../wrapper";
import keyArt from "../../images/key-art.jpg";
import db from "../../shared/database";
import css from "./metagame.css";
import topNavCss from "../topnav/topnav.css";
import TopTitle from "../title";
import { ManaCost } from "../card-tile";
import DeckList from "../decklist";
import { STATE_IDLE, STATE_DOWNLOAD, STATE_ERROR } from "../../constants";
import NotFound from "../notfound";

const METAGAME_URL = "https://mtgatool.com/api/get_metagame.php";

function sortArchetypes(a, b) {
  return b.name === "Unknown" ? -1 : parseFloat(b.share) - parseFloat(a.share);
}

function Metagame(props) {
  const match = useRouteMatch();
  const formatMatch = useRouteMatch("/metagame/:format");
  const dayMatch = useRouteMatch("/metagame/:format/:day");
  const archMatch = useRouteMatch("/metagame/:format/:day/:arch");
  const deckMatch = useRouteMatch("/metagame/:format/:day/:arch/:deck");
  const { setImage } = props;
  const [queryState, setQueryState] = React.useState(STATE_IDLE);
  const [metagameData, setMetagameData] = React.useState(null);
  const [deckToDraw, setDeckToDraw] = React.useState(null);
  // Little debug here
  /*
  const database = useSelector(state => {
    console.log("new state; ", state);
  });
  */

  const getArchetypeDeck = match => {
    const URL = `https://mtgatool.com/metagame/get_deck.php?id=${match}`;
    setQueryState(STATE_DOWNLOAD);
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      if (xhr.status !== 200) {
        setQueryState(xhr.status);
      } else {
        try {
          let deckData = JSON.parse(xhr.responseText);
          setDeckToDraw(deckData);
          setQueryState(STATE_IDLE);
        } catch (e) {
          console.log(e);
          setQueryState(STATE_ERROR);
        }
      }
    };
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        setQueryState(STATE_IDLE);
      }
    };
    xhr.open("GET", URL);
    xhr.send();
  };

  const getMetagameData = () => {
    setQueryState(STATE_DOWNLOAD);
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      if (xhr.status !== 200) {
        setQueryState(xhr.status);
      } else {
        try {
          localStorage.metagame = xhr.responseText;
          let jsonData = JSON.parse(xhr.responseText);
          console.log("setMetagameData");
          setMetagameData(jsonData);
          setQueryState(STATE_IDLE);
        } catch (e) {
          console.log(e);
          setQueryState(STATE_ERROR);
        }
      }
    };
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && queryState !== STATE_ERROR) {
        setQueryState(STATE_IDLE);
      }
    };

    let URL = METAGAME_URL;
    if (dayMatch) {
      URL = `${METAGAME_URL}?event=${dayMatch.params.format}&days=${dayMatch.params.day}`;
    } else if (formatMatch) {
      URL = `${METAGAME_URL}?event=${formatMatch.params.format}`;
    }
    console.log(URL);
    xhr.open("GET", URL);
    xhr.send();
  };

  const location = useLocation();

  React.useEffect(() => {
    console.log("match", match);
    //console.log("formatMatch", formatMatch);
    //console.log("dayMatch", dayMatch);
    //console.log("archMatch", archMatch);
    //console.log("deckMatch", deckMatch);

    if (metagameData && metagameData.meta) {
      if (deckMatch) {
        const openedDeck = deckMatch.params.deck;
        const archName = archMatch.params.arch;
        const archetypeData = metagameData.meta.filter(
          arch => arch.name == archName
        )[0];
        if (openedDeck < archetypeData.decks.length) {
          const matchId = archetypeData.decks[openedDeck].match;
          console.log("get deck", matchId);
          getArchetypeDeck(matchId);
        }
      } else if (archMatch) {
        const archName = archMatch.params.arch;
        const archetypeData = metagameData.meta.filter(
          arch => arch.name == archName
        )[0];
        if (archetypeData) {
          console.log("set best deck", archetypeData.best_deck);
          setDeckToDraw(archetypeData.best_deck);
        }
      }
    } else {
      getMetagameData();
    }
  }, [metagameData, location]);

  React.useEffect(() => {
    setImage(keyArt);
  }, []);

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
            ? `${metagameData._id.split(".")[1]} Metagame (${new Date(
                metagameData.date
              ).toUTCString()})`
            : "Metagame"
        }
        subtitle={
          metagameData
            ? `Contains data from the last ${metagameData.days} days`
            : ""
        }
      />
      <WrapperInner>
        {metagameData && metagameData.meta && archMatch ? (
          <ArchetypeDecks
            deckToDraw={deckToDraw}
            archMatch={archMatch}
            archName={archMatch.params.arch}
            opened={deckMatch ? deckMatch.params.deck : undefined}
            metagame={metagameData}
          />
        ) : (
          <div className={css["metagame-div"]}>
            {metagameData && metagameData.meta ? (
              []
                .concat(metagameData.meta)
                .sort(sortArchetypes)
                .map((arch, index) => {
                  return (
                    <ArchetypeTile
                      id={metagameData._id}
                      key={arch.name + index}
                      arch={arch}
                    />
                  );
                })
            ) : (
              <></>
            )}
          </div>
        )}
      </WrapperInner>
    </WrapperOuter>
  );
}

function ArchetypeTile(props) {
  const { arch, id } = props;
  const cardObj = db.card(arch.tile);
  const cardImage = cardObj
    ? `https://img.scryfall.com/cards${cardObj.images.art_crop}`
    : "https://gamepedia.cursecdn.com/mtgsalvation_gamepedia/thumb/c/c4/Fblthp.jpg/250px-Fblthp.jpg";
  const tileStyle = {
    backgroundImage: `url(${cardImage})`
  };

  const winrate = (arch.win / arch.total) * 100;
  return (
    <Link
      to={
        "/metagame/" +
        id.split(".")[1] +
        "/" +
        id.split(".")[0] +
        "/" +
        arch.name
      }
    >
      <div className={css["archetype-div"]}>
        <div className={css["archetype-tile"]} style={tileStyle}></div>
        <div className={css["archetype-name"]}>{arch.name}</div>
        <div className={css["archetype-colors"]}>
          <ManaCost colors={arch.colors} />
        </div>
        <div className={css["archetype-desc"]}>
          {arch.share + "% - " + winrate.toFixed(2) + "% winrate"}
        </div>
        <div className={css["archetype-desc"]}>{arch.total + " matches"}</div>
      </div>
    </Link>
  );
}

export default Metagame;

function ArchetypeDecks(props) {
  const { deckToDraw, archName, archMatch, metagame, opened } = props;
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
            <div className={css["button-simple"]}>Copy to clipboard</div>
            <DeckList deck={deckToDraw} />
          </>
        ) : (
          <></>
        )}
      </div>
      <div className={css["archetype-decks-list-div"]}>
        {archetype.decks.map((deck, index) => {
          return (
            <Link
              to={location =>
                `/metagame/${archMatch.params.format}/${archMatch.params.day}/${archMatch.params.arch}/${index}`
              }
              key={deck.name + "-" + index}
              className={css["deck-link"]}
            >
              <ManaCost colors={deck.colors} />
              <div className={css["deck-link-desc"]}>
                {deck.name + " by " + deck.owner}
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
