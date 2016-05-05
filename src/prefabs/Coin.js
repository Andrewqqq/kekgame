define(["Prefab", "p2", "Phaser"], function (Prefab) {

var Platformer = Platformer || {};

Coin = function (gameState, position, properties) {
    "use strict";
    Prefab.call(this, gameState, position, properties);

    this.score = +properties.score;

    this.gameState.game.physics.arcade.enable(this);
    this.body.immovable = true;
    this.body.allowGravity = false;

    this.anchor.setTo(0.5);
};

Coin.prototype = Object.create(Prefab.prototype);
Coin.prototype.constructor = Coin;

Coin.prototype.update = function () {
    "use strict";
    this.gameState.game.physics.arcade.collide(this, this.gameState.layers.collision);
    this.gameState.game.physics.arcade.overlap(this, this.gameState.groups.players, this.collectCoin, null, this);
};

Coin.prototype.collectCoin = function (coin, player) {
    "use strict";
    // kill coin and increase score
    this.kill();
    player.score += this.score;
}
	return Coin;
});

