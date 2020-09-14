var controllerOptions = {};



var rawXMin = 10000;
var rawXMax = -10000;
var rawYMin = 10000;
var rawYMax = -10000;
var newXMax = window.innerWidth;
var newXMin = 0;
var newYMax = window.innerHeight;
var newYMin = 0;

function HandleFrame(frame)
{
	if(frame.hands.length == 1)
	{
		
		var hand = frame.hands[0];
		HandleHand(hand);	
	}
}

function HandleHand(hand)
{	
	var fingers = hand.fingers;
	
	for (i = 0; i < fingers.length; i++)
	{
		var current = fingers[i];
		HandleFinger(current);
	}
}

function HandleFinger(current)
{	     	
		var x = current.tipPosition[0];
		var y = current.tipPosition[1];
		var z = current.tipPosition[2];
		//console.log(i, x ,y);
		
	
		if(current.tipPosition[0] < rawXMin)
		{
			rawXMin = current.tipPosition[0]; 
			    		
		}
		

		if(current.tipPosition[0] > rawXMax)
		{
			rawXMax = current.tipPosition[0];
		}

		if(current.tipPosition[1] < rawYMin)
		{
			rawYMin = current.tipPosition[1];
		}


		if(current.tipPosition[1] > rawYMax)
		{
			rawYMax = current.tipPosition[1];
		}

		y = window.innerHeight - y;

		x = (((x - rawXMin) * (newXMax - newXMin)) / (rawXMax - rawXMin)) + newXMin;
			    	
		y = (((y - rawYMin) * (newYMax - newYMin)) / (rawYMax - rawYMin)) + newYMin;
		console.log(x);
		console.log(y);
		circle(x, y, 50);
}
	

		
		
				

Leap.loop(controllerOptions, function(frame) 
{
	clear();		
	HandleFrame(frame);
	
	
}
	
	
);