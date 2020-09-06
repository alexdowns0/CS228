var controllerOptions = {};

// browswer width
var x = 1272;
// browser height
var y = 680;

Leap.loop(controllerOptions, function(frame) 
{
	clear();
	circle(x, y, 25);
	randNumX = (Math.random() * 2) - 1;
	randNumY = (Math.random() * 2) - 1;
	x += randNumX;
	y += randNumY;
	
	


}
);
