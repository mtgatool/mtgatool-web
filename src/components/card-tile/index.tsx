/* eslint-disable no-else-return */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React, { useCallback } from "react";
import css from "./cardtile.css";
import db from "../../shared/database";
import { useWebDispatch } from "../../web-provider";
import {
  COLORS_ALL,
  FACE_SPLIT_FULL,
  FACE_ADVENTURE_MAIN
} from "../../shared/constants";
import { DbCardData } from "../../types/Metadata";

function openScryfallCard(card: DbCardData): void {
  console.log("open " + card.name);
}

export function getCardArtCrop(cardObj: DbCardData): string {
  try {
    return "https://img.scryfall.com/cards" + cardObj.images.art_crop;
  } catch (e) {
    console.log("Cant find card art crop: ", cardObj);
    return "../images/notfound.png";
  }
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

function CostSymbols(props: {
  card: DbCardData;
  dfcCard?: DbCardData;
}): JSX.Element {
  const { card, dfcCard } = props;
  if (!card) return <></>;
  const costSymbols: JSX.Element[] = [];
  let prevc = true;
  const hasSplitCost = card.dfc === FACE_SPLIT_FULL;
  if (card.cost) {
    card.cost.forEach((cost, index) => {
      if (hasSplitCost) {
        if (/^(x|\d)+$/.test(cost) && prevc === false) {
          costSymbols.push(
            <span key={card.id + "_cost_separator"}>{"//"}</span>
          );
        }
        prevc = /^\d+$/.test(cost);
      }
      costSymbols.push(
        <div
          key={card.id + "_" + index}
          className={"mana_s16 flex_end mana_" + cost}
        />
      );
    });
  }
  if (card.dfc === FACE_ADVENTURE_MAIN && dfcCard && dfcCard.cost) {
    costSymbols.push(<span key={dfcCard.id + "_cost_separator"}>{"//"}</span>);
    dfcCard.cost.forEach((cost, index) => {
      costSymbols.push(
        <div
          key={dfcCard.id + "_" + index}
          className={"mana_s16 flex_end mana_" + cost}
        />
      );
    });
  }
  return <>{costSymbols}</>;
}

function CardQuantityDisplay(props: { quantity: number }): JSX.Element {
  const { quantity } = props;
  return <div className="card_tile_quantity_flat">{quantity}</div>;
}

interface CardTileProps {
  grpId: number;
  quantity: number;
}

export default function CardTile(props: CardTileProps): JSX.Element {
  const { grpId, quantity } = props;
  const [isMouseHovering, setMouseHovering] = React.useState(false);
  const [card, setCard] = React.useState<DbCardData | undefined>(undefined);
  const [dfcCard, setdfcCard] = React.useState<DbCardData | undefined>(
    undefined
  );
  const webDispatch = useWebDispatch();

  const setHoverCard = useCallback(
    (grpId): void => {
      webDispatch({ type: "setHoverCard", HoverGrpId: grpId });
    },
    [webDispatch]
  );

  const setHoverOpacity = useCallback(
    (opacity): void => {
      webDispatch({ type: "setHoverOpacity", HoverOpacity: opacity });
    },
    [webDispatch]
  );

  const handleMouseEnter = React.useCallback(() => {
    setMouseHovering(true);
    setHoverCard(grpId);
    setHoverOpacity(1);
  }, [grpId, setMouseHovering, setHoverCard, setHoverOpacity]);

  const handleMouseLeave = React.useCallback(() => {
    setMouseHovering(false);
    setHoverOpacity(0);
  }, [setMouseHovering, setHoverOpacity]);

  const handleMouseClick = React.useCallback(() => {
    let cardOpen = card;
    if (card?.dfc === FACE_SPLIT_FULL) {
      cardOpen = dfcCard || card;
    }
    if (cardOpen) {
      openScryfallCard(cardOpen);
    }
  }, [card, dfcCard]);

  React.useEffect(() => {
    if (!card) {
      //console.log("get card: " + grpId);
      const cardObj = db.card(grpId);
      if (cardObj) {
        setCard(cardObj);
        if (cardObj.dfcId) {
          const dfcObj = db.card(cardObj.dfcId);
          if (dfcObj) {
            setdfcCard(dfcObj);
          }
        }
      }
    }
  }, [card, grpId, setCard, setdfcCard]);

  const getCardTileStyle = (): React.CSSProperties => {
    const cardTileStyle = { backgroundImage: "", borderImage: "" };
    if (card) {
      try {
        if (card.type === "Special") {
          cardTileStyle.backgroundImage = `url(${card.images["art-crop"]})`;
        } else {
          cardTileStyle.backgroundImage = `url(${getCardArtCrop(card)})`;
        }
      } catch (e) {
        console.log(e);
      }

      let colorA = "c";
      let colorB = "c";
      if (card.frame) {
        if (card.frame.length === 1) {
          colorA = COLORS_ALL[card.frame[0] - 1];
          colorB = COLORS_ALL[card.frame[0] - 1];
        } else if (card.frame.length === 2) {
          colorA = COLORS_ALL[card.frame[0] - 1];
          colorB = COLORS_ALL[card.frame[1] - 1];
        } else if (card.frame.length > 2) {
          colorA = "m";
          colorB = "m";
        }
      }
      try {
        cardTileStyle.borderImage = `linear-gradient(to bottom, var(--color-${colorA}) 30%, var(--color-${colorB}) 70%) 1 100%`;
      } catch (e) {
        console.log(e);
      }
    }

    return cardTileStyle;
  };

  const getTileStyle = (): React.CSSProperties => {
    const tileStyle = { backgroundColor: "rgba(0, 0, 0, 0.75)" };
    if (isMouseHovering) {
      try {
        tileStyle.backgroundColor = "rgba(65, 50, 40, 0.75)";
      } catch (e) {
        console.log(e);
      }
    }
    return tileStyle;
  };

  return (
    <div
      className="card_tile_container_flat click-on"
      data-grp-id={grpId}
      data-quantity={quantity}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleMouseClick}
      style={getTileStyle()}
      role="link"
    >
      <CardQuantityDisplay quantity={quantity} />
      <div className="card_tile_crop_flat" style={getCardTileStyle()} />
      <div className="card_tile_name_flat">{card ? card.name : "Unknown"}</div>
      <div className="cart_tile_mana_flat">
        {card ? <CostSymbols card={card} dfcCard={dfcCard} /> : <></>}
      </div>
    </div>
  );
}
