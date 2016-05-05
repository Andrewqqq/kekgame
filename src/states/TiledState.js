define([
    "p2", "Phaser", "Player", "Enemy", "GroundEnemy", "FlyingEnemy",
    "RunningEnemy", "StoneEnemy", "Goal", "Checkpoint", "Coin", "Score",
    "Lives", "LifeItem", "FireballItem", "Boss"
], function (
    p2, undefined, Player, Enemy, GroundEnemy, FlyingEnemy,
    RunningEnemy, StoneEnemy, Goal, Checkpoint, Coin, Score,
    Lives, LifeItem, FireballItem, Boss
) {

    "use strict";

    function TiledState() {
        Phaser.State.call(this);
        this.prefabClasses = {
            "player": Player.prototype.constructor,
            "groundEnemy": GroundEnemy.prototype.constructor,
            "flyingEnemy": FlyingEnemy.prototype.constructor,
            "runningEnemy": RunningEnemy.prototype.constructor,
            "stoneEnemy": StoneEnemy.prototype.constructor,
            "goal": Goal.prototype.constructor,
            "checkpoint": Checkpoint.prototype.constructor,
            "coin": Coin.prototype.constructor,
            "score": Score.prototype.constructor,
            "lives": Lives.prototype.constructor,
            "life_item": LifeItem.prototype.constructor,
            "fireball_item": FireballItem.prototype.constructor,
            "boss": Boss.prototype.constructor
        };
    };

    TiledState.prototype = Object.create(Phaser.State.prototype);

    TiledState.prototype.constructor = TiledState;

    TiledState.prototype.init = function (levelData) {
        var tileset_index;
        this.levelData = levelData;

        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        // start physics system
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 1000;

        // create map and set tileset
        this.map = this.game.add.tilemap(levelData.map.key);
        tileset_index = 0;
        this.map.tilesets.forEach(function (tileset) {
            this.map.addTilesetImage(tileset.name, levelData.map.tilesets[tileset_index]);
            tileset_index += 1;
        }, this);
    };

    TiledState.prototype.create = function () {
        var groupName, objectLayer, collisionTiles;
        // create map layers
        this.layers = {};
        this.map.layers.forEach(function (layer) {
            this.layers[layer.name] = this.map.createLayer(layer.name);
            if (layer.properties.collision) { // collision layer
                collisionTiles = [];
                layer.data.forEach(function (dataRow) { // find tiles used in the layer
                    dataRow.forEach(function (tile) {
                        // check if it's a valid tile index and isn't already in the list
                        if (tile.index > 0 && collisionTiles.indexOf(tile.index) === -1) {
                            collisionTiles.push(tile.index);
                        }
                    }, this);
                }, this);
                this.map.setCollision(collisionTiles, true, layer.name);
            }
        }, this);
        // resize the world to be the size of the current layer
        this.layers[this.map.layer.name].resizeWorld();
        // create groups
        this.groups = {};
        this.levelData.groups.forEach(function (groupName) {
            this.groups[groupName] = this.game.add.group();
        }, this);
        this.prefabs = {};

		        this.initHud();

		//console.log(this.map.objects['objects'][0]);

		//this.createObject(this.map.objects['objects'][0]);
        for (objectLayer in this.map.objects) {
            if (this.map.objects.hasOwnProperty(objectLayer)) {
                // create layer objects
                this.map.objects[objectLayer].forEach(this.createObject, this);
            }
        }
		var livesPosition;	
		        livesPosition = new Phaser.Point(this.game.world.width * 0.65, 20);
						//console.log(livesPosition);

		var lives;
        lives = new Lives(this, livesPosition, {"texture": "playerSpritesheet", "group": "hud", "frame": 3, "spacing": 16});
				console.log("lives = ", lives);

        this.prefabs["lives"] = lives;
        this.game.camera.follow(this.prefabs.player);
    };

    TiledState.prototype.createObject = function (object) {
        var objectY, position, prefab;
        // tiled coordinates starts in the bottom left corner
        objectY = (object.gid) ? object.y - (this.map.tileHeight / 2) : object.y + (object.height / 2)
        position = {"x": object.x + (this.map.tileHeight / 2), "y": objectY};
        // create object according to its type
        if (this.prefabClasses.hasOwnProperty(object.type)) {
            prefab = new this.prefabClasses[object.type](this, position, object.properties);
        }	
        this.prefabs[object.name] = prefab;
    };

    TiledState.prototype.restartLevel = function () {

        // restart the game only if the checkpoint was not reached
        if (this.prefabs.checkpoint && this.prefabs.checkpoint.checkpointReached) {
            this.prefabs.player.x = this.prefabs.checkpoint.x;
            this.prefabs.player.y = this.prefabs.checkpoint.y;
        } else {
            localStorage.playerLives = this.prefabs.player.lives;
            this.game.state.restart(true, false, this.levelData);
        }
    };

    TiledState.prototype.gameOver = function () {
        localStorage.clear();
        this.game.state.start("BootState", true, false, "assets/levels/level1.json");
    };

    TiledState.prototype.initHud = function () {
        var scorePosition, score, livesPosition, lives;
        scorePosition = new Phaser.Point(20, 20);
        score = new Score(this, scorePosition, {"text": "Score: 0", "group": "hud"});
        this.prefabs["score"] = score;

    }

    return TiledState;
});
