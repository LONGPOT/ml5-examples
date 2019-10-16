var mic;
var n = 150;//pedals number
var t,dt;
var myscale;
var keyHue = 360;
var keySat=1;
var saveStill = false;
var key;

const mySoundModelURL = 'https://storage.googleapis.com/teachable-machine-pubilshed-models/da53660a-582d-486e-8124-ca550c5102e6/model.json';
let mySoundModel;
let resultDiv;
// let mic;


function preload() {
  mySoundModel = ml5.soundClassifier(mySoundModelURL,modelReady);
}

function modelReady() {
  console.log('model ready');
}

function setup() {
  resultDiv = createElement('h1',  '...');
  mySoundModel.classify(gotResults);

  var side = windowWidth< windowHeight ? windowWidth : windowHeight ;
  createCanvas(side,side); 
  background(255);
  colorMode(HSB,keyHue,keySat,1.0);
  background(0,0,1.0);
  var foo = 15.0;
  myscale = width < height ? width/foo : height/foo; //the size of each circle
  t = 0.0;
  dt = 0.02;
  mic = new p5.AudioIn();
  mic.start();
}

function gotResults(err, results) {
  if (err) console.log(err);
  if (results) {
    // console.log(results);
    resultDiv.html('Result is: ' + results[0].label);
    key= results[0].label;
  } 
}

function changeColor(){
  if (key === '_background_noise_') {
      keyHue=0 
    }
    // else if (key === 'do') {
    //   keyHue=lerp(keyHue,60,10);  
    // }
    // else if (key === 're') {
    //   keyHue=lerp(keyHue,120,10);  
    // }
    // else if (key === 'mi') {
    //   keyHue=lerp(keyHue,180,10);  
    // }
    // else if (key === 'so') {
    //   keyHue=lerp(keyHue,240,10);  
    // }
    // else if (key === 'la') {
    //   keyHue=lerp(keyHue,300,10);  
    // }
    // else if (key === 'doi') {
    //   keyHue=lerp(keyHue,360,10);  
    // }
    
    else if (key === 'do') {
      keyHue=60;  
    }
    else if (key === 're') {
      keyHue=120;  
    }
    else if (key === 'mi') {
      keyHue=180;  
    }
    else if (key === 'so') {
      keyHue=240;  
    }
    else if (key === 'la') {
      keyHue=300;  
    }
    else if (key === 'doi') {
      keyHue=360;  
    }
    
    // console.log(keyHue);
}


function draw(){
  micLevel = mic.getLevel();
  // console.log(micLevel)
  
  dt=lerp(dt,micLevel*5,0.05)
  t += dt;
  for(var i=0;i<n;i++){
    var theta = 2.39996*i;
  	var r = myscale*sqrt(i);
    noStroke();
    var s = i/float(n);    
    fill(keyHue - 60*s,keySat-2.0*s, 0.5 + s ); 
    changeColor();
    // if(micLevel>0.01){
    //   keySat=1; 
    // }else {
    //   keySat=0; 
    // }
    var d = myscale*(5 + 0.5*sin(t + r));
    if(saveStill){
        d = myscale*5; 
    }   
    ellipse(0.5*width + r*sin(theta),0.5*height + r*cos(theta), d, d);
  }   
}