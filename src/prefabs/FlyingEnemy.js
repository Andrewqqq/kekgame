define(["Enemy", "p2", "Phaser"], function (Enemy) {

function FlyingEnemy(gameState, position, properties) {
    "use strict";
	this.gameState  = gameState;
    Enemy.call(this, gameState, position, properties);

    // flying enemies are not affected by gravity
    this.body.allowGravity = false;

    this.animations.add("flying", [0, 1], 5, true);
    this.animations.play("flying");
};

FlyingEnemy.prototype = Object.create(Enemy.prototype);
FlyingEnemy.prototype.constructor = FlyingEnemy;
	return FlyingEnemy;
});
