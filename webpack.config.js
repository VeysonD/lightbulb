const webpack = require('webpack');
const path = require('path');
const HEROKU_URL = require('./config');

const paths = {
  PUBLIC: path.resolve(__dirname, 'public'),
  SRC: path.resolve(__dirname, 'src'),
};

const config = {
  entry: path.join(paths.SRC, 'index.jsx'),
  devtool: 'cheap-eval-source-map',
  output: {
    path: paths.PUBLIC,
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': { HEROKU_URL },
    }),
  ],
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  stats: {
    colors: true,
    reasons: true,
  },
};

if (process.env.NODE_ENV === 'production') {
  config.devtool = false;
  config.plugins = [
    new webpack.DefinePlugin({
      'process.env': { HEROKU_URL },
    }),
  ];
}

module.exports = config;
