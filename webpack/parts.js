const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');

module.exports.htmlPlugin = config =>
  new HtmlWebpackPlugin(
    Object.assign(
      {},
      {
        template: path.resolve(process.cwd(), process.env.SRC, 'index.ejs'),
        inject: true,
      }
    ),
    config
  );

module.exports.loaderPlugin = config =>
  new webpack.LoaderOptionsPlugin(
    Object.assign(
      {},
      {
        noInfo: true, // set to false to see a list of every file being bundled.
        options: {
          sassLoader: {
            includePaths: [path.resolve(process.cwd(), process.env.SRC, 'scss')],
          },
          context: '/',
          postcss: () => [autoprefixer],
        },
      }
    ),
    config
  );
