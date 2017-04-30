import merge from 'webpack-merge';
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const path = require('path');
const webpack = require('webpack');

const parts = require('./parts');
const commonConfig = require('./common.config');

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production'),
  __DEV__: false,
};

const isVendor = (resource, targets) =>
  resource &&
  resource.indexOf('node_modules') >= 0 &&
  targets.find(t => new RegExp('\\\\' + t + '\\\\', 'i').test(resource));

module.exports = merge([
  commonConfig,
  {
    devtool: 'source-map',
    entry: path.resolve(process.cwd(), process.env.SRC, 'index'),
    output: {
      filename: '[name].[chunkhash].js',
    },
    plugins: [
      new WebpackMd5Hash(),
      new webpack.DefinePlugin(GLOBALS),
      new ExtractTextPlugin('[name].[contenthash].css'),
      parts.htmlPlugin({
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
          minifyURLs: true,
        },
      }),
      new webpack.optimize.UglifyJsPlugin({ sourceMap: true }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: 'vendor.[chunkhash].js',
        minChunks({ resource }) {
          const targets = ['react', 'react-dom'];
          return isVendor(resource, targets);
        },
      }),
      parts.loaderPlugin({
        minimize: true,
        debug: false,
      }),
    ],
    module: {
      rules: [
        {
          test: /\.eot(\?v=\d+.\d+.\d+)?$/,
          loader: 'url-loader?name=[name].[ext]',
        },
        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=[name].[ext]',
        },
        {
          test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
          loader: 'url-loader?limit=10000&mimetype=application/octet-stream&name=[name].[ext]',
        },
        {
          test: /\.svg(\?v=\d+.\d+.\d+)?$/,
          loader: 'url-loader?limit=10000&mimetype=image/svg+xml&name=[name].[ext]',
        },
        {
          test: /\.(jpe?g|png|gif)$/i,
          loader: 'file-loader?name=[name].[ext]',
        },
        { test: /\.ico$/, loader: 'file-loader?name=[name].[ext]' },
        {
          test: /(\.css|\.scss|\.sass)$/,
          loader: ExtractTextPlugin.extract(
            'css-loader?sourceMap!postcss-loader!sass-loader?sourceMap',
          ),
        },
      ],
    },
  },
]);
