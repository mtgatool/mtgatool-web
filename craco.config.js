const { addBeforeLoader, loaderByName } = require("@craco/craco");
const CracoRawLoaderPlugin = require("@baristalabs/craco-raw-loader");

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // eslint-disable-next-line no-param-reassign
      webpackConfig.module = { ...webpackConfig.module, noParse: /gun\.js$/ };
      addBeforeLoader(webpackConfig, loaderByName("file-loader"), {
        test: /\.ya?ml$/,
        type: "json",
        use: "yaml-loader",
      });

      return webpackConfig;
    },
    plugins: {
      add: [
        {
          plugin: CracoRawLoaderPlugin,
          options: {
            test: /\.md$/,
          },
        },
      ],
    },
  },
};
