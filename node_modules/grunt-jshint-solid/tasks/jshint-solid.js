/*
 * grunt-jshint-solid
 * https://github.com/bahmutov/grunt-jshint-solid
 *
 * Copyright (c) 2013 Gleb Bahmutov
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs');
var solid = require('jshint-solid');

module.exports = function (grunt) {

  var title = 'Checks how solid your .jshintrc file is';
  grunt.registerTask('jshint-solid', title, function () {
    var filename = '.jshintrc';
    if (!fs.existsSync(filename)) {
      grunt.log.error('cannot find', filename);
      return false;
    }
    var quality = solid(filename);
    if (quality < 50) {
      grunt.log.error(filename, 'only sets', quality + '% of settings');
    } else if (quality < 90) {
      grunt.log.writeln(filename, 'sets', quality + '% of settings');
    } else {
      grunt.log.ok(filename, 'is solid, congrats');
    }
    return true;
  });

};
