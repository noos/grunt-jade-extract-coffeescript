'use strict';

var grunt = require('grunt');
var jade_extract_coffeescript = require('../tasks/lib/jade_extract_coffeescript').task(grunt);


function getNormalizedFile(filepath) {
  return grunt.util.normalizelf(grunt.file.read(filepath));
}

exports.jade_extract_coffeescript = {
  normal_scenario: function(test) {
    test.expect(2);

    var actual_jade   = getNormalizedFile("tmp/test1/index.jade");
    var expected_jade = getNormalizedFile("test/expected/test1/index.jade");

    test.equal(actual_jade, expected_jade, 'should describe what the default behavior is.');

    var actual_coffeescript   = getNormalizedFile("tmp/test1/app.coffee");
    var expected_coffeescript = getNormalizedFile("test/expected/test1/app.coffee");

    test.equal(actual_coffeescript, expected_coffeescript, 'should describe what the default behavior is.');

    test.done();
  },

  coffeescript_at_the_end: function(test) {
    test.expect(2);

    var actual_jade   = getNormalizedFile("tmp/test2/index.jade");
    var expected_jade = getNormalizedFile("test/expected/test2/index.jade");

    test.equal(actual_jade, expected_jade, 'should describe what the default behavior is.');

    var actual_coffeescript   = getNormalizedFile("tmp/test2/app.coffee");
    var expected_coffeescript = getNormalizedFile("test/expected/test2/app.coffee");

    test.equal(actual_coffeescript, expected_coffeescript, 'should describe what the default behavior is.');

    test.done();
  },
};