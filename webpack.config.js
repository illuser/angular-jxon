const { resolve } = require('path');
const webpack = require('webpack');
const BabliPlugin = require('babili-webpack-plugin');

module.exports = [{
  context: resolve(__dirname, 'src'),
  entry: './module.js',
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'module.js',
    libraryTarget: 'umd',
    library: 'angular-jxon',
    sourceMapFilename: 'module.map'
  },
  externals:[{
    angular: true,
    xmldom: true
  }],
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'jshint-loader',
        enforce: 'pre',
        options: {
          emitErrors: true,
          failOnHint: true
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
}, {
  context: resolve(__dirname, 'src'),
  entry: './module.js',
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'module.min.js',
    libraryTarget: 'umd',
    library: 'angular-jxon',
    sourceMapFilename: 'module.min.map'
  },
  externals:[{
    angular: true
  }],
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'jshint-loader',
        enforce: 'pre',
        options: {
          emitErrors: true,
          failOnHint: true
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new BabliPlugin({})
  ]
}]