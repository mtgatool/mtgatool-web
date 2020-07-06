declare namespace LoadingCssNamespace {
  export interface ILoadingCss {
    grow: string;
    'loading-div': string;
    loadingDiv: string;
    spin: string;
  }
}

declare const LoadingCssModule: LoadingCssNamespace.ILoadingCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: LoadingCssNamespace.ILoadingCss;
};

export = LoadingCssModule;
