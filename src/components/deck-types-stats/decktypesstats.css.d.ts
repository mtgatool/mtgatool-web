declare namespace DecktypesstatsCssModule {
  export interface IDecktypesstatsCss {
    "type-art": string;
    "type-cre": string;
    "type-enc": string;
    "type-icon": string;
    "type-icon-cont": string;
    "type-ins": string;
    "type-lan": string;
    "type-pla": string;
    "type-sor": string;
    typeArt: string;
    typeCre: string;
    typeEnc: string;
    typeIcon: string;
    typeIconCont: string;
    typeIns: string;
    typeLan: string;
    typePla: string;
    typeSor: string;
    "types-container": string;
    typesContainer: string;
  }
}

declare const DecktypesstatsCssModule: DecktypesstatsCssModule.IDecktypesstatsCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: DecktypesstatsCssModule.IDecktypesstatsCss;
};

export = DecktypesstatsCssModule;
