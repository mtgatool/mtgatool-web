declare namespace IndexCssNamespace {
  export interface IIndexCss {
    "constructed-rank": string;
    constructedRank: string;
    "limited-rank": string;
    limitedRank: string;
    "rank-small": string;
    rankSmall: string;
  }
}

declare const IndexCssModule: IndexCssNamespace.IIndexCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: IndexCssNamespace.IIndexCss;
};

export = IndexCssModule;
