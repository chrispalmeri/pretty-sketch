// src/noise.js

import canvas from './canvas.js';

export default new function() {
  this.enable = function() {
    var noise = [];
    for(var i = 0; i < 500; i++) {
      noise.push({
        x: (Math.random()*3000),
        y: (Math.random()*1500),
        r: (Math.random()*75)
      });
    }
    for(var i = 0; i < noise.length; i++) {
      var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute('cx', noise[i].x);
      circle.setAttribute('cy', noise[i].y);
      circle.setAttribute('r', noise[i].r);
      canvas.element.appendChild(circle);
    }
  }
}