define(["p2", "Phaser"], function (undefined, undefined) {

function Prefab(gameState, position, properties) {
    "use strict";
    Phaser.Sprite.call(this, gameState.game, position.x, position.y, properties.texture);

    this.gameState = gameState;
    console.log(this.gameState.groups, properties.group);
    this.gameState.groups[properties.group].add(this);
};

Prefab.prototype = Object.create(Phaser.Sprite.prototype);
Prefab.prototype.constructor = Prefab;
	return Prefab;
});
