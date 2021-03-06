const R = require('ramda');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, { p: isProd } = {}) => ({
  devtool: isProd ? 'source-map' : 'cheap-module-eval-source-map',
  entry: R.filter(R.identity, [
    'babel-polyfill',
    !isProd && 'react-hot-loader/patch',
    './src/index'
  ]),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.s?css$/,
        loaders: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg|eot|ttf|woff2?)$/i,
        loader: 'file-loader?hash=sha512&digest=hex&name=[hash].[ext]'
      }
    ]
  },
  plugins: R.filter(R.identity, [
    new webpack.ProvidePlugin({
      'React': 'react'
    }),
    new HtmlWebpackPlugin({
      title: 'KBox',
      template: 'src/index.ejs'
    }),
    !isProd && new webpack.NamedModulesPlugin(),
    isProd && new webpack.optimize.OccurrenceOrderPlugin()
  ])
});
