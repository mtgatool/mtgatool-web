import _ from "lodash";
import React from "react";
import getCard from "../../shared/getCard";
import { cardType } from "../../shared/cardTypes";
import css from "./decklist.css";

import CardTile from "../card-tile";

function compareQuantity(a, b) {
  if (b.quantity - a.quantity < 0) return -1;
  if (b.quantity - a.quantity > 0) return 1;
  return 0;
}

function Separator(props) {
  const { children } = props;
  return <div className={css["card-tile-separator"]}>{children}</div>;
}

function getDeckComponents(deck, setHoverCardCallback) {
  const components = [];
  if (deck.commandZoneGRPIds && deck.commandZoneGRPIds.length > 0) {
    //
    components.push(<Separator key="sep_commander">Commander</Separator>);

    deck.commandZoneGRPIds.forEach((id, index) => {
      if (index % 2 == 0) {
        let fullCard = getCard(id) || undefined;
        let dfcCard =
          fullCard && fullCard.dfcId ? getCard(fullCard.dfcId) : undefined;
        components.push(
          <CardTile
            card={fullCard}
            dfcCard={dfcCard}
            key={"commandercardtile" + index + "_" + card.id}
            indent="a"
            quantity={1}
            setHoverCardCallback={setHoverCardCallback}
          />
        );
      }
    });
  }

  // draw maindeck grouped by cardType
  const cardsByGroup = _(deck.mainDeck)
    .map(card => ({ data: getCard(card.id), ...card }))
    .filter(card => card.data.type)
    .groupBy(card => {
      const type = cardType(card.data);
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
      components.push(<Separator key={'sepm_'+group}>{`${group} (${count})`}</Separator>);

      // draw the cards
      _(cards)
        .filter(card => card.quantity > 0)
        .orderBy(["data.cmc", "data.name"])
        .forEach((card, index) => {
          let fullCard = getCard(card.id) || undefined;
          let dfcCard =
            fullCard && fullCard.dfcId ? getCard(fullCard.dfcId) : undefined;
          components.push(
            <CardTile
              card={fullCard}
              dfcCard={dfcCard}
              key={"mainboardcardtile" + index + "_" + card.id}
              indent="a"
              quantity={card.quantity}
              setHoverCardCallback={setHoverCardCallback}
            />
          );
        });
    });

  const sideboardSize = _.sumBy(deck.sideboard, "quantity");
  if (sideboardSize) {
    // draw a separator for the sideboard
    components.push(<Separator key="sep_side">{`Sideboard (${sideboardSize})`}</Separator>);

    // draw the cards
    _(deck.sideboard)
      .filter(card => card.quantity > 0)
      .map(card => ({ data: getCard(card.id), ...card }))
      .orderBy(["data.cmc", "data.name"])
      .forEach((card, index) => {
        let fullCard = getCard(card.id) || undefined;
        let dfcCard =
          fullCard && fullCard.dfcId ? getCard(fullCard.dfcId) : undefined;
        components.push(
          <CardTile
            card={fullCard}
            dfcCard={dfcCard}
            key={"sideboardcardtile" + index + "_" + card.id}
            indent="a"
            quantity={card.quantity}
            setHoverCardCallback={setHoverCardCallback}
          />
        );
      });
  }

  return components;
}

export default function DeckList(props) {
  const { deck, setHoverCardCallback = () => {} } = props;
  if (!deck) return <></>;

  const renderComponents = getDeckComponents(deck.getSave(), setHoverCardCallback);
  return <div className="decklist">{renderComponents}</div>;
  /*
  mainCards.get().sort(sortFunc);
  mainCards.get().forEach((card, index) => {
    const quantity = card.quantity;
    let fullCard = card;
    if (card && card.id) {
      fullCard = getCard(card.id);
    }
    let dfcCard;
    if (card && card.dfcId) {
      dfcCard = getCard(card.dfcId) || undefined;
    }

    mainCardTiles.push(
      <CardTile
        card={fullCard}
        dfcCard={dfcCard}
        key={"maincardtile_" + card.id}
        indent="a"
        quantity={quantity}
        setHoverCardCallback={setHoverCardCallback}
      />
    );
  });

  const sideboardCardTiles = [];
  if (deckClone.getSideboard().count() > 0) {
    const sideCards = deckClone.getSideboard();
    sideCards.removeDuplicates();
    sideCards.get().sort(sortFunc);
    sideCards.get().forEach((card, index) => {
      const quantity = card.quantity;
      let fullCard = card;
      if (card && card.id) {
        fullCard = getCard(card.id) || undefined;
      }
      let dfcCard;
      if (card && card.dfcId) {
        dfcCard = getCard(card.dfcId) || undefined;
      }
      sideboardCardTiles.push(
        <CardTile
          card={fullCard}
          dfcCard={dfcCard}
          key={"sideboardcardtile_" + index + "_" + card.id}
          indent="a"
          quantity={quantity}
          setHoverCardCallback={setHoverCardCallback}
        />
      );
    });
  }

  return (
    <div className="overlay_decklist click-on">
      <div className="decklist_title">{subTitle}</div>
      {mainCardTiles}
      {sideboardCardTiles.length && (
        <div className="card_tile_separator">Sideboard</div>
      )}
      {sideboardCardTiles}
    </div>
  );
*/
}
