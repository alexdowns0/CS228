var controllerOptions = {};

// variables for window sizing 
var rawXMin = 10000;
var rawXMax = -10000;
var rawYMin = 10000;
var rawYMax = -10000;
var newXMax = window.innerWidth;
var newXMin = 0;
var newYMax = window.innerHeight;
var newYMin = 0;

// tracking variables
var previousNumHands = 0;
var currentNumHands = 0;

// tracker variable to count loop iterations 
var b = 0;

// HandleFrame function, returns first hand that is within frame 
function HandleFrame(frame)
{
	// if statement to determine how many hands are in frame 
	if(frame.hands.length == 1 || frame.hands.length == 2)
	{	
		var hand = frame.hands[0];	
		HandleHand(hand, frame);	
	}
}

// HandleHand function, returns fingers and bones within the hand variable
function HandleHand(hand, frame)
{	
	// var for each finger from hand 
	var fingers = hand.fingers;

	// for loop that iterates through each bone (4 total)
	for (var boneIndex = 3; boneIndex >= 0; boneIndex--)
	{
		// for loop that iterates through each finger (5 total)
		for(var fingerIndex = 0; fingerIndex < 5; fingerIndex++)
		{
			// only one bone that is being stored in bone variable
			var bone = fingers[fingerIndex].bones;

			//console.log(bone, bone.type);

			// variable for strokeWeight
			var strokeWidth = 4;

			// call handlebone function passing three variables
			HandleBone(boneIndex, bone, strokeWidth, frame);

		}
	}		
}

// HandleFinger function removed in Del 02 
// function HandleFinger(fingers)
//  {	    		
	
//  }

// TransformCoordinates function, manipulates hand on screen to make sure it isn't inverted and fits well 
function TransformCoordinates (xt, yt)
{
	if(xt < rawXMin)
	{
		rawXMin = xt; 
		    		
	}

	if(xt > rawXMax)
	{
		rawXMax = xt; 
	}

	if(yt < rawYMin)
	{
		rawYMin = yt;
	}

	if(yt > rawYMax)
	{
		rawYMax = yt;
	}
	
	
	var newX = (((xt - rawXMin) * (newXMax - newXMin)) / (rawXMax - rawXMin)) + newXMin;	    	
	var newY = (((yt - rawYMin) * (newYMax - newYMin)) / (rawYMax - rawYMin)) + newYMin;

	newY = window.innerHeight - yt;	  	

	return[newX,newY];

}

// HandleBone function, function to display lines indicating each bone
function HandleBone(boneIndex, bone, strokeWidth, frame)
{
	// variables for base of bone x, y, and z; tip of bone x, y, and z
	var xb = bone[boneIndex].nextJoint[0];
	var yb = bone[boneIndex].nextJoint[1];
	var zb = bone[boneIndex].nextJoint[2];
	var xt = bone[boneIndex].prevJoint[0];
	var yt = bone[boneIndex].prevJoint[1];
	var zt = bone[boneIndex].prevJoint[2];

	var newB = TransformCoordinates(xb,yb);
	var newBX = newB[0];
	var newBY = newB[1];
	var newT = TransformCoordinates(xt,yt);
	var newTX = newT[0];
	var newTY = newT[1];

	// variables to store color vals
	var r = 0;
	var g = 0;
	var b = 0;
	
	// if one hand is in frame, the hand is green
	if(frame.hands.length == 1)
	{
		// if statements to indicate darker bones are bones father from hand
		if(bone[boneIndex].type == 0)
		{
			strokeWidth = 10;
			r = 9;
			g = 232;
			b = 69;
			
		}

		else if(bone[boneIndex].type == 1)
		{
			strokeWidth = 8;
			r = 6;
			g = 161;
			b = 48;
			
		}

		else if(bone[boneIndex].type == 2)
		{
			strokeWidth = 5;
			r = 4;
			g = 110;
			b = 32;
			
		}

		else if(bone[boneIndex].type == 3)
		{
			strokeWidth = 5;
			r = 2;
			g = 31;
			b = 10;

		}
	}

	// if two hands are in frame, the hand turns red
	else if(frame.hands.length == 2)
	{
		// if statements to indicate darker bones are bones father from hand
		if(bone[boneIndex].type == 0)
		{
			strokeWidth = 10;
			r = 224;
			g = 12;
			b = 4;
			
		}

		else if(bone[boneIndex].type == 1)
		{
			strokeWidth = 8;
			r = 173;
			g = 12;
			b = 7;
			
		}

		else if(bone[boneIndex].type == 2)
		{
			strokeWidth = 5;
			r = 115;
			g = 9;
			b = 6;

			
		}

		else if(bone[boneIndex].type == 3)
		{
			strokeWidth = 5;
			r = 51;
			g = 3;
			b = 2;

		}
	}
	// give hand color and width
	stroke(r,g,b);
	strokeWeight(strokeWidth);

	// draw those hand lines
	line(newBX,newBY,newTX, newTY);

}

// RecordData Function to show when hands switch from 2 to 1 in frame 
function RecordData()
{
	if(currentNumHands == 1 && previousNumHands == 2)
	{
		background('#222222');
	}
}

// the infinite loop				
Leap.loop(controllerOptions, function(frame) 
{
	currentNumHands = frame.hands.length;
	clear();
	HandleFrame(frame);
	RecordData();	
	previousNumHands = currentNumHands;
	// b+=1;
	 	
		
}
		
);