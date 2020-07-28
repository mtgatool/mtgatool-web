import React from "react";
import _ from "lodash";
import css from "./index.css";
import { WILDCARD_RARITIES } from "../../constants";
import { MissingWildcards, getBoosterCountEstimate } from "mtgatool-shared";

const wcIcon: Record<string, string> = {};
wcIcon["common"] = css.wcCommon;
wcIcon["uncommon"] = css.wcUncommon;
wcIcon["rare"] = css.wcRare;
wcIcon["mythic"] = css.wcMythic;

const getRarityKey = (
  rarity: string
): "rare" | "common" | "uncommon" | "mythic" | undefined => {
  if (["rare", "common", "uncommon", "mythic"].includes(rarity))
    return rarity as any;
  return undefined;
};

interface WildcardsCostPresetProps {
  wildcards: {
    c?: number;
    u?: number;
    r?: number;
    m?: number;
  };
}

export default function WildcardsCostPreset(
  props: WildcardsCostPresetProps
): JSX.Element {
  const { c, u, r, m } = props.wildcards;

  const missingWildcards: MissingWildcards = {
    common: c || 0,
    uncommon: u || 0,
    rare: r || 0,
    mythic: m || 0
  };

  const boostersNeeded = Math.round(getBoosterCountEstimate(missingWildcards));

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center"
      }}
    >
      {WILDCARD_RARITIES.map((cardRarity: string) => {
        const key = getRarityKey(cardRarity);
        if (key) {
          const missing = missingWildcards[key];
          if (missing) {
            return (
              <div
                key={cardRarity + "-" + missing}
                className={`${css.wcExploreCost} ${wcIcon[cardRarity]}`}
                title={_.capitalize(cardRarity)}
              >
                {missing}
              </div>
            );
          }
        }
      })}
      <div title="Boosters needed (estimated)" className={css.boExploreCost}>
        {boostersNeeded}
      </div>
    </div>
  );
}
