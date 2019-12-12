/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-else-return */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React from 'react';
import css from './cardtile.css';
import { COLORS_ALL, FACE_SPLIT_FULL, FACE_ADVENTURE_MAIN } from './constants';

function openScryfallCard() {
  //
}

export function getCardArtCrop(cardObj) {
  try {
    return 'https://img.scryfall.com/cards' + cardObj.images.art_crop;
  } catch (e) {
    console.log('Cant find card art crop: ', cardObj);
    return '../images/notfound.png';
  }
}

export function ManaCost(props) {
  const { colors } = props;
  let { newclass } = props;
  if (!newclass) newclass = css['mana-s16'];

  return (
    <>
      {colors.map((mana, index) => {
        return (
          <div
            key={mana + '_' + index}
            className={`${newclass} flex_end mana_${COLORS_ALL[mana - 1]}`}
          />
        );
      })}
    </>
  );
}

function CostSymbols(props) {
  const { card, dfcCard } = props;
  const costSymbols = [];
  let prevc = true;
  const hasSplitCost = card.dfc === FACE_SPLIT_FULL;
  if (card.cost) {
    card.cost.forEach((cost, index) => {
      if (hasSplitCost) {
        if (/^(x|\d)+$/.test(cost) && prevc === false) {
          costSymbols.push(<span key={card.id + '_cost_separator'}>{'//'}</span>);
        }
        prevc = /^\d+$/.test(cost);
      }
      costSymbols.push(
        <div
          key={card.id + '_' + index}
          className={'mana_s16 flex_end mana_' + cost}
        />,
      );
    });
  }
  if (card.dfc === FACE_ADVENTURE_MAIN && dfcCard && dfcCard.cost) {
    costSymbols.push(<span key={dfcCard.id + '_cost_separator'}>{'//'}</span>);
    dfcCard.cost.forEach((cost, index) => {
      costSymbols.push(
        <div
          key={dfcCard.id + '_' + index}
          className={'mana_s16 flex_end mana_' + cost}
        />,
      );
    });
  }
  return <>{costSymbols}</>;
}

function FlatQuantityDisplay(props) {
  const { quantity } = props;
  if (typeof quantity === 'object') {
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

function FlatCardTile(props) {
  const { card, dfcCard, indent, quantity, setHoverCardCallback } = props;
  const [isMouseHovering, setMouseHovering] = React.useState(false);

  const handleMouseEnter = React.useCallback(() => {
    setMouseHovering(true);
    setHoverCardCallback(card);
  }, [setHoverCardCallback]);
  const handleMouseLeave = React.useCallback(() => {
    setMouseHovering(false);
    setHoverCardCallback();
  }, [setHoverCardCallback]);
  const handleMouseClick = React.useCallback(() => {
    let cardOpen = card;
    if (card.dfc === FACE_SPLIT_FULL) {
      cardOpen = dfcCard || card;
    }
    openScryfallCard(cardOpen);
  }, [card]);

  React.useEffect(() => {
    if (setHoverCardCallback) {
      // etHoverCardCallback();
    }
  }, [card, setHoverCardCallback]);

  const cardTileStyle = { backgroundImage: '', borderImage: '' };
  try {
    if (card.type === 'Special') {
      cardTileStyle.backgroundImage = `url(${card.images['art-crop']})`;
    } else {
      cardTileStyle.backgroundImage = `url(${getCardArtCrop(card)})`;
    }
  } catch (e) {
    console.log(e);
  }

  let colorA = 'c';
  let colorB = 'c';
  if (card.frame) {
    if (card.frame.length === 1) {
      colorA = COLORS_ALL[card.frame[0] - 1];
      colorB = COLORS_ALL[card.frame[0] - 1];
    } else if (card.frame.length === 2) {
      colorA = COLORS_ALL[card.frame[0] - 1];
      colorB = COLORS_ALL[card.frame[1] - 1];
    } else if (card.frame.length > 2) {
      colorA = 'm';
      colorB = 'm';
    }
  }
  cardTileStyle.borderImage = `linear-gradient(to bottom, var(--color-${colorA}) 30%, var(--color-${colorB}) 70%) 1 100%`;

  const tileStyle = { backgroundColor: 'rgba(0, 0, 0, 0.75)' };
  if (isMouseHovering) {
    tileStyle.backgroundColor = 'rgba(65, 50, 40, 0.75)';
  }

  return (
    <div
      className="card_tile_container_flat click-on"
      data-grp-id={card.id}
      data-quantity={quantity}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleMouseClick}
      style={tileStyle}
      data-id={indent}
      tabIndex={indent}
      role="link"
    >
      <FlatQuantityDisplay quantity={quantity} />
      <div className="card_tile_crop_flat" style={cardTileStyle} />
      <div className="card_tile_name_flat">{card.name || 'Unknown'}</div>
      <div className="cart_tile_mana_flat">
        <CostSymbols card={card} dfcCard={dfcCard} />
      </div>
    </div>
  );
}

export default function CardTile(props) {
  const { card, quantity } = props;
  if (!card || quantity === 0) {
    return <></>;
  }
  return FlatCardTile(props);
}
