declare namespace SliderCssModule {
  export interface ISliderCss {
    slidecontainer: string;
    slider: string;
  }
}

declare const SliderCssModule: SliderCssModule.ISliderCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: SliderCssModule.ISliderCss;
};

export = SliderCssModule;
