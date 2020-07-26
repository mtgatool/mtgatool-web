module.exports = {
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|yml|md)$": "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|sass|less)$": "<rootDir>/__mocks__/styleMock.js"
  }
};
