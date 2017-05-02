

//get dimensions of browser
const width = document.body.clientWidth;
const height = document.body.clientHeight;

var flag = false;

var snake = new Snake();
var food = new Food();
var canDimX = Math.floor(((width*.95)/30))*30;
var canDimY=Math.floor(((height*.95)/30))*30;
var play = true;

function setup() {

	//we need to set canvas dimensions to be divisible by 30 because thats our current size

	
  	var cnv = createCanvas(canDimX,canDimY);
  	console.log(windowHeight);

  	var xCan = (windowWidth-canDimX)/2;
  	var yCan = (windowHeight-canDimY)/2;
  	cnv.position(xCan,yCan);
  	background(200);
  	frameRate(9); //need to slow it down or else it doesnt work
 
  
}


function draw() {
	// Drawing code goes here
	background(0);
	if (play){

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
		fill(255,0,0);
		stroke(180);

		for(var i=0; i<this.tail.length;i++){
			rect(this.tail[i][0], this.tail[i][1], this.size, this.size);
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
		fill(45,200,45);
		stroke(180);
		rect(this.x,this.y, this.size, this.size);
	}

	this.move = function(){
		this.x = Math.floor(random(0,(canDimX)/this.size)) * this.size;
		this.y = Math.floor(random(0,(canDimY)/this.size)) * this.size;
	}

}

function gameOver(){
	//pause the game
	play=false;

	var restart = document.getElementById('restart');
	restart.style.visibility="visible";

	restart.addEventListener("click", function(){
		location.reload();

	});

	//location.reload();

}

//keep track of keys this is a built in function in p5
function keyPressed() {

  if (keyCode === UP_ARROW) {
    snake.direction = 4;
  } else if (keyCode === DOWN_ARROW) {
    snake.direction = 2;
  } else if (keyCode === RIGHT_ARROW) {
    snake.direction = 3;
  } else if (keyCode === LEFT_ARROW) {
    snake.direction = 1;
  }
}
