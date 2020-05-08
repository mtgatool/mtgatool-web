declare namespace DecklistCssModule {
  export interface IDecklistCss {
    "card-tile-separator": string;
    cardTileSeparator: string;
  }
}

declare const DecklistCssModule: DecklistCssModule.IDecklistCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: DecklistCssModule.IDecklistCss;
};

export = DecklistCssModule;
