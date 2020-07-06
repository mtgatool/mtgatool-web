declare namespace DeckwildcardsCssNamespace {
  export interface IDeckwildcardsCss {
    'wc-common': string;
    'wc-mythic': string;
    'wc-rare': string;
    'wc-uncommon': string;
    wcCommon: string;
    wcMythic: string;
    wcRare: string;
    wcUncommon: string;
    'wildcard-icon-cont': string;
    wildcardIconCont: string;
    'wildcards-cost': string;
    'wildcards-icon': string;
    wildcardsCost: string;
    wildcardsIcon: string;
  }
}

declare const DeckwildcardsCssModule: DeckwildcardsCssNamespace.IDeckwildcardsCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: DeckwildcardsCssNamespace.IDeckwildcardsCss;
};

export = DeckwildcardsCssModule;
