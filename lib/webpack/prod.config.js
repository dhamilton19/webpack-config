'use strict';

var _webpackMerge = require('webpack-merge');

var _webpackMerge2 = _interopRequireDefault(_webpackMerge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var WebpackMd5Hash = require('webpack-md5-hash');
var path = require('path');
var webpack = require('webpack');

var parts = require('./parts');
var commonConfig = require('./common.config');

var GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production'),
  __DEV__: false
};

var isVendor = function isVendor(resource, targets) {
  return resource && resource.indexOf('node_modules') >= 0 && targets.find(function (t) {
    return new RegExp('\\\\' + t + '\\\\', 'i').test(resource);
  });
};

module.exports = (0, _webpackMerge2.default)([commonConfig, {
  devtool: 'source-map',
  entry: path.resolve(process.cwd(), process.env.SRC, 'index'),
  output: {
    filename: '[name].[chunkhash].js'
  },
  plugins: [new WebpackMd5Hash(), new webpack.DefinePlugin(GLOBALS), new ExtractTextPlugin('[name].[contenthash].css'), parts.htmlPlugin({
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true
    }
  }), new webpack.optimize.UglifyJsPlugin({ sourceMap: true }), new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: 'vendor.[chunkhash].js',
    minChunks: function minChunks(_ref) {
      var resource = _ref.resource;

      var targets = ['react', 'react-dom'];
      return isVendor(resource, targets);
    }
  }), parts.loaderPlugin({
    minimize: true,
    debug: false
  })],
  module: {
    rules: [{
      test: /\.eot(\?v=\d+.\d+.\d+)?$/,
      loader: 'url-loader?name=[name].[ext]'
    }, {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=[name].[ext]'
    }, {
      test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
      loader: 'url-loader?limit=10000&mimetype=application/octet-stream&name=[name].[ext]'
    }, {
      test: /\.svg(\?v=\d+.\d+.\d+)?$/,
      loader: 'url-loader?limit=10000&mimetype=image/svg+xml&name=[name].[ext]'
    }, {
      test: /\.(jpe?g|png|gif)$/i,
      loader: 'file-loader?name=[name].[ext]'
    }, { test: /\.ico$/, loader: 'file-loader?name=[name].[ext]' }, {
      test: /(\.css|\.scss|\.sass)$/,
      loader: ExtractTextPlugin.extract('css-loader?sourceMap!postcss-loader!sass-loader?sourceMap')
    }]
  }
}]);