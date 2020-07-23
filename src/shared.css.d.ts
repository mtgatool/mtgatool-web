declare namespace SharedCssNamespace {
  export interface ISharedCss {
    backBlue: string;
    backGreen: string;
    backRed: string;
    back_blue: string;
    back_green: string;
    back_red: string;
    blackBright: string;
    blackBrightBg: string;
    black_bright: string;
    black_bright_bg: string;
    blue: string;
    blueBright: string;
    blueBrightBg: string;
    blue_bright: string;
    blue_bright_bg: string;
    "button-pause": string;
    "button-play": string;
    buttonPause: string;
    buttonPlay: string;
    green: string;
    greenBright: string;
    greenBrightBg: string;
    green_bright: string;
    green_bright_bg: string;
    orange: string;
    orangeBright: string;
    orangeBrightBg: string;
    orange_bright: string;
    orange_bright_bg: string;
    red: string;
    redBright: string;
    redBrightBg: string;
    red_bright: string;
    red_bright_bg: string;
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
    white: string;
    whiteBright: string;
    whiteBrightBg: string;
    white_bright: string;
    white_bright_bg: string;
    yellowBright: string;
    yellowBrightBg: string;
    yellow_bright: string;
    yellow_bright_bg: string;
  }
}

declare const SharedCssModule: SharedCssNamespace.ISharedCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: SharedCssNamespace.ISharedCss;
};

export = SharedCssModule;
