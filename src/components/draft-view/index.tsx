import React, { useCallback } from "react";
import { useRouteMatch } from "react-router-dom";
import css from "./draftview.css";
import TopTitle from "../title";
import { WrapperOuter, WrapperInnerCentered } from "../wrapper";
import DeckList from "../decklist";
import NotFound from "../notfound";
import Slider, { SliderPosition } from "../slider";
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
import { ExportViewProps } from "../../web-types/shared";
import { InternalDraft } from "../../types/draft";

interface PickPack {
  pack: number;
  pick: number;
}

const DEFAULT_PACK_SIZE = 14;

function positionFromPickPack(pp: PickPack, set: string): number {
  const packSize = PACK_SIZES[set] ?? DEFAULT_PACK_SIZE;
  return pp.pick + pp.pack * packSize;
}

function pickPackFromPosition(position: number, set: string): PickPack {
  const packSize = PACK_SIZES[set] ?? DEFAULT_PACK_SIZE;
  //const maxValue = packSize * 3;
  const pack = Math.floor(position / packSize);
  const pick = position % packSize;

  return { pack: pack, pick: pick };
}

interface DraftCardProps {
  grpId: number;
  pick: boolean;
  size: number;
}

function DraftCard(props: DraftCardProps): JSX.Element {
  const { grpId, pick } = props;
  //const cardObj = db.card(grpId);

  const webDispatch = useWebDispatch();

  const setHoverCard = (grpId: number): void => {
    webDispatch({ type: "setHoverCard", HoverGrpId: grpId });
  };

  const setHoverOpacity = (opacity: number): void => {
    webDispatch({ type: "setHoverOpacity", HoverOpacity: opacity });
  };

  const handleMouseEnter = React.useCallback(() => {
    setHoverCard(grpId);
    setHoverOpacity(1);
  }, []);

  const handleMouseLeave = React.useCallback(() => {
    setHoverOpacity(0);
  }, []);

  const makeStyle = (): React.CSSProperties => {
    const cardObj = db.card(grpId);
    let newImg;
    try {
      newImg = `url(https://img.scryfall.com/cards${cardObj?.images.normal}`;
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
      className={css["draft-card"] + (pick ? " " + css.draftCardPicked : "")}
    />
  );
}

function DraftView(props: ExportViewProps): JSX.Element {
  const { setImage } = props;
  const draftMatch = useRouteMatch<{ draftId: string }>("/draft/:draftId");
  const [draftToDraw, setDraftToDraw] = React.useState<InternalDraft | null>(
    null
  );
  const [pickpack, setPickPack] = React.useState({ pick: 0, pack: 0 });
  const webDispatch = useWebDispatch();
  const set = draftToDraw?.set || "";
  const maxPosition = (PACK_SIZES[set] ?? DEFAULT_PACK_SIZE) * 3 - 1;

  const setQueryState = (state: number): void => {
    webDispatch({ type: "setQueryState", queryState: state });
  };

  React.useEffect(() => {
    if (draftMatch) {
      const URL = `https://mtgatool.com/api/get_draft.php?id=${draftMatch.params.draftId}`;
      setQueryState(STATE_DOWNLOAD);
      const xhr = new XMLHttpRequest();
      xhr.onload = (): void => {
        if (xhr.status !== 200) {
          setQueryState(xhr.status);
        } else {
          try {
            const draftData = JSON.parse(urlDecode(xhr.responseText));
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
      xhr.onreadystatechange = function(): void {
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

  const onSliderChange = useCallback(
    (value: number) => {
      setPickPack(pickPackFromPosition(value, set));
    },
    [draftToDraw]
  );

  const getCurrentPick = useCallback(() => {
    const key = `pack_${pickpack.pack}pick_${pickpack.pick}`;
    return draftToDraw && draftToDraw[key]
      ? draftToDraw[key]
      : { pick: 0, pack: [] };
  }, [draftToDraw, pickpack.pack, pickpack.pick]);

  const getCurrentDeck = useCallback((): Deck => {
    const pos = positionFromPickPack(pickpack, set);
    const decklist = new Deck();

    for (let i = 0; i < pos; i++) {
      const pp = pickPackFromPosition(i, draftToDraw?.set || "");
      const key = `pack_${pp.pack}pick_${pp.pick}`;
      if (draftToDraw && draftToDraw[key]) {
        const pickToDraw = parseInt(draftToDraw[key].pick + "");
        decklist.getMainboard().add(pickToDraw);
      }
    }
    decklist.getMainboard().removeDuplicates();
    return decklist;
  }, [draftToDraw, pickpack]);

  const sliderPositions = Array(maxPosition + 1).fill(new SliderPosition());
  sliderPositions[
    positionFromPickPack({ pick: 0, pack: 0 }, set)
  ] = new SliderPosition("Pack 1");
  sliderPositions[
    positionFromPickPack({ pick: 0, pack: 1 }, set)
  ] = new SliderPosition("Pack 2");
  sliderPositions[
    positionFromPickPack({ pick: 0, pack: 2 }, set)
  ] = new SliderPosition("Pack 3");

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
            <div className={css.draftTitle}>{`Pack ${pickpack.pack +
              1}, Pick ${pickpack.pick + 1}`}</div>
            <Slider
              containerStyle={{ margin: "8px 0 30px 0" }}
              value={positionFromPickPack(pickpack, set)}
              onChange={onSliderChange}
              max={maxPosition}
              positions={sliderPositions}
            />
            <div className={css.draftContainer}>
              <div className={css.draftView}>
                {getCurrentPick().pack.map((grpId: number, index: number) => {
                  return (
                    <DraftCard
                      pick={getCurrentPick().pick == grpId}
                      key={pickpack.pack + "-" + pickpack.pick + "-" + index}
                      size={5}
                      grpId={grpId}
                    />
                  );
                })}
              </div>
              <div className={css.draftDeckView}>
                <DeckList deck={getCurrentDeck().getSave()} />
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

export default DraftView;
