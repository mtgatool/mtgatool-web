module.exports = {
  env: {
    "cypress/globals": true,
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },
  globals: {
    page: true,
    browser: true,
    React: true,
    JSX: true,
    NodeJS: true,
    Electron: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: "module",
  },
  rules: {
    allowEmptyCatch: 0,
    radix: "off",
    "no-cond-assign": 0,
    "no-console": "off",
    "no-redeclare": "warn",
    "no-duplicate-imports": "warn",
    "no-undef": "error",
    "no-global-assign": "warn",
    "no-empty": "warn",
    "no-underscore-dangle": "off",
    "object-shorthand": 0,
    complexity: ["warn", 40],
    "max-statements": ["warn", 100],
    "react/jsx-no-bind": "off",
    "react/jsx-filename-extension": [
      1,
      {
        extensions: [".jsx", ".tsx"],
      },
    ],
    "react/require-default-props": [
      1,
      {
        ignoreFunctionalComponents: true,
      },
    ],
    eqeqeq: "off",
    "jsx-a11y/label-has-associated-control": "off",
    "jsx-a11y/no-noninteractive-element-interactions": "off",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    "prettier/prettier": [
      "warn",
      {
        endOfLine: "auto",
      },
    ],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      { varsIgnorePattern: "^_", argsIgnorePattern: "^_" },
    ],
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/camelcase": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/ban-ts-ignore": "off",
    "@typescript-eslint/interface-name-prefix": "off",
    "react/react-in-jsx-scope": "off",
    "react-hooks/rules-of-hooks": "error",
  },
  settings: {
    "import/core-modules": ["electron"],
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
    "import/ignore:": [".scss$"],
  },
  parser: "@typescript-eslint/parser",
  extends: [
    "plugin:cypress/recommended",
    "airbnb-base",
    "airbnb/rules/react",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  plugins: [
    "cypress",
    "jest",
    "jsx-a11y",
    "import",
    "prettier",
    "react",
    "react-hooks",
  ],
};