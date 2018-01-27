// src/main.js

import canvas from './canvas.js';
import input from './input.js';
import cursor from './cursor.js';
import noise from './noise.js';
import pattern from './pattern.js';
import debug from './debug.js';
import view from './view.js';
import touch from './touch.js';

window.addEventListener("load", function() {
  document.querySelector('#sketch').appendChild(canvas.element);
  document.querySelector('#sketch').appendChild(debug.element);

  debug.enable();
  pattern.enable();
  noise.enable();

  input.enable();
  touch.enable();
  cursor.enable();

  view.refresh();
});

window.addEventListener("resize", function() {
  view.refresh();
});