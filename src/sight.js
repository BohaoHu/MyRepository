class Sight {
	constructor(game){
		this.image = document.getElementById("img_sight");
	    this.size = 15;
	    this.reset();
  	}

  	reset() {
	    this.position = {
	     	x: this.game.width / 2 - this.size / 2,
	      	y: this.game.height/2 - this.size /2
	    };
  	}
	draw(ctx) {
    	c.drawImage(
		this.image,
		this.position.x,
		this.position.y,
		this.size,
		this.size
  	}
	update(deltaTime) {
  	}

}