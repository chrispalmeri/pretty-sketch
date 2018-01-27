// src/cursor.js

import element from './element.js';
import canvas from './canvas.js';

export default new function() {
  this.enable = function() {
    this.element = element.create('circle', {
      parent: canvas.element,
      attributes: {
        id: 'cursor',
        r: 2,
        fill: '#f00',
        'stroke-width': 0
      }
    });
    
    canvas.element.addEventListener("mouseenter", e => {
      this.show();
    });
    canvas.element.addEventListener("mouseleave", e => {
      this.hide();
    });
  }
  this.show = function() {
    this.element.style.display = 'block';
  }
  this.hide = function() {
    this.element.style.display = 'none';
  }
  this.move = function(x, y) {
    this.element.setAttribute('cx', x);
    this.element.setAttribute('cy', y);
  }
}