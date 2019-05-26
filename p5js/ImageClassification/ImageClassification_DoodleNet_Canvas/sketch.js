// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Canvas Image Classification using DoodleNet and p5.js
This example uses a callback pattern to create the classifier
=== */

// Initialize the Image Classifier method with DoodleNet.
let classifier;

// A variable to hold the canvas image we want to classify
let canvas;

// Two variable to hold the label and confidence of the result
let label;
let confidence;

function preload() {
  // Load the DoodleNet Image Classification model
  classifier = ml5.imageClassifier('DoodleNet');
}

function setup() {
  // Create a canvas with 280 x 280 px
  canvas = createCanvas(280, 280);
  // Set canvas background to white
  background(255);
  // Whenever mouseReleased event happens on canvas, call "classifyCanvas" function
  canvas.mouseReleased(classifyCanvas);
  // Create a clear canvas button
  createClearBtn();
  // Create a div to hold results
  createResDiv();
}

function draw() {
  // Set stroke weight to 10
  strokeWeight(15);
  // Set stroke color to black
  stroke(0);
  // If mouse is pressed, draw line between previous and current mouse positions
  if (mouseIsPressed) {
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}

function classifyCanvas() {
  classifier.classify(canvas, gotResult);
}

// A function to run when we get any errors and the results
function gotResult(error, results) {
  // Display error in the console
  if (error) {
    console.error(error);
  }
  // The results are in an array ordered by confidence.
  console.log(results);
  // Get all top 10 labels
  const labels = results.map(r => r.label);
  // Get all top 10 confidences, round to 0.01
  const confidences = results.map(r => nf(r.confidence, 0, 2));
  label.html('Label: ' + labels);
  confidence.html('Confidence: ' + confidences);
}

function createClearBtn() {
  let button = createButton('Clear Canvas');
  button.position(7, 44);
  button.mousePressed(clearCanvas);
}

function clearCanvas() {
  background(255);
}

function createResDiv() {
  label = createDiv('Label: ...');
  confidence = createDiv('Confidence: ...');
}
