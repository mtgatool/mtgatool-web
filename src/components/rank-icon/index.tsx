import React from "react";

import css from "./index.css";
import { getRankIndex } from "mtgatool-shared";

interface RankIconProps {
  rank: string;
  tier: number;
  percentile: number;
  leaderboardPlace: number;
  format?: string;
}

export default function RankIcon(props: RankIconProps): JSX.Element {
  const { rank, tier, percentile, leaderboardPlace, format } = props;
  const rankIndex = getRankIndex(rank, tier);

  const rankStyle = {
    backgroundPosition: rankIndex * -48 + "px 0px"
  };

  const rankClass =
    !format || format == "constructed"
      ? css["constructed-rank"]
      : css["limited-rank"];

  const mythicRankTitle =
    rank +
    (leaderboardPlace == 0 ? ` ${percentile}%` : ` #${leaderboardPlace}`);
  const rankTitle = rank == "Mythic" ? mythicRankTitle : rank + " " + tier;

  return <div title={rankTitle} className={rankClass} style={rankStyle}></div>;
}
