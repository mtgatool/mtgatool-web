/* eslint-disable react/prop-types */
import React from 'react';
import css from './cardhover.css';
import db from '../../shared/database';
import NotFound from '../../cssimages/notfound.png';
import { useWebContext } from '../../web-provider';

function CardHover() {
  const webContext = useWebContext();

  const getStyle = (ctx) => {
    const cardObj = db.card(ctx.HoverGrpId);

    let newImg;
    try {
      newImg = `url(https://img.scryfall.com/cards${cardObj.images.normal}`;
    } catch (e) {
      newImg = `url(${NotFound})`;
    }
    return {
      opacity: ctx.HoverOpacity,
      backgroundImage: newImg
    }
  }

  return (
    <div style={getStyle(webContext)} className={css['card-hover-main']} />
  );
}

export default CardHover;
