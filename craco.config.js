const rawLoader = require('craco-raw-loader');

module.exports = {
  webpack: {
    configure: {
      module: {
        rules: [
          {
            test: /\.yml$/,
            use: "yaml-loader",
          },
        ],
        noParse: /gun\.js$/,
      },
    },
    plugins: [
      {
        plugin: rawLoader,
        options: { test: /\.frag$/ }
      }
    ]
  }
}

