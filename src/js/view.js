// src/view.js

import canvas from './canvas.js';
import input from './input.js';
import cursor from './cursor.js';
import debug from './debug.js';
import last from './last.js';
import pattern from './pattern.js';

export default new function() {
  this.x = -0.5;
  this.y = -0.5;

  this.refresh = function() {
    window.requestAnimationFrame(e => {
      canvas.recalc();
      
      if(input.pan) {
        var moveX = (input.x - last.x) / input.zoom;
        var moveY = (input.y - last.y) / input.zoom;
      
        this.x = this.x - moveX;
        this.y = this.y - moveY;
      }
      
      if(last.zoom !== input.zoom) {
        var oldX = (last.x - canvas.left) / last.zoom;
        var oldY = (last.y - canvas.top) / last.zoom;

        var newX = (last.x - canvas.left) / input.zoom;
        var newY = (last.y - canvas.top) / input.zoom;
        
        this.x = this.x + (oldX - newX);
        this.y = this.y + (oldY - newY);
      }
      
      canvas.element.setAttribute('viewBox', this.x + ' ' + this.y + ' ' + canvas.width/input.zoom + ' ' + canvas.height/input.zoom);
      pattern.element.setAttribute('x', this.x);
      pattern.element.setAttribute('y', this.y);
      pattern.element.setAttribute('width', canvas.width/input.zoom);
      pattern.element.setAttribute('height', canvas.height/input.zoom);

      cursor.move(
        ((input.x - canvas.left) / input.zoom) + this.x,
        ((input.y - canvas.top) / input.zoom) + this.y
      );
      
      last.x = input.x;
      last.y = input.y;
      last.z = input.z;
      last.zoom = input.zoom;
      last.touches = input.touches;
      
      debug.log({
        input: input,
        view: this
      });
    });
  }
}