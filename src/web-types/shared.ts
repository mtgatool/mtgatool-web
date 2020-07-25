import { InternalDeck } from "mtgatool-shared/dist/types/deck";

export interface ExportViewProps {
  setImage?: (cardObj: any) => void;
}

export interface ServerDeck extends InternalDeck {
  owner: string;
  ok: boolean;
  user?: string;
  error?: string;
}
