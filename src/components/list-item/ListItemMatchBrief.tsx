/* eslint-disable react/no-array-index-key */
import {
  getEventPrettyName,
  constants,
  InternalMatch,
  Colors,
} from "mtgatool-shared";

import { Column, FlexBottom, FlexTop, HoverTile, ListItem } from "./ListItem";
import "./ListItem.css";

import RankIcon from "../rank-icon";

import Flex from "../flex";

import utf8Decode from "../../shared/utils/utf8Decode";

const { DEFAULT_TILE, COLORS_ALL } = constants;

interface MatchBriefProps {
  match: InternalMatch;
}

export function ManaCost(props: {
  newclass?: string;
  colors: number[];
}): JSX.Element {
  const { colors } = props;
  let { newclass } = props;
  if (!newclass) newclass = "mana-s16";
  return (
    <>
      {colors.map((mana, index) => {
        return (
          <div
            key={`${mana}_${index}`}
            className={`${newclass} flex_end mana_${COLORS_ALL[mana - 1]}`}
          />
        );
      })}
    </>
  );
}

export default function ListItemMatchBrief({
  match,
}: MatchBriefProps): JSX.Element {
  return (
    <ListItem
      click={() => {
        //
      }}
    >
      <div
        className="list-item-left-indicator"
        style={{
          backgroundColor:
            match.player.wins > match.opponent.wins
              ? `var(--color-g)`
              : `var(--color-r)`,
        }}
      />
      <HoverTile grpId={match.playerDeck.deckTileId || DEFAULT_TILE}>
        <RankIcon
          rank={match.player.rank}
          tier={match.player.tier}
          percentile={match.player.percentile || 0}
          leaderboardPlace={match.player.leaderboardPlace || 0}
        />
      </HoverTile>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          flexGrow: 2,
        }}
      >
        <Column>
          <FlexTop>
            <div className="list-deck-name">
              {utf8Decode(match.playerDeck.name || "")}
            </div>
          </FlexTop>
          <FlexBottom>
            <ManaCost
              newclass="mana-s20"
              colors={new Colors()
                .addFromBits(match.playerDeck.colors || 0)
                .get()}
            />
          </FlexBottom>
        </Column>

        <Column>
          <Flex
            className="list-deck-name-it"
            style={{
              justifyContent: "center",
            }}
          >
            {getEventPrettyName(match.eventId)}
          </Flex>
          <Flex
            style={{
              fontSize: "22px",
              fontFamily: "var(--main-font-name-bold)",
              justifyContent: "center",
            }}
          >
            {`${match.player.wins} - ${match.opponent.wins}`}
          </Flex>
        </Column>

        <Column>
          <FlexTop>
            <div className="list-match-title">
              {utf8Decode(match.opponent.name)}
            </div>
          </FlexTop>
          <FlexBottom
            style={{ justifyContent: "flex-end", marginRight: "8px" }}
          >
            <ManaCost
              newclass="mana-s20"
              colors={new Colors().addFromBits(match.oppDeck.colors || 0).get()}
            />
          </FlexBottom>
        </Column>
      </div>
    </ListItem>
  );
}
