// init variables, constants, and irisData array


// create numSamples var and currentSample var 

// create variable for framesof data
var oneFrameOfData = nj.zeros([5, 4, 6]);


var numPredictions = 0;
var meanPredictions = 0;
var currentPredictions = 0;
var hardCodedDigit = 2;


// variables for window sizing 
var newXMax = window.innerWidth;
var newXMin = 0;
var newYMax = window.innerHeight;
var newYMin = 0;

// tracking variables
var previousNumHands = 0;
var currentNumHands = 0;
var controllerOptions = {};
const knnClassifier = ml5.KNNClassifier();

var currentFeatures;
var numSamples = 0;
nj.config.printThreshold = 6;
var predictedLabel;
var currentLabel;
var trainingCompleted = false;
//var predictedClassLabels = nj.zeros([1,test.shape[3]]);


Leap.loop(controllerOptions, function(frame)
{
	clear();	
	if (trainingCompleted == false)
	{	
		Train();
	}
	HandleFrame(frame);
});

function GotResults(err, result)
{
	//predictedClassLabels.set(parseInt(result.label));


	
	var currentPredictions = result.label;
	//console.log(result.label);
	
	//console.log("b");
	numPredictions += 1;
	meanPredictions = (((numPredictions-1) * meanPredictions) + (currentPredictions == 3)) / numPredictions;
	//console.log(numPredictions + ", " + meanPredictions + ", " + currentPredictions);
	//testingSampleIndex++;

	//if (testingSampleIndex >= test.shape[3])
	//{
	//  testingSampleIndex = 0;
	//}

}


// HandleFrame function, returns first hand that is within frame 
function HandleFrame(frame)
{
	
	// if statement to determine how many hands are in frame 
	if(frame.hands.length == 1 || frame.hands.length == 2)
	{	var interactionBox = frame.interactionBox;
		var hand = frame.hands[0];	
		HandleHand(hand, frame, interactionBox);	

		//console.log(oneFrameOfData.toString());

		Test();	
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

	var normalizedPrevJoint = interactionBox.normalizePoint (bone[boneI].prevJoint, true);
	var normalizedNextJoint = interactionBox.normalizePoint(bone[boneI].nextJoint, true);

	oneFrameOfData.set(fingerIndex, boneIndex, 0, normalizedPrevJoint[0]);
	oneFrameOfData.set(fingerIndex, boneIndex, 1, normalizedPrevJoint[1]);
	oneFrameOfData.set(fingerIndex, boneIndex, 2, zb);
	oneFrameOfData.set(fingerIndex, boneIndex, 3, normalizedNextJoint[0]);
	oneFrameOfData.set(fingerIndex, boneIndex, 4, normalizedNextJoint[1]);
	oneFrameOfData.set(fingerIndex, boneIndex, 5, zt);

	var canvasXPrev = newXMax * normalizedPrevJoint[0];
	var canvasXNext = newXMax * (normalizedNextJoint[0]);
	var canvasYPrev = newYMax * (1 - normalizedPrevJoint[1]);
	var canvasYNext = newYMax * (1 - normalizedNextJoint[1]);
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
			r = 128;
			g = 128;
			b = 128;	
		}

		else if(boneIndex == 1)
		{
			strokeWidth = 8;
			r = 96;
			g = 96;
			b = 96;		
		}

		else if(boneIndex == 2)
		{
			strokeWidth = 5;
			r = 64;
			g = 64;
			b = 64;		
		}

		else if(boneIndex == 3)
		{
			strokeWidth = 5;
			r = 32;
			g = 32;
			b = 32;
		}
	}

	// if two hands are in frame, the hand turns red
	else if(frame.hands.length == 2)
	{
		// if statements to indicate darker bones are bones father from hand
		if(boneIndex == 0)
		{
			strokeWidth = 10;
			r = 128;
			g = 128;
			b = 128;		
		}

		else if(boneIndex == 1)
		{
			strokeWidth = 8;
			r = 96;
			g = 96;
			b = 96;		
		}

		else if(boneIndex == 2)
		{
			strokeWidth = 5;
			r = 64;
			g = 64;
			b = 64;		
		}

		else if(boneIndex == 3)
		{
			strokeWidth = 5;
			r = 32;
			g = 32;
			b = 32;
		}
	}
	// give hand color and width
	stroke(r,g,b);
	strokeWeight(strokeWidth);
	// draw those hand lines
	line(canvasXPrev, canvasYPrev, canvasXNext, canvasYNext);
}

// train function, go through all iris data and add to knnClassifier
function Train()
{
	trainingCompleted = true;
	for (var tensorIterator = 0; tensorIterator < train3.shape[3]; tensorIterator++)
	{
		var features = train3.pick(null, null, null, tensorIterator);
		features = features.reshape(120);
		knnClassifier.addExample(features.tolist(), 3);
		features = train2.pick(null, null, null, tensorIterator);
		features = features.reshape(120);
		knnClassifier.addExample(features.tolist(), 2);
		//console.log(tensorIterator + " " + features.toString());
		
	}
}

// test function, test knn classifier
function Test()
{
	currentFeatures = oneFrameOfData.pick(null, null, null, 0);
	
	predictedLabel = knnClassifier.classify(currentFeatures.tolist(), GotResults);
}

function CenterData()
{

}






