declare namespace WrapperCssNamespace {
  export interface IWrapperCss {
    "wrapper-inner": string;
    "wrapper-inner-centered": string;
    "wrapper-outer": string;
    "wrapper-outer-dark": string;
    "wrapper-outer-light": string;
    wrapperInner: string;
    wrapperInnerCentered: string;
    wrapperOuter: string;
    wrapperOuterDark: string;
    wrapperOuterLight: string;
  }
}

declare const WrapperCssModule: WrapperCssNamespace.IWrapperCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: WrapperCssNamespace.IWrapperCss;
};

export = WrapperCssModule;
