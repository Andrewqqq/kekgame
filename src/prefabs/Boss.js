define(["Prefab", "Fireball", "p2", "Phaser"], function (Prefab, Fireball) {

function Boss(gameState, position, properties) {
    "use strict";
	this.gameState  = gameState;

    Prefab.call(this, gameState, position, properties);

    this.attackRate = +properties.attackRate;
    this.attackSpeed = +properties.attackSpeed;
    this.walkingSpeed = +properties.walkingSpeed;
    this.walkingDistance = +properties.walkingDistance;

    // saving previous x to keep track of walked distance
    this.previousX = this.x;

    this.gameState.game.physics.arcade.enable(this);
    this.body.velocity.x = properties.direction * this.walkingSpeed;

    this.anchor.setTo(0.5);

    // boss will be always attacking
    this.attackTimer = this.gameState.game.time.create();
    this.attackTimer.loop(Phaser.Timer.SECOND / this.attackRate, this.shoot, this);
    this.attackTimer.start();
};

Boss.prototype = Object.create(Prefab.prototype);
Boss.prototype.constructor = Boss;

Boss.prototype.update = function () {
    "use strict";
    this.gameState.game.physics.arcade.collide(this, this.gameState.layers.collision);

    // if walked the maximum distance, change the velocity, but not the scale
    if (Math.abs(this.x - this.previousX) >= this.walkingDistance) {
        this.body.velocity.x *= -1;
        this.previousX = this.x;
    }
};

Boss.prototype.shoot = function () {
    "use strict";
    // works the same way player shoot, but using a different pool group
    var fireball, fireballPosition, fireballProperties;
    fireball = this.gameState.groups.enemyFireballs.getFirstDead();
    fireballPosition = new Phaser.Point(this.x, this.y);
    if (!fireball) {
        fireballProperties = {"texture": "fireball_image", "group": "enemyFireballs", "direction": "LEFT", "speed": this.attackSpeed};
            fireball = new Fireball(this.gameState, fireballPosition, fireballProperties);
    } else {
        fireball.reset(fireballPosition.x, fireballPosition.y);
        fireball.body.velocity.x = -this.attackSpeed;
    }
}
	return Boss;
});
