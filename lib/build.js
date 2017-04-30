'use strict';

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _prod = require('./webpack/prod.config');

var _prod2 = _interopRequireDefault(_prod);

var _chalkConfig = require('./chalkConfig');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// More info on Webpack's Node API here: https://webpack.github.io/docs/node.js-api.html
// Allowing console calls below since this is a build file.
/* eslint-disable no-console */
require('dotenv').config();


process.env.NODE_ENV = 'production'; // this assures React is built in prod mode and that the Babel dev config doesn't apply.

console.log((0, _chalkConfig.chalkProcessing)('Generating minified bundle. This will take a moment...'));

(0, _webpack2.default)(_prod2.default).run(function (error, stats) {
  if (error) {
    // so a fatal error occurred. Stop here.
    console.log((0, _chalkConfig.chalkError)(error));
    return 1;
  }

  var jsonStats = stats.toJson();

  if (jsonStats.hasErrors) {
    return jsonStats.errors.map(function (error) {
      return console.log((0, _chalkConfig.chalkError)(error));
    });
  }

  if (jsonStats.hasWarnings) {
    console.log((0, _chalkConfig.chalkWarning)('Webpack generated the following warnings: '));
    jsonStats.warnings.map(function (warning) {
      return console.log((0, _chalkConfig.chalkWarning)(warning));
    });
  }

  console.log('Webpack stats: ' + stats);

  // if we got this far, the build succeeded.
  console.log((0, _chalkConfig.chalkSuccess)("Your app is compiled in production mode in /dist. It's ready to roll!"));

  return 0;
});