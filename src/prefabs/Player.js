define(["Prefab", "p2", "Phaser"], function (Prefab) {

function Player(gameState, position, properties) {
    "use strict";
		this.gameState  = gameState;

    Prefab.call(this, gameState, position, properties);

    this.walkingSpeed = +properties.walkingSpeed;
    this.jumpingSpeed = +properties.jumpingSpeed;
    this.bouncing = +properties.bouncing;
    this.score = +localStorage.playerScore || 0;
    this.lives = +localStorage.playerLives || +properties.lives;

    this.attackRate = +properties.attackRate;
    this.attackSpeed = +properties.attackSpeed;
	this.bullets = +localStorage.playerBullets || +properties.bullets;
    this.shooting = false;

    this.gameState.game.physics.arcade.enable(this);
    this.body.collideWorldBounds = true;

    this.direction = "RIGHT";

    this.animations.add("walking", [0, 1, 2, 1], 6, true);

    this.frame = 3;

    this.anchor.setTo(0.5);

    this.cursors = this.gameState.game.input.keyboard.createCursorKeys();

    this.shootTimer = this.gameState.game.time.create();
    this.shootTimer.loop(Phaser.Timer.SECOND / this.attackRate, this.shoot, this);    
};

Player.prototype = Object.create(Phaser.Text.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function () {
    "use strict";
	//console.log("this.gameState из Player.update = ", this.gameState);
    this.gameState.game.physics.arcade.collide(this, this.gameState.layers.collision);
    this.gameState.game.physics.arcade.overlap(this, this.gameState.groups.enemies, this.hitEnemy, null, this);
    // the player automatically dies if in contact with invincible enemies or enemy fireballs
    this.gameState.game.physics.arcade.overlap(this, this.gameState.groups.invincibleEnemies, this.die, null, this);
    this.gameState.game.physics.arcade.overlap(this, this.gameState.groups.enemyFireballs, this.die, null, this);

    if (this.cursors.right.isDown && this.body.velocity.x >= 0) {
        // move right
        this.body.velocity.x = this.walkingSpeed;
        this.direction = "RIGHT";
        this.animations.play("walking");
        this.scale.setTo(-1, 1);
    } else if (this.cursors.left.isDown && this.body.velocity.x <= 0) {
        // move left
        this.body.velocity.x = -this.walkingSpeed;
        this.direction = "LEFT";
        this.animations.play("walking");
        this.scale.setTo(1, 1);
    } else {
        // stop
        this.body.velocity.x = 0;
        this.animations.stop();
        this.frame = 3;
    }

    // jump only if touching a tile
    if (this.cursors.up.isDown && this.body.blocked.down) {
        this.body.velocity.y = -this.jumpingSpeed;
    }

    // dies if touches the end of the screen
    if (this.bottom >= this.gameState.game.world.height) {
        this.die();
    }

    // if the player is able to shoot and the shooting button is pressed, start shooting
    if (this.shooting && this.gameState.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) &&  this.bullets == 0) {
        if (!this.shootTimer.running) {
            this.shoot();
            this.shootTimer.start();   
        }
    } else {
        this.shootTimer.stop(false);
    }
};

Player.prototype.hitEnemy = function (player, enemy) {
    "use strict";
    // if the player is above the enemy, the enemy is killed, otherwise the player dies
    if (enemy.body.touching.up) {
        this.score += enemy.score;
        enemy.kill();
        player.y -= this.bouncing;
    } else {
        this.die();
    }
};

Player.prototype.die = function () {
    "use strict";
    this.lives -= 1;
    this.shooting = false;
    if (this.lives > 0) {
        this.gameState.restartLevel();
    } else {
        this.gameState.gameOver();
    }
};

Player.prototype.shoot = function () {
    "use strict";
    var fireball, fireballPosition, fireballProperties;
    // get the first dead fireball from the pool
    fireball = this.gameState.groups.fireballs.getFirstDead();
    fireballPosition = new Phaser.Point(this.x, this.y);
    if (!fireball) {
        // if there is no dead fireball, create a new one
        fireballProperties = {"texture": "fireballImage", "group": "fireballs", "direction": this.direction, "speed": this.attackSpeed};
        fireball = new Fireball(this.gameState, fireballPosition, fireballProperties);
    } else {
        // if there is a dead fireball, reset it in the new position
        fireball.reset(fireballPosition.x, fireballPosition.y);
        fireball.body.velocity.x = (this.direction == "LEFT") ? -this.attackSpeed : this.attackSpeed;
    }
	player.bullets = player.bullets - 1;
}
	return Player;
});
