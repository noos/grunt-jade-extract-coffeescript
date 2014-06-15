/*
 * grunt-jade-extract-coffeescript
 * http://gruntjs.com/
 *
 * Copyright (c) 2014 noos
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },


    // Configuration to be run (and then tested).
    jadeExtractCoffeescript: {
      test1: {
        src: "test/fixtures/test1.jade",
        dest: "tmp/test1/index.jade",
        coffeescript: "tmp/test1/app.coffee",
        replace: "script(src='app.js')"
      },

      test2: {
        src: "test/fixtures/test2.jade",
        dest: "tmp/test2/index.jade",
        coffeescript: "tmp/test2/app.coffee",
        replace: "script(src='app.js')"
      }
    },


    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-internal');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'jadeExtractCoffeescript', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test', 'build-contrib']);

};
