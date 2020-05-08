declare namespace AppCssModule {
  export interface IAppCss {
    app: string;
    "download-button": string;
    "download-img": string;
    downloadButton: string;
    downloadImg: string;
    "home-desc": string;
    "home-desc-small": string;
    homeDesc: string;
    homeDescSmall: string;
    loading: string;
    "wrapper-image": string;
    wrapperImage: string;
  }
}

declare const AppCssModule: AppCssModule.IAppCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: AppCssModule.IAppCss;
};

export = AppCssModule;
