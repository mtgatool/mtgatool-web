declare namespace FooterCssNamespace {
  export interface IFooterCss {
    "footer-column": string;
    "footer-column-title": string;
    "footer-logo": string;
    "footer-main": string;
    "footer-text": string;
    "footer-wrapper": string;
    footerColumn: string;
    footerColumnTitle: string;
    footerLogo: string;
    footerMain: string;
    footerText: string;
    footerWrapper: string;
  }
}

declare const FooterCssModule: FooterCssNamespace.IFooterCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: FooterCssNamespace.IFooterCss;
};

export = FooterCssModule;
