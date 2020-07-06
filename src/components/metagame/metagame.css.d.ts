declare namespace MetagameCssNamespace {
  export interface IMetagameCss {
    "archetype-colors": string;
    "archetype-decks-div": string;
    "archetype-decks-list-div": string;
    "archetype-desc": string;
    "archetype-div": string;
    "archetype-info": string;
    "archetype-selector": string;
    archetypeColors: string;
    archetypeDecksDiv: string;
    archetypeDecksListDiv: string;
    archetypeDesc: string;
    archetypeDiv: string;
    archetypeInfo: string;
    archetypeSelector: string;
    "button-simple": string;
    buttonSimple: string;
    "deck-container": string;
    "deck-desc": string;
    "deck-desc-b": string;
    "deck-link": string;
    "deck-link-colors": string;
    "deck-link-desc": string;
    "deck-link-wr": string;
    "deck-name": string;
    deckContainer: string;
    deckDesc: string;
    deckDescB: string;
    deckLink: string;
    deckLinkColors: string;
    deckLinkDesc: string;
    deckLinkWr: string;
    deckName: string;
    "decklist-div": string;
    decklistDiv: string;
    "metagame-div": string;
    "metagame-nav": string;
    metagameDiv: string;
    metagameNav: string;
  }
}

declare const MetagameCssModule: MetagameCssNamespace.IMetagameCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: MetagameCssNamespace.IMetagameCss;
};

export = MetagameCssModule;
