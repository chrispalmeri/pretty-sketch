// src/pattern.js

import canvas from './canvas.js';

export default new function() {
  this.enable = function() {
    var defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    var pattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern");

    pattern.setAttribute('id', 'pattern');
    pattern.setAttribute('x', -12.5);
    pattern.setAttribute('y', -12.5);
    pattern.setAttribute('width', 96);
    pattern.setAttribute('height', 96);
    pattern.setAttribute('patternUnits', 'userSpaceOnUse');

    var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.setAttribute('stroke-width', 1);
    g.setAttribute('stroke', '#00f');
    g.setAttribute('transform', 'translate(-0.5, -0.5)');
    pattern.appendChild(g);

    // stroke width 1/96 * 100

    for (var i = 0; i < 4; i += 1) {
      var horizontal = document.createElementNS("http://www.w3.org/2000/svg", "line");
      horizontal.setAttribute('x1', 0);
      horizontal.setAttribute('y1', (24 * i) + 12);
      horizontal.setAttribute('x2', 97);
      horizontal.setAttribute('y2', (24 * i) + 12);
      g.appendChild(horizontal);

      var vertical = document.createElementNS("http://www.w3.org/2000/svg", "line");
      vertical.setAttribute('x1', (24 * i) + 12);
      vertical.setAttribute('y1', 0);
      vertical.setAttribute('x2', (24 * i) + 12);
      vertical.setAttribute('y2', 97);
      g.appendChild(vertical);
    }

    defs.appendChild(pattern);
    canvas.element.appendChild(defs);

    this.element = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    this.element.setAttribute('fill', 'url(#pattern)');
    canvas.element.appendChild(this.element);
  }
}