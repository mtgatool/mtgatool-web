declare namespace IndexCssNamespace {
  export interface IIndexCss {
    buttonSimple: string;
    buttonSimpleDisabled: string;
    button_simple: string;
    button_simple_disabled: string;
  }
}

declare const IndexCssModule: IndexCssNamespace.IIndexCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: IndexCssNamespace.IIndexCss;
};

export = IndexCssModule;
