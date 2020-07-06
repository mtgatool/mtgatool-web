declare namespace DraftviewCssNamespace {
  export interface IDraftviewCss {
    "draft-card": string;
    "draft-card-picked": string;
    "draft-container": string;
    "draft-deck-view": string;
    "draft-title": string;
    "draft-view": string;
    draftCard: string;
    draftCardPicked: string;
    draftContainer: string;
    draftDeckView: string;
    draftTitle: string;
    draftView: string;
  }
}

declare const DraftviewCssModule: DraftviewCssNamespace.IDraftviewCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: DraftviewCssNamespace.IDraftviewCss;
};

export = DraftviewCssModule;
