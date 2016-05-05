define(["Text", "p2", "Phaser"], function (Text) {

function Score(gameState, position, properties) {
    "use strict";

    Phaser.Text.call(this, gameState.game, position.x, position.y, properties.text);

    this.gameState = gameState;

    this.gameState.groups[properties.group].add(this);

    this.fixedToCamera = true;
};

Score.prototype = Object.create(Phaser.Text.prototype);
Score.prototype.constructor = Score;

Score.prototype.update = function () {
    "use strict";
    // update text to player current score
    this.text = "Score: " + this.gameState.prefabs.player.score;
}
	return Score;
});
