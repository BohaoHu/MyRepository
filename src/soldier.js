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