// init variables, constants, and irisData array
const knnClassifier = ml5.KNNClassifier();
var testingSampleIndex = 0;
var currentFeatures;
var numSamples = 0;
nj.config.printThreshold = 1000;
var predictedLabel;
var currentLabel;
var trainingCompleted = false;




var predictedClassLabels = nj.zeros([1,test.shape[3]]);


// draw function, draw circles if the machine learning training is finished
function draw()
{
	//console.log(irisData.toString());
	//console.log(numSamples,numFeatures);
	clear();	
	if (trainingCompleted == false)
	{
		Train();

	}
	
	
	Test();	
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
		//console.log(features.toString());
	}

	//console.log("done");
	
	//console.log(train0.toString());
}

// test function, test knn classifier
function Test()
{
	currentFeatures = test.pick(null, null, null, testingSampleIndex);
	
	predictedLabel = knnClassifier.classify(currentFeatures.tolist(),GotResults);
	//console.log("4");

	//console.log(currentFeatures);
	
}

function GotResults(err, result)
{
	predictedClassLabels.set(testingSampleIndex,parseInt(result.label));
	
	console.log(testingSampleIndex + " " + result.label);
	
	testingSampleIndex++;

	if (testingSampleIndex >= test.shape[3])
	{
	  testingSampleIndex = 0;
	}

//console.log(testingSampleIndex, test.shape[3]);
	//console.log(currentTestingSample.toString());
	
	//console.log(testingSampleIndex);
	

}







