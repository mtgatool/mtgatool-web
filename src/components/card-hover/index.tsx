/* eslint-disable react/prop-types */
import React from "react";
import css from "./cardhover.css";
import db from "../../shared/database";
import NotFound from "../../cssimages/notfound.png";
import { useWebContext } from "../../web-provider";
import { FACE_DFC_BACK, FACE_DFC_FRONT } from "../../shared/constants";

function CardHover(): JSX.Element {
  const webContext = useWebContext();

  const getStyle = (ctx): React.CSSProperties => {
    const cardObj = db.card(ctx.HoverGrpId);

    let newImg;
    try {
      newImg = `url(https://img.scryfall.com/cards${cardObj?.images.normal}`;
    } catch (e) {
      newImg = `url(${NotFound})`;
    }
    return {
      opacity: ctx.HoverOpacity,
      backgroundImage: newImg
    };
  };

  const getStyleDfc = (ctx): React.CSSProperties => {
    let cardObj = db.card(ctx.HoverGrpId);
    let newImg = `url(${NotFound})`;
    let opacity = ctx.HoverOpacity;
    if (
      cardObj &&
      (cardObj.dfc == FACE_DFC_BACK || cardObj.dfc == FACE_DFC_FRONT) &&
      cardObj.dfcId
    ) {
      cardObj = db.card(cardObj.dfcId);
      try {
        newImg = `url(https://img.scryfall.com/cards${cardObj?.images.normal}`;
      } catch (e) {
        newImg = `url(${NotFound})`;
      }
    } else {
      opacity = 0;
    }

    return {
      opacity: opacity,
      backgroundImage: newImg
    };
  };

  return (
    <>
      <div style={getStyleDfc(webContext)} className={css["card-hover-dfc"]} />
      <div style={getStyle(webContext)} className={css["card-hover-main"]} />
    </>
  );
}

export default CardHover;
