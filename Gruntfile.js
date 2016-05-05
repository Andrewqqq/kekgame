/*global module, require */
module.exports = function (grunt) {
    "use strict";
    var ISBNatorSourceFiles = ["src/**/*.js*"],
        ISBNatorTestFiles = ["Gruntfile.js", "test/**/*.js*"];
    grunt.initConfig({
        "eslint": {
            "options": {
                "config": "test/conf/eslintrc.json"
            },
            "ISBNatorSource": {
                "src": ISBNatorSourceFiles
            },
            "ISBNatorTest": {
                "src": ISBNatorTestFiles
            }
        },
        "jslint": {
            "ISBNatorSource": {
                "directives": require("./test/conf/jslintrc.json").options,
                "src": ISBNatorSourceFiles
            },
            "ISBNatorTest": {
                "directives": require("./test/conf/jslintrc.json").options,
                "src": ISBNatorTestFiles
            }
        },
        "jshint": {
            "options": require("./test/conf/jshintrc.json").options,
            "ISBNatorSource": {
                "src": ISBNatorSourceFiles
            },
            "ISBNatorTest": {
                "files": {
                    "src": ISBNatorTestFiles
                },
                "options": {
                    "globals": {
                        "beforeEach": true,
                        "define": true,
                        "describe": true,
                        "expect": true,
                        "it": true
                    }
                }
            }
        }
        /*,
        "uglify": {
            "ISBNator": {
                "files": {
                    "dest/result.js": [
                        "src/module/isbn/checksum/calculator10.js",
                        "src/module/isbn/checksum/tester.js"
                    ]
                }
            }
        }
        */
    });

    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-eslint");
    //grunt.loadNpmTasks("grunt-jshint-solid");
    grunt.loadNpmTasks("grunt-jslint");
    // To run: grunt test
    grunt.registerTask("test123", [
        "eslint",
        "jshint",
        //"jshint-solid",
        "jslint"
    ]);

    //grunt.loadNpmTasks("grunt-contrib-uglify");
    // To run: grunt uglify
    //grunt.registerTask("uglify", ["uglify"]);

    // To run: grunt
    //grunt.registerTask("default", ["uglify"]);
};
