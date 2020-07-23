export interface ArenaV3Deck extends BasicDeck {
  mainDeck: v3cardsList;
  sideboard: v3cardsList;
  isValid: boolean;
  lockedForUse: boolean;
  lockedForEdit: boolean;
  reourceId?: string;
  cardSkins: CardSkin[];
  cardBack: null | string;
  commandZoneGRPIds: [];
  companionGRPId: number;
  type: "ArenaV3Deck";
}

export interface InternalDeck extends BasicDeck {
  mainDeck: v2cardsList;
  sideboard: v2cardsList;
  arenaMain?: Readonly<v2cardsList>;
  arenaSide?: Readonly<v2cardsList>;
  custom?: boolean;
  tags?: string[];
  colors?: number[];
  archetype?: string;
  archived?: boolean;
  type: "InternalDeck";
}

interface BasicDeck {
  id: string;
  commandZoneGRPIds?: number[];
  companionGRPId?: number;
  mainDeck: anyCardsList;
  sideboard: anyCardsList;
  name: string;
  lastUpdated: string;
  deckTileId: number;
  format: string;
  description: string;
}

export interface CardObject {
  id: number;
  quantity: number;
  chance?: number;
  dfcId?: string;
  grpId?: number;
  measurable?: boolean;
}

export type v2cardsList = Array<CardObject>;

export type v3cardsList = Array<number>;

export function isV2CardsList(
  list: Readonly<anyCardsList>
): list is Readonly<v2cardsList> {
  const first = (list as v2cardsList)[0];
  return first && first.quantity !== undefined;
}

export type anyCardsList = v2cardsList | v3cardsList;

interface CardSkin {
  grpId: number;
  ccv: string;
}

export interface DeckChange {
  id: string;
  deckId: string;
  date: string;
  changesMain: CardObject[];
  changesSide: CardObject[];
  previousMain: v2cardsList;
  previousSide: v2cardsList;
  newDeckHash: string;
}

export interface ColorsAmmount {
  total: number;
  w: number;
  u: number;
  b: number;
  r: number;
  g: number;
  c: number;
}

export interface MissingWildcards {
  rare: number;
  common: number;
  uncommon: number;
  mythic: number;
}

// Formats can be added to the logs cosntantly
// and there are more than just these
//export type Format = "" | "Standard" | "Draft" | "precon" | "Brawl";
