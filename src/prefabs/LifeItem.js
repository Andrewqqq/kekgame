define(["Item", "p2", "Phaser"], function (Item) {

var Platformer = Platformer || {};

LifeItem = function (gameState, position, properties) {
    "use strict";
    Item.call(this, gameState, position, properties);
};

LifeItem.prototype = Object.create(Item.prototype);
LifeItem.prototype.constructor = LifeItem;

LifeItem.prototype.collect_item = function (item, player) {
    "use strict";
    Item.prototype.collect_item.call(this);
    player.lives += 1;
}
	return LifeItem;
});
