// initialize variables
let numBottles = 1000;
let testStrips = 10;
let daysPassed = 0;

// create an array of bottles
let bottles = new Array(numBottles);
bottles.fill(0);

//randomly set one of the results to be 'poisoned'
let poisoned = Math.floor(Math.random() * numBottles);
bottles[poisoned] = 1;

while(testStrips > 0) {
  let strips = new Array();
  strips = splitArray(bottles, testStrips);
  
  // test strips with a positive have to be tossed out for being contaminated
  testStrips -= 1;

  // tests take 7 days to get results
  daysPassed += 7;

  // throw out all bottles except the ones on the sample that popped positive for poison
  bottles.length = 0;
  bottles = testSamples(strips);

  // if we find the exact bottle, stop testing
  if (bottles.length == 1) {
    console.log("Found poisoned bottle in " + daysPassed + " days.");
    break;
  }
}

// Checks each strip to see if it's got the poisoned sample on it or not
function testSamples(samples) {
  let positiveStrip = new Array();

  for (i = 0; i < samples.length; i++) {
    // if poison detected
     if (samples[i].includes(1)) {
       console.log("Found poison on test strip number " + (i + 1))
       // use the bottles on this strip for future tests
       positiveStrip = samples[i];
       break;
     }
  }

  return positiveStrip;
}

// split the remaining bottles into an equal number to put on the test strips
function splitArray(bottlesToSplit, numberOfTests) {
  let size = bottlesToSplit.length / numberOfTests;

  let samples = new Array(numberOfTests);

  for (i = 0; i < numberOfTests; i++) {
    let startIndex = (i * size)
    let sample = bottlesToSplit.slice(startIndex, startIndex + size);
    samples[i] = sample;
  }
  return samples;
}
