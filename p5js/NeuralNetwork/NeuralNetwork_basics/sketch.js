// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Image classification using MobileNet and p5.js
This example uses a callback pattern to create the classifier
=== */
let nn;

function setup() {
  // Options for Neural Network
  const options = {
    inputs: 3,
    outputs: 2,
    task:'regression',
    activationOutput: 'sigmoid',
    activationHidden: 'sigmoid'
  };
  // Create Neural Network
  nn = ml5.neuralNetwork(options);

  // Train the model
  let trainBtn = createButton('Train Model');
  trainBtn.position(10, 50);
  trainBtn.mousePressed(function () {
    trainModel();
  });

  // Predict
  let predictBtn = createButton('Predict');
  predictBtn.position(10, 70);
  predictBtn.mousePressed(function () {
    predict();
  });

  // Save and download the model
  let saveBtn = createButton('Save Model');
  saveBtn.position(10, 90);
  saveBtn.mousePressed(function () {
    neuralNetwork.save();
  });

  // Load the model from local files
  let loadLocalBtn = createButton('Load the model from local files');
  loadLocalBtn.position(10, 110);
  loadLocalBtn.mousePressed(function () {
    neuralNetwork.load('model/model.json', function () {
      console.log('Model Loaded!');
    });
  });

  // Load model
  let loadBtn = select('#load');
  loadBtn.changed(function () {
    neuralNetwork.load(loadBtn.elt.files, function () {
      console.log('Model Loaded!');
    });
  });
}

function trainModel() {
  // Add training data
  const training_input = [-0.6, 1, 0.25];
  const training_target = [0.3, 0.9];

  for (let i = 0; i < 500; i++) {
    nn.data.addData({
      input0: training_input[0],
      input1: training_input[1],
      input2: training_input[2],
    }, 
    {
      output0: training_target[0],
      output1: training_target[1],
    });
  }

  const trainingOptions = {
    epochs: 10,
    batchSize: 32
  }
  // Train
  nn.data.shuffle();
  nn.data.normalize();
  nn.train(trainingOptions, finishedTraining);
}

// Training callback
function finishedTraining() {
  predict();
}

function predict() {
  let input = [-0.6, 1, 0.25];
  nn.predict(input, gotResults);

}

function gotResults(error, results) {
  if (error) console.log(error);
  if (results) {
    console.log(results.output);
  }
}