import React, { useCallback, useState, CSSProperties } from "react";
import { Deck, constants } from "mtgatool-shared";
const {
  COLORS_ALL,
  FACE_SPLIT_FULL,
  FACE_ADVENTURE_MAIN,
  LANDS_HACK
} = constants;
import css from "./cardtile.css";

import typeLand from "../../assets/cssimages/type_land.png";
import useHoverCard from "../../hooks/useHoverCard";
import { DbCardData } from "mtgatool-shared/dist/types/metadata";

const mana: Record<string, string> = {};
mana["w"] = css.mana_w;
mana["u"] = css.mana_u;
mana["b"] = css.mana_b;
mana["r"] = css.mana_r;
mana["g"] = css.mana_g;
mana["c"] = css.mana_c;
mana["wu"] = css.mana_wu;
mana["wb"] = css.mana_wb;
mana["ur"] = css.mana_ur;
mana["ub"] = css.mana_ub;
mana["br"] = css.mana_br;
mana["bg"] = css.mana_bg;
mana["gw"] = css.mana_gw;
mana["gu"] = css.mana_gu;
mana["rw"] = css.mana_rw;
mana["rg"] = css.mana_rg;
mana["x"] = css.mana_x;
mana["0"] = css.mana_0;
mana["1"] = css.mana_1;
mana["2"] = css.mana_2;
mana["3"] = css.mana_3;
mana["4"] = css.mana_4;
mana["5"] = css.mana_5;
mana["6"] = css.mana_6;
mana["7"] = css.mana_7;
mana["8"] = css.mana_8;
mana["9"] = css.mana_9;
mana["10"] = css.mana_10;
mana["11"] = css.mana_11;
mana["12"] = css.mana_12;
mana["13"] = css.mana_13;
mana["14"] = css.mana_14;
mana["15"] = css.mana_15;
mana["16"] = css.mana_16;
mana["17"] = css.mana_17;
mana["18"] = css.mana_18;
mana["19"] = css.mana_19;
mana["20"] = css.mana_20;

function openScryfallCard(card: DbCardData): void {
  console.log("open " + card.name);
}

export function getCardArtCrop(cardObj: DbCardData): string {
  try {
    return "https://img.scryfall.com/cards" + cardObj.images.art_crop;
  } catch (e) {
    console.log("Cant find card art crop: ", cardObj);
    return "../assets/images/notfound.png";
  }
}

export type CardTileQuantity =
  | { quantity: number; odds: string }
  | number
  | string;

interface CardTileProps {
  card: DbCardData;
  deck?: Deck;
  dfcCard?: DbCardData;
  indent: string;
  isHighlighted: boolean;
  isSideboard: boolean;
  quantity: CardTileQuantity;
}

function CostSymbols(props: {
  card: DbCardData;
  dfcCard?: DbCardData;
}): JSX.Element {
  const { card, dfcCard } = props;
  const costSymbols: JSX.Element[] = [];
  let prevc = true;
  const hasSplitCost = card.dfc === FACE_SPLIT_FULL;
  if (card.cost) {
    card.cost.forEach((cost: string, index: number) => {
      if (hasSplitCost) {
        if (/^(x|\d)+$/.test(cost) && prevc === false) {
          costSymbols.push(
            <span key={card.id + "_cost_separator"}>{`//`}</span>
          );
        }
        prevc = /^\d+$/.test(cost);
      }
      costSymbols.push(
        <div
          style={{
            justifyContent: "flex-end"
          }}
          key={card.id + "_" + index}
          className={`${css.manaS16} ${mana[cost]}`}
        />
      );
    });
  }
  if (card.dfc === FACE_ADVENTURE_MAIN && dfcCard && dfcCard.cost) {
    costSymbols.push(<span key={dfcCard.id + "_cost_separator"}>{`//`}</span>);
    dfcCard.cost.forEach((cost: string, index: number) => {
      costSymbols.push(
        <div
          style={{
            justifyContent: "flex-end"
          }}
          key={dfcCard.id + "_" + index}
          className={`${css.manaS16} ${mana[cost]}`}
        />
      );
    });
  }
  return <>{costSymbols}</>;
}

function CardQuantityDisplay(props: {
  quantity: CardTileQuantity;
}): JSX.Element {
  const { quantity } = props;
  if (typeof quantity === "object") {
    // Mixed quantity (odds and quantity)
    return (
      <div className={css.card_tile_odds_flat}>
        <div className={css.card_tile_odds_flat_half}>{quantity.quantity}</div>
        <div className={css.card_tile_odds_flat_half_dark}>{quantity.odds}</div>
      </div>
    );
  } else if (quantity === 9999) {
    // Undefined Quantity
    return <div className={css.card_tile_quantity_flat}>1</div>;
  } else {
    // Normal Quantity
    return <div className={css.card_tile_quantity_flat}>{quantity}</div>;
  }
}

export default function CardTile(props: CardTileProps): JSX.Element {
  const { card, dfcCard, indent, isHighlighted, quantity } = props;
  const [isMouseHovering, setMouseHovering] = useState(false);
  const [hoverIn, hoverOut] = useHoverCard(card.id);

  const handleMouseEnter = useCallback((): void => {
    setMouseHovering(true);
    hoverIn();
  }, [hoverIn]);
  const handleMouseLeave = useCallback((): void => {
    setMouseHovering(false);
    hoverOut();
  }, [hoverOut]);

  const handleMouseClick = useCallback((): void => {
    let _card = card;
    if (card.dfc === FACE_SPLIT_FULL) {
      _card = dfcCard || card;
    }
    openScryfallCard(_card);
  }, [card, dfcCard]);

  const cardTileStyle = { backgroundImage: "", borderImage: "" };
  try {
    if (card.type == "Special") {
      cardTileStyle.backgroundImage = `url(${card.images["art_crop"]})`;
    } else {
      cardTileStyle.backgroundImage = `url(${getCardArtCrop(card)})`;
    }
  } catch (e) {
    console.log(e);
  }

  let colorA = "c";
  let colorB = "c";
  if (card.frame) {
    if (card.frame.length == 1) {
      colorA = COLORS_ALL[card.frame[0] - 1];
      colorB = COLORS_ALL[card.frame[0] - 1];
    } else if (card.frame.length == 2) {
      colorA = COLORS_ALL[card.frame[0] - 1];
      colorB = COLORS_ALL[card.frame[1] - 1];
    } else if (card.frame.length > 2) {
      colorA = "m";
      colorB = "m";
    }
  }
  cardTileStyle.borderImage = `linear-gradient(to bottom, var(--color-${colorA}) 30%, var(--color-${colorB}) 70%) 1 100%`;

  const tileStyle: CSSProperties = {
    backgroundColor: "var(--color-card-tile)"
  };
  if (isHighlighted) {
    tileStyle.backgroundColor = "var(--color-card-tile-active)";
  } else if (isMouseHovering) {
    tileStyle.backgroundColor = "var(--color-card-tile-hover)";
  }

  const phyrexianName = `|Ceghm.`; // Swamp
  const isPhyrexian = card.id == 72578;

  return (
    <div className={css.card_tile_container_outer}>
      <div
        className={`${css.card_tile_container_flat}`}
        data-grp-id={card.id}
        data-id={indent}
        data-quantity={quantity}
        style={tileStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleMouseClick}
      >
        <CardQuantityDisplay quantity={quantity} />
        <div className={css.card_tile_crop_flat} style={cardTileStyle} />
        <div
          className={css.card_tile_name_flat}
          style={isPhyrexian ? { fontFamily: "PhyrexianHorizontal" } : {}}
        >
          {isPhyrexian ? phyrexianName : card.name || "Unknown"}
        </div>
        <div className={css.cart_tile_mana_flat}>
          <CostSymbols card={card} dfcCard={dfcCard} />
        </div>
      </div>
    </div>
  );
}

interface LandsTileProps {
  quantity: CardTileQuantity;
  isHighlighted?: boolean;
  frame: number[];
}

export function LandsTile(props: LandsTileProps): JSX.Element {
  const { quantity, frame, isHighlighted } = props;
  const [isMouseHovering, setMouseHovering] = useState(false);
  const [hoverIn, hoverOut] = useHoverCard(LANDS_HACK);

  const handleMouseEnter = useCallback((): void => {
    setMouseHovering(true);
    hoverIn();
  }, [hoverIn]);
  const handleMouseLeave = useCallback((): void => {
    setMouseHovering(false);
    hoverOut();
  }, [hoverOut]);

  const cardTileStyle = {
    backgroundImage: `url(${typeLand})`,
    borderImage: ""
  };

  let colorA = "c";
  let colorB = "c";

  if (frame.length == 1) {
    colorA = COLORS_ALL[frame[0] - 1];
    colorB = COLORS_ALL[frame[0] - 1];
  } else if (frame.length == 2) {
    colorA = COLORS_ALL[frame[0] - 1];
    colorB = COLORS_ALL[frame[1] - 1];
  } else if (frame.length > 2) {
    colorA = "m";
    colorB = "m";
  }

  cardTileStyle.borderImage = `linear-gradient(to bottom, var(--color-${colorA}) 30%, var(--color-${colorB}) 70%) 1 100%`;

  const tileStyle = { backgroundColor: "var(--color-card-tile)" };
  if (isHighlighted) {
    tileStyle.backgroundColor = "var(--color-card-tile-active)";
  } else if (isMouseHovering) {
    tileStyle.backgroundColor = "var(--color-card-tile-hover)";
  }

  return (
    <div className={css.card_tile_container_outer}>
      <div
        className={`${css.card_tile_container_flat}`}
        data-quantity={quantity}
        style={tileStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <CardQuantityDisplay quantity={quantity} />
        <div className={css.card_tile_crop_flat} style={cardTileStyle} />
        <div className={css.card_tile_name_flat}>Lands</div>
      </div>
    </div>
  );
}

export function ManaCost(props: {
  newclass?: string;
  colors: number[];
}): JSX.Element {
  const { colors } = props;
  let { newclass } = props;
  if (!newclass) newclass = css["mana-s16"];
  return (
    <>
      {colors.map((mana, index) => {
        return (
          <div
            key={mana + "_" + index}
            className={`${newclass} flex_end mana_${COLORS_ALL[mana - 1]}`}
          />
        );
      })}
    </>
  );
}
