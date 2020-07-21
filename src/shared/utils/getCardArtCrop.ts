import { DbCardData } from "../../types/Metadata";

import notFound from "../../assets/images/notfound.png";
import notFoundArt from "../../assets/images/notFoundArt.png";
import database from "../database";

export function getCardImage(
  card: DbCardData | number | undefined,
  quality: string
): string {
  if (card === undefined) {
    return notFound;
  }
  const cardObj =
    typeof card == "string"
      ? database.card(parseInt(card))
      : typeof card == "number"
      ? database.card(card)
      : card;
  try {
    const url = cardObj?.images[quality];
    if (url === undefined || url === "") throw "Undefined url";
    return "https://img.scryfall.com/cards" + cardObj?.images[quality];
  } catch (e) {
    // eslint-disable-next-line no-console
    // debugLog(e, "error");
    console.log(`Cant find card image: ${cardObj}, ${typeof cardObj}`);
    return notFound;
  }
}

export function getCardArtCrop(card?: DbCardData | number): string {
  const art = getCardImage(card, "art_crop");
  if (art == notFound) return notFoundArt;
  else return art;
}
