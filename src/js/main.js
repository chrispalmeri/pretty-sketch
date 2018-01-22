// src/main.js

import canvas from './canvas.js';
import input from './input.js';
import cursor from './cursor.js';
import noise from './noise.js';
import debug from './debug.js';
import refresh from './refresh.js';

window.addEventListener("load", function() {
  document.querySelector('#sketch').appendChild(canvas.element);
  document.querySelector('#sketch').appendChild(debug.element);

  debug.enable();
  noise.enable();

  //input.enable();
  canvas.element.addEventListener("mousemove", input.move);
  canvas.element.addEventListener("wheel", input.wheel);
  canvas.element.addEventListener("mousedown", input.down);
  canvas.element.addEventListener("mouseup", input.up);
  
  cursor.enable(); // only one that doesn't disable gracefully
  canvas.element.addEventListener("mouseenter", cursor.show);
  canvas.element.addEventListener("mouseleave", cursor.hide);

  refresh.refresh();
});

window.addEventListener("resize", function() {
  refresh.refresh();
});

// add touch

  // probably have to move cursor to the top periodically
  // shit you probably need a whole move to bottom mechanic
  // for covered items if things are hoverable/deletable