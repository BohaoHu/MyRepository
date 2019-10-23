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