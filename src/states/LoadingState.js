define(["p2", "Phaser"], function (p2, undefined) {
    "use strict";

    function LoadingState() {
        Phaser.State.call(this);
    };

    LoadingState.prototype = Object.create(Phaser.State.prototype);

    LoadingState.prototype.constructor = LoadingState;

    LoadingState.prototype.init = function (levelData) {
        this.levelData = levelData;
    };

    LoadingState.prototype.preload = function () {
        var assets, assetLoader, assetKey, asset;
        assets = this.levelData.assets;
        for (assetKey in assets) { // load assets according to asset key
            if (assets.hasOwnProperty(assetKey)) {
                asset = assets[assetKey];
                switch (asset.type) {
                case "image":
                    this.load.image(assetKey, asset.source);
                    break;
                case "spritesheet":
                    this.load.spritesheet(assetKey, asset.source, asset.frame_width, asset.frameHeight, asset.frames, asset.margin, asset.spacing);
                    break;
                case "tilemap":
                    this.load.tilemap(assetKey, asset.source, null, Phaser.Tilemap.TILED_JSON);
                    break;
                }
            }
        }
    };

    LoadingState.prototype.create = function () {
        this.game.state.start("GameState", true, false, this.levelData);
    }

    return LoadingState;
});
