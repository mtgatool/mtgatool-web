declare namespace HomeCssNamespace {
  export interface IHomeCss {
    "cont-margin": string;
    contMargin: string;
    "showcase-container": string;
    "showcase-desc": string;
    "showcase-description-left": string;
    "showcase-description-right": string;
    "showcase-download-container": string;
    "showcase-image": string;
    "showcase-overlay-cont": string;
    "showcase-title-left": string;
    "showcase-title-right": string;
    showcaseContainer: string;
    showcaseDesc: string;
    showcaseDescriptionLeft: string;
    showcaseDescriptionRight: string;
    showcaseDownloadContainer: string;
    showcaseImage: string;
    showcaseOverlayCont: string;
    showcaseTitleLeft: string;
    showcaseTitleRight: string;
  }
}

declare const HomeCssModule: HomeCssNamespace.IHomeCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: HomeCssNamespace.IHomeCss;
};

export = HomeCssModule;
