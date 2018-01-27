// src/touch.js

import canvas from './canvas.js';
import input from './input.js';
import cursor from './cursor.js';
import last from './last.js';
import view from './view.js';

export default new function() {
  this.enable = function() {
    canvas.element.addEventListener("touchstart", function(e) {
      this.touch(e);
    }.bind(this));
    canvas.element.addEventListener("touchmove", function(e) {
      this.recalc(e);
      if(e.touches.length > 1 && last.touches === e.touches.length) {
        input.pan = true;
        input.zoom = last.zoom * (input.z / last.z);
      }
      view.refresh();
      e.preventDefault();
    }.bind(this));
    canvas.element.addEventListener("touchend", function(e) {
      this.touch(e);
    }.bind(this));
  }
  
  this.touch = function(e) {
    this.recalc(e);
    input.pan = false;
    if(e.touches.length === 1) {
      cursor.show();
    } else {
      cursor.hide();
    }
    view.refresh();
    e.preventDefault();
  }

  this.recalc = function(e) {
    this.x = 0;
    this.y = 0;
    this.z = 0;

    if (e.touches.length > 0) {
      for(var i = 0; i < e.touches.length; i++) {
        this.x = this.x + e.touches[i].clientX;
        this.y = this.y + e.touches[i].clientY;
      }
      this.x = this.x / e.touches.length;
      this.y = this.y / e.touches.length;
      
      for(var i = 0; i < e.touches.length; i++) {
        var a = this.x - e.touches[i].clientX;
        var b = this.y - e.touches[i].clientY;
        var c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
        this.z = this.z + c;
      }
      this.z = this.z / e.touches.length;
    }

    input.x = this.x;
    input.y = this.y;
    input.z = this.z;
    input.touches = e.touches.length;
  }
}