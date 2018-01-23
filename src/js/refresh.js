// src/refresh.js

import canvas from './canvas.js';
import input from './input.js';
import cursor from './cursor.js';
import debug from './debug.js';
import view from './view.js';
import last from './last.js';
import pattern from './pattern.js';

export default new function() {
  this.refresh = function() {
    window.requestAnimationFrame(function() {
      canvas.recalc();
      
      if(input.pan) {
        var moveX = (input.x - last.x) / input.zoom;
        var moveY = (input.y - last.y) / input.zoom;
      
        view.x = view.x - moveX;
        view.y = view.y - moveY;
      }
      
      if(last.zoom !== input.zoom) {
        var oldX = (last.x - canvas.left) / last.zoom;
        var oldY = (last.y - canvas.top) / last.zoom;

        var newX = (last.x - canvas.left) / input.zoom;
        var newY = (last.y - canvas.top) / input.zoom;
        
        view.x = view.x + (oldX - newX);
        view.y = view.y + (oldY - newY);
      }
      
      canvas.element.setAttribute('viewBox', view.x + ' ' + view.y + ' ' + canvas.width/input.zoom + ' ' + canvas.height/input.zoom);
      pattern.element.setAttribute('x', view.x);
      pattern.element.setAttribute('y', view.y);
      pattern.element.setAttribute('width', canvas.width/input.zoom);
      pattern.element.setAttribute('height', canvas.height/input.zoom);

      cursor.move(
        ((input.x - canvas.left) / input.zoom) + view.x,
        ((input.y - canvas.top) / input.zoom) + view.y
      );
      
      last.x = input.x;
      last.y = input.y;
      last.zoom = input.zoom;
      
      debug.log({
        input: input,
        view: view
      });
    });
  }
}