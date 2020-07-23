import database from "../database";
import { CardObject, ColorsAmmount } from "../../types/Deck";
import Deck from "../deck";

export default function getDeckLandsAmmount(deck: Deck): ColorsAmmount {
  const colors = { total: 0, w: 0, u: 0, b: 0, r: 0, g: 0, c: 0 };

  deck
    .getMainboard()
    .get()
    .forEach(function(c: CardObject) {
      const quantity = c.quantity;
      const card = database.card(c.id);
      if (quantity > 0 && card) {
        if (
          card.type.indexOf("Land") != -1 ||
          card.type.indexOf("land") != -1
        ) {
          if (card.frame.length < 5) {
            card.frame.forEach(function(c) {
              if (c == 1) {
                colors.w += quantity;
                colors.total += quantity;
              }
              if (c == 2) {
                colors.u += quantity;
                colors.total += quantity;
              }
              if (c == 3) {
                colors.b += quantity;
                colors.total += quantity;
              }
              if (c == 4) {
                colors.r += quantity;
                colors.total += quantity;
              }
              if (c == 5) {
                colors.g += quantity;
                colors.total += quantity;
              }
              if (c == 6) {
                colors.c += quantity;
                colors.total += quantity;
              }
            });
          }
        }
      }
    });

  return colors;
}
