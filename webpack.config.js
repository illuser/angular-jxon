var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './src/module.js',
  output: {
    path: path.join(__dirname, 'dist'),
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
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /(bower_components|node_modules)/,
        loader: 'jshint-loader'
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      }
    ]
  },
  jshint: {
    emitErrors: true,
    failOnHint: true
  }
}