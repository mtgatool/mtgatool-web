declare namespace RegisterCssNamespace {
  export interface IRegisterCss {
    "form-authenticate": string;
    "form-button": string;
    "form-container": string;
    "form-error": string;
    "form-icon": string;
    "form-input-container": string;
    "form-label": string;
    "form-options": string;
    formAuthenticate: string;
    formButton: string;
    formContainer: string;
    formError: string;
    formIcon: string;
    formInputContainer: string;
    formLabel: string;
    formOptions: string;
  }
}

declare const RegisterCssModule: RegisterCssNamespace.IRegisterCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: RegisterCssNamespace.IRegisterCss;
};

export = RegisterCssModule;
