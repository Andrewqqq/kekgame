define(["Prefab", "p2", "Phaser"], function (Prefab) {

function Checkpoint(gameState, position, properties) {
    "use strict";
	this.gameState  = gameState;
    Prefab.call(this, gameState, position, properties);

    this.checkpointReached = false;

    this.gameState.game.physics.arcade.enable(this);

    this.anchor.setTo(0.5);
};

Checkpoint.prototype = Object.create(Prefab.prototype);
Checkpoint.prototype.constructor = Checkpoint;

Checkpoint.prototype.update = function () {
    "use strict";
    this.gameState.game.physics.arcade.collide(this, this.gameState.layers.collision);
    this.gameState.game.physics.arcade.overlap(this, this.gameState.groups.players, this.reachCheckpoint, null, this);
};

Checkpoint.prototype.reachCheckpoint = function () {
    "use strict";
    // checkpoint was reached
    this.checkpointReached = true;
}
	return Checkpoint;
});

