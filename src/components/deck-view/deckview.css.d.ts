declare namespace DeckviewCssModule {
  export interface IDeckviewCss {
    "deckview-div": string;
    deckviewDiv: string;
  }
}

declare const DeckviewCssModule: DeckviewCssModule.IDeckviewCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: DeckviewCssModule.IDeckviewCss;
};

export = DeckviewCssModule;
