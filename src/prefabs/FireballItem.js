define(["Item", "p2", "Phaser"], function (Item) {

var Platformer = Platformer || {};

FireballItem = function (gameState, position, properties) {
    "use strict";
    Item.call(this, gameState, position, properties);
};

FireballItem.prototype = Object.create(Item.prototype);
FireballItem.prototype.constructor = FireballItem;

FireballItem.prototype.collect_item = function (item, player) {
    "use strict";
    Item.prototype.collect_item.call(this);
    player.shooting = true;
	player.bullets = 5;
}
	return FireballItem;
});
