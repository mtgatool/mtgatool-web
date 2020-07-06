declare namespace TopnavCssNamespace {
  export interface ITopnavCss {
    "nav-artist": string;
    "nav-bar": string;
    "nav-divider": string;
    "nav-link-a": string;
    "nav-links": string;
    "nav-logo": string;
    "nav-logo-container": string;
    navArtist: string;
    navBar: string;
    navDivider: string;
    navLinkA: string;
    navLinks: string;
    navLogo: string;
    navLogoContainer: string;
    "top-nav": string;
    "top-nav-container": string;
    topNav: string;
    topNavContainer: string;
  }
}

declare const TopnavCssModule: TopnavCssNamespace.ITopnavCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: TopnavCssNamespace.ITopnavCss;
};

export = TopnavCssModule;
