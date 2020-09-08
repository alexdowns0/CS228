var controllerOptions = {};



var rawXMin = 2000;
var rawXMax = -2000;
var rawYMin = 2000;
var rawYMax = -2000;
var newXMin = 0;
var newXMax = window.innerWidth;
var newXVal = ((rawXMin - rawXMax)) / (rawXMax - rawXMax) * (100 - 0);
var newYMin = 0;
var newYVal = ((rawYMin - rawYMax)) / (rawYMax - rawYMax) * (100 - 0);
var newYMax = window.innerHeight;



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
		    	//console.log(current.tipPosition);
		    	var x = current.tipPosition[0];
		    	var y = current.tipPosition[1];
		    	var z = current.tipPosition[2];

		    	if(x < rawXMin)
		    	{
		    		x == rawXMin;
		    	}

		    	if(x > rawXMax)
		    	{
		    		x == rawXMax;
		    	}

		    	if(y < rawYMin)
		    	{
		    		y == rawYMin;
		    	}

		    	if(y > rawYMax)
		    	{
		    		y == rawYMax;
		    	}

		    	y = window.innerHeight - y;
		    	return circle(x, y, 25);

			}
		}

}

Leap.loop(controllerOptions, function(frame) 
{
	clear();		
	HandleFrame(frame);
	


	
}
	
	
);