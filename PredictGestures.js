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
	Test();	
	Train();
	
}

// train function, go through all iris data and add to knnClassifier
function Train()
{

	trainingCompleted = true;
	
}

// test function, test knn classifier
function Test()
{
		
	
	
}






