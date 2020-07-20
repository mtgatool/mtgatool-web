import React, { useCallback, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import css from "./draftview.css";
import TopTitle from "../title";
import { WrapperOuter, WrapperInnerCentered } from "../wrapper";
import DeckList from "../decklist";
import NotFound from "../notfound";
import Slider, { SliderPosition } from "../slider";
import db from "../../shared/database";
import { PACK_SIZES } from "../../shared/constants";
import Deck from "../../shared/deck";
import { ExportViewProps } from "../../web-types/shared";
import { InternalDraft } from "../../types/draft";
import useHoverCard from "../../hooks/useHoverCard";
import useRequest from "../../hooks/useRequest";
import urlDecode from "../../shared/urlDecode";

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

  const [hoverIn, hoverOut] = useHoverCard(grpId);

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
      onMouseEnter={hoverIn}
      onMouseLeave={hoverOut}
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
  const set = draftToDraw?.set || "";
  const maxPosition = (PACK_SIZES[set] ?? DEFAULT_PACK_SIZE) * 3 - 1;

  const { response, status, start } = useRequest(
    `https://mtgatool.com/api/get_draft.php?id=${draftMatch?.params.draftId}`
  );

  useEffect(() => {
    if (draftMatch && status == null) {
      start();
    } else if (response && draftToDraw == null) {
      const draftData = JSON.parse(urlDecode(response));
      setDraftToDraw(draftData);
    }
  }, [draftMatch, draftToDraw, response, setImage, start, status]);

  const onSliderChange = useCallback(
    (value: number) => {
      setPickPack(pickPackFromPosition(value, set));
    },
    [set]
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
  }, [set, draftToDraw, pickpack]);

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
