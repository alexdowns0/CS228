var controllerOptions = {};



var rawXMin = 4000;
var rawXMax = -4000;
var rawYMin = 4000;
var rawYMax = -4000;

var newXMax = 0;
var newXMin = window.innerWidth;
var newYMax = window.innerHeight;
var newYMin = 0;

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
		    	console.log(current.tipPosition);
		    	var x = current.tipPosition[0];
		    	var y = current.tipPosition[1];
		    	var z = current.tipPosition[2];

		    	if(x < rawXMin)
		    	{
		    		current.tipPosition[0] == rawXMin; 
		    		
		    	}

		    	if(x > rawXMax)
		    	{
		    		current.tipPosition[0] == rawXMax;
		    	}

		    	if(y < rawYMin)
		    	{
		    		current.tipPosition[1] == rawYMin;
		    	}

		    	if(y > rawYMax)
		    	{
		    		current.tipPosition[1] == rawYMax;
		    	}

		    	y = window.innerHeight - y;
		    	
		    	var newX = (((x - rawXMin) * (newXMax - newXMin)) / (rawXMax - rawXMin)) + newXMin;
		    	
		    	var newY = (((y - rawYMin) * (newYMax - newYMin)) / (rawYMax - rawYMin)) + newYMin;

		    	newY = window.innerHeight - newY;

		    	return circle(newX, newY, 25);

			}
		}

}

Leap.loop(controllerOptions, function(frame) 
{
	clear();		
	HandleFrame(frame);
	
	
}
	
	
);