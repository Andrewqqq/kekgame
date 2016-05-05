define(["Prefab", "p2", "Phaser"], function (Prefab) {

Item = function (gameState, position, properties) {
    "use strict";
	this.gameState  = gameState;
    Prefab.call(this, gameState, position, properties);

    this.gameState.game.physics.arcade.enable(this);
    this.body.immovable = true;
    this.body.allowGravity = false;

    this.anchor.setTo(0.5);
};

Item.prototype = Object.create(Prefab.prototype);
Item.prototype.constructor = Item;

Item.prototype.update = function () {
    "use strict";
    this.gameState.game.physics.arcade.collide(this, this.gameState.layers.collision);
    this.gameState.game.physics.arcade.overlap(this, this.gameState.groups.players, this.collect_item, null, this);
};

Item.prototype.collect_item = function () {
    "use strict";
    // by default, the item is destroyed when collected
    this.kill();
}
	return Item;
});
