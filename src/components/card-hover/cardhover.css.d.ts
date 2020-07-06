declare namespace CardhoverCssNamespace {
  export interface ICardhoverCss {
    "card-hover-dfc": string;
    "card-hover-main": string;
    cardHoverDfc: string;
    cardHoverMain: string;
  }
}

declare const CardhoverCssModule: CardhoverCssNamespace.ICardhoverCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: CardhoverCssNamespace.ICardhoverCss;
};

export = CardhoverCssModule;
