// src/controls/wheel.js

import canvas from './../canvas.js';
import input from './input.js';
import view from './../view.js';

export default new function() {
  this.enable = function() {
    canvas.element.addEventListener('wheel', function(e) {
      if (e.deltaY > 0) {
        input.zoom = input.zoom / 1.1;
      } else {
        input.zoom = input.zoom * 1.1;
      }
      view.refresh();
      e.preventDefault();
    }.bind(this));
  }
}