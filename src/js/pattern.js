// src/pattern.js

import canvas from './canvas.js';

export default new function() {
  this.enable = function() {
    var defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    var pattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern");

    pattern.setAttribute('id', 'pattern');
    pattern.setAttribute('x', 0);
    pattern.setAttribute('y', 0);
    pattern.setAttribute('width', 20);
    pattern.setAttribute('height', 20);
    pattern.setAttribute('patternUnits', 'userSpaceOnUse');

    var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute('cx', 10);
    circle.setAttribute('cy', 10);
    circle.setAttribute('r', 10);
    circle.setAttribute('fill', '#393');
    pattern.appendChild(circle);

    defs.appendChild(pattern);
    canvas.element.appendChild(defs);

    this.element = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    this.element.setAttribute('fill', 'url(#pattern)');
    canvas.element.appendChild(this.element);
  }
}