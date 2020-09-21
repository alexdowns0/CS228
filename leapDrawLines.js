


var controllerOptions = {};



var rawXMin = 10000;
var rawXMax = -10000;
var rawYMin = 10000;
var rawYMax = -10000;
var newXMax = window.innerWidth;
var newXMin = 0;
var newYMax = window.innerHeight;
var newYMin = 0;
var b = 0;


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
	// var for each finger from hand 
	var fingers = hand.fingers;
	
	for (boneIndex = 3; boneIndex >= 0; boneIndex--)
	{
		for(var fingerIndex = 0; fingerIndex < 5; fingerIndex++)
		{
			// only one bone that is being called
			bone = fingers[fingerIndex].bones[boneIndex];
			HandleBone(bone);
			//console.log(b, fingerBone);
			//console.log(boneIndex, fingerIndex, bone);
			
		}	
	}		
}

// function HandleFinger(fingers)
//  {	    		
	
//  }

function HandleBone(bone)
{
	var boneType = ["metacarpal", "proximal phalange", "intermediate phalange", "distal phalange"];

	var boneI = bone.type
	//var currentFingerBone = boneType[boneI];
	var bonePreviousJ = bone.prevJoint;
	var boneNextJ = bone.nextJoint;
	//console.log(b, bonePreviousJ, boneNextJ);
	

	var x1 = boneNextJ[0];
	var y1 = boneNextJ[1];
	var z1 = boneNextJ[2];
	var x2 = bonePreviousJ[0];
	var y2 = bonePreviousJ[1];
	var z2 = bonePreviousJ[2];

	console.log(b, x1, y1, z1);

	if(boneNextJ[0] < rawXMin)
	{
		rawXMin = boneNextJ[0]; 
		    		
	}

	if(boneNextJ[0] > rawXMax)
	{
		rawXMax = boneNextJ[0]; 
	}

	if(boneNextJ[1] < rawYMin)
	{
		rawYMin = boneNextJ[1];
	}

	if(boneNextJ[1] > rawYMax)
	{
		rawYMax = boneNextJ[1];
	}

	y1 = window.innerHeight - y1;
		    	
	x1 = (((x1 - rawXMin) * (newXMax - newXMin)) / (rawXMax - rawXMin)) + newXMin;
		    	
	y1 = (((y1 - rawYMin) * (newYMax - newYMin)) / (rawYMax - rawYMin)) + newYMin;

	

	line(x1,y1,x2,y2);
	//return circle(x1, y1, 25);

}
				
Leap.loop(controllerOptions, function(frame) 
{
	b+=1;
	clear();		
	HandleFrame(frame);	
}
		
);

