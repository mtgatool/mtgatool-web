/* eslint-disable react/prop-types */
import _ from "lodash";
import React from "react";
import { database as db, cardType, Deck, DbCardData } from "mtgatool-shared";

import CardTile from "../card-tile";
import Separator from "./Separator";

function getDeckComponents(deck: Deck): JSX.Element[] {
  const components: JSX.Element[] = [];
  const comp = deck.getCompanion();
  if (comp) {
    const companionGrpId = comp;
    components.push(<Separator key="sep_commander">Companion</Separator>);
    const cardObj = db.card(companionGrpId || 0);
    if (cardObj) {
      components.push(
        <CardTile
          indent="a"
          isHighlighted={false}
          isSideboard={false}
          deck={deck}
          card={cardObj}
          key={"companioncardtile-" + companionGrpId}
          quantity={1}
        />
      );
    }
  }

  if (deck.getCommanders() && deck.getCommanders().length > 0) {
    components.push(<Separator key="sep_commander">Commander</Separator>);

    deck.getCommanders().forEach((id: number, index: number) => {
      if (index % 2 == 0) {
        const card = db.card(id);
        if (card) {
          components.push(
            <CardTile
              indent="a"
              isHighlighted={false}
              isSideboard={false}
              deck={deck}
              card={card}
              key={"commandercardtile" + index + "_" + id}
              quantity={1}
            />
          );
        }
      }
    });
  }

  // draw maindeck grouped by cardType
  const cardsByGroup = _(deck.getMainboard().get())
    .map(card => ({ data: db.card(card.id), ...card }))
    .filter(card => card.data !== undefined)
    .groupBy(card => {
      const type = cardType(card.data as DbCardData);
      switch (type) {
        case "Creature":
          return "Creatures";
        case "Planeswalker":
          return "Planeswalkers";
        case "Instant":
        case "Sorcery":
          return "Spells";
        case "Enchantment":
          return "Enchantments";
        case "Artifact":
          return "Artifacts";
        case "Land":
        case "Basic Land":
          return "Lands";
        default:
          throw new Error(`Unexpected card type: ${type}`);
      }
    })
    .value();

  _([
    "Creatures",
    "Planeswalkers",
    "Spells",
    "Enchantments",
    "Artifacts",
    "Lands"
  ])
    .filter(group => !_.isEmpty(cardsByGroup[group]))
    .forEach(group => {
      // draw a separator for the group
      const cards = cardsByGroup[group];
      const count = _.sumBy(cards, "quantity");
      components.push(
        <Separator key={"sepm_" + group}>{`${group} (${count})`}</Separator>
      );

      // draw the cards
      _(cards)
        .filter(card => card.quantity > 0)
        .orderBy(["data.cmc", "data.name"])
        .forEach((card, index) => {
          components.push(
            <CardTile
              indent="b"
              isHighlighted={false}
              isSideboard={false}
              deck={deck}
              card={card.data as DbCardData}
              key={"mainboardcardtile" + index + "_" + card.id}
              quantity={card.quantity}
            />
          );
        });
    });

  let sideboardSize = _.sumBy(deck.getSideboard().get(), "quantity");
  if (sideboardSize) {
    // draw a separator for the sideboard
    components.push(
      <Separator key="sep_side">{`Sideboard (${sideboardSize})`}</Separator>
    );

    const comp = deck.getCompanion();
    if (comp) {
      sideboardSize -= 1;
      deck.getSideboard().remove(comp);
    }

    // draw the cards
    _(deck.getSideboard().get())
      .map(card => ({ data: db.card(card.id), ...card }))
      .filter(card => card.quantity > 0)
      .orderBy(["data.cmc", "data.name"])
      .forEach((card, index) => {
        components.push(
          <CardTile
            indent="a"
            isHighlighted={false}
            isSideboard={true}
            deck={deck}
            card={card.data as DbCardData}
            key={"sideboardcardtile" + index + "_" + card.id}
            quantity={card.quantity}
          />
        );
      });
  }

  return components;
}

interface DeckListProps {
  deck: Deck;
}

export default function DeckList(props: DeckListProps): JSX.Element {
  const { deck } = props;
  if (!deck || db.version == 0) return <></>;
  return <>{getDeckComponents(deck)}</>;
}
