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
    hotUpdateChunkFilename: 'hot/hot-update.js',
    hotUpdateMainFilename: 'hot/hot-update.json',
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
      {
        test: /\.(css)$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['css', '.js', '.jsx'],
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
