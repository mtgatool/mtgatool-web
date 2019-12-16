/* eslint-disable react/prop-types */
import * as React from "react";

import { CARD_TYPES, CARD_TYPE_CODES } from "../../shared/constants";
import db from "../../shared/database";
import css from "./decktypesstats.css";

function getDeckTypesAmount(deck) {
  const types = { art: 0, cre: 0, enc: 0, ins: 0, lan: 0, pla: 0, sor: 0 };
  if (!deck.getMainboard().get()) return types;

  deck
    .getMainboard()
    .get()
    .forEach(function(card) {
      const c = db.card(card.id);
      if (c) {
        if (c.type.includes("Land", 0)) types.lan += card.quantity;
        else if (c.type.includes("Creature", 0)) types.cre += card.quantity;
        else if (c.type.includes("Artifact", 0)) types.art += card.quantity;
        else if (c.type.includes("Enchantment", 0)) types.enc += card.quantity;
        else if (c.type.includes("Instant", 0)) types.ins += card.quantity;
        else if (c.type.includes("Sorcery", 0)) types.sor += card.quantity;
        else if (c.type.includes("Planeswalker", 0)) types.pla += card.quantity;
      }
    });

  return types;
}

export default function DeckTypesStats(props) {
  const { deck } = props;
  const cardTypes = getDeckTypesAmount(deck);
  return (
    <div className={css["types-container"]}>
      {CARD_TYPE_CODES.map((cardTypeKey, index) => {
        return (
          <div
            className={css["type-icon-cont"]}
            key={"type-icon-cont-" + index}
          >
            <div
              className={"type-icon type-" + cardTypeKey}
              title={CARD_TYPES[index]}
            />
            <span>{cardTypes[cardTypeKey]}</span>
          </div>
        );
      })}
    </div>
  );
}
