define(["GroundEnemy", "p2", "Phaser"], function (GroundEnemy) {

function RunningEnemy(gameState, position, properties) {
    "use strict";
	this.gameState  = gameState;	
    GroundEnemy.call(this, gameState, position, properties);

    this.detectionDistance = +properties.detectionDistance;
    this.runningSpeed = +properties.runningSpeed;
};

RunningEnemy.prototype = Object.create(GroundEnemy.prototype);
RunningEnemy.prototype.constructor = RunningEnemy;

RunningEnemy.prototype.update = function () {
    "use strict";
    var direction;
    this.gameState.game.physics.arcade.collide(this, this.gameState.layers.collision);

    if (this.detectPlayer()) {
        // player is inside detection range, run towards it
        direction = (this.gameState.prefabs.player.x < this.x) ? -1 : 1;
        this.body.velocity.x = direction * this.runningSpeed;
        this.scale.setTo(-direction, 1);
        this.previousX = this.x;
    } else {
        // player is outside detection range, act like a regular enemy
        direction = (this.body.velocity.x < 0) ? -1 : 1;
        this.body.velocity.x = direction * this.walkingSpeed;
        this.scale.setTo(-direction, 1);
        GroundEnemy.prototype.update.call(this);
    }
};

RunningEnemy.prototype.detectPlayer = function () {
    "use strict";
    var distanceToPlayer;
    distanceToPlayer = Math.abs(this.x - this.gameState.prefabs.player.x);
    // the player must be in the same ground y position, and inside the detection range
    return (this.bottom === this.gameState.prefabs.player.bottom) && (distanceToPlayer <= this.detectionDistance);
}
	return RunningEnemy;
});
