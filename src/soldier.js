// 22/10/2019 - newest
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
		
    	this.position = {
    	  	x: this.gameWidth/2 - this.radius/2,
    	  	y: this.gameHeight/2 - this.radius/2
    	};;
		this.height = 60;
		this.width = 40;
    	this.radius = 30;
    	this.maxSpeed = { x: 6, y: 6 };
    	this.velocity = {
        	x: 0,
        	y: 0
    	};

    	this.hp = 100;
		this.isStop = true;
		this.isShooting = false;
		this.delayCompare = 0;
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
			//this.frame%5 * this.width, 
			//this.row * this.height, 
			//this.width,
	      	//this.height,
			this.position.x,
	      	this.position.y,
			this.width,
	      	this.height
		);
	}

	update(deltaTime) {
		this.delayCompare++;
		if(this.delayCompare > this.delay && (this.velocity.x != 0 || this.velocity.y != 0) && !this.isShooting){
			this.delayCompare = 0;
			this.frame_index = (this.frame_index >= this.frame_set[this.row].length) ? 1 : this.frame_index++;
			this.frame = this.frame_set[this.row][this.frame_index];
		}else if(this.velocity.x === 0 || this.velocity.y === 0){
			this.frame_index = 2;
			this.frame = this.frame_set[this.row][this.frame_index];
		}else if(this.isShooting){
			this.frame_index = 0;
			this.frame = this.frame_set[this.row][this.frame_index];
		}

	   	this.position.x += this.velocity.x;
	   	this.position.y += this.velocity.y;
   		if (this.position.x - this.radius < 0) 
   			this.position.x = 0;
   		if (this.position.x + this.radius > this.gameWidth)
     		this.position.x = this.gameWidth - this.radius;
     	if (this.position.y - this.radius < 0) 
   			this.position.y = 0;
   		if (this.position.y + this.radius > this.gameHeight)
     		this.position.y = this.gameHeight - this.radius;
	}

	shoot(){
		this.isShooting;
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