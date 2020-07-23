declare namespace ActionlogCssNamespace {
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
    "log-view-grid": string;
    logAbility: string;
    logCard: string;
    logP1: string;
    logP2: string;
    logPlayer0: string;
    logPlayer1: string;
    logPlayer2: string;
    logText: string;
    logViewGrid: string;
    "log_p-1": string;
    "log_p-2": string;
    log_player0: string;
    log_player1: string;
    log_player2: string;
    "match-div": string;
    matchDiv: string;
    playerDeck: string;
  }
}

declare const ActionlogCssModule: ActionlogCssNamespace.IActionlogCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ActionlogCssNamespace.IActionlogCss;
};

export = ActionlogCssModule;
