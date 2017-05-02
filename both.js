
const width = document.body.clientWidth;
const height = document.body.clientHeight;


var pongPlay = function (p){

	var play = true; //set this so we know to play!!

	var canDimX = Math.floor(((width*.87)/30))*30;
	var canDimY=Math.floor((((height/2)*.97)/30))*30;

	//make objects here
	var player = new Player();
	var npc = new NPC();
	var ball = new Ball();

	//p5 magic goes here!
	p.setup = function() {

		//lots of coding to center the canvas
		var cnv = p.createCanvas(canDimX,canDimY);

	  	var xCan = (p.windowWidth-canDimX)/2;
	  	var yCan = (p.windowHeight*.02);
	  	cnv.position(xCan,yCan);
	  	p.background(0);//make it black for pong!

	  	

	};
	p.draw =function() {
		p.background(0);

		if (play){
			player.show();
			npc.show();
			ball.show();
			ball.coll();
		}

	};


	function gameOver(){
		//pause the game
		player = new Player();
		npc = new NPC();
		ball = new Ball();


		//location.reload();

	}

	///put contructors here
	function Player(){
		this.width = 30;
		this.height = 150;
		this.x = 10;
		this.y = 10;
		this.top = 5;
		this.ai = p.random(.1,.4); //to make it change each time

		this.show = function(){
			p.fill(255);
			
			//pretty random ai here but it works pretty well
			if(this.y+(this.height/2)<ball.y && ball.x<(canDimX* this.ai)){
				this.y = this.y+3;
			}
			else if(ball.x<(canDimX*this.ai)){
				this.y = this.y-3;
			}

			if (this.y > (canDimY-this.height-this.top)) this.y = (canDimY-this.height-this.top);
			if (this.y < (this.top)) this.y = (this.top);

			p.rect(this.x,this.y,this.width, this.height);
		}
	}

	function NPC(){
		this.width = 30;
		this.height = 150;
		this.x = canDimX-this.width-10;
		this.y = canDimY/2;
		this.top = 5;
		this.ai = p.random(.6,.8);

		this.show = function(){
			p.fill(255);

			//pretty random ai here but it works pretty well
			if(this.y+(this.height/2)<ball.y && ball.x > (canDimX*this.ai)){
				this.y = this.y+4;
			}
			else if(ball.x>(canDimX*this.ai)){
				this.y = this.y-4;
			}

			if (this.y > (canDimY-this.height-this.top)) this.y = (canDimY-this.height-this.top);
			if (this.y < (this.top)) this.y = (this.top);
			
			p.rect(this.x,this.y,this.width, this.height);
		}
	}

	function Ball(){
		this.diam = 25;

		this.speedX = 5;
		this.speedY = 5;

		this.x = canDimX/2;
		this.y = canDimY/2;

		this.show = function(){
			p.fill(255);

			p.ellipse(this.x,this.y,this.diam,this.diam);
			this.x = this.x + this.speedX;
			this.y = this.y +this.speedY;
		}

		this.coll = function(){
			this.topBot();
			this.right();
			this.left();

			//check if still in play
			if (this.x > canDimX || this.x < 0){
				gameOver();
			}

		}

		//check collisions for top and bottom
		this.topBot = function(){
			if (this.y+(this.diam/2) > canDimY || this.y < (this.diam/2) && this.x > 0 && this.x < canDimX && this.y > 0 && this.y < canDimY){
				this.speedY = this.speedY *-1;
				this.y = this.y + this.speedY;
			}
		}
		
		//now check collisions for the npc on the right
		this.right = function(){
			
			//so many checks to get these collisions right... might have added a few unescary ones but it freaken works!
			if (this.x + (this.diam/2) > npc.x && this.y + (this.diam/2) > npc.y && this.y + (this.diam/2) < npc.y + npc.height && this.x > 0 && this.x < canDimX && this.y > 0 && this.y < canDimY) {
				this.speedX = this.speedX *-1;
				this.x = this.x + this.speedX;
			}
			else if (this.y + (this.diam/2) > npc.y && this.y < npc.y + npc.y + npc.height && this.x + (this.diam/2) > npc.x && this.x < npc.x + npc.x && this.x > 0 && this.x < canDimX && this.y > 0 && this.y < canDimY) {
				this.speedY = this.speedY*-1;
				this.y = this.y + this.speedY;
			}
			else if (this.y + (this.diam/2) < npc.y + npc.height && this.y > npc.y && this.x > npc.x && this.x < this.x + npc.height && this.x > 0 && this.x < canDimX && this.y > 0 && this.y < canDimY) {
				this.speedY = this.speedY*-1;
				this.y = this.y + this.speedY;


			}
		}

		this.left = function(){
			//pretty similiar to previous checks, but simplified
			if (this.x - (this.diam/2) < player.x + player.width && this.y + (this.diam/2) > player.y && this.y + (this.diam/2) < player.y + player.height && this.x > 0 && this.x < canDimX && this.y > 0 && this.y < canDimY) {
				this.speedX = this.speedX *-1;
				this.x = this.x + this.speedX;
			}

		}
	}


}



///////////////end the game



var myp5 = new p5(pongPlay);



/////////////////////////////////////snake///////////////////////////////////////////////

var snakePlay = function (s){


	var flag = false;

	var snake = new Snake();
	var food = new Food();
	var canDimX = Math.floor(((width*.87)/30))*30;
	var canDimY=Math.floor((((height/2)*.97)/30))*30;
	var play = true;

	s.setup =function() {

		//we need to set canvas dimensions to be divisible by 30 because thats our current size of snake and its on a grid

		
	  	var cnv = s.createCanvas(canDimX,canDimY);
	 

	  	var xCan = (s.windowWidth-canDimX)/2;
	  	var yCan = (s.windowHeight*.5);
	  	cnv.position(xCan,yCan);
	  	s.background(200);
	  	s.frameRate(9); //need to slow it down or else it doesnt work
	 
	  
	}


	s.draw = function(){
		// Drawing code goes here
		s.background(0);
		if (play){
			snakeNPC();
			snake.move();
			food.show();
			snake.show();
		}

		
		//console.log(food.x,food.y);

	}


	//snake constructor
	function Snake(){

		//set starting variables
		this.tail = []; //setup a tail array that will be full of x,y location of trailing boxes
		this.x = 0;
		this.y = 0;
		this.direction = 2; //directions are left:1, up:2, right:3, down:4
		this.size = 30; //size of box


		//lets figure out movement stuff
		this.move = function(){

			//moves left
			if (this.direction == 1){
				this.x = this.x - this.size;
			}

			//moves up
			if (this.direction == 2){
				this.y = this.y + this.size;

			}
			
			//moves right
			if (this.direction == 3){
				this.x = this.x +this.size;

			}

			//moves down
			if (this.direction == 4){
				this.y = this.y - this.size;
			}
			if(this.x<0 || this.y<0 || this.x>=canDimX || this.y>=canDimY){
				gameOver();
			}

			for (var i = this.tail.length-1; i>=1; i--){
				this.tail[i] = this.tail[i-1];
			}

			if(this.x == food.x && this.y == food.y){
				this.eat();
			}else{
						//also check if we have hit our own tail!!
			for(var i =2; i<this.tail.length; i++){
				if (this.tail[0][0] == this.tail[i][0] && this.tail[0][1] == this.tail[i][1]){
					gameOver();
				}
			}
			}

			 this.tail[0] = [this.x,this.y];

			
		};


		//lets see the snake!
		this.show = function(){
			s.fill(255,0,0);
			s.stroke(180);

			for(var i=0; i<this.tail.length;i++){
				s.rect(this.tail[i][0], this.tail[i][1], this.size, this.size);
			}
			//rect(this.x,this.y, this.size,this.size);
		}

		this.eat = function(){
			food.move();
			this.tail.push([this.x,this.y]); //add to the tail!
		}

	}

	// make a food contructor
	function Food(){
		this.size=30;

		this.x=3*this.size;
		this.y=3*this.size;

		//same show function as for Snake
		this.show = function(){
			s.fill(45,200,45);
			s.stroke(180);
			s.rect(this.x,this.y, this.size, this.size);
		}

		this.move = function(){
			this.x = Math.floor(s.random(0,(canDimX)/this.size)) * this.size;
			this.y = Math.floor(s.random(0,(canDimY)/this.size)) * this.size;
		}

	}

	function gameOver(){
		//pause the game


		//location.reload();

	}

	//keep track of keys this is a built in function in p5
	function snakeNPC() {
		if (food.x>snake.x) snake.direction=3;
		if (food.x<snake.x) snake.direction =1;
		if(food.y>snake.y) snake.direction = 2;
		if (food.y<snake.y) snake.direction = 4;
	}

}	

var myp5 = new p5(snakePlay);