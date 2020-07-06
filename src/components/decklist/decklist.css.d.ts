declare namespace DecklistCssNamespace {
  export interface IDecklistCss {
    'card-tile-separator': string;
    cardTileSeparator: string;
  }
}

declare const DecklistCssModule: DecklistCssNamespace.IDecklistCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: DecklistCssNamespace.IDecklistCss;
};

export = DecklistCssModule;
