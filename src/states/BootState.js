define(["p2", "Phaser"], function (p2, undefined) {
    "use strict";

    function BootState() {
        Phaser.State.call(this);
    };

    BootState.prototype = Object.create(Phaser.State.prototype);

    BootState.prototype.constructor = BootState;

    BootState.prototype.init = function (levelFile) {
        this.levelFile = levelFile;
    };

    BootState.prototype.preload = function () {
        this.load.text("level12", this.levelFile);
    };

    BootState.prototype.create = function () {
        var levelText, levelData;
        levelText = this.game.cache.getText("level12");		
        levelData = JSON.parse(levelText);
        this.game.state.start("LoadingState", true, false, levelData);
    }

    return BootState;
});
