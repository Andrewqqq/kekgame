/*jslint browser: true */
/*global console, Math, require, Phaser */
(function () {
    "use strict";
    // Конфигурируем RequireJS
    require.config({
        "baseUrl": "..",
        "paths": {
            // Путь указывается без расширения имени файла js
            // Путь к JQuery
            "jquery": "lib/jquery-1.12.3.min",
            //"jquery": "https://code.jquery.com/jquery-1.12.3.min.js",
            // Путь к MyApp
            "app": "src/app",
            "BootState": "src/states/BootState",
            "LoadingState": "src/states/LoadingState",
            "TiledState": "src/states/TiledState",
            "Phaser": "lib/phaser",
            "p2": "lib/p2",
            "Player": "src/prefabs/Player",
            "GroundEnemy": "src/prefabs/GroundEnemy",
            "FlyingEnemy": "src/prefabs/FlyingEnemy",
            "RunningEnemy": "src/prefabs/RunningEnemy",
            "StoneEnemy": "src/prefabs/StoneEnemy",
            "Goal": "src/prefabs/Goal",
            "Checkpoint": "src/prefabs/Checkpoint",
            "Coin": "src/prefabs/Coin",
            "Score": "src/prefabs/Score",
            "Lives": "src/prefabs/Lives",
            "LifeItem": "src/prefabs/LifeItem",
            "FireballItem": "src/prefabs/FireballItem",
            "Boss": "src/prefabs/Boss",
            "Prefab": "src/prefabs/Prefab",
            "Enemy": "src/prefabs/Enemy",
            "Text": "lib/text",
            "Item": "src/prefabs/Item",
            "Fireball": "src/prefabs/Fireball"
        },
        "urlArgs": "random=" + Math.random()
    });
    // Выполнение с предзагрузкой модулей через RequireJS
    //JQuery будет доступно как $
    // Конструктор MyApp будет доступен как App
    /*"jquery", "app",*/
    /*$, App,*/
    require(["BootState", "LoadingState", "TiledState", "Phaser"], function (BootState, LoadingState, TiledState) {
        var game = new Phaser.Game("100%", "100%", Phaser.CANVAS);
        game.state.add("BootState", new BootState());
        game.state.add("LoadingState", new LoadingState());
        game.state.add("GameState", new TiledState());
        game.state.start("BootState", true, false, "assets/levels/level1.json");
    });
}());
