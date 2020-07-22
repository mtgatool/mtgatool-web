/* eslint-disable no-undef */
const eslint = require("eslint");
const webpack = require("webpack");
const convert = require("koa-connect");
const history = require("connect-history-api-fallback");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
const commonPaths = require("./paths");

module.exports = {
  entry: commonPaths.entryPath,
  module: {
    rules: [
      {
        test: /\.ya?ml$/,
        type: "json", // Required by Webpack v4
        use: "yaml-loader",
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "@svgr/webpack",
            options: {
              name: "[name].[ext]",
              outputPath: commonPaths.imagesFolder,
            },
          },
        ],
      },
      {
        enforce: "pre",
        test: /\.(js|jsx|ts|tsx)$/,
        loader: "eslint-loader",
        exclude: /(node_modules)/,
        options: {
          formatter: eslint.CLIEngine.getFormatter("stylish"),
          emitWarning: process.env.NODE_ENV !== "production",
        },
      },
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        exclude: /(node_modules)/,
      },
      {
        test: /\.(ts|tsx)$/,
        loader: "babel-loader",
        exclude: /(node_modules)/,
      },
      {
        test: /\.(png|jpg|gif|webm)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: commonPaths.imagesFolder,
            },
          },
        ],
      },
      {
        test: /\.(woff2|ttf|woff|eot)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: commonPaths.fontsFolder,
            },
          },
        ],
      },
      {
        test: /\.txt$/,
        use: [
          {
            loader: "raw-loader",
          },
        ],
      },
    ],
  },
  serve: {
    add: (app) => {
      app.use(convert(history()));
    },
    content: commonPaths.entryPath,
    dev: {
      publicPath: commonPaths.outputPath,
    },
    open: true,
  },
  resolve: {
    modules: ["src", "node_modules"],
    extensions: ["*", ".js", ".jsx", ".ts", ".tsx", ".css", ".scss", ".svg"],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: commonPaths.templatePath,
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: "async",
    }),
  ],
};
