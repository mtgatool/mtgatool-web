/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React from "react";
import { BrowserRouter as Router, useRouteMatch, Link } from "react-router-dom";
import { WrapperInner, WrapperOuter } from "../wrapper";
import keyArt from "../../images/key-art.jpg";
import css from "./metagame.css";
import TopTitle from "../title";
import { ManaCost } from "../card-tile";
import { STATE_IDLE, STATE_DOWNLOAD, STATE_ERROR } from "../../constants";

import { useSelector } from "react-redux";

const METAGAME_URL = "https://mtgatool.com/api/get_metagame.php";

export const getCard = grpId => {
  // Default card not found to undefined
  return useSelector(state =>
    state.database.cards ? state.database.cards[grpId] : undefined
  );
};

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
  // Little debug here
  /*
  const database = useSelector(state => {
    console.log("new state; ", state);
  });
  */

  const getMetagameData = () => {
    setQueryState(STATE_DOWNLOAD);
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      if (xhr.status !== 200) {
        setQueryState(xhr.status);
      } else {
        try {
          let jsonData = JSON.parse(xhr.responseText);
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
      URL = `${METAGAME_URL}?event=${dayMatch.format}&days=${dayMatch.day}`;
    }
    if (formatMatch) {
      URL = `${METAGAME_URL}?event=${dayMatch.format}`;
    }
    xhr.open("GET", URL);
    xhr.send();
  };

  React.useEffect(() => {
    console.log("match", match);
    console.log("formatMatch", formatMatch);
    console.log("dayMatch", dayMatch);
    console.log("archMatch", archMatch);
    console.log("deckMatch", deckMatch);
    getMetagameData();
    setImage(keyArt);
  }, []);

  return (
    <WrapperOuter style={{ minHeight: "calc(100vh - 5px)" }}>
      <TopTitle title={"Metagame (" + queryState + ")"} />
      <WrapperInner>
        <div className={css["metagame-div"]}>
          {metagameData && metagameData.meta ? (
            []
              .concat(metagameData.meta)
              .sort(sortArchetypes)
              .map((arch, index) => {
                return (
                  <Archetype
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
      </WrapperInner>
    </WrapperOuter>
  );
}

function Archetype(props) {
  const { arch, id } = props;
  const cardObj = getCard(arch.tile);
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
