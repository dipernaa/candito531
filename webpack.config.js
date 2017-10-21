const webpack = require('webpack');
const path = require('path');

module.exports = {
  output: {
    path: path.join(__dirname, 'dist/assets'),
    publicPath: '/assets/',
    filename: 'app.bundle.js'
  },
  devServer: {
    contentBase: './src/',
    historyApiFallback: {
      index: 'index.html'
    },
    proxy: {
      '/api': 'http://localhost:3000'
    },
    inline: true,
    hot: true,
    host: 'localhost',
    port: 8080,
    publicPath: '/assets/',
    noInfo: false,
    clientLogLevel: 'error'
  },
  cache: true,
  devtool: 'eval-source-map',
  entry: [
    'react-hot-loader/patch',
    './src/index.js'
  ],
  stats: {
    colors: true,
    reasons: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true
    })
  ],
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: [
        /node_modules/,
        /ui-toolkit/
      ],
      enforce: 'pre',
      loader: 'eslint-loader'
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /\.scss/,
      use: [
        'style-loader',
        'css-loader',
        'resolve-url-loader',
        'sass-loader?outputStyle=expanded'
      ]
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader'
      ]
    }, {
      test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
      loader: "file-loader"
    }, {
      test: /\.(png|jpg)$/,
      loader: 'url-loader?limit=8192'
    }]
  }
};
