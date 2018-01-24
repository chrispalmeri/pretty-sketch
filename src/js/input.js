// src/input.js

import canvas from './canvas.js';
import view from './view.js';

export default new function() {
  this.x = 0;
  this.y = 0;
  this.z = 0;
  this.pan = false;
  this.zoom = 1;
  this.touches = 0;

  this.move = e => {
    this.x = e.clientX;
    this.y = e.clientY;
    view.refresh();
  }

  this.wheel = e => {
    if (e.deltaY > 0) {
      this.zoom = this.zoom / 1.1;
    } else {
      this.zoom = this.zoom * 1.1;
    }
    view.refresh();
    e.preventDefault();
  }

  this.down = e => {
    if(e.button === 1) {
      this.pan = true;
      view.refresh();
      e.preventDefault();
    }
  }
  
  this.up = e => {
    if(e.button === 1) {
      this.pan = false;
      view.refresh();
    }
  }
}