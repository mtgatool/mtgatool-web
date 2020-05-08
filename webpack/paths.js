/* eslint-disable no-undef */
const path = require("path");

module.exports = {
  root: path.resolve(__dirname, "../"),
  outputPath: path.resolve(__dirname, "../", "build"),
  entryPath: path.resolve(__dirname, "../", "src/index.tsx"),
  templatePath: path.resolve(__dirname, "../", "src/template.html"),
  imagesFolder: "images",
  fontsFolder: "fonts",
  cssFolder: "",
  jsFolder: "js"
};
