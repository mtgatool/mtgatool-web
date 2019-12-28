/* eslint-disable react/prop-types */
import React from "react";
import { useRouteMatch } from "react-router-dom";
import css from "./draftview.css";
import TopTitle from "../title";
import { WrapperOuter, WrapperInnerCentered } from "../wrapper";
import DeckList from "../decklist";
import NotFound from "../notfound";
import Slider from "../slider";
import { useWebDispatch } from "../../web-provider";
import db from "../../shared/database";
import urlDecode from "../../shared/urlDecode";

import {
  STATE_IDLE,
  STATE_DOWNLOAD,
  STATE_ERROR,
  PACK_SIZES
} from "../../shared/constants";
import Deck from "../../shared/deck";

function DraftView(props) {
  const { setImage } = props;
  const draftMatch = useRouteMatch("/draft/:draftId");
  const [draftToDraw, setDraftToDraw] = React.useState(null);
  const [pickpack, setPickPack] = React.useState({ pick: 0, pack: 0 });
  const webDispatch = useWebDispatch();

  const setQueryState = state => {
    webDispatch({ type: "setQueryState", queryState: state });
  };

  React.useEffect(() => {
    if (draftMatch) {
      const URL = `https://mtgatool.com/api/get_draft.php?id=${draftMatch.params.draftId}`;
      setQueryState(STATE_DOWNLOAD);
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        if (xhr.status !== 200) {
          setQueryState(xhr.status);
        } else {
          try {
            let draftData = JSON.parse(urlDecode(xhr.responseText));
            //console.log(xhr.responseText);
            setDraftToDraw(draftData);
            /*
            try {
              const cardObj = db.card(draftData.playerDeck.deckTileId);
              if (cardObj.images.art_crop) {
                setImage(cardObj);
              }
            } catch (e) {
              console.log("Card image not found ", e);
            }
            */
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
    } else {
      setQueryState(STATE_IDLE);
    }
  }, []);

  const onSliderChange = e => {
    const value = pickPackFromPosition(e.target.value, draftToDraw.set);
    setPickPack(value);
  };

  const getCurrentPick = () => {
    const key = `pack_${pickpack.pack}pick_${pickpack.pick}`;
    //console.log(key, draftToDraw[key]);
    return draftToDraw[key] ? draftToDraw[key] : { pick: 0, pack: [] };
  };

  const getCurrentDeck = () => {
    const pos = positionFromPickPack(pickpack, draftToDraw.set);
    let decklist = new Deck();
    for (let i = 0; i < pos; i++) {
      let pp = pickPackFromPosition(i, draftToDraw.set);
      const key = `pack_${pp.pack}pick_${pp.pick}`;
      decklist.getMainboard().add(draftToDraw[key].pick);
    }
    decklist.getMainboard().removeDuplicates();
    return decklist.getSave();
  };

  return (
    <>
      {draftToDraw && draftToDraw.error ? (
        <NotFound setImage={setImage} />
      ) : draftToDraw ? (
        <WrapperOuter style={{ minHeight: "calc(100vh - 5px)" }}>
          <WrapperInnerCentered>
            <TopTitle
              title={draftToDraw.set + " Draft"}
              subtitle={"by " + draftToDraw.owner.split("#")[0]}
            />
            <div className={css["draft-title"]}>{`Pack ${pickpack.pack +
              1}, Pick ${pickpack.pick + 1}`}</div>
            <Slider
              onChange={onSliderChange}
              max={(PACK_SIZES[draftToDraw.set] || 14) * 3 - 1}
            />
            <div className={css["draft-container"]}>
              <div className={css["draft-view"]}>
                {getCurrentPick().pack.map((grpId, index) => {
                  return (
                    <DraftCard
                      pick={getCurrentPick().pick == grpId}
                      key={pickpack.pack + "-" + pickpack.pick + "-" + index}
                      grpId={grpId}
                    />
                  );
                })}
              </div>
              <div className={css["draft-deck-view"]}>
                <DeckList deck={getCurrentDeck()} />
              </div>
            </div>
          </WrapperInnerCentered>
        </WrapperOuter>
      ) : (
        <></>
      )}
    </>
  );
}

function positionFromPickPack(pp, set) {
  const packSize = PACK_SIZES[set] || 14;
  return pp.pick + pp.pack * packSize;
}

function pickPackFromPosition(position, set) {
  const packSize = PACK_SIZES[set] || 14;
  //const maxValue = packSize * 3;
  const pack = Math.floor(position / packSize);
  const pick = position % packSize;

  return { pack: pack, pick: pick };
}

function DraftCard(props) {
  const { grpId, pick } = props;
  const cardObj = db.card(grpId);

  const webDispatch = useWebDispatch(cardObj);

  const setHoverCard = grpId => {
    webDispatch({ type: "setHoverCard", HoverGrpId: grpId });
  };

  const setHoverOpacity = opacity => {
    webDispatch({ type: "setHoverOpacity", HoverOpacity: opacity });
  };

  const handleMouseEnter = React.useCallback(() => {
    setHoverCard(grpId);
    setHoverOpacity(1);
  }, []);

  const handleMouseLeave = React.useCallback(() => {
    setHoverOpacity(0);
  }, []);

  const makeStyle = () => {
    const cardObj = db.card(grpId);
    let newImg;
    try {
      newImg = `url(https://img.scryfall.com/cards${cardObj.images.normal}`;
    } catch (e) {
      newImg = `url(${NotFound})`;
    }

    return {
      backgroundImage: newImg
    };
  };

  return (
    <div
      style={makeStyle()}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={
        css["draft-card"] + (pick ? " " + css["draft-card-picked"] : "")
      }
    />
  );
}

export default DraftView;
