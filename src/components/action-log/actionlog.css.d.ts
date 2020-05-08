declare namespace ActionlogCssModule {
  export interface IActionlogCss {
    actionlog: string;
    "actionlog-div": string;
    actionlogDiv: string;
    actionlogText: string;
    actionlogTime: string;
    actionlog_text: string;
    actionlog_time: string;
    "deckview-div": string;
    "deckview-title": string;
    deckviewDiv: string;
    deckviewTitle: string;
    "log-ability": string;
    "log-card": string;
    "log-text": string;
    logAbility: string;
    logCard: string;
    logP0: string;
    logP1: string;
    logP2: string;
    logText: string;
    "log_p-1": string;
    "log_p-2": string;
    log_p0: string;
    log_p1: string;
    log_p2: string;
    "match-div": string;
    matchDiv: string;
    playerDeck: string;
  }
}

declare const ActionlogCssModule: ActionlogCssModule.IActionlogCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ActionlogCssModule.IActionlogCss;
};

export = ActionlogCssModule;
