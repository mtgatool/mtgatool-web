declare namespace IndexCssNamespace {
  export interface IIndexCss {
    pieContainer: string;
    pieContainerOuter: string;
    pie_container: string;
    pie_container_outer: string;
    "regular-view-grid": string;
    regularViewGrid: string;
    typesContainer: string;
    types_container: string;
    wildcardsCost: string;
    wildcards_cost: string;
  }
}

declare const IndexCssModule: IndexCssNamespace.IIndexCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: IndexCssNamespace.IIndexCss;
};

export = IndexCssModule;
