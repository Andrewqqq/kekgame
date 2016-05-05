define(["Prefab", "p2", "Phaser"], function (Prefab) {

var Platformer = Platformer || {};

Fireball = function (gameState, position, properties) {
    "use strict";
    Prefab.call(this, gameState, position, properties);

    this.direction = properties.direction;
    this.speed = +properties.speed;

    this.gameState.game.physics.arcade.enable(this);
    this.body.allowGravity = false;
    // velocity is constant, but defined by direction
    if (this.direction == "LEFT") {
        this.body.velocity.x = -this.speed;
    } else {
        this.body.velocity.x = this.speed;
    }

    this.anchor.setTo(0.5);
    // Fireball uses the same asset as FireballItem, so we make it a little smaller
    this.scale.setTo(0.75);
};

Fireball.prototype = Object.create(Prefab.prototype);
Fireball.prototype.constructor = Fireball;

Fireball.prototype.update = function () {
    "use strict";
    // the fireball is destroyed if in contact with anything else
    this.gameState.game.physics.arcade.collide(this, this.gameState.layers.collision, this.kill, null, this);
    this.gameState.game.physics.arcade.overlap(this, this.gameState.layers.invincibleEnemies, this.kill, null, this);
};

return Fireball;

});
