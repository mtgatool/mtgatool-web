/* eslint-disable react/prop-types */
import React, { useCallback } from "react";
import css from "./cardhover.css";
import { database as db, constants } from "mtgatool-shared";
import NotFound from "../../assets/cssimages/notfound.png";
import { useSelector } from "react-redux";
import { AppState } from "../../redux/stores/webStore";
const { FACE_DFC_BACK, FACE_DFC_FRONT } = constants;

function CardHover(): JSX.Element {
  const hoverState = useSelector((state: AppState) => state.hover);

  const getStyle = useCallback((): React.CSSProperties => {
    const cardObj = db.card(hoverState.grpId);

    let newImg;
    try {
      newImg = `url(https://img.scryfall.com/cards${cardObj?.images.normal}`;
    } catch (e) {
      newImg = `url(${NotFound})`;
    }
    return {
      opacity: hoverState.opacity,
      backgroundImage: newImg
    };
  }, [hoverState]);

  const getStyleDfc = useCallback((): React.CSSProperties => {
    let cardObj = db.card(hoverState.grpId);
    let newImg = `url(${NotFound})`;
    let opacity = hoverState.opacity;
    if (
      cardObj &&
      (cardObj.dfc == FACE_DFC_BACK || cardObj.dfc == FACE_DFC_FRONT) &&
      cardObj.dfcId &&
      cardObj.dfcId !== true
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
  }, [hoverState]);

  return (
    <>
      <div style={getStyleDfc()} className={css["card-hover-dfc"]} />
      <div style={getStyle()} className={css["card-hover-main"]} />
    </>
  );
}

export default CardHover;
