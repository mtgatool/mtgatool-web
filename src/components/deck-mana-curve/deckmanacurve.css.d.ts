declare namespace DeckmanacurveCssNamespace {
  export interface IDeckmanacurveCss {
    'mana-curve': string;
    'mana-curve-column': string;
    'mana-curve-column-number': string;
    'mana-curve-container': string;
    'mana-curve-costs': string;
    'mana-curve-number': string;
    'mana-curve-numbers': string;
    manaCurve: string;
    manaCurveColumn: string;
    manaCurveColumnNumber: string;
    manaCurveContainer: string;
    manaCurveCosts: string;
    manaCurveNumber: string;
    manaCurveNumbers: string;
    mana_curve_column: string;
  }
}

declare const DeckmanacurveCssModule: DeckmanacurveCssNamespace.IDeckmanacurveCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: DeckmanacurveCssNamespace.IDeckmanacurveCss;
};

export = DeckmanacurveCssModule;
