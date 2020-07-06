declare namespace TitleCssNamespace {
  export interface ITitleCss {
    "top-subtitle-container": string;
    "top-title-container": string;
    topSubtitleContainer: string;
    topTitleContainer: string;
  }
}

declare const TitleCssModule: TitleCssNamespace.ITitleCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: TitleCssNamespace.ITitleCss;
};

export = TitleCssModule;
