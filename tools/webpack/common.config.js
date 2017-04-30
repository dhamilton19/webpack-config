const path = require('path');
const merge = require('webpack-merge');


const commonConfig = merge([
  {
    resolve: {
      extensions: ['*', '.js', '.jsx', '.json'],
    },
    target: 'web',
    output: {
      path: path.resolve(process.cwd(), process.env.DIST),
      publicPath: '/',
    },
    module: {
      rules: [
        { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
      ],
    },
  },
]);

module.exports = commonConfig;
