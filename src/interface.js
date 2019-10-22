class Interface {
	constructor(sight, soldier, game){

		// Resizing the browser window causes the init function to rebuild
		addEventListener("resize", () => {
		    canvas.width = innerWidth;
		    canvas.height = innerHeight;
		    init()
		});

		// Mouse events mouse move changes the sight's coordinates, 
		// while scrolling the mousewheel changes weapon 
		// (note: the deltaY value returned will differ from browser to browser
		// thus, absolute value is taken)
		addEventListener("mousedown", event => {
		  	if (event.which) {
		    	case 1:
		    		soldier.shoot();
		    		break;
		    	case 2:
		    		soldier.throw();
		    		break;
		    	case 3:
		    		soldier.pick();
		    		break;
		  	}else if (event.buttons) {
		    	case 0:
		    		soldier.shoot();
		    		break;
		    	case 1:
		    		soldier.throw();
		    		break;
		    	case 2:
		    		soldier.pick();
		    		break;
		  	}
		});
		addEventListener("mousemove", event => {
		    sight.x = event.clientX;
		    sight.y = event.clientY;
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
		          	if (soldier.speed.x < 0) soldier.stopX();
		          	break;
		        case 38:
		        	if (soldier.speed.y > 0) soldier.stopY();
		        	break;
		        case 39:
		          	if (soldier.speed > 0) soldier.stopX();
		          	break;
		        case 38:
		        	if (soldier.speed.y > 0) soldier.stopY();
		        	break;
		      }
		});
	}
}