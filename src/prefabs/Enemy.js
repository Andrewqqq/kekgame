/*jslint browser: true, this: true */
/*global define */
define(["Prefab", "p2", "Phaser"], function (Prefab) {
    "use strict";

    function Enemy(gameState, position, properties) {
        this.gameState = gameState;

        Prefab.call(this, gameState, position, properties);

        this.walkingSpeed = +properties.walkingSpeed;
        this.walkingDistance = +properties.walkingDistance;
        this.score = +properties.score;

        // saving previous x to keep track of walked distance
        this.previousX = this.x;

        this.gameState.game.physics.arcade.enable(this);
        this.body.velocity.x = properties.direction * this.walkingSpeed;

        this.scale.setTo(-properties.direction, 1);
        this.anchor.setTo(0.5);
    }

    Enemy.prototype = Object.create(Prefab.prototype);

    Enemy.prototype.constructor = Enemy;

    Enemy.prototype.update = function () {
        this.gameState.game.physics.arcade.collide(
            this,
            this.gameState.layers.collision
        );
        this.gameState.game.physics.arcade.overlap(
            this,
            this.gameState.groups.fireballs,
            this.getShoted, null, this
        );

        // change the direction if walked the maximum distance
        if (Math.abs(this.x - this.previousX) >= this.walkingDistance) {
            this.switchDirection();
        }
    };

    Enemy.prototype.switchDirection = function () {
        this.body.velocity.x *= -1;
        this.previousX = this.x;
        this.scale.setTo(-this.scale.x, 1);
    };

    Enemy.prototype.getShoted = function (enemy, fireball) {
        enemy.kill();
        fireball.kill();

    };
    return Enemy;

});
