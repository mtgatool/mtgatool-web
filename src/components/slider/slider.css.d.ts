declare namespace SliderCssNamespace {
  export interface ISliderCss {
    slidecontainer: string;
    sliderMarkHor: string;
    sliderMarkOuter: string;
    sliderMarkText: string;
    sliderMarksContainerHor: string;
    slider_mark_hor: string;
    slider_mark_outer: string;
    slider_mark_text: string;
    slider_marks_container_hor: string;
  }
}

declare const SliderCssModule: SliderCssNamespace.ISliderCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: SliderCssNamespace.ISliderCss;
};

export = SliderCssModule;
