var controllerOptions = {};

// browswer width
var x = 1272;
// browser height
var y = 680;

function HandleFrame(frame)
{
	// clear();
	// circle(x, y, 25);
	// randNumX = (Math.random() * 2) - 1;
	// randNumY = (Math.random() * 2) - 1;
	// x += randNumX;
	// y += randNumY;
	
	if(frame.hands.length == 1)
	{
		
		var hand = frame.hands[0];
		return HandleHand(hand);	
	}
}

function HandleHand(hand)
{
	var finger = hand.fingers;
	
	return HandleFinger(finger);

}

function HandleFinger(finger)
{
	var arrayLength = finger.length;

		for (var i = 0; i < arrayLength; i++)
		{
			current = finger[i];
			if(current.type == 1)
			{
		    	return console.log(current);
			}
		}
}

Leap.loop(controllerOptions, function(frame) 
{
			
	HandleFrame(frame);
	
}
	
	
);