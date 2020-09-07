var controllerOptions = {};

// browswer width
var x = 1272;
// browser height
var y = 680;

Leap.loop(controllerOptions, function(frame) 
{
	// clear();
	// circle(x, y, 25);
	// randNumX = (Math.random() * 2) - 1;
	// randNumY = (Math.random() * 2) - 1;
	// x += randNumX;
	// y += randNumY;
	
	if(frame.hands.length == 1){
		var hand = console.log(frame.hands[0]);
	}
	

	// if (frame.length > 0)
	// {
	// 	console.log(frame.hands);
	// }
	
}
);