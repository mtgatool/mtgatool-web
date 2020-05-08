declare namespace NotfoundCssModule {
  export interface INotfoundCss {
    "subtitle-errorcode": string;
    "subtitle-notfound": string;
    subtitleErrorcode: string;
    subtitleNotfound: string;
    "title-notfound": string;
    titleNotfound: string;
  }
}

declare const NotfoundCssModule: NotfoundCssModule.INotfoundCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: NotfoundCssModule.INotfoundCss;
};

export = NotfoundCssModule;
