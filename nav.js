
const width = document.body.clientWidth;
const height = document.body.clientHeight;

var canDimX = Math.floor(((width*.96)));
var canDimY=Math.floor(((height*.96)));



//p5 magic goes here!
function setup(){

	//lots of coding to center the canvas
	var cnv = createCanvas(canDimX,canDimY);

  	var xCan = (windowWidth-canDimX)/2;
  	var yCan = (windowHeight-canDimY)/2;
  	cnv.position(xCan,yCan);
  	background(0);//make it black for pong!

  	

}


function draw() {
  background(0);
  fill(255);

}

document.getElementById('snake').addEventListener('click', moveSnake);
document.getElementById('pong').addEventListener('click', movePong);
document.getElementById('spect').addEventListener('click', moveSpect);

function moveSnake(){
	window.location.href="./snake.html"
}

function movePong(){
	window.location.href="./pong.html"

}

function moveSpect(){
	window.location.href="./both.html"
}