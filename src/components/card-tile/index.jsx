/* eslint-disable no-else-return */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React from "react";
import css from "./cardtile.css";
import db from "../../shared/database";
import { useWebDispatch } from "../../web-provider";
import { COLORS_ALL, FACE_SPLIT_FULL, FACE_ADVENTURE_MAIN } from "./constants";

function openScryfallCard() {
  //
}

export function getCardArtCrop(cardObj) {
  try {
    return "https://img.scryfall.com/cards" + cardObj.images.art_crop;
  } catch (e) {
    console.log("Cant find card art crop: ", cardObj);
    return "../images/notfound.png";
  }
}

export function ManaCost(props) {
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

function CostSymbols(props) {
  const { card, dfcCard } = props;
  if (!card) return <></>;
  const costSymbols = [];
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

function CardQuantityDisplay(props) {
  const { quantity } = props;
  if (typeof quantity === "object") {
    // Mixed quantity (odds and quantity)
    return (
      <div className="card_tile_odds_flat">
        <div className="card_tile_odds_flat_half">{quantity.quantity}</div>
        <div className="card_tile_odds_flat_half_dark">{quantity.odds}</div>
      </div>
    );
  } else {
    return <div className="card_tile_quantity_flat">{quantity}</div>;
  }
}

export default function CardTile(props) {
  const { grpId, quantity } = props;
  const [isMouseHovering, setMouseHovering] = React.useState(false);
  const [card, setCard] = React.useState(undefined);
  const [dfcCard, setdfcCard] = React.useState(undefined);
  const hoverDispatch = useWebDispatch(card);

  const handleMouseEnter = React.useCallback(() => {
    setMouseHovering(true);
    hoverDispatch({ type: "setHoverCard", HoverGrpId: grpId });
    hoverDispatch({ type: "setHoverOpacity", HoverOpacity: 1 });
  }, []);

  const handleMouseLeave = React.useCallback(() => {
    setMouseHovering(false);
    hoverDispatch({ type: "setHoverOpacity", HoverOpacity: 0 });
  }, []);

  const handleMouseClick = React.useCallback(() => {
    let cardOpen = card;
    if (card.dfc === FACE_SPLIT_FULL) {
      cardOpen = dfcCard || card;
    }
    openScryfallCard(cardOpen);
  }, [card]);

  React.useEffect(() => {
    if (!card) {
      //console.log("get card: " + grpId);
      const cardObj = db.card(grpId);
      if (cardObj) {
        setCard(cardObj);
        const dfcObj = db.card(cardObj.dfcId);
        if (dfcObj) {
          setdfcCard(dfcObj);
        }
      }
    }
  }, []);

  const getCardTileStyle = () => {
    let cardTileStyle = { backgroundImage: "", borderImage: "" };
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

  const getTileStyle = () => {
    let tileStyle = { backgroundColor: "rgba(0, 0, 0, 0.75)" };
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
        <CostSymbols card={card} dfcCard={dfcCard} />
      </div>
    </div>
  );
}
