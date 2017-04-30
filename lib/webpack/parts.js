'use strict';

var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var path = require('path');
var autoprefixer = require('autoprefixer');

module.exports.htmlPlugin = function (config) {
  return new HtmlWebpackPlugin(Object.assign({}, {
    template: path.resolve(process.cwd(), process.env.SRC, 'index.ejs'),
    inject: true
  }), config);
};

module.exports.loaderPlugin = function (config) {
  return new webpack.LoaderOptionsPlugin(Object.assign({}, {
    noInfo: true, // set to false to see a list of every file being bundled.
    options: {
      sassLoader: {
        includePaths: [path.resolve(process.cwd(), process.env.SRC, 'scss')]
      },
      context: '/',
      postcss: function postcss() {
        return [autoprefixer];
      }
    }
  }), config);
};