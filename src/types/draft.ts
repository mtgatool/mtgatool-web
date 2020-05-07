import { ModuleInstanceData } from "./event";
import { InternalDeck } from "./Deck";

export interface DraftStatus {
  DraftId: string;
  DraftStatus: string;
  PackNumber: number;
  PickNumber: number;
  PickedCards: string[];
  DraftPack: string[];
}

export interface DraftData {
  id: string;
  pickNumber: number;
  packNumber: number;
  set: string;
  pickedCards: any;
  currentPack?: any;
  [key: string]: any;
}

export interface DraftState {
  packN: number;
  pickN: number;
}

export interface PickPack {
  pick: string;
  pack: string;
}

export interface InternalDraft {
  eventId: string;
  draftId: string;
  id: string;
  owner: string;
  player: string;
  PlayerId: null | string;
  set: string;
  InternalEventName: string;
  date: string;
  type: string;
  CardPool: null | string[] | number[];
  CourseDeck: null | InternalDeck;
  pickedCards: string[];
  currentPack: string[];
  packNumber: number;
  pickNumber: number;
  [key: string]: any;
  DraftStatus?: string;
  DraftPack?: string[];
  PickedCards?: string[];
  ModuleInstanceData?: ModuleInstanceData;
  CurrentEventState?: string;
  CurrentModule?: string;
  PreviousOpponents?: string[];
}
