// src/cursor.js

import element from './element.js';
import svg from './svg.js';

export default new function() {
  this.enable = function() {
    this.element = element.create('circle', {
      parent: svg.element,
      attributes: {
        id: 'cursor',
        r: 2,
        fill: '#f00',
        'stroke-width': 0
      }
    });
    
    svg.element.addEventListener("mouseenter", function() {
      this.show();
    }.bind(this));
    svg.element.addEventListener("mouseleave", function() {
      this.hide();
    }.bind(this));
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