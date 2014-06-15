/**
 * Created by noos on 06/15/14.
 */
'use strict';

var path = require('path'),
    _ = require('lodash');

exports.task = function (grunt) {
  var exports = {
  };


  exports.processJadeString = function(input, strReplace) {
    // hint:
    // substring(start,end)
    // substr(start,length)

    var coffeescriptRegex = /^([ \t]+)script(\s+):coffeescript/m;
    var match_begin = input.match(coffeescriptRegex);
    var spaces_script = match_begin[1];
    var num_spaces_script = spaces_script.length;

    var nextlineRegex = /^([ \t]+):coffeescript/m;
    var match_nextline = input.match(nextlineRegex);
    var num_spaces_coffeescript = match_nextline[1].length;

    var endRegexStr = '^[ \\t]{0,' + (num_spaces_script) + '}\\w';
    var endRegex = new RegExp(endRegexStr,"m");

    var match_end = input.substr(match_nextline.index).match(endRegex);
    var end_of_script;

    if (match_end === null) {
      end_of_script = input.length;
    } else {
      end_of_script = match_nextline.index + match_end.index;
    }

    var strTop = input.substring(0,match_begin.index);
    var strBottom = input.substring(end_of_script);

    var str_without_coffeescript;
    if (strReplace === undefined || strReplace === null) {
      str_without_coffeescript = strTop + strBottom;
    } else {
      str_without_coffeescript = strTop + spaces_script + strReplace + "\n" + strBottom;
    }
    var str_just_coffeescript = input.substring(match_nextline.index, end_of_script).replace(/\s+:coffeescript/,"");

    grunt.log.debug("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ");
    grunt.log.debug(str_without_coffeescript);
    grunt.log.debug("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ");
    grunt.log.debug(str_just_coffeescript);
    grunt.log.debug("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ");

    return {
      str_without_coffeescript: str_without_coffeescript,
      str_just_coffeescript: str_just_coffeescript
    };
  };


  exports.processJadeFiles = function (fileSrcDest) {

    var fileSrc = fileSrcDest.src;
    var fileDest = fileSrcDest.dest;
    var fileCoffeescript = fileSrcDest.coffeescript;
    var strReplace = fileSrcDest.replace;

    var result;
    var input;
    var ext;

    grunt.log.writeln('Processing jade file', fileSrc);
    ext = path.extname(fileSrc);
    if (ext !== '.jade') {
      grunt.log.warn('Not processing %s because of unsupported extension: %s', fileSrc, ext);
    } else {
      
      input = grunt.file.read(fileSrc);
      
      result = exports.processJadeString(input, strReplace);

      grunt.file.write(fileDest, result.str_without_coffeescript);
      grunt.file.write(fileCoffeescript, result.str_just_coffeescript);

    }
  };

  return exports;
};
