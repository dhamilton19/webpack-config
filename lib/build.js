#!/usr/bin/env node
'use strict';

// More info on Webpack's Node API here: https://webpack.github.io/docs/node.js-api.html
// Allowing console calls below since this is a build file.
/* eslint-disable no-console */
require('dotenv').config();
var webpack = require('webpack');
var config = require('./webpack/prod.config');

var _require = require('./chalkConfig'),
    chalkError = _require.chalkError,
    chalkSuccess = _require.chalkSuccess,
    chalkWarning = _require.chalkWarning,
    chalkProcessing = _require.chalkProcessing;

var path = require('path');

process.env.NODE_ENV = 'production'; // this assures React is built in prod mode and that the Babel dev config doesn't apply.

console.log(chalkProcessing('Generating minified bundle. This will take a moment...'));

webpack(config).run(function (error, stats) {
  if (error) {
    // so a fatal error occurred. Stop here.
    console.log(chalkError(error));
    return 1;
  }

  var jsonStats = stats.toJson();

  if (jsonStats.hasErrors) {
    return jsonStats.errors.map(function (error) {
      return console.log(chalkError(error));
    });
  }

  if (jsonStats.hasWarnings) {
    console.log(chalkWarning('Webpack generated the following warnings: '));
    jsonStats.warnings.map(function (warning) {
      return console.log(chalkWarning(warning));
    });
  }

  console.log('Webpack stats: ' + stats);

  // if we got this far, the build succeeded.
  console.log(chalkSuccess("Your app is compiled in production mode in /dist. It's ready to roll!"));

  return 0;
});