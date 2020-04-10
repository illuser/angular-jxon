const { resolve } = require('path');
const webpack = require('webpack');
const merge = require('lodash.mergewith');
const TerserPlugin = require('terser-webpack-plugin');

const baseConfig = {
  context: resolve(__dirname, 'src'),
  entry: './module.js',
  output: {
    path: resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
    library: 'angular-jxon',
  },
  externals:[{
    angular: true
  }],
  devtool: 'source-map'
}

const customizer = (destVal, srcVal) => {
  if (Array.isArray(destVal)) {
    return destVal.concat(srcVal);
  }
}

module.exports = (env) => {
  
  const es5Config = merge({}, baseConfig, {
    mode: 'development',
    output: {
      filename: 'module.js',
      sourceMapFilename: 'module.map'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"]
            }
          }
        }
      ]
    }
  }, customizer)
  
  const es5MinifiedConfig = merge({}, baseConfig, {
    mode: 'production',
    output: {
      filename: 'module.min.js',
      sourceMapFilename: 'module.min.map',
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          exclude: /node_modules/,
          cache: true,
          parallel: true
        })
      ]
    }
  }, customizer);
  
  const es6Config = merge(undefined, baseConfig, {
    mode: 'development',
    output: {
      filename: 'module.es6.js',
      sourceMapFilename: 'module.es6.map'
    }
  }, customizer);
  
  const es6MinifiedConfig = merge({}, baseConfig, {
    mode: 'production',
    output: {
      filename: 'module.es6.min.js',
      sourceMapFilename: 'module.es6.min.map'
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          exclude: /node_modules/,
          cache: true,
          parallel: true
        })
      ]
    }
  })
  
  return [ es5Config, es5MinifiedConfig, es6Config, es6MinifiedConfig ];
  
}