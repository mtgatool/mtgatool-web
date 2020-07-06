declare namespace CookiesCssNamespace {
  export interface ICookiesCss {
    "cookie-banner": string;
    "cookie-text": string;
    cookieBanner: string;
    cookieText: string;
  }
}

declare const CookiesCssModule: CookiesCssNamespace.ICookiesCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: CookiesCssNamespace.ICookiesCss;
};

export = CookiesCssModule;
