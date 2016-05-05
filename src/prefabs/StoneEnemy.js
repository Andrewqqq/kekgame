define(["Prefab", "p2", "Phaser"], function (Prefab) {

StoneEnemy = function (gameState, position, properties) {
    "use strict";
    Prefab.call(this, gameState, position, properties);

    this.gameState.game.physics.arcade.enable(this);
    this.body.allowGravity = false;

    this.anchor.setTo(0.5);
};

StoneEnemy.prototype = Object.create(Prefab.prototype);
StoneEnemy.prototype.constructor = StoneEnemy;

StoneEnemy.prototype.update = function () {
    "use strict";
    this.gameState.game.physics.arcade.collide(this, this.gameState.layers.collision);

    // if the player is below, the enemy will fall after some time
    if (this.checkPlayer()) {
        this.fall();
    }
};

StoneEnemy.prototype.checkPlayer = function () {
    "use strict";
    var player;
    player = this.gameState.prefabs.player;
    // check if player is right below the enemy
    return (player.x > this.left && player.x < this.right && player.y > this.bottom);
};

StoneEnemy.prototype.fall = function () {
    "use strict";
    // start falling
    this.body.allowGravity = true;
}
	return StoneEnemy;
});
