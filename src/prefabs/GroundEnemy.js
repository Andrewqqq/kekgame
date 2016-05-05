define(["Enemy", "Prefab", "p2", "Phaser"], function (Enemy, Prefab) {

function GroundEnemy(gameState, position, properties) {
    "use strict";

		this.gameState  = gameState;

    Prefab.call(this, gameState, position, properties);

    Enemy.call(this, gameState, position, properties);
	this.animations.add("walkingwr", [0, 1], 5, true);
    this.animations.play("walkingwr");
	this.frame =1;
};

GroundEnemy.prototype = Object.create(Enemy.prototype);
GroundEnemy.prototype.constructor = GroundEnemy;

GroundEnemy.prototype.update = function () {
    "use strict";
    Enemy.prototype.update.call(this);

    if (this.body.blocked.down && !this.hasTileTo_walk()) {
        this.switchDirection();
    }
};

GroundEnemy.prototype.hasTileTo_walk = function () {
    "use strict";
    var direction, positionToCheck, map, nextTile;
    direction = (this.body.velocity.x < 0) ? -1 : 1;
    // check if the next position has a tile
    positionToCheck = new Phaser.Point(this.x + (direction * this.gameState.map.tileWidth), this.bottom + 1);
    map = this.gameState.map;
    // getTileWorldXY returns the tile in a given position
    nextTile = map.getTileWorldXY(positionToCheck.x, positionToCheck.y, map.tileWidth, map.tileHeight, "collision");
    return nextTile !== null;
}
	return GroundEnemy;
});
