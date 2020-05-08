declare namespace DocsCssModule {
  export interface IDocsCss {
    "anchor-h1": string;
    "anchor-h2": string;
    "anchor-h3": string;
    "anchor-link": string;
    anchorH1: string;
    anchorH2: string;
    anchorH3: string;
    anchorLink: string;
    "docs-code": string;
    "docs-main": string;
    "docs-section-link": string;
    "docs-section-link-active": string;
    "docs-section-title": string;
    "docs-sidebar": string;
    "docs-sidebar-content": string;
    "docs-sidebar-dragger": string;
    "docs-text": string;
    "docs-wrapper": string;
    docsCode: string;
    docsMain: string;
    docsSectionLink: string;
    docsSectionLinkActive: string;
    docsSectionTitle: string;
    docsSidebar: string;
    docsSidebarContent: string;
    docsSidebarDragger: string;
    docsText: string;
    docsWrapper: string;
    "top-logo": string;
    topLogo: string;
  }
}

declare const DocsCssModule: DocsCssModule.IDocsCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: DocsCssModule.IDocsCss;
};

export = DocsCssModule;
