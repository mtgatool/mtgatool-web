export default function dummy(): void {
  return;
}

export interface SeasonalRankData {
  eventId: string;
  id: string;
  lastMatchId: string;
  newClass: string;
  newLevel: number;
  newStep: number;
  oldClass: string;
  oldLevel: number;
  oldStep: number;
  owner: string;
  player: string;
  playerId: string;
  rankUpdateType: string;
  seasonOrdinal: number;
  timestamp: number;
  wasLossProtected: boolean;
  oldRankNumeric?: number;
  newRankNumeric?: number;
  date?: Date;
}

// Deprecating in favor of event.ts
/*
export interface Season {
  currentSeason: SeasonInfo;
  limitedRankInfo: RankClassInfo[];
  constructedRankInfo: RankClassInfo[];
}

interface SeasonInfo {
  seasonOrdinal: number;
  seasonStartTime: Date;
  seasonEndTime: Date;
  seasonLimitedRewards: Map<Rank, SeasonRewardInfo>;
  seasonConstructedRewards: Map<Rank, SeasonRewardInfo>;
  minMatches: number;
}

export enum Rank {
  Bronze,
  Silver,
  Gold,
  Platinum,
  Diamond,
  Mythic
}

interface SeasonRewardInfo {
  image1: string | null;
  image2: string | null;
  image3: string | null;
  prefab: string;
  referenceId: string;
  headerLocKey: string;
  descriptionLocKey: string;
  quantity: string;
  locParams: Map<string, number>;
  availableDate: Date;
}

export interface RankClassInfo {
  rankClass: Rank;
  level: number;
  steps: number;
}
*/
