// src/main.js

import svg from './svg.js';
import input from './controls/input.js';
import cursor from './cursor.js';
import noise from './noise.js';
import pattern from './pattern.js';
import debug from './debug.js';
import view from './view.js';

window.addEventListener("load", function() {
  document.querySelector('#sketch').appendChild(svg.element);
  document.querySelector('#sketch').appendChild(debug.element);

  debug.enable();
  pattern.enable();
  noise.enable();

  input.enable();
  cursor.enable();

  view.refresh();
});

window.addEventListener("resize", function() {
  view.refresh();
});