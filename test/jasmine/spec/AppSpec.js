define(["../../../src/app"], function (App) {
    "use strict";

    describe("Тест 1", function () {

        /*
        it("должен бросать исключение без конструктора", function (done) {
            expect(function () {
                var app = App();
            }).toThrow();
            done();
        });
        */

        it("должен напечатать: «Привет, мир!»", function () {
            var app = new App()
            expect(app.test()).toBe("Hello, world!");
        });

        it("не должен печатать: «Прощай, мир!»", function () {
            var app = new App()
            expect(app.test()).not.toBe("Goodbye, world!");
        });
    });

});
