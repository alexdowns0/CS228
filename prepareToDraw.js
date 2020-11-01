var img;
var imgLeft;
var imgRight;
var imgToward;
var imgAway;
var imgUp;
var imgDown;

function setup() 
{ 
	createCanvas(window.innerWidth,window.innerHeight);
	img = loadImage('https://i.postimg.cc/05CxZMQ9/Screen-Shot-2020-10-26-at-11-24-08-AM.png');
	imgLeft = loadImage('https://i.postimg.cc/BQKcPVGz/arrow-Left.png');
	imgRight = loadImage('https://i.postimg.cc/mg3Y81kN/arrow-Right.png');
	imgToward = loadImage('https://i.postimg.cc/gk3ptGWH/arrow-Toward.png');
	imgAway = loadImage('https://i.postimg.cc/Z5cSZj09/arrow-Away.png');
	imgUp = loadImage('https://i.postimg.cc/qvKb07Rz/arrowUp.png');
	imgDown = loadImage('https://i.postimg.cc/jSyXmkgf/arrow-Down.png');
}