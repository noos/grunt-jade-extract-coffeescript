/*
 * grunt-jade-extract-coffeescript
 *
 *
 * Copyright (c) 2014 noos
 * Licensed under the MIT license.
 */

'use strict';

var _ = require('lodash'),
    path = require('path');

module.exports = function (grunt) {
  
  var jadeExtractCoffeescript = require('./lib/jade_extract_coffeescript').task(grunt);

  grunt.registerMultiTask('jadeExtractCoffeescript', 'extracts embedded :coffeescript in jade to an external file', function () {
    _.each(this.files, function (fileSrcDest) {
      jadeExtractCoffeescript.processJadeFiles(fileSrcDest);
    });
  });
};
