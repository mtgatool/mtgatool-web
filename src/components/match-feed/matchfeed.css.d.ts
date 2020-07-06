declare namespace MatchfeedCssNamespace {
  export interface IMatchfeedCss {
    "constructed-rank": string;
    constructedRank: string;
    "limited-rank": string;
    limitedRank: string;
    "match-brief": string;
    "match-brief-column": string;
    "match-brief-flex": string;
    "match-brief-middleflex": string;
    "match-brief-open": string;
    "match-brief-result": string;
    "match-brief-subtitle": string;
    "match-brief-tile": string;
    "match-brief-title": string;
    "match-feed": string;
    matchBrief: string;
    matchBriefColumn: string;
    matchBriefFlex: string;
    matchBriefMiddleflex: string;
    matchBriefOpen: string;
    matchBriefResult: string;
    matchBriefSubtitle: string;
    matchBriefTile: string;
    matchBriefTitle: string;
    matchFeed: string;
    "rank-left": string;
    "rank-small": string;
    rankLeft: string;
    rankSmall: string;
  }
}

declare const MatchfeedCssModule: MatchfeedCssNamespace.IMatchfeedCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: MatchfeedCssNamespace.IMatchfeedCss;
};

export = MatchfeedCssModule;
