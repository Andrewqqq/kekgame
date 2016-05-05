/*
 * grunt-jshint-solid
 * https://github.com/bahmutov/grunt-jshint-solid
 *
 * Copyright (c) 2013 Gleb Bahmutov
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js'
      ],
      options: {
        jshintrc: '.jshintrc',
      }
    },

    complexity: grunt.file.readJSON('complexity.json'),

    'nice-package': {
      all: {
        options: {
          blankLine: true
        }
      }
    }
  });

  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-complexity');
  grunt.loadNpmTasks('grunt-nice-package');

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'jshint-solid', 'complexity', 'nice-package']);

};
