


var controllerOptions = {};
nj.config.printThreshold = 1000;
// create numSamples var and currentSample var 
var numSamples = 2;
var currentSample = 0;
// create variable for framesof data
var framesOfData = nj.zeros([5, 4, 6, numSamples]);

// variables for window sizing 
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
	{	var interactionBox = frame.interactionBox;
		var hand = frame.hands[0];	
		HandleHand(hand, frame, interactionBox);	
	}
}

// HandleHand function, returns fingers and bones within the hand variable
function HandleHand(hand, frame, interactionBox)
{	
	// var for each finger from hand 
	var fingers = hand.fingers;

	// for loop that iterates through each bone (4 total)
	for (var boneI = 3; boneI >= 0; boneI--)
	{
		// for loop that iterates through each finger (5 total)
		for(var fingerI = 0; fingerI < 5; fingerI++)
		{
			// only one bone that is being stored in bone variable
			var bone = fingers[fingerI].bones;

			//console.log(bone, bone.type);

			// variable for strokeWeight
			var strokeWidth = 4;
			var fingerIndex = fingers[fingerI].type;
			// call handlebone function passing three variables
			var boneIndex = bone[boneI].type;
			HandleBone(boneIndex,boneI, bone, strokeWidth, frame, fingerIndex, interactionBox);
		}
	}		
}

// HandleFinger function removed in Del 02 
// function HandleFinger(fingers)
//  {	    		
	
//  }

// TransformCoordinates function, manipulates hand on screen to make sure it isn't inverted and fits well 
// function TransformCoordinates (xt, yt)
// {
// 	if(xt < rawXMin)
// 	{
// 		rawXMin = xt; 	    		
// 	}

// 	if(xt > rawXMax)
// 	{
// 		rawXMax = xt; 
// 	}

// 	if(yt < rawYMin)
// 	{
// 		rawYMin = yt;
// 	}

// 	if(yt > rawYMax)
// 	{
// 		rawYMax = yt;
// 	}
	
	
// 	var newX = (((xt - rawXMin) * (newXMax - newXMin)) / (rawXMax - rawXMin)) + newXMin;	    	
// 	var newY = (((yt - rawYMin) * (newYMax - newYMin)) / (rawYMax - rawYMin)) + newYMin;

// 	newY = window.innerHeight - yt;	  	

// 	return[newX,newY];

// }

// HandleBone function, function to display lines indicating each bone
function HandleBone(boneI, boneIndex, bone, strokeWidth, frame, fingerIndex, interactionBox)
{
	// variables for base of bone x, y, and z; tip of bone x, y, and z
	var xb = bone[boneI].nextJoint[0];
	var yb = bone[boneI].nextJoint[1];
	var zb = bone[boneI].nextJoint[2];
	var xt = bone[boneI].prevJoint[0];
	var yt = bone[boneI].prevJoint[1];
	var zt = bone[boneI].prevJoint[2];

	//var newB = TransformCoordinates(xb,yb);
	//var newBX = newB[0];
	//var newBY = newB[1];
	//var newT = TransformCoordinates(xt,yt);
	//var newTX = newT[0];
	//var newTY = newT[1];

	var normalizedPrevJoint = interactionBox.normalizePoint (bone[boneI].prevJoint, true);
	var normalizedNextJoint = interactionBox.normalizePoint(bone[boneI].nextJoint, true);

	//console.log(normalizedNextJoint);

	// sum of all x y and z for base and tip elements 0 -> 2
	
	var canvasXPrev = newXMax * normalizedPrevJoint[0];
	var canvasXNext = newXMax * (normalizedNextJoint[0]);
	var canvasYPrev = newYMax * (1 - normalizedPrevJoint[1]);
	var canvasYNext = newYMax * (1 - normalizedNextJoint[1]);
	//var canvasZPrev = newXMax * normalizedPrevJoint[2];
	//var canvasZNext = newXMax * normalizedNextJoint[2];


	// 120 element tensor, include current sample per step 13
	framesOfData.set(fingerIndex, boneIndex, 0, currentSample, canvasXPrev);
	framesOfData.set(fingerIndex, boneIndex, 1, currentSample, canvasYPrev);
	framesOfData.set(fingerIndex, boneIndex, 2, currentSample, zt);
	framesOfData.set(fingerIndex, boneIndex, 3, currentSample, canvasXNext);
	framesOfData.set(fingerIndex, boneIndex, 4, currentSample, canvasYNext);
	framesOfData.set(fingerIndex, boneIndex, 5, currentSample, zb);


	//var sum = xt + yt + zt + xb + yb + zb;
	//framesOfData.set(3, sum, xt);
	//framesOfData.set(4, sum, yt);
	//framesOfData.set(5, sum, zt);
	

	// var sum = xt + yt + zt + xb + yb + zb;
	// framesOfData.set(3, sum, xb);
	// framesOfData.set(4, sum, yb);
	// framesOfData.set(5, sum, zb);
	//console.log(framesOfData);

	// variables to store color vals
	var r = 0;
	var g = 0;
	var b = 0;
	
	// if one hand is in frame, the hand is green
	if(frame.hands.length == 1)
	{
		// if statements to indicate darker bones are bones father from hand
		if(boneIndex == 0)
		{
			strokeWidth = 10;
			r = 9;
			g = 232;
			b = 69;	
		}

		else if(boneIndex == 1)
		{
			strokeWidth = 8;
			r = 6;
			g = 161;
			b = 48;		
		}

		else if(boneIndex == 2)
		{
			strokeWidth = 5;
			r = 4;
			g = 110;
			b = 32;		
		}

		else if(boneIndex == 3)
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
		if(boneIndex == 0)
		{
			strokeWidth = 10;
			r = 224;
			g = 12;
			b = 4;		
		}

		else if(boneIndex == 1)
		{
			strokeWidth = 8;
			r = 173;
			g = 12;
			b = 7;		
		}

		else if(boneIndex == 2)
		{
			strokeWidth = 5;
			r = 115;
			g = 9;
			b = 6;		
		}

		else if(boneIndex == 3)
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
	line(canvasXPrev, canvasYPrev, canvasXNext, canvasYNext);
}

// RecordData Function to show when hands switch from 2 to 1 in frame 
function RecordData()
{
	if(currentNumHands == 2)
	{
	  	currentSample++;

	// 	//background('#222222');
	// 	// snapshot of when secondary hand leaves frame
	// 	//console.log(framesOfData.toString());
	}



	// if(currentNumHands == 2)
	// {
	// 	currentSample++;
		
	// }
	if (currentSample == numSamples)
	{
		currentSample = 0;

	}
	
	// grab first tensor
	 console.log( framesOfData.pick(null,null,null,1).toString() );

}

// the infinite loop				
Leap.loop(controllerOptions, function(frame) 
{
	currentNumHands = frame.hands.length;
	clear();
	HandleFrame(frame);
	RecordData();	
	previousNumHands = currentNumHands;
	
	// this is for my own knowledge
	//b+=1;
		
}
		
);