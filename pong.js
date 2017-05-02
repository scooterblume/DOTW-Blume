
const width = document.body.clientWidth;
const height = document.body.clientHeight;

var play = true; //set this so we know to play!!

var canDimX = Math.floor(((width*.87)/30))*30;
var canDimY=Math.floor(((height*.8)/30))*30;

//make objects here
var player = new Player();
var npc = new NPC();
var ball = new Ball();

//p5 magic goes here!
function setup(){

	//lots of coding to center the canvas
	var cnv = createCanvas(canDimX,canDimY);

  	var xCan = (windowWidth-canDimX)/2;
  	var yCan = (windowHeight-canDimY)/2;
  	cnv.position(xCan,yCan);
  	background(0);//make it black for pong!

  	

}

function draw(){
	background(0);

	if (play){
		player.show();
		npc.show();
		ball.show();
		ball.coll();
	}

}




///put contructors here
function Player(){
	this.width = 30;
	this.height = 150;
	this.x = 10;
	this.y = 10;
	this.top = 5;

	this.show = function(){
		fill(255);
		this.y = mouseY;
		if (this.y > (canDimY-this.height-this.top)) this.y = (canDimY-this.height-this.top);
		if (this.y < (this.top)) this.y = (this.top);

		rect(this.x,this.y,this.width, this.height);
	}
}

function NPC(){
	this.width = 30;
	this.height = 150;
	this.x = canDimX-this.width-10;
	this.y = 10;
	this.top = 5;

	this.show = function(){
		fill(255);

		//pretty random ai here but it works pretty well
		if(this.y+(this.height/2)<ball.y && ball.x > (canDimX/3)){
			this.y = this.y+4;
		}
		else if(ball.x>(canDimX/3)){
			this.y = this.y-4;
		}

		if (this.y > (canDimY-this.height-this.top)) this.y = (canDimY-this.height-this.top);
		if (this.y < (this.top)) this.y = (this.top);
		
		rect(this.x,this.y,this.width, this.height);
	}
}

function Ball(){
	this.diam = 25;

	this.speedX = 5;
	this.speedY = 5;

	this.x = canDimX/2;
	this.y = canDimY/2;

	this.show = function(){
		fill(255);

		ellipse(this.x,this.y,this.diam,this.diam);
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
		
		//so many checks to get these collisions right...
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



///////////////end the game

function gameOver(){
	//pause the game
	play=false;

	var restart = document.getElementById('restart');
	restart.style.visibility="visible";

	restart.addEventListener("click", function(){
		location.reload();

	});

}