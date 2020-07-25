import React from "react";
import Section from "../Section";

import css from "./index.css";
import DeckList from "../decklist";
import Separator from "../decklist/Separator";
import DeckTypesStats from "../deck-types-stats";
import DeckManaCurve from "../deck-mana-curve";
import ReactSvgPieChart from "react-svg-piechart";
import WildcardsCostPreset from "../wildcards-cost-preset";

import {
  constants,
  Deck,
  getDeckColorsAmmount,
  getDeckLandsAmmount,
  getDeckRaritiesCount
} from "mtgatool-shared";
import { InternalDeck } from "mtgatool-shared/dist/types/deck";
const { MANA_COLORS } = constants;

interface DeckViewNewProps {
  deck: InternalDeck;
}

export default function DeckViewNew(props: DeckViewNewProps): JSX.Element {
  const { deck } = props;
  const deckClass = new Deck(deck);

  const colorCounts = getDeckColorsAmmount(deckClass);
  const colorsPie = [
    { title: "White", value: colorCounts.w, color: MANA_COLORS[0] },
    { title: "Blue", value: colorCounts.u, color: MANA_COLORS[1] },
    { title: "Black", value: colorCounts.b, color: MANA_COLORS[2] },
    { title: "Red", value: colorCounts.r, color: MANA_COLORS[3] },
    { title: "Green", value: colorCounts.g, color: MANA_COLORS[4] }
  ];
  const landCounts = getDeckLandsAmmount(deckClass);
  const landsPie = [
    { title: "White", value: landCounts.w, color: MANA_COLORS[0] },
    { title: "Blue", value: landCounts.u, color: MANA_COLORS[1] },
    { title: "Black", value: landCounts.b, color: MANA_COLORS[2] },
    { title: "Red", value: landCounts.r, color: MANA_COLORS[3] },
    { title: "Green", value: landCounts.g, color: MANA_COLORS[4] }
  ];

  const wildcardsCost = getDeckRaritiesCount(deckClass);

  return (
    <div className={css.regularViewGrid}>
      <Section
        style={{ gridArea: "deck", flexDirection: "column", padding: "16px" }}
      >
        <DeckList deck={deckClass} />
      </Section>

      <Section
        style={{ gridArea: "types", flexDirection: "column", padding: "16px" }}
      >
        <Separator>Types</Separator>
        <DeckTypesStats deck={deckClass} />
      </Section>

      <Section
        style={{ gridArea: "curves", flexDirection: "column", padding: "16px" }}
      >
        <Separator>Mana Curve</Separator>
        <DeckManaCurve deck={deck} />
      </Section>

      <Section
        style={{ gridArea: "pies", flexDirection: "column", padding: "16px" }}
      >
        <Separator>Color Pie</Separator>
        <div className={css.pieContainerOuter}>
          <div className={css.pieContainer}>
            <span>Mana Symbols</span>
            <ReactSvgPieChart strokeWidth={0} data={colorsPie} />
          </div>
          <div className={css.pieContainer}>
            <span>Mana Sources</span>
            <ReactSvgPieChart strokeWidth={0} data={landsPie} />
          </div>
        </div>
      </Section>

      <Section
        style={{
          gridArea: "rarities",
          flexDirection: "column",
          padding: "16px"
        }}
      >
        <Separator>Rarities</Separator>
        <WildcardsCostPreset wildcards={wildcardsCost} />
      </Section>
    </div>
  );
}
