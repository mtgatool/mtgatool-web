import { InternalDeck } from "mtgatool-shared";

export interface ServerDeck extends InternalDeck {
  owner: string;
  ok: boolean;
  user?: string;
  error?: string;
}

export type VoidFunction = () => void;
