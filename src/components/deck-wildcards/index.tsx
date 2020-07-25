/* eslint-disable react/prop-types */
import * as React from "react";

import { database as db, Deck, constants } from "mtgatool-shared";
const { WILDCARD_RARITIES } = constants;
import css from "./deckwildcards.css";

function getDeckWildcards(
  deck: Deck
): {
  common: number;
  uncommon: number;
  rare: number;
  mythic: number;
} {
  const rarities = { common: 0, uncommon: 0, rare: 0, mythic: 0 };
  const deckCards = [
    ...deck.getMainboard().get(),
    ...deck.getSideboard().get()
  ];

  deckCards.forEach(function(card) {
    const c = db.card(card.id);
    if (c) {
      if (c.rarity == "common") rarities.common += card.quantity;
      if (c.rarity == "uncommon") rarities.uncommon += card.quantity;
      if (c.rarity == "rare") rarities.rare += card.quantity;
      if (c.rarity == "mythic") rarities.mythic += card.quantity;
    }
  });
  return rarities;
}

interface DeckWildcardsProps {
  deck: Deck;
}

export default function DeckWildcards(props: DeckWildcardsProps): JSX.Element {
  const { deck } = props;

  const wildcards = getDeckWildcards(deck);

  return (
    <div className={css.wildcardsCost}>
      {WILDCARD_RARITIES.map(rarity => {
        return (
          <div
            className={css.wildcardIconCont}
            key={"wildcard-icon-cont-" + rarity}
          >
            <div className={"wildcards-icon wc-" + rarity} title={rarity} />
            <span>{wildcards[rarity]}</span>
          </div>
        );
      })}
    </div>
  );
}
