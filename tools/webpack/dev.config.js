const merge = require('webpack-merge');

const parts = require('./parts');
const commonConfig = require('./common.config');

module.exports = merge([
  commonConfig,
  {
    devtool: 'eval-source-map',
    entry: [
      // must be first entry to properly set public path
      './src/webpack-public-path',
      'react-hot-loader/patch',
      'webpack-hot-middleware/client?reload=true',
      path.resolve(__dirname, 'src/index.js'), // Defining path seems necessary for this to work consistently on Windows machines.
    ],
    output: {
      filename: 'bundle.js',
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      parts.htmlPlugin({
        minify: {
          removeComments: true,
          collapseWhitespace: true,
        },
      }),
      parts.loaderPlugin({
        minimize: false,
        debug: true,
      }),
    ],
    module: {
      rules: [
        { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['babel-loader'] },
        { test: /\.eot(\?v=\d+.\d+.\d+)?$/, loader: 'file-loader' },
        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'url-loader?limit=10000&mimetype=application/font-woff',
        },
        {
          test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
          loader: 'url-loader?limit=10000&mimetype=application/octet-stream',
        },
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'url-loader?limit=10000&mimetype=image/svg+xml',
        },
        {
          test: /\.(jpe?g|png|gif)$/i,
          loader: 'file-loader?name=[name].[ext]',
        },
        { test: /\.ico$/, loader: 'file-loader?name=[name].[ext]' },
        {
          test: /(\.css|\.scss|\.sass)$/,
          loaders: [
            'style-loader',
            'css-loader?sourceMap',
            'postcss-loader',
            'sass-loader?sourceMap',
          ],
        },
      ],
    },
  },
]);
