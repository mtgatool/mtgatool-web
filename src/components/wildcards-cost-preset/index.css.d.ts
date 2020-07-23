declare namespace IndexCssNamespace {
  export interface IIndexCss {
    boExploreCost: string;
    bo_explore_cost: string;
    wcBooster: string;
    wcCommon: string;
    wcExploreCost: string;
    wcMythic: string;
    wcRare: string;
    wcUncommon: string;
    wc_booster: string;
    wc_common: string;
    wc_explore_cost: string;
    wc_mythic: string;
    wc_rare: string;
    wc_uncommon: string;
  }
}

declare const IndexCssModule: IndexCssNamespace.IIndexCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: IndexCssNamespace.IIndexCss;
};

export = IndexCssModule;
