declare namespace ReleasenotesCssNamespace {
  export interface IReleasenotesCss {
    "commit-desc": string;
    "commit-div": string;
    "commit-type": string;
    commitDesc: string;
    commitDiv: string;
    commitType: string;
    "releases-container": string;
    "releases-container-line": string;
    "releases-title": string;
    releasesContainer: string;
    releasesContainerLine: string;
    releasesTitle: string;
    "type-added": string;
    "type-breaking": string;
    "type-error": string;
    "type-fixed": string;
    "type-improved": string;
    "type-removed": string;
    typeAdded: string;
    typeBreaking: string;
    typeError: string;
    typeFixed: string;
    typeImproved: string;
    typeRemoved: string;
    "version-div": string;
    "version-end": string;
    "version-number": string;
    "version-release": string;
    versionDiv: string;
    versionEnd: string;
    versionNumber: string;
    versionRelease: string;
  }
}

declare const ReleasenotesCssModule: ReleasenotesCssNamespace.IReleasenotesCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ReleasenotesCssNamespace.IReleasenotesCss;
};

export = ReleasenotesCssModule;
