import React, { useCallback, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import css from "./draftview.css";
import TopTitle from "../title";
import { WrapperOuter, WrapperInnerCentered } from "../wrapper";
import DeckList from "../decklist";
import NotFound from "../notfound";
import Slider, { SliderPosition } from "../slider";
import db from "../../shared/database";
import {
  PACK_SIZES,
  DRAFT_RANKS,
  DRAFT_RANKS_LOLA
} from "../../shared/constants";
import Deck from "../../shared/deck";
import { InternalDraftv2 } from "../../types/draft";
import useHoverCard from "../../hooks/useHoverCard";
import useRequest from "../../hooks/useRequest";
import urlDecode from "../../shared/urlDecode";
import Section from "../Section";
import { getCardImage } from "../../shared/utils/getCardArtCrop";
import { getRankColorClass } from "../../shared/utils/getRankColorClass";

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
  const { grpId, pick, size } = props;
  const [hoverIn, hoverOut] = useHoverCard(grpId);

  const card = db.card(grpId);

  const makeStyle = useCallback(() => {
    return {
      width: size + "px",
      height: size / 0.71808510638 + "px",
      backgroundImage: `url(${getCardImage(grpId, "normal")})`
    };
  }, [grpId, size]);

  const RANK_SOURCE = card?.source == 0 ? DRAFT_RANKS : DRAFT_RANKS_LOLA;
  return (
    <div className={css.draftCardCont}>
      <div
        style={makeStyle()}
        onMouseEnter={hoverIn}
        onMouseLeave={hoverOut}
        className={`${css.draftCard} + ${pick ? css.draftCardPicked : ""}`}
      />
      <div
        className={`${css.draftCardRank} ${getRankColorClass(
          RANK_SOURCE[card ? card.rank : 0]
        )}`}
      >
        {card ? RANK_SOURCE[card.rank] : "-"}
      </div>
    </div>
  );
}

function DraftView(): JSX.Element {
  const draftMatch = useRouteMatch<{ draftId: string }>("/draft/:draftId");
  const [draft, setDraft] = React.useState<InternalDraftv2 | null>(null);
  const [error, setError] = React.useState<any>(null);
  const [pickpack, setPickPack] = React.useState({ pick: 0, pack: 0 });
  const set = draft?.draftSet || "";
  const maxPosition = (PACK_SIZES[set] ?? DEFAULT_PACK_SIZE) * 3 - 1;
  const cardSize = 160;

  const { response, status, start } = useRequest(
    `https://mtgatool.com/api/get_draft.php?id=${draftMatch?.params.draftId}`
  );

  useEffect(() => {
    if (draftMatch && status == null) {
      start();
    } else if (response && draft == null) {
      const draftData = JSON.parse(urlDecode(response));
      if (draftData.error) {
        setError(draftData);
      }
      console.log(draftData);
      setDraft(draftData);
    }
  }, [draftMatch, draft, response, start, status]);

  const downHandler = React.useCallback(
    (event: KeyboardEvent): void => {
      const key = event.key;
      let position = positionFromPickPack(pickpack, draft?.draftSet || "");
      if (key === "ArrowLeft") {
        position -= 1;
      } else if (key === "ArrowRight") {
        position += 1;
      }
      if (position < 0) {
        position = maxPosition;
      } else if (position > maxPosition) {
        position = 0;
      }
      setPickPack(pickPackFromPosition(position, draft?.draftSet || ""));
    },
    [maxPosition, pickpack, draft?.draftSet]
  );

  React.useEffect(() => {
    window.addEventListener("keydown", downHandler);
    return (): void => {
      window.removeEventListener("keydown", downHandler);
    };
  }, [downHandler]);

  const onSliderChange = useCallback(
    (value: number) => {
      setPickPack(pickPackFromPosition(value, draft?.draftSet || ""));
    },
    [draft?.draftSet]
  );

  const getCurrentPick = useCallback((): { pack: number[]; pick: number } => {
    if (draft) {
      const pack = draft?.packs[pickpack.pack][pickpack.pick];
      const pick = draft?.picks[pickpack.pack][pickpack.pick];
      if (pack && pick) {
        return { pack, pick };
      }
    }
    return { pick: 0, pack: [] as number[] };
  }, [draft, pickpack.pack, pickpack.pick]);

  const getCurrentDeck = useCallback((): Deck => {
    const pos = positionFromPickPack(pickpack, draft?.draftSet || "");
    const list = draft?.pickedCards.slice(0, pos + 1) || [];
    const decklist = new Deck({}, list);
    decklist.getMainboard().removeDuplicates();
    return decklist;
  }, [draft, pickpack]);

  const sliderPositions = Array(maxPosition + 1).fill(new SliderPosition());
  sliderPositions[
    positionFromPickPack({ pick: 0, pack: 0 }, draft?.draftSet || "")
  ] = new SliderPosition("Pack 1");
  sliderPositions[
    positionFromPickPack({ pick: 0, pack: 1 }, draft?.draftSet || "")
  ] = new SliderPosition("Pack 2");
  sliderPositions[
    positionFromPickPack({ pick: 0, pack: 2 }, draft?.draftSet || "")
  ] = new SliderPosition("Pack 3");

  const draftSetName =
    Object.keys(db.sets).filter(
      name => db.sets[name].arenacode == draft?.draftSet
    )[0] || "";
  /*
  const draftSet = db.sets[draftSetName];
  const cardTile = db.card(draftSet.tile);
  */
  return (
    <>
      {draft && error ? (
        <NotFound />
      ) : draft ? (
        <WrapperOuter style={{ minHeight: "calc(100vh - 5px)" }}>
          <WrapperInnerCentered>
            <div className={css.draftViewGrid}>
              <Section
                style={{
                  marginTop: "6em",
                  gridArea: "controls",
                  flexDirection: "column",
                  padding: "0 32px 16px 32px"
                }}
              >
                <TopTitle
                  title={draftSetName + " draft by " + draft.owner.slice(0, -6)}
                  subtitle={`Pack ${pickpack.pack + 1}, Pick ${pickpack.pick +
                    1}`}
                />
                <Slider
                  containerStyle={{ marginBottom: "22px" }}
                  value={positionFromPickPack(pickpack, draft.draftSet)}
                  onChange={onSliderChange}
                  max={maxPosition}
                  positions={sliderPositions}
                />
              </Section>
              <Section
                style={{
                  gridArea: "draft",
                  flexDirection: "column",
                  padding: "16px"
                }}
              >
                <div
                  className={css.draftView}
                  style={{
                    gridTemplateColumns: `repeat(auto-fit, minmax(${cardSize +
                      12}px, 1fr))`
                  }}
                >
                  {getCurrentPick()
                    .pack.reverse()
                    .map((grpId: number, index: number) => {
                      return (
                        <DraftCard
                          pick={getCurrentPick().pick == grpId}
                          key={
                            pickpack.pack + "-" + pickpack.pick + "-" + index
                          }
                          size={cardSize}
                          grpId={grpId}
                        />
                      );
                    })}
                </div>
              </Section>
              <Section
                style={{
                  gridArea: "deck",
                  flexDirection: "column",
                  padding: "16px"
                }}
              >
                <DeckList deck={getCurrentDeck()} />
              </Section>
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
