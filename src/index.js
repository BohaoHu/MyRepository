
class Soldier{

	constructor(game){

		this.image = document.getElementById("img_sprites");
		this.game = game;
		this.gameWidth = this.game.gameWidth;
		this.gameHeight = this.game.gameHeight;

		this.frame_set = [[0,1,2,3,4],[5,6,7,8,9],[10,11,12,13,14],[15,16,17,18,19]];
		this.frame = 0;
		this.row = 0;
	    this.frame_index = 0;

    	this.radius = 30;		
    	this.position = {
    	  	x: this.gameWidth/2 - this.radius/2,
    	  	y: this.gameHeight/2 - this.radius/2
    	};
		this.height = 60;
		this.width = 40;
    	this.maxSpeed = { x: 6, y: 6 };
    	this.velocity = {
        	x: 0,
        	y: 0
    	};

    	this.hp = 100;
		this.isStop = true;
		this.isShooting = false;
		this.delayFlag = 0;
		this.delay = 10;
	}

	reset() {
    	this.position = {
    	  	x: this.gameWidth/2 - this.radius/2,
    	  	y: this.gameHeight/2 - this.radius/2
    	};
    	this.hp = 100;
  	}

	draw(c) {
        c.drawImage(
			this.image, 
			this.frame%5 * this.width, 
			this.row * this.height, 
			this.width,
	      	this.height,
			this.position.x,
	      	this.position.y,
			this.width,
	      	this.height
		);

	}

	update(deltaTime) {
		this.delayFlag++;
		if(this.delayFlag > this.delay && (this.velocity.x != 0 || this.velocity.y != 0) && !this.isShooting){
			this.delayFlag = 0;
			this.frame_index = (this.frame_index >= this.frame_set[this.row].length-1) ? 1 : ++this.frame_index;
			this.frame = this.frame_set[this.row][this.frame_index];
		}else if(this.velocity.x === 0 && this.velocity.y === 0){
			this.frame_index = 2;
			this.frame = this.frame_set[this.row][this.frame_index];
		}else if(this.isShooting){
			this.frame_index = 0;
			this.frame = this.frame_set[this.row][this.frame_index];
			this.isShooting = false;
		}

	   	this.position.x += this.velocity.x;
	   	this.position.y += this.velocity.y;
   		if (this.position.x < 0) 
   			this.position.x = 0;
   		if (this.position.x + this.width > this.gameWidth)
     		this.position.x = this.gameWidth - this.width;
     	if (this.position.y < 0) 
   			this.position.y = 0;
   		if (this.position.y + this.height > this.gameHeight)
     		this.position.y = this.gameHeight - this.height;
	}

	shoot(){
		this.isShooting = true;
	}
	pick(){

	}
	prevWeapon(){

	}
	nextWeapon(){

	}
	moveLeft() {
		this.row = 3;
	  	this.velocity.x = -this.maxSpeed.x;
	}
	moveRight() {
		this.row = 2;
	  	this.velocity.x = this.maxSpeed.x;
	}
	moveUp(){
		this.row = 1;
		this.velocity.y = -this.maxSpeed.y;
	}
	moveDown(){
		this.row = 0;
		this.velocity.y = this.maxSpeed.y;
	}
	stopX() {
		this.velocity.x = 0;
	}
	stopY() {
	  	this.velocity.y = 0;
	}
}

class Sight {
	constructor(game){
		this.image = document.getElementById("img_sight");
		this.game = game;
	    this.position = {
	     	x: this.game.gameWidth/2 - this.size/2,
	      	y: this.game.gameHeight/2 - this.size /2
	    };
	    this.size = 35;
	    this.reset();
  	}

  	reset() {
	    this.position = {
	     	x: this.game.gameWidth/2 - this.size/2,
	      	y: this.game.gameHeight/2 - this.size /2
	    };
  	}
	draw(c) {
    	c.drawImage(
			this.image,
			this.position.x,
			this.position.y,
			this.size,
			this.size
		);
  	}
	update(deltaTime) {
		addEventListener("mousemove", event => {
		    this.position.x = event.clientX - this.size/2;
		    this.position.y = event.clientY - this.size/2;
		});
  	}
}

class Interface {
	constructor(sight, soldier, game){

		// Resizing the browser window causes the init function to rebuild
		addEventListener("resize", () => {
			canvas.width = innerWidth;
			canvas.height = innerHeight;
		    game.gameWidth = canvas.width;
		    game.gameHeight = canvas.height;
		});

		// Mouse events mouse move changes the sight's coordinates, 
		// while scrolling the mousewheel changes weapon 
		// (note: the deltaY value returned will differ from browser to browser
		// thus, absolute value is taken)
		addEventListener("mousedown", event => {
		  	switch(event.which) {
		    	case 1:
		    		soldier.shoot();
		    		break;
		    	case 2:
		    		soldier.throw();
		    		break;
		    	case 3:
		    		soldier.pick();
		    		break;
		  	}
		});

		addEventListener("wheel", event => {
		  	switch (Math.sign(event.deltaY)) {
		  		case 1:
		  			soldier.prevWeapon();
		  			break;
		  		case -1:
		  			soldier.nextWeapon();
		  	}
		});

		// Keypresses call character's move functions,
		// pause and start keys are also added
		addEventListener("keydown", event => {
		  	switch (event.keyCode) {
			    case 37:
			      	soldier.moveLeft();
			      	break;
			    case 38:
			    	soldier.moveUp();
			    	break;
			    case 39:
			      	soldier.moveRight();
			      	break;
			    case 40:
			    	soldier.moveDown();
			    	break;
			    case 27:
			      	game.togglePause();
			      	break;
			    case 32:
			      	game.start();
			      	break;
		  	}
		});
	    addEventListener("keyup", event => {
		    switch (event.keyCode) {
		        case 37:
		          	if (soldier.velocity.x < 0) soldier.stopX();
		          	break;
		        case 38:
		        	if (soldier.velocity.y < 0) soldier.stopY();
		        	break;
		        case 39:
		          	if (soldier.velocity.x > 0) soldier.stopX();
		          	break;
		        case 40:
		        	if (soldier.velocity.y > 0) soldier.stopY();
		        	break;
		      }
		});
	}
}

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














// This is the actual index.js

const STATE = {
	MENU: 0,
	RUNNING: 1,
	RESPAWN: 2,
	GAMEOVER: 3
};

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

let lastTime = 0;

let game = new Game(canvas.width, canvas.height);

function gameLoop(timestamp) {
	let deltaTime = timestamp - lastTime;
	lastTime = timestamp;
	
	requestAnimationFrame(gameLoop);
	c.clearRect(0, 0, canvas.width, canvas.height);
	game.update(deltaTime);
	game.draw(c);

}

requestAnimationFrame(gameLoop);