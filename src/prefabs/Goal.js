define(["Prefab", "p2", "Phaser"], function (Prefab) {

function Goal(gameState, position, properties) {
    "use strict";
	this.gameState  = gameState;
    Prefab.call(this, gameState, position, properties);

    this.nextLevel = properties.nextLevel;

    this.gameState.game.physics.arcade.enable(this);

    this.anchor.setTo(0.5);
};

Goal.prototype = Object.create(Prefab.prototype);
Goal.prototype.constructor = Goal;

Goal.prototype.update = function () {
    "use strict";
    this.gameState.game.physics.arcade.collide(this, this.gameState.layers.collision);
    this.gameState.game.physics.arcade.overlap(this, this.gameState.groups.players, this.reachGoal, null, this);
};

Goal.prototype.reachGoal = function () {
    "use strict";
    // start the next level
    localStorage.playerLives = this.gameState.prefabs.player.lives;
    localStorage.playerScore = this.gameState.prefabs.player.score;
    this.gameState.game.state.start("BootState", true, false, this.nextLevel);
}
	return Goal;
});

