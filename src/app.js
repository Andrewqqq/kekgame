/*jslint browser: true */
/*global define */

// Функция define определяет модуль RequireJS
// Первым параметром можно передать массив зависимостей: ["dep1", "dep2"]
define([], function () {
    "use strict";

    // Внутри модуля можно описать конструктор
    function MyApp()
    {
        // Нам следует удостовериться,
        // что функция вызвана как конструктор, с ключевым словом new
        if (!this instanceof MyApp) {
            throw new Error();
        }
    }

    // Прототипом создаваемых объекта будет объект...
    MyApp.prototype = {};

    // в котором есть функция
    MyApp.prototype.test = function () {
        return "Hello, world!";
    };

    // Возвращаем конструктор в точку подключения модуля
    return MyApp;
});
