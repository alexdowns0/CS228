var controllerOptions = {};

// browswer width
var x = 1272;
// browser height
var y = 680;

function HandleFrame(frame){
	// clear();
	// circle(x, y, 25);
	// randNumX = (Math.random() * 2) - 1;
	// randNumY = (Math.random() * 2) - 1;
	// x += randNumX;
	// y += randNumY;
	
	if(frame.hands.length == 1){
		
		var hands = frame.hands[0];
		var fingers = hands.fingers;
	

		var arrayLength = fingers.length;

		for (var i = 0; i < arrayLength; i++){
			current = fingers[i];
			if(current.type == 1)
			{
		    	return console.log(current);
			}
		}

		
	}
}
Leap.loop(controllerOptions, function(frame) 
{
			
	HandleFrame(frame);
}
	
	
);