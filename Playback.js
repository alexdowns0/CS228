// one snapshot of a hand
oneFrameOfData = nj.array([[[ 141.45285,   350.633,     93.49, 141.45285,   350.633,     93.49],
        [ 141.45285,   350.633,     93.49, 302.83996,   333.623,   84.2659],
        [ 302.83996,   333.623,   84.2659, 414.40048,   321.801,   80.2747],
        [ 414.40048,   321.801,   80.2747, 487.68582,   314.148,   73.4484]],
       [[   96.3795,   332.511,   91.5194, 262.52065,   288.002,   65.0384],
        [ 262.52065,   288.002,   65.0384, 372.97671,    271.92,    43.214],
        [ 372.97671,    271.92,    43.214, 440.07698,   267.771,   30.0211],
        [ 440.07698,   267.771,   30.0211, 488.42796,   267.447,   20.5453]],
       [[  69.94314,   330.529,   82.8012, 206.97819,   288.411,    50.733],
        [ 206.97819,   288.411,    50.733, 310.17594,   272.666,   19.4151],
        [ 310.17594,   272.666,   19.4151,  380.7822,   269.086,   1.18422],
        [  380.7822,   269.086,   1.18422, 430.40238,   269.533,  -10.3117]],
       [[  45.72966,   331.383,   73.5327,  146.2187,   294.619,    38.426],
        [  146.2187,   294.619,    38.426, 230.05031,   278.204,   8.04046],
        [ 230.05031,   278.204,   8.04046, 301.89664,   278.154,  -9.27374],
        [ 301.89664,   278.154,  -9.27374,  353.9191,   283.225,  -18.6303]],
       [[  31.12661,   338.273,   63.2468,  98.20198,   304.313,   26.7918],
        [  98.20198,   304.313,   26.7918, 147.74825,   294.316,  -1.00525],
        [ 147.74825,   294.316,  -1.00525, 195.31732,   294.928,  -14.0088],
        [ 195.31732,   294.928,  -14.0088, 244.51044,   299.404,  -22.3057]]]);

// yet another snapshot of a hand
anotherFrameOfData = nj.array([[[273.43799,447.478,74.1418,273.43799,447.478,74.1418],
        [273.43799,447.478,74.1418,342.1537,452.127,48.9338],
        [342.1537,452.127,48.9338,376.20296, 452.4,24.7689],
        [376.20296, 452.4,24.7689,389.75455,450.84,5.55586]],
       [[282.0729,427.285,76.0589,381.74701,417.723,38.3584],
        [381.74701,417.723,38.3584,427.92328,407.397,11.0977],
        [427.92328,407.397,11.0977,444.5535,410.908,-7.94269],
        [444.5535,410.908,-7.94269,448.61972,418.223,-20.8329]],
       [[272.38861,419.646,70.3062,357.16521,405.724,29.9168],
        [357.16521,405.724,29.9168,402.42639,388.637,-0.84929],
        [402.42639,388.637,-0.84929,425.24117,387.454,-22.7777],
        [425.24117,387.454,-22.7777,436.38248,391.662,-37.6214]],
       [[259.43343,414.188,63.8698,324.17907,397.309,23.7181],
        [324.17907,397.309,23.7181,371.70284,376.285,1.58899],
        [371.70284,376.285,1.58899,401.08146,370.258,-16.3886],
        [401.08146,370.258,-16.3886,418.98622,370.723,-29.8974]],
       [[241.13732,414.197,55.717,290.95954,393.506,17.0832],
        [290.95954,393.506,17.0832,318.26059,372.397,-0.6889],
        [318.26059,372.397,-0.6889,335.43364,365.464,-13.6171],
        [335.43364,365.464,-13.6171,350.75514,363.663,-26.36]]]);

var frameIndex = 0;
var trackerVar = 0;
function draw()
{
	// light switch metaphor
 	if (frameIndex == 100)
	{
 		frameIndex = 0; 		
	}

	if (frameIndex == 0 && trackerVar != 1)
	{
		trackerVar = 1;
	}

	else if (frameIndex == 0 && trackerVar != 0)
	{
		trackerVar = 0;
	}

	console.log(trackerVar);
	clear();
	// for loop that iterates over 5 rows and 4 columns in tensor 
	for (fingerIndex = 0; fingerIndex < 5; fingerIndex++)
	{
		for (boneIndex = 0; boneIndex < 4; boneIndex++)
		{
			var xStart = oneFrameOfData.get(fingerIndex, boneIndex, 0);
			var yStart = oneFrameOfData.get(fingerIndex, boneIndex, 1);
			var zStart = oneFrameOfData.get(fingerIndex, boneIndex, 2);
			var xEnd = oneFrameOfData.get(fingerIndex, boneIndex, 3);
			var yEnd = oneFrameOfData.get(fingerIndex, boneIndex, 4);
			var zEnd = oneFrameOfData.get(fingerIndex, boneIndex, 5);
			var xStart2 = anotherFrameOfData.get(fingerIndex, boneIndex, 0);
			var yStart2 = anotherFrameOfData.get(fingerIndex, boneIndex, 1);
			var zStart2 = anotherFrameOfData.get(fingerIndex, boneIndex, 2);
			var xEnd2 = anotherFrameOfData.get(fingerIndex, boneIndex, 3);
			var yEnd2 = anotherFrameOfData.get(fingerIndex, boneIndex, 4);
			var zEnd2 = anotherFrameOfData.get(fingerIndex, boneIndex, 5);
			// I found this on stack overflow
			//if (frameIndex % 2 != 0)
			if (trackerVar == 0)
			{
				line(xStart, yStart, xEnd, yEnd);
			}

			else 
			{
				line(xStart2, yStart2, xEnd2, yEnd2);
			}

		}
		
		frameIndex++;
		}
		
	}
	

