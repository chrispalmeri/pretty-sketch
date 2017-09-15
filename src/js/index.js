// src/index.js
import cookie from './cookie.js';
import Canvas from './canvas.js';

cookie.create('ratio',120/96,30);

var graph = new Canvas(document.getElementById("grid"));
var drawing = new Canvas(document.getElementById("pencil"));

drawing.refresh();

console.log('We\'re cooking with gas now!');