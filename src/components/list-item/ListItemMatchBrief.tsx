import _ from "lodash";
import React from "react";
import { Column, FlexBottom, FlexTop, HoverTile, ListItem } from "./ListItem";
import css from "./ListItem.css";
import { InternalMatch } from "../../types/match";
import RankIcon from "../rank-icon";
import getEventPrettyName from "../../shared/utils/getEventPrettyName";
import { DEFAULT_TILE } from "../../shared/constants";
import { ManaCost } from "../card-tile";
import CardTileCss from "../card-tile/CardTile.css";
import Flex from "../flex";
import { utf8Decode } from "../../shared/util";

interface MatchBriefProps {
  match: InternalMatch;
}

export default function ListItemMatchBrief({
  match
}: MatchBriefProps): JSX.Element {
  return (
    <ListItem click={(): void => {}}>
      <div
        className={css.listItemLeftIndicator}
        style={{
          backgroundColor:
            match.player.win > match.opponent.win
              ? `var(--color-g)`
              : `var(--color-r)`
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
          flexGrow: 2
        }}
      >
        <Column>
          <FlexTop>
            <div className={css.listDeckName}>
              {utf8Decode(match.playerDeck.name || "")}
            </div>
          </FlexTop>
          <FlexBottom>
            <ManaCost
              newclass={CardTileCss.manaS20}
              colors={match.playerDeck.colors || []}
            />
          </FlexBottom>
        </Column>

        <Column>
          <Flex
            className={css.listDeckNameIt}
            style={{
              justifyContent: "center"
            }}
          >
            {getEventPrettyName(match.eventId)}
          </Flex>
          <Flex
            style={{
              fontSize: "22px",
              fontFamily: "var(--main-font-name-bold)",
              justifyContent: "center"
            }}
          >
            {`${match.player.win} - ${match.opponent.win}`}
          </Flex>
        </Column>

        <Column>
          <FlexTop>
            <div className={css.listMatchTitle}>
              {utf8Decode(match.opponent.name)}
            </div>
          </FlexTop>
          <FlexBottom
            style={{ justifyContent: "flex-end", marginRight: "8px" }}
          >
            <ManaCost
              newclass={CardTileCss.manaS20}
              colors={match.oppDeck.colors || []}
            />
          </FlexBottom>
        </Column>
      </div>
    </ListItem>
  );
}
