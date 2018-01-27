// src/controls/mouse.js

import canvas from './../canvas.js';
import input from './input.js';
import view from './../view.js';

export default new function() {
  this.enable = function() {
    canvas.element.addEventListener('mousemove', function(e) {
      input.x = e.clientX;
      input.y = e.clientY;
      view.refresh();
    }.bind(this));
  
    canvas.element.addEventListener('mousedown', function(e) {
      if(e.button === 1) {
        input.pan = true;
        view.refresh();
        e.preventDefault();
      }
    }.bind(this));
    
    canvas.element.addEventListener('mouseup', function(e) {
      if(e.button === 1) {
        input.pan = false;
        view.refresh();
      }
    }.bind(this));
  }
}