const webpack = require('webpack');

const commonPaths = require('./paths');

module.exports = {
  mode: 'development',
  output: {
    publicPath: '/',
    filename: '[name].js',
    path: commonPaths.outputPath,
    chunkFilename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              localsConvention: 'camelCase',
              modules: {
                localIdentName: '[local]',
              },
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  devServer: {
    contentBase: commonPaths.outputPath,
    compress: true,
    historyApiFallback: true,
    hot: true,
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
};
