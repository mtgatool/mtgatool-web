declare namespace SharedCssModule {
  export interface ISharedCss {
    "button-pause": string;
    "button-play": string;
    buttonPause: string;
    buttonPlay: string;
    "home-desc": string;
    homeDesc: string;
    "text-centered": string;
    "text-dark": string;
    "text-description": string;
    "text-light": string;
    "text-title": string;
    "text-title-nopad": string;
    textCentered: string;
    textDark: string;
    textDescription: string;
    textLight: string;
    textTitle: string;
    textTitleNopad: string;
    "video-container": string;
    videoContainer: string;
  }
}

declare const SharedCssModule: SharedCssModule.ISharedCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: SharedCssModule.ISharedCss;
};

export = SharedCssModule;
