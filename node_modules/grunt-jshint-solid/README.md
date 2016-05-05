# grunt-jshint-solid

> Analyzes your .jshintrc settings file to see how strict they are using

[grunt-jshint-solid](https://github.com/bahmutov/grunt-jshint-solid)

[![NPM][grunt-jshint-solid-icon]][grunt-jshint-solid-url]

[![Build status][grunt-jshint-solid-ci-image]][grunt-jshint-solid-ci-url]
[![dependencies][grunt-jshint-solid-dependencies-image]][grunt-jshint-solid-dependencies-url]
[![devdependencies][grunt-jshint-solid-devdependencies-image]][grunt-jshint-solid-devdependencies-url]

[![endorse][endorse-image]][endorse-url]

## Install

```shell
npm install grunt-jshint-solid --save-dev
```

Once the plugin has been installed, add it to default grunt pipeline

```js
grunt.loadNpmTasks('grunt-jshint-solid');
grunt.registerTask('default', ['jshint', 'jshint-solid']);
```

Plugin looks for *.jshintrc* file in the project's root folder.

## Small print

Author: Gleb Bahmutov &copy; 2013

License: MIT - do anything with the code, but don't blame me if it does not work.

Support: if you find any problems with this module, email / tweet / open issue on Github

[grunt-jshint-solid-icon]: https://nodei.co/npm/grunt-jshint-solid.png?downloads=true
[grunt-jshint-solid-url]: https://npmjs.org/package/grunt-jshint-solid
[grunt-jshint-solid-ci-image]: https://travis-ci.org/bahmutov/grunt-jshint-solid.png?branch=master
[grunt-jshint-solid-ci-url]: https://travis-ci.org/bahmutov/grunt-jshint-solid
[grunt-jshint-solid-dependencies-image]: https://david-dm.org/bahmutov/grunt-jshint-solid.png
[grunt-jshint-solid-dependencies-url]: https://david-dm.org/bahmutov/grunt-jshint-solid
[grunt-jshint-solid-devdependencies-image]: https://david-dm.org/bahmutov/grunt-jshint-solid/dev-status.png
[grunt-jshint-solid-devdependencies-url]: https://david-dm.org/bahmutov/grunt-jshint-solid#info=devDependencies
[endorse-image]: https://api.coderwall.com/bahmutov/endorsecount.png
[endorse-url]: https://coderwall.com/bahmutov
