declare namespace DeckviewCssNamespace {
  export interface IDeckviewCss {
    "deckview-div": string;
    deckviewDiv: string;
  }
}

declare const DeckviewCssModule: DeckviewCssNamespace.IDeckviewCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: DeckviewCssNamespace.IDeckviewCss;
};

export = DeckviewCssModule;
