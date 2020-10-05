// init variables, constants, and irisData array
const knnClassifier = ml5.KNNClassifier();
var testingSampleIndex = 1;
var currentFeatures = nj.array();
var numSamples = 0;

var Features = 0;

var currentLabel = 0;
var trainingCompleted = false;




var predictedClassLabels = nj.zeros([numSamples]);


// draw function, draw circles if the machine learning training is finished
function draw()
{
	//console.log(irisData.toString());
	//console.log(numSamples,numFeatures);
	clear();	
	// if (trainingCompleted == false)
	// {
		

	// }
	
	Train();
	Test();	
}

// train function, go through all iris data and add to knnClassifier
function Train()
{
	for (var tensorIterator = 0; tensorIterator < train0.shape[3]; tensorIterator++)
	{
		var features = train0.pick(null, null, null, tensorIterator);
		console.log(features.toString());

	}

	//console.log("done");
	//trainingCompleted = true;
	//console.log(train0.toString());
}

// test function, test knn classifier
function Test()
{
		
	//console.log("4");
	
}






