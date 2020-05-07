declare namespace CardhoverCssModule {
  export interface ICardhoverCss {
    "card-hover-dfc": string;
    "card-hover-main": string;
    cardHoverDfc: string;
    cardHoverMain: string;
  }
}

declare const CardhoverCssModule: CardhoverCssModule.ICardhoverCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: CardhoverCssModule.ICardhoverCss;
};

export = CardhoverCssModule;
