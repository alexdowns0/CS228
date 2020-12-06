// init variables, constants, and irisData array


// create numSamples var and currentSample var 
var controllerOptions = {};
// create variable for framesof data
var oneFrameOfData = nj.zeros([5, 4, 6]);

var numPredictions = 0;
var meanPredictions = 0;
var hardCodedDigit = 3;

// add program state var del 07
var programState = 0;

// variables for window sizing 
var newXMax = window.innerWidth;
var newXMin = 0;
var newYMax = window.innerHeight;
var newYMin = 0;

// tracking variables
var previousNumHands = 0;
var currentNumHands = 0;

const knnClassifier = ml5.KNNClassifier();

var currentFeatures = 0;
var numSamples = 0;
nj.config.printThreshold = 6;

var trainingCompleted = false;
//var predictedClassLabels = nj.zeros([1,test.shape[3]]);
var digitToShow = 9;

// timeSinceLastDigit var 
var timeSinceLastDigitChange = new Date();


var list;
var username;
var gameOver = false;
var totalDigitsPassed;
var winner = false;

var mathMode = false;


function SignIn2()
{
	username = document.getElementById('username').value;
	list = document.getElementById('users');
	if (IsNewUser(username,list) == true)
	{
		CreateNewUser(username, list);
		CreateSignInItem(username, list);
		RecordPoints(username, list);
		CurrentPoints(username, list);
		
			
	}

	else
	{
		ID = String(username) + "_signins";
		listItem = document.getElementById(ID);
		listItem.innerHTML = parseInt(listItem.innerHTML) + 1;
		ResetCurrentPoints(username, list);
		//RecordPoints(username, list);


		//startCounter();
		
		// TODO: Insert timer
	}
		//ResetCurrentPoints(username, list);
	//console.log(list.innerHTML);
	mathMode = true;
   return false;
}




function SignIn()
{
	//console.log('Sign in');
	username = document.getElementById('username').value;
	list = document.getElementById('users');
	if (IsNewUser(username,list) == true)
	{
		CreateNewUser(username, list);
		CreateSignInItem(username, list);
		RecordPoints(username, list);
		CurrentPoints(username, list);
		
			
	}

	else
	{
		ID = String(username) + "_signins";
		listItem = document.getElementById(ID);
		listItem.innerHTML = parseInt(listItem.innerHTML) + 1;
		ResetCurrentPoints(username, list);
		//RecordPoints(username, list);


		//startCounter();
		
		// TODO: Insert timer
	}
		//ResetCurrentPoints(username, list);
	//console.log(list.innerHTML);
   return false;
}

function IsNewUser(username, list)
{
	//console.log(list.innerHTML);
	var users = list.children;
	var usernameFound = false;
	for (var i = 0; i < users.length; i++)
	{
		if (username == users[i].innerHTML)
		{
			usernameFound = true;
			//RecordPoints(username, list);
			//CurrentPoints(username, list);
			//ResetCurrentPoints(username, list);
		}
		
		//console.log(users[i] + " " + users[i].innerHTML);
	}
	
	newUser = usernameFound == false;
	return usernameFound == false;
}

function CreateNewUser(username, list)
{
	var item = document.createElement('li');
	item.innerHTML = String(username);
	item.id = String(username) + "_name";
	
	list.appendChild(item);
	//ResetCurrentPoints(username, list);
	//resetCurrentPoints();

}

function CreateSignInItem(username, list)
{
	var itemB = document.createElement('li');
	itemB.innerHTML = 1;
	itemB.id = String(username) + "_signins";
	
	list.appendChild(itemB);
	//ResetCurrentPoints(username, list);
}

function RecordPoints(username, list)
{
	var itemC = document.createElement('li');
	itemC.innerHTML = 0;
	itemC.id = String(username) + "_pr";
	list.appendChild(itemC);
}

function CurrentPoints(username, list)
{
	var itemD = document.createElement('li');
	itemD.innerHTML = 0;
	itemD.id = String(username) + "_currentPoints";
	list.appendChild(itemD);
}

function AddPoints()
{
	ID = String(username) + "_currentPoints";
	listItem = document.getElementById(ID);
	listItem.innerHTML = parseInt(listItem.innerHTML) + 5;

	IDB = String(username) + "_pr";
	listItemB = document.getElementById(IDB);

}

function DeductPoints()
{
	ID = String(username) + "_currentPoints";
	listItem = document.getElementById(ID);
	listItem.innerHTML = parseInt(listItem.innerHTML) - 1;
	//console.log(ID);
	//console.log(listItem);
	//if(listItem.innerHTML > listItemB.innerHTML)
	//{
   //     listItemB.innerHTML = parseInt(listItem.innerHTML);
    //    winner = true;
   // }
}

function ResetCurrentPoints(username ,list)
{
	ID = String(username) + "_currentPoints";
	listItem = document.getElementById(ID);
	listItem.innerHTML = 0;
}

function DetermineState(frame)
{
	if (frame.hands.length == 0)
	{
		programState = 0;
	}
	else if (HandIsUncentered())
	{
		programState = 1;
	}
	else if (mathMode == true)
	{
		programState = 3;
	}
	else 
	{
		programState = 2; 
	}

}

function HandleState0(frame)
{

	DrawImageToHelpUserPutTheirHandOverTheDevice();
}

function HandleState1(frame)
{
	HandleFrame(frame);
	//HandleFrame(frame);
	if (HandIsTooFarToTheLeft())
	{
		DrawArrowRight();
		
	}

	else if (HandIsTooFarToTheRight())
	{
		DrawArrowLeft();
		
	}

	else if (HandIsTooHigh())
	{
		DrawArrowDown();
	}

	else if (HandIsTooLow())
	{
		DrawArrowUp();
	}

	else if (HandIsTooClose())
	{
		DrawArrowAway();
	}

	else if (HandIsTooFar())
	{
		DrawArrowClose();
	}
	//Test();
	
}

function DrawArrowClose()
{
	image(imgAway, window.innerWidth/2, 0,window.innerWidth/2, window.innerHeight/2);
}
function DrawArrowAway()
{
	image(imgToward, window.innerWidth/2, 0, window.innerWidth/2, window.innerHeight/2);
}

function DrawArrowDown()
{
	image(imgUp, window.innerWidth/2, 0, window.innerWidth/2, window.innerHeight/2);
}

function DrawArrowUp()
{
	image(imgDown, window.innerWidth/2, 0, window.innerWidth/2, window.innerHeight/2);
}

function HandleState3(frame)
{

	HandleFrame(frame);
	DrawLowerRightPanel();
	DetermineWhetherToSwitchDigits();
	DrawLowerLeftPanel();
	//Test();
}

function HandleState2(frame)
{

	HandleFrame(frame);
	DrawLowerRightPanel();
	DetermineWhetherToSwitchDigits();
	DrawLowerLeftPanel();
	//Test();
}

function DrawLowerLeftPanel()
{
	//if (newUser == false)
	//{
	//	text("Previous Score: ", 0, window.innerHeight/2, window.innerWidth/4,window.innerHeight/4);
	///}
	//else
	//{
	//	text("No New Score", 0, window.innerHeight/2, window.innerWidth/4,window.innerHeight/4);
	//}

	ID = String(username) + "_currentPoints";
	listItem = document.getElementById(ID);
	IDB = String(username) + "_pr";
	listItemB = document.getElementById(IDB);

	textSize(20);
	fill(255,255,255);
	text("Your Score: " + listItem.innerHTML,20,(window.innerHeight/2)+(window.innerHeight/4),window.innerWidth/2,window.innerHeight/8);
    text("Best Score: " + listItemB.innerText,20,(window.innerHeight/2)+(window.innerHeight/4)+(window.innerHeight/8),window.innerWidth/2,window.innerHeight/8);
    text("ldowns1 Best Score: " + 20,(window.innerHeight/2)+(window.innerHeight/4),(window.innerHeight/8),window.innerWidth/2,window.innerHeight/8);


}


function DrawLowerRightPanel()
{
	// add a switch cas statement 
	// console 

	if (mathMode == true)
	{
    
		switch(digitToShow)
		{
			case 9:
			image(mathDigit9, window.innerWidth/2, window.innerHeight/2, window.innerWidth/2, window.innerHeight/2);
			break;

			case 8: 
			image(mathDigit8, window.innerWidth/2, window.innerHeight/2, window.innerWidth/2, window.innerHeight/2);
			break;

			case 7:
			image(mathDigit7, window.innerWidth/2, window.innerHeight/2, window.innerWidth/2, window.innerHeight/2);
			break;
			case 6: 
			image(mathDigit6, window.innerWidth/2, window.innerHeight/2, window.innerWidth/2, window.innerHeight/2);
			break;
			case 5:
			image(mathDigit5, window.innerWidth/2, window.innerHeight/2, window.innerWidth/2, window.innerHeight/2);
			break;
			case 4:
			image(mathDigit4, window.innerWidth/2, window.innerHeight/2, window.innerWidth/2, window.innerHeight/2);
			break;
			case 3:
			image(mathDigit3, window.innerWidth/2, window.innerHeight/2, window.innerWidth/2, window.innerHeight/2);
			break;
			case 2:
			image(mathDigit2, window.innerWidth/2, window.innerHeight/2, window.innerWidth/2, window.innerHeight/2);
			break;
			case 1: 
			image(mathDigit1, window.innerWidth/2, window.innerHeight/2, window.innerWidth/2, window.innerHeight/2);
			break;

			case 0: 
			image(mathDigit0, window.innerWidth/2, window.innerHeight/2, window.innerWidth/2, window.innerHeight/2);
			digitToShow -= 1;
			break;

			case -1: 
			text("game over", window.innerWidth/2, window.innerHeight/2, window.innerWidth/2, window.innerHeight/2);
			digitToShow -= 1;
			break;

			case -2:
			text("game over", window.innerWidth/2, window.innerHeight/2, window.innerWidth/2, window.innerHeight/2);
			break;

			default:
			text("game over", window.innerWidth/2, window.innerHeight/2, window.innerWidth/2, window.innerHeight/2);

		}
	}
	else if (mathMode == false)
	{

		switch(digitToShow)
		{
			case 9:
			image(showDigit9, window.innerWidth/2, window.innerHeight/2, window.innerWidth/2, window.innerHeight/2);
			break;

			case 8: 
			image(showDigit8, window.innerWidth/2, window.innerHeight/2, window.innerWidth/2, window.innerHeight/2);
			break;

			case 7:
			image(showDigit7, window.innerWidth/2, window.innerHeight/2, window.innerWidth/2, window.innerHeight/2);
			break;
			case 6: 
			image(showDigit6, window.innerWidth/2, window.innerHeight/2, window.innerWidth/2, window.innerHeight/2);
			break;
			case 5:
			image(showDigit5, window.innerWidth/2, window.innerHeight/2, window.innerWidth/2, window.innerHeight/2);
			break;
			case 4:
			image(showDigit4, window.innerWidth/2, window.innerHeight/2, window.innerWidth/2, window.innerHeight/2);
			break;
			case 3:
			image(showDigit3, window.innerWidth/2, window.innerHeight/2, window.innerWidth/2, window.innerHeight/2);
			break;
			case 2:
			image(showDigit2, window.innerWidth/2, window.innerHeight/2, window.innerWidth/2, window.innerHeight/2);
			break;
			case 1: 
			image(showDigit1, window.innerWidth/2, window.innerHeight/2, window.innerWidth/2, window.innerHeight/2);
			break;

			case 0: 
			image(showDigit0, window.innerWidth/2, window.innerHeight/2, window.innerWidth/2, window.innerHeight/2);
			digitToShow-=1;
			break;

			case -1: 
			text("game over", window.innerWidth/2, window.innerHeight/2, window.innerWidth/2, window.innerHeight/2);
			digitToShow -= 1;
			break;

			case -2:
			text("game over", window.innerWidth/2, window.innerHeight/2, window.innerWidth/2, window.innerHeight/2);
			break;

			default:
			text("game over", window.innerWidth/2, window.innerHeight/2, window.innerWidth/2, window.innerHeight/2);


		}
		
	}

}

function DetermineWhetherToSwitchDigits()
{
	if (TimeToSwitchDigits() == true)
	{
		SwitchDigits();
	}

}

function SwitchDigits()
{
	numPredictions = 0;
	totalDigitsPassed = 0;

	if (digitToShow == 9)
	{
		digitToShow = 8;
		//totalDigitsPassed += 1;
	}
	else if (digitToShow == 8)
	{
		digitToShow = 7;
		//totalDigitsPassed += 1;
	}
	else if (digitToShow == 7)
	{
		digitToShow = 6;
		//totalDigitsPassed += 1;
	}
	else if (digitToShow == 6)
	{
		digitToShow = 5;
		//totalDigitsPassed += 1;
	}
	else if (digitToShow == 5)
	{
		digitToShow = 4;
		//totalDigitsPassed += 1;
	}
	else if (digitToShow == 4)
	{
		digitToShow = 3;
		//totalDigitsPassed += 1;
	}
	else if (digitToShow == 3)
	{
		digitToShow = 2;
		//totalDigitsPassed += 1;
	}
	else if (digitToShow == 2)
	{
		digitToShow = 1;
		//totalDigitsPassed += 1;
	}
	else if (digitToShow == 1)
	{
		digitToShow = 0;
		//totalDigitsPassed += 1;
	}
	else if (digitToShow == 0 )
	{
		digitToShow == -1;
	}

	else if (digitToShow == -1)
	{
		digitToShow == -2;
	}

	else if (digitToShow == -2)
	{
		gameOver == true;
	}
}

function TimeToSwitchDigits()
{
	
	var currentTime = new Date();
	var timePassedInMilliseconds = currentTime - timeSinceLastDigitChange;
	var timePassedInSeconds = timePassedInMilliseconds/1000.0;

	var currentTime2 = new Date();
	var timePassedInMilliseconds2 = currentTime2 - timeSinceLastDigitChange;
	var timePassedInSeconds2 = timePassedInMilliseconds2/1000.0;
	// added if meanPredictions is greater than .55
	//if (timePassedInSeconds > 5 || meanPredictions > .3)

	var count;
	count = 1;
	if (timePassedInSeconds > 1 && meanPredictions > .3 && count == 1)
	{
		timeSinceLastDigitChange = currentTime;
		AddPoints();
		
		return true;
		
		
	}
	timePassedInSeconds -= 20;
	count = 1;
	if (timePassedInSeconds2 > 10 && meanPredictions > 0 && meanPredictions < .07 && count < 2)
	{
		DeductPoints();
		return true;
	}	
}


function DrawImageToHelpUserPutTheirHandOverTheDevice()
{
	image(img, 0, 0, (window.innerWidth)/2, (window.innerHeight)/2);
}

function HandIsUncentered()
{
	
	if (HandIsTooFarToTheLeft() || HandIsTooFarToTheRight() || HandIsTooLow() || HandIsTooHigh() || HandIsTooClose() || HandIsTooFar())
	{
		return true;
		
	}
	else 
	{
		return false;	
	}
}


function HandIsTooHigh()
{
	var yValues = oneFrameOfData.slice([],[],[1,6,3]);
	var currentMean = yValues.mean();
	if (currentMean > 0.75)
	{
		return true;
	}
	else
	{
		return false;
	}
}

function HandIsTooLow()
{
	var yValues = oneFrameOfData.slice([],[],[1,6,3]);
	var currentMean = yValues.mean();
	if (currentMean < 0.25)
	{
		return true;
	}
	else
	{
		return false;
	}
}
function HandIsTooFarToTheLeft()
{
	var xValues = oneFrameOfData.slice([],[],[0,6,3]);
	var currentMean = xValues.mean();
	if (currentMean < 0.25)
	{
		return true;
	}
	else 
	{
		return false;
	}
}

function HandIsTooClose()
{
	zValues = oneFrameOfData.slice([],[],[2,6,3]);
    currentMean = zValues.mean();
    if(currentMean < .02)
    {
        return true;
    }
    
}

function HandIsTooFar()
{
	zValues = oneFrameOfData.slice([],[],[2,6,3]);
    currentMean = zValues.mean();
    if (currentMean > 10.75)
    {
        return true;
    }
}

function HandIsTooFarToTheRight()
{

	var xValues = oneFrameOfData.slice([],[],[0,6,3]);
	var currentMean = xValues.mean();
	if (currentMean > 0.75)
	{
		return true;
	}
	else 
	{
		return false;
	}
	
}
function DrawArrowRight()
{
	image(imgRight, window.innerWidth/2, 0, window.innerWidth/2, window.innerHeight/2);
	//console.log("move ur hand right now");
}

function DrawArrowLeft()
{
	image(imgLeft, 0, 0, (window.innerWidth)/2, (window.innerHeight)/2);
}


Leap.loop(controllerOptions, function(frame)
{
	clear();	
	if (trainingCompleted == false)
	{	
		Train();

		//trainingCompleted = true;
	}
	DetermineState(frame);


	if (programState == 0)
	{
		HandleState0(frame);
	}
	else if (programState == 1)
	{
		HandleState1(frame);
		
	}

	else if (programState == 3)
	{
		HandleState3(frame);
	}

	else 
	{
		HandleState2(frame);
	}
	//HandleFrame(frame);
});


function GotResults(err, result)
{
	//predictedClassLabels.set(parseInt(result.label));
	//var currentPredictions = parseInt(result.label);
	//console.log(result.label);
	
	//console.log("b");
	numPredictions++;
	meanPredictions = (((numPredictions - 1) * meanPredictions) + (result.label == digitToShow)) / numPredictions;
	// FIX ME GET THIS TO PRINTT
	console.log(numPredictions + ", " + meanPredictions + ", " +  result.label);
	//console.log(result);
	//testingSampleIndex++;

	//if (testingSampleIndex >= test.shape[3])
	//{
	//  testingSampleIndex = 0;
	//}

}


// HandleFrame function, returns first hand that is within frame 
function HandleFrame(frame)
{
	var interactionBox = frame.interactionBox;
	// if statement to determine how many hands are in frame 
	//Test();	
	if(frame.hands.length > 0)
	{	
		
		var hand = frame.hands[0];	
		HandleHand(hand, frame, interactionBox);	
		Test();
		//console.log(oneFrameOfData.toString());

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
			HandleBone(boneIndex, boneI, bone, strokeWidth, frame, fingerIndex, interactionBox);
		}
	}		
}

// HandleBone function, function to display lines indicating each bone
function HandleBone(boneIndex, boneI, bone, strokeWidth, frame, fingerIndex, interactionBox)
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
	oneFrameOfData.set(fingerIndex, boneIndex, 2, zt);
	oneFrameOfData.set(fingerIndex, boneIndex, 3, normalizedNextJoint[0]);
	oneFrameOfData.set(fingerIndex, boneIndex, 4, normalizedNextJoint[1]);
	oneFrameOfData.set(fingerIndex, boneIndex, 5, zb);

	var canvasXPrev = (newXMax/2) * normalizedPrevJoint[0];
	var canvasXNext = (newXMax/2) * (normalizedNextJoint[0]);
	var canvasYPrev = (newXMax/2) * (1 - normalizedPrevJoint[1]);
	var canvasYNext = (newXMax/2) * (1 - normalizedNextJoint[1]);
	// variables to store color vals
	//var r = 0;
	//var g = 0;
	//var b = 0;
	
	//var width = 4;
	// if one hand is in frame, the hand is green
	///Determine strokeWeight
	var width = 6;

	if (boneIndex == 0)
	{
		strokeWeight(10);
		stroke(200*(1-meanPredictions), 300*meanPredictions, 20);
	} 
	else if (boneIndex == 1)
	{
		strokeWeight(8); 
		stroke((200*(1-meanPredictions))-50, (300*meanPredictions)-50, 20);
	} 
	else if (boneIndex == 2)
	{
		strokeWeight(5); 
		stroke((200*(1-meanPredictions))-100, (300*meanPredictions)-100, 20);
	} 
	else if (boneIndex == 3) 
	{
		strokeWeight(3);
		stroke((200*(1-meanPredictions))-150, (300*meanPredictions)-150, 20);
	
	}
	// draw those hand lines 
	line(canvasXPrev, canvasYPrev, canvasXNext, canvasYNext);
}



// train function, go through all iris data and add to knnClassifier
function Train()
{
	trainingCompleted = true;
	for (var tensorIterator = 0; tensorIterator < train3.shape[3]; tensorIterator++)
	{
		//trainingCompleted = true;
		//CenterData();
		
		CenterData();
		var features = train3B.pick(null,null,null, tensorIterator);
		CenterData();
		features = features.reshape(120).tolist();
		knnClassifier.addExample(features, 3);
		
		CenterData();
		features = train2.pick(null, null, null, tensorIterator);
		CenterData();
		features = features.reshape(120).tolist();
		knnClassifier.addExample(features, 2);

		CenterData();
		features = train2A2.pick(null, null, null, tensorIterator);
		CenterData();
		features = features.reshape(120).tolist();
		knnClassifier.addExample(features, 2);

		CenterData();
		features = train3.pick(null, null, null, tensorIterator);
		CenterData();
		features = features.reshape(120).tolist();
		knnClassifier.addExample(features, 3);

		CenterData();
		features = train4.pick(null, null, null, tensorIterator);
		
		features = features.reshape(120).tolist();
		knnClassifier.addExample(features, 4);

		CenterData();
		features = train4A.pick(null, null, null, tensorIterator);
		features = features.reshape(120).tolist();
		knnClassifier.addExample(features, 4);
		CenterData();
		features = train4OBrien.pick(null, null, null, tensorIterator);
		
		features = features.reshape(120).tolist();
		knnClassifier.addExample(features, 4);

		CenterData();
		features = train1.pick(null, null, null, tensorIterator);
		CenterData();
		features = features.reshape(120).tolist();
		knnClassifier.addExample(features, 1);

		CenterData();
		features = train1A.pick(null, null, null, tensorIterator);
		CenterData();
		features = features.reshape(120).tolist();
		knnClassifier.addExample(features, 1);

		features = train1Mc.pick(null, null, null, tensorIterator);
		features = features.reshape(120).tolist();
		knnClassifier.addExample(features, 1);


		CenterData();
		features = train0.pick(null, null, null, tensorIterator);
		CenterData();
		features = features.reshape(120).tolist();
		knnClassifier.addExample(features, 0);

		CenterData();
		features = train0A.pick(null, null, null, tensorIterator);
		CenterData();
		features = features.reshape(120).tolist();
		knnClassifier.addExample(features, 0);
		CenterData();
		features = train0A2.pick(null, null, null, tensorIterator);
		CenterData();
		features = features.reshape(120).tolist();
		knnClassifier.addExample(features, 0);

		features = train0Rielly.pick(null, null, null, tensorIterator);
		CenterData();
		features = features.reshape(120).tolist();
		knnClassifier.addExample(features, 0);
		CenterData();
		features = train0KLee.pick(null, null, null, tensorIterator);
		
		features = features.reshape(120).tolist();
		knnClassifier.addExample(features, 0);

		CenterData();
		features = train0Bongard.pick(null, null, null, tensorIterator);
		CenterData();
		features = features.reshape(120).tolist();
		// CenterData();
		knnClassifier.addExample(features, 0);

		
		features = train5.pick(null, null, null, tensorIterator);
		CenterData();
		features = features.reshape(120).tolist();
		// CenterData();
		knnClassifier.addExample(features, 5);

		
		features = train5A.pick(null, null, null, tensorIterator);
		CenterData();
		features = features.reshape(120).tolist();
		knnClassifier.addExample(features, 5);

		features = train5Bert.pick(null, null, null, tensorIterator);
		CenterData();
		features = features.reshape(120).tolist();
		knnClassifier.addExample(features, 5);

		CenterData();

		features = train6Bongard.pick(null, null, null, tensorIterator);
		
		CenterData();
		features = features.reshape(120).tolist();
		knnClassifier.addExample(features, 6);


		CenterData();
		features = train6A.pick(null, null, null, tensorIterator);
		CenterData();
		features = features.reshape(120).tolist();
		knnClassifier.addExample(features, 6);

		CenterData();
		features = train6A2.pick(null, null, null, tensorIterator);
		CenterData();
		features = features.reshape(120).tolist();
		knnClassifier.addExample(features, 6);
		CenterData();
		features = train6.pick(null, null, null, tensorIterator);
		features = features.reshape(120).tolist();
		knnClassifier.addExample(features, 6);

		CenterData();
		features = train6BL.pick(null, null, null, tensorIterator);
		

		CenterData();
		features = features.reshape(120).tolist();
		knnClassifier.addExample(features, 6);

		
		features = train7.pick(null, null, null, tensorIterator);
		features = features.reshape(120).tolist();
		knnClassifier.addExample(features, 7);

		//CenterData();
		features = train7A.pick(null, null, null, tensorIterator);
		features = features.reshape(120).tolist();
		knnClassifier.addExample(features, 7);

		CenterData();
		features = train8.pick(null, null, null, tensorIterator);
		CenterData();
		features = features.reshape(120).tolist();
		knnClassifier.addExample(features, 8);

		
		features = train8A.pick(null, null, null, tensorIterator);
		
		features = features.reshape(120).tolist();
		knnClassifier.addExample(features, 8);
		
		features = train8A2.pick(null, null, null, tensorIterator);
		
		features = features.reshape(120).tolist();
		knnClassifier.addExample(features, 8);
		
		features = train9Mc.pick(null, null, null, tensorIterator);
		
		features = features.reshape(120).tolist();
		knnClassifier.addExample(features, 9 );

		features = train9A.pick(null, null, null, tensorIterator);
		
		features = features.reshape(120).tolist();
		knnClassifier.addExample(features, 9 );

		features = train9B.pick(null, null, null, tensorIterator);
		
		features = features.reshape(120).tolist();
		knnClassifier.addExample(features, 9 );

		//console.log(tensorIterator + " " + features.toString());
		//
	}
	//trainingCompleted = true;
}

// test function, test knn classifier
function Test()
{
	
	//for (var i; i < train3.shape[3]; i++)
	//{
		currentFeatures = oneFrameOfData.pick(null,null,null,0);
		
		//currentFeatures = currentFeatures.reshape(120).tolist();
		knnClassifier.classify(currentFeatures.tolist(), GotResults);
		CenterData();
 	//}
}

function CenterData()
{
	CenterXData();
	CenterYData();
	CenterZData();
}
function CenterXData()
{
	var xValues = oneFrameOfData.slice([],[],[0,6,3]);
	var currentMean = xValues.mean();
	var horizontalShift = (0.5 - currentMean);

	for (var row = 0; row < xValues.shape[0]; row++)
	{
		for (var column = 0; column < xValues.shape[1]; column++)
		{
			var currentX = oneFrameOfData.get(row,column,0);
			var shiftedX = currentX + horizontalShift;
			oneFrameOfData.set(row,column,0, shiftedX);
			currentX = oneFrameOfData.get(row,column,3);
			shiftedX = currentX + horizontalShift;
			oneFrameOfData.set(row,column,3, shiftedX);
		}
	}
	xValues = oneFrameOfData.slice([],[],[0,6,3]);
	currentMean = xValues.mean();
	horizontalShift = (0.5 - currentMean);
	//console.log(xValues.shape);
	//console.log(currentMean);
	//console.log(horizontalShift);
}

function CenterYData()
{
	var yValues = oneFrameOfData.slice([],[],[1,6,3]);
	var currentMean = yValues.mean();
	var verticalShift = (0.5 - currentMean);

	for (var row = 0; row < yValues.shape[0]; row++)
	{
		for (var column = 0; column < yValues.shape[1]; column++)
		{
			var currentY = oneFrameOfData.get(row,column,1);
			var shiftedY = currentY + verticalShift;
			oneFrameOfData.set(row,column,1, shiftedY);
			currentY = oneFrameOfData.get(row,column,4);
			shiftedY = currentY + verticalShift;
			oneFrameOfData.set(row,column,4, shiftedY);
		}
	}
	yValues = oneFrameOfData.slice([],[],[1,6,3]);
	currentMean = yValues.mean();
	verticalShift = (0.5 - currentMean);
	//console.log(currentMean);
}

function CenterZData()
//if z is less than 0 and greater than 1
{
	var zValues = oneFrameOfData.slice([],[],[2,6,3]);
	var currentMean = zValues.mean();
	var zShift = (0.5 - currentMean);

	for (var row = 0; row < zValues.shape[0]; row++)
	{
		for (var column = 0; column < zValues.shape[1]; column++)
		{
			var currentZ = oneFrameOfData.get(row,column,2);
			var shiftedZ = currentZ + zShift;
			oneFrameOfData.set(row,column,2, shiftedZ);
			currentZ = oneFrameOfData.get(row,column,5);
			shiftedZ = currentZ + zShift;
			oneFrameOfData.set(row,column,5, shiftedZ);
		}
	}
	zValues = oneFrameOfData.slice([],[],[2,6,3]);
	currentMean = zValues.mean();
	zShift = (0.5 - currentMean);
	//console.log(currentMean);
}

