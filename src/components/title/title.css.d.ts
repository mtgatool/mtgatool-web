declare namespace TitleCssModule {
  export interface ITitleCss {
    "top-subtitle-container": string;
    "top-title-container": string;
    topSubtitleContainer: string;
    topTitleContainer: string;
  }
}

declare const TitleCssModule: TitleCssModule.ITitleCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: TitleCssModule.ITitleCss;
};

export = TitleCssModule;
