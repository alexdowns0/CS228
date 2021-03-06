// init variables, constants, and irisData array
const knnClassifier = ml5.KNNClassifier();
var testingSampleIndex = 1;
var currentFeatures = nj.array();
var numSamples = 0;

var Features = 0;

var currentLabel = 0;
var trainingCompleted = false;


// iris data sets
var irisData = nj.array([
[	5.1	,	3.5	,	1.4	,	0.2	,	0	],
[	4.9	,	3	,	1.4	,	0.2	,	0	],
[	4.7	,	3.2	,	1.3	,	0.2	,	0	],
[	4.6	,	3.1	,	1.5	,	0.2	,	0	],
[	5	,	3.6	,	1.4	,	0.2	,	0	],
[	5.4	,	3.9	,	1.7	,	0.4	,	0	],
[	4.6	,	3.4	,	1.4	,	0.3	,	0	],
[	5	,	3.4	,	1.5	,	0.2	,	0	],
[	4.4	,	2.9	,	1.4	,	0.2	,	0	],
[	4.9	,	3.1	,	1.5	,	0.1	,	0	],
[	5.4	,	3.7	,	1.5	,	0.2	,	0	],
[	4.8	,	3.4	,	1.6	,	0.2	,	0	],
[	4.8	,	3	,	1.4	,	0.1	,	0	],
[	4.3	,	3	,	1.1	,	0.1	,	0	],
[	5.8	,	4	,	1.2	,	0.2	,	0	],
[	5.7	,	4.4	,	1.5	,	0.4	,	0	],
[	5.4	,	3.9	,	1.3	,	0.4	,	0	],
[	5.1	,	3.5	,	1.4	,	0.3	,	0	],
[	5.7	,	3.8	,	1.7	,	0.3	,	0	],
[	5.1	,	3.8	,	1.5	,	0.3	,	0	],
[	5.4	,	3.4	,	1.7	,	0.2	,	0	],
[	5.1	,	3.7	,	1.5	,	0.4	,	0	],
[	4.6	,	3.6	,	1	,	0.2	,	0	],
[	5.1	,	3.3	,	1.7	,	0.5	,	0	],
[	4.8	,	3.4	,	1.9	,	0.2	,	0	],
[	5	,	3	,	1.6	,	0.2	,	0	],
[	5	,	3.4	,	1.6	,	0.4	,	0	],
[	5.2	,	3.5	,	1.5	,	0.2	,	0	],
[	5.2	,	3.4	,	1.4	,	0.2	,	0	],
[	4.7	,	3.2	,	1.6	,	0.2	,	0	],
[	4.8	,	3.1	,	1.6	,	0.2	,	0	],
[	5.4	,	3.4	,	1.5	,	0.4	,	0	],
[	5.2	,	4.1	,	1.5	,	0.1	,	0	],
[	5.5	,	4.2	,	1.4	,	0.2	,	0	],
[	4.9	,	3.1	,	1.5	,	0.1	,	0	],
[	5	,	3.2	,	1.2	,	0.2	,	0	],
[	5.5	,	3.5	,	1.3	,	0.2	,	0	],
[	4.9	,	3.1	,	1.5	,	0.1	,	0	],
[	4.4	,	3	,	1.3	,	0.2	,	0	],
[	5.1	,	3.4	,	1.5	,	0.2	,	0	],
[	5	,	3.5	,	1.3	,	0.3	,	0	],
[	4.5	,	2.3	,	1.3	,	0.3	,	0	],
[	4.4	,	3.2	,	1.3	,	0.2	,	0	],
[	5	,	3.5	,	1.6	,	0.6	,	0	],
[	5.1	,	3.8	,	1.9	,	0.4	,	0	],
[	4.8	,	3	,	1.4	,	0.3	,	0	],
[	5.1	,	3.8	,	1.6	,	0.2	,	0	],
[	4.6	,	3.2	,	1.4	,	0.2	,	0	],
[	5.3	,	3.7	,	1.5	,	0.2	,	0	],
[	5	,	3.3	,	1.4	,	0.2	,	0	],
[	7	,	3.2	,	4.7	,	1.4	,	1	],
[	6.4	,	3.2	,	4.5	,	1.5	,	1	],
[	6.9	,	3.1	,	4.9	,	1.5	,	1	],
[	5.5	,	2.3	,	4	,	1.3	,	1	],
[	6.5	,	2.8	,	4.6	,	1.5	,	1	],
[	5.7	,	2.8	,	4.5	,	1.3	,	1	],
[	6.3	,	3.3	,	4.7	,	1.6	,	1	],
[	4.9	,	2.4	,	3.3	,	1	,	1	],
[	6.6	,	2.9	,	4.6	,	1.3	,	1	],
[	5.2	,	2.7	,	3.9	,	1.4	,	1	],
[	5	,	2	,	3.5	,	1	,	1	],
[	5.9	,	3	,	4.2	,	1.5	,	1	],
[	6	,	2.2	,	4	,	1	,	1	],
[	6.1	,	2.9	,	4.7	,	1.4	,	1	],
[	5.6	,	2.9	,	3.6	,	1.3	,	1	],
[	6.7	,	3.1	,	4.4	,	1.4	,	1	],
[	5.6	,	3	,	4.5	,	1.5	,	1	],
[	5.8	,	2.7	,	4.1	,	1	,	1	],
[	6.2	,	2.2	,	4.5	,	1.5	,	1	],
[	5.6	,	2.5	,	3.9	,	1.1	,	1	],
[	5.9	,	3.2	,	4.8	,	1.8	,	1	],
[	6.1	,	2.8	,	4	,	1.3	,	1	],
[	6.3	,	2.5	,	4.9	,	1.5	,	1	],
[	6.1	,	2.8	,	4.7	,	1.2	,	1	],
[	6.4	,	2.9	,	4.3	,	1.3	,	1	],
[	6.6	,	3	,	4.4	,	1.4	,	1	],
[	6.8	,	2.8	,	4.8	,	1.4	,	1	],
[	6.7	,	3	,	5	,	1.7	,	1	],
[	6	,	2.9	,	4.5	,	1.5	,	1	],
[	5.7	,	2.6	,	3.5	,	1	,	1	],
[	5.5	,	2.4	,	3.8	,	1.1	,	1	],
[	5.5	,	2.4	,	3.7	,	1	,	1	],
[	5.8	,	2.7	,	3.9	,	1.2	,	1	],
[	6	,	2.7	,	5.1	,	1.6	,	1	],
[	5.4	,	3	,	4.5	,	1.5	,	1	],
[	6	,	3.4	,	4.5	,	1.6	,	1	],
[	6.7	,	3.1	,	4.7	,	1.5	,	1	],
[	6.3	,	2.3	,	4.4	,	1.3	,	1	],
[	5.6	,	3	,	4.1	,	1.3	,	1	],
[	5.5	,	2.5	,	4	,	1.3	,	1	],
[	5.5	,	2.6	,	4.4	,	1.2	,	1	],
[	6.1	,	3	,	4.6	,	1.4	,	1	],
[	5.8	,	2.6	,	4	,	1.2	,	1	],
[	5	,	2.3	,	3.3	,	1	,	1	],
[	5.6	,	2.7	,	4.2	,	1.3	,	1	],
[	5.7	,	3	,	4.2	,	1.2	,	1	],
[	5.7	,	2.9	,	4.2	,	1.3	,	1	],
[	6.2	,	2.9	,	4.3	,	1.3	,	1	],
[	5.1	,	2.5	,	3	,	1.1	,	1	],
[	5.7	,	2.8	,	4.1	,	1.3	,	1	],
[	6.3	,	3.3	,	6	,	2.5	,	2	],
[	5.8	,	2.7	,	5.1	,	1.9	,	2	],
[	7.1	,	3	,	5.9	,	2.1	,	2	],
[	6.3	,	2.9	,	5.6	,	1.8	,	2	],
[	6.5	,	3	,	5.8	,	2.2	,	2	],
[	7.6	,	3	,	6.6	,	2.1	,	2	],
[	4.9	,	2.5	,	4.5	,	1.7	,	2	],
[	7.3	,	2.9	,	6.3	,	1.8	,	2	],
[	6.7	,	2.5	,	5.8	,	1.8	,	2	],
[	7.2	,	3.6	,	6.1	,	2.5	,	2	],
[	6.5	,	3.2	,	5.1	,	2	,	2	],
[	6.4	,	2.7	,	5.3	,	1.9	,	2	],
[	6.8	,	3	,	5.5	,	2.1	,	2	],
[	5.7	,	2.5	,	5	,	2	,	2	],
[	5.8	,	2.8	,	5.1	,	2.4	,	2	],
[	6.4	,	3.2	,	5.3	,	2.3	,	2	],
[	6.5	,	3	,	5.5	,	1.8	,	2	],
[	7.7	,	3.8	,	6.7	,	2.2	,	2	],
[	7.7	,	2.6	,	6.9	,	2.3	,	2	],
[	6	,	2.2	,	5	,	1.5	,	2	],
[	6.9	,	3.2	,	5.7	,	2.3	,	2	],
[	5.6	,	2.8	,	4.9	,	2	,	2	],
[	7.7	,	2.8	,	6.7	,	2	,	2	],
[	6.3	,	2.7	,	4.9	,	1.8	,	2	],
[	6.7	,	3.3	,	5.7	,	2.1	,	2	],
[	7.2	,	3.2	,	6	,	1.8	,	2	],
[	6.2	,	2.8	,	4.8	,	1.8	,	2	],
[	6.1	,	3	,	4.9	,	1.8	,	2	],
[	6.4	,	2.8	,	5.6	,	2.1	,	2	],
[	7.2	,	3	,	5.8	,	1.6	,	2	],
[	7.4	,	2.8	,	6.1	,	1.9	,	2	],
[	7.9	,	3.8	,	6.4	,	2	,	2	],
[	6.4	,	2.8	,	5.6	,	2.2	,	2	],
[	6.3	,	2.8	,	5.1	,	1.5	,	2	],
[	6.1	,	2.6	,	5.6	,	1.4	,	2	],
[	7.7	,	3	,	6.1	,	2.3	,	2	],
[	6.3	,	3.4	,	5.6	,	2.4	,	2	],
[	6.4	,	3.1	,	5.5	,	1.8	,	2	],
[	6	,	3	,	4.8	,	1.8	,	2	],
[	6.9	,	3.1	,	5.4	,	2.1	,	2	],
[	6.7	,	3.1	,	5.6	,	2.4	,	2	],
[	6.9	,	3.1	,	5.1	,	2.3	,	2	],
[	5.8	,	2.7	,	5.1	,	1.9	,	2	],
[	6.8	,	3.2	,	5.9	,	2.3	,	2	],
[	6.7	,	3.3	,	5.7	,	2.5	,	2	],
[	6.7	,	3	,	5.2	,	2.3	,	2	],
[	6.3	,	2.5	,	5	,	1.9	,	2	],
[	6.5	,	3	,	5.2	,	2	,	2	],
[	6.2	,	3.4	,	5.4	,	2.3	,	2	],
[	5.9	,	3	,	5.1	,	1.8	,	2	]]);

var predictedClassLabels = nj.zeros([numSamples]);
numSamples = irisData.shape[0];
var numFeatures = irisData.shape[1] - 1;

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
	DrawCircles();
}

// train function, go through all iris data and add to knnClassifier
function Train()
{
	//console.log("I am being trained");
	for (i = 0; i < numSamples; i++)
	{
		if(i % 2 == 0)
		{
			//console.log(irisData.pick(i).toString());
			currentFeatures = irisData.pick(i).slice([0,4]);
			var currentLabel = irisData.pick(i).get(4);
			//console.log(currentFeatures, currentLabel);
			knnClassifier.addExample(currentFeatures.tolist(), currentLabel);
		}
	}
	trainingCompleted = true;
}

// test function, test knn classifier
function Test()
{
		if(testingSampleIndex % 2 != 0)
		{
			var currentFeatures = irisData.pick(testingSampleIndex).slice([4]);
			//console.log(x, dispRow.toString());
			var predictedLabel = knnClassifier.classify(currentFeatures.tolist(),GotResults)
			var currentLabel = irisData.pick(testingSampleIndex).get(4);

			//var currentLabel2 = irisData.pick(x).get(4);
			//console.log(dispRow, dispLabel);
			//console.log(x);
		}
	
	//console.log("I am being tested");
}

function GotResults(err, result)
{
	predictedClassLabels.set(testingSampleIndex, parseInt(result.label));
	//console.log(predictedClassLabels.toString());
	//console.log(parseInt(result.label));

	testingSampleIndex+=2;
	if (testingSampleIndex > numSamples)
	{
		testingSampleIndex = 1;
	}
	//console.log(testingSampleIndex);

}

// draw circles function, display 150 iris data 
function DrawCircles()
{
	for (i = 0; i < numSamples; i++)
	{
		var x = irisData.pick(i).get(0) * (88);
		var y = irisData.pick(i).get(1) * (88);

		var c = irisData.pick(i).get(4);

		// differentiate data by colour
		if (c == 0)
		{
			fill("red");
		}
		else if (c == 1)
		{
			fill("blue");
		}
		else
		{
			fill("green");
		}

		if (i % 2 == 0)
		{
			stroke(25);
		}
		else
		{
			if (predictedClassLabels.get(i) == 0)
			//if ( c == 0)
			{
				stroke("red");
			}
			else if (predictedClassLabels.get(i) == 1)
			//else if (c == 1)
			{
				stroke("blue");
			}
			else
			{
				stroke("green");
			}
		}

		// draw circles
		circle(x, y, 25);

	}
}
	

