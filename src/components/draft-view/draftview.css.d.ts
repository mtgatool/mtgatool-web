declare namespace DraftviewCssNamespace {
  export interface IDraftviewCss {
    "draft-card": string;
    "draft-card-cont": string;
    "draft-card-picked": string;
    "draft-card-rank": string;
    "draft-container": string;
    "draft-deck-view": string;
    "draft-view": string;
    "draft-view-grid": string;
    draftCard: string;
    draftCardCont: string;
    draftCardPicked: string;
    draftCardRank: string;
    draftContainer: string;
    draftDeckView: string;
    draftTitle: string;
    draftView: string;
    draftViewGrid: string;
    draft_title: string;
  }
}

declare const DraftviewCssModule: DraftviewCssNamespace.IDraftviewCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: DraftviewCssNamespace.IDraftviewCss;
};

export = DraftviewCssModule;
