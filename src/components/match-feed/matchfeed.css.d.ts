declare namespace MatchfeedCssNamespace {
  export interface IMatchfeedCss {
    "match-brief": string;
    "match-brief-open": string;
    "match-feed": string;
    matchBrief: string;
    matchBriefOpen: string;
    matchFeed: string;
    "rank-left": string;
    rankLeft: string;
  }
}

declare const MatchfeedCssModule: MatchfeedCssNamespace.IMatchfeedCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: MatchfeedCssNamespace.IMatchfeedCss;
};

export = MatchfeedCssModule;
