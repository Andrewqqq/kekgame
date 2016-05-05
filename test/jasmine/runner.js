/*jslint browser: true */
/*global console, Math, require */
(function () {
    "use strict";
    require.config({
        "baseUrl": "../..",
        "paths": {
            "boot": "lib/jasmine-2.4.1/boot",
            "jasmine": "lib/jasmine-2.4.1/jasmine",
            "jasminehtml": "lib/jasmine-2.4.1/jasmine-html",
            "jquery": "lib/jquery-1.12.3.min"
        },
        "shim": {
            "boot": {
                "deps": ["jasmine", "jasminehtml"],
                "exports": "window.onload"
            }
        },
        "urlArgs": "random=" + Math.random()
    });
    require(["boot"], function (boot) {
        var specs = [
            // Тестовые варианты
            "test/jasmine/spec/AppSpec"
        ];
        require(specs, function () {
            boot();
        });
    });
}());
