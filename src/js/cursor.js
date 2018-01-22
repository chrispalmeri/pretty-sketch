// src/cursor.js

import canvas from './canvas.js';

export default new function() {
  this.enable = function() {
    this.element = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    this.element.setAttribute('id', 'cursor');
    this.element.setAttribute('r', 2);
    canvas.element.appendChild(this.element);
  }
  this.show = e => {
    this.element.style.display = 'block';
  }
  this.hide = e => {
    this.element.style.display = 'none';
  }
  this.move = function(x, y) {
    this.element.setAttribute('cx', x);
    this.element.setAttribute('cy', y);
  }
}