class Game {
	constructor(gameWidth, gameHeight) {
	    
	    this.gameWidth = gameWidth;
	    this.gameHeight = gameHeight;

	    this.gamestate = STATE.RUNNING;

	    this.soldier = new Soldier(this);
	    this.sight = new Sight(this);
	    this.gameObjects = [this.soldier, this.sight];
	    new Interface(this.sight, this.soldier, this);
	    this.lives = 5;
	    this.currentScore = 0;
	}

	update(deltaTime) {

	    if (this.lives === 0) this.gamestate = STATE.GAMEOVER;

	    if (
			this.gamestate === STATE.MENU ||
			this.gamestate === STATE.GAMEOVER
	    )
	      	return;

	    if (this.soldier.hp === 0) {
	      	this.gamestate = STATE.RESPAWN;
	    }
	    if(this.gamestate === STATE.RUNNING){
		    [...this.gameObjects].forEach(object =>
		      	object.update(deltaTime)
		    );
		}
	}

	draw(c) {

		[...this.gameObjects].forEach(object => object.draw(c));

		c.font = "30px Arial";
		c.fillStyle = "black";
		c.textAlign = "right";
		c.fillText("Lives: " + this.lives, (this.gameWidth - 85), 25);

		c.font = "30px Arial";
		c.fillStyle = "black";
		c.textAlign = "left";
		c.fillText("Kills: " + (this.currentScore), 85, 25);

		if (this.gamestate === STATE.MENU) {
			c.rect(0, 0, this.gameWidth, this.gameHeight);
			c.fillStyle = "rgba(0,0,0,0.5)";
			c.fill();
			c.font = "30px Arial";
			c.fillStyle = "white";
			c.textAlign = "center";
			c.fillText(
			"PRESS SPACEBAR TO BEGIN",
			this.gameWidth / 2,
			this.gameHeight / 2
			);
		}

		if (this.gamestate === STATE.RESPAWN) {
			c.rect(0, 0, this.gameWidth, this.gameHeight);
			c.fillStyle = "rgba(0,0,0,0.5)";
			c.fill();
			c.font = "30px Arial";
			c.fillStyle = "white";
			c.textAlign = "center";
			c.fillText(
			"PRESS SPACEBAR TO RESPAWN",
			this.gameWidth / 2,
			this.gameHeight / 2
			);
		}

		if (this.gamestate === STATE.GAMEOVER) {
			c.rect(0, 0, this.gameWidth, this.gameHeight);
			c.fillStyle = "rgba(0,0,0,1)";
			c.fill();
			c.font = "30px Arial";
			c.fillStyle = "white";
			c.textAlign = "center";
			c.fillText("GAME OVER", this.gameWidth / 2, this.gameHeight / 2);
			c.fillText(
			"PRESS SPACEBAR TO RECONNECT",
			this.gameWidth / 2,
			this.gameHeight / 2 + 40
			);
		}
  	}
}