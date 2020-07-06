/* eslint-disable react/prop-types */
import React from "react";
import db from "../../shared/database";
import css from "./deckmanacurve.css";
import { MANA_COLORS } from "../../shared/constants";
import { InternalDeck } from "../../types/Deck";

function getDeckCurve(deck: InternalDeck): number[][] {
  const curve: number[][] = [];
  if (!deck.mainDeck) return curve;

  deck.mainDeck.forEach(card => {
    const cardObj = db.card(card.id);
    if (!cardObj) return;

    const cmc = cardObj.cmc;
    if (!curve[cmc]) curve[cmc] = [0, 0, 0, 0, 0, 0];

    if (!cardObj.type.includes("Land")) {
      cardObj.cost.forEach(c => {
        if (c.includes("w")) curve[cmc][1] += card.quantity;
        if (c.includes("u")) curve[cmc][2] += card.quantity;
        if (c.includes("b")) curve[cmc][3] += card.quantity;
        if (c.includes("r")) curve[cmc][4] += card.quantity;
        if (c.includes("g")) curve[cmc][5] += card.quantity;
      });

      curve[cmc][0] += card.quantity;
    }
  });

  return curve;
}

function add(a: number, b: number): number {
  return a + b;
}

export default function DeckManaCurve(props: {
  deck: InternalDeck;
}): JSX.Element {
  const { deck } = props;
  const manaCounts = getDeckCurve(deck);
  const curveMax = Math.max(
    ...manaCounts
      .filter(v => {
        if (v == undefined) return false;
        return true;
      })
      .map(v => v[0] || 0)
  );
  // console.log("deckManaCurve", manaCounts, curveMax);

  return (
    <div className={css.manaCurveContainer}>
      <div className={css.manaCurve}>
        {!!manaCounts &&
          manaCounts.map((cost, i) => {
            const total = cost[0];
            const manaTotal = cost.reduce(add, 0) - total;

            return (
              <div
                className={css.manaCurveColumn}
                key={"mana-curve-column-" + i}
                style={{ height: (total * 100) / curveMax + "%" }}
              >
                <div className={css.manaCurveNumber}>
                  {total > 0 ? total : ""}
                </div>
                {MANA_COLORS.map((mc, ind) => {
                  if (ind < 5 && cost[ind + 1] > 0) {
                    return (
                      <div
                        className={css["mana-curve-column-color"]}
                        key={"mana-curve-column-color-" + ind}
                        style={{
                          height:
                            Math.round((cost[ind + 1] / manaTotal) * 100) + "%",
                          backgroundColor: mc
                        }}
                      />
                    );
                  }
                })}
              </div>
            );
          })}
      </div>
      <div className={css.manaCurveNumbers}>
        {!!manaCounts &&
          manaCounts.map((cost, i) => {
            return (
              <div
                className={css.manaCurveColumnNumber}
                key={"mana-curve-column-number-" + i}
              >
                <div
                  className={css["mana_s16"] + " mana_" + i}
                  style={{ margin: "auto" }}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}
