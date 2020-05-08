import { InternalDeck } from "../types/Deck";

export interface ExportViewProps {
  setImage: (cardObj: any) => void;
}

export interface ServerDeck extends InternalDeck {
  owner: string;
}