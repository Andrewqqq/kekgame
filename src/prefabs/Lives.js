define(["Prefab", "p2", "Phaser"], function (Prefab) {

function Lives(gameState, position, properties) {
    "use strict";
	this.gameState  = gameState;
    Prefab.call(this, gameState, position, properties);

    this.frame = +properties.frame;
    this.visible = false;

    this.spacing = +properties.spacing;

    this.fixedToCamera = true;
    // saving initial position if it gets changed by window scaling
    this.initialPosition = new Phaser.Point(this.x, this.y);

    this.lives = [];
    this.deadLife = null;
    this.createLives();
};

Lives.prototype = Object.create(Prefab.prototype);
Lives.prototype.constructor = Lives;

Lives.prototype.update = function () {
    "use strict";
    // update to show current number of lives
    if (this.gameState.prefabs.player.lives !== this.lives.length) {
        this.updateLives();
    }
};

Lives.prototype.createLives = function () {
    "use strict";
    var life_index, lifePosition, life;
    // create a sprite for each one of the player lives
		console.log("gameState =", this.gameState);
		console.log("gameState.prefabs =", this.gameState);

	console.log("Player = ", this.gameState.prefabs.player);
    for (life_index = 0; life_index < this.gameState.prefabs.player.lives; life_index += 1) {
        lifePosition = new Phaser.Point(this.initialPosition.x + (life_index * (this.width + this.spacing)), this.initialPosition.y);
        life = new Phaser.Sprite(this.gameState.game, lifePosition.x, lifePosition.y, this.texture, this.frame);
        life.fixedToCamera = true;
        this.gameState.groups.hud.add(life);
        this.lives.push(life);
    }
};

Lives.prototype.updateLives = function () {
    "use strict";
    var life, lifePosition;
    life = this.lives[this.lives.length - 1];
    if (this.gameState.prefabs.player.lives < this.lives.length) {
        // the player died, so we have to kill the last life
        life.kill();
        this.deadLife = life;
        this.lives.pop();
    } else {
        // the player received another life
        if (!this.deadLife) {
            // if there is no dead life we can reuse, we create a new one
            lifePosition = new Phaser.Point(this.initialPosition.x + (this.lives.length * (this.width + this.spacing)), this.initialPosition.y);
            life = new Phaser.Sprite(this.gameState.game, lifePosition.x, lifePosition.y, this.texture, this.frame);
            life.fixedToCamera = true;
            this.gameState.groups.hud.add(life);
        } else {
            // if there is a dead life, we just reset it
            life = this.deadLife;
            lifePosition = new Phaser.Point(this.initialPosition.x + ((this.lives.length - 1) * (this.width + this.spacing)), this.initialPosition.y);
            life.reset(lifePosition.x, lifePosition.y);
            this.deadLife = null;
        }
        this.lives.push(life);
    }
}
	return Lives;
});
