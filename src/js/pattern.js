// src/pattern.js

import canvas from './canvas.js';

export default new function() {
  this.size = 96;
  this.division = 8;

  this.enable = function() {
    // refactor to enable changing on the fly
    var defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    var pattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern");

    var space = this.size / this.division;
    var half = space / 2;

    pattern.setAttribute('id', 'pattern');
    pattern.setAttribute('x', -(half + 0.5));
    pattern.setAttribute('y', -(half + 0.5));
    pattern.setAttribute('width', this.size);
    pattern.setAttribute('height', this.size);
    pattern.setAttribute('patternUnits', 'userSpaceOnUse');

    var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.setAttribute('stroke-width', 0.2);
    g.setAttribute('stroke', '#00f');
    g.setAttribute('transform', 'translate(-0.5, -0.5)');
    pattern.appendChild(g);

    // stroke width 1/96 * 100

    for (var i = 0; i < this.division; i += 1) {
      var horizontal = document.createElementNS("http://www.w3.org/2000/svg", "line");
      horizontal.setAttribute('x1', 0);
      horizontal.setAttribute('y1', (space * i) + half);
      horizontal.setAttribute('x2', this.size + 1);
      horizontal.setAttribute('y2', (space * i) + half);
      if(i === 0) { horizontal.setAttribute('stroke-width', 0.8); }
      g.appendChild(horizontal);

      var vertical = document.createElementNS("http://www.w3.org/2000/svg", "line");
      vertical.setAttribute('x1', (space * i) + half);
      vertical.setAttribute('y1', 0);
      vertical.setAttribute('x2', (space * i) + half);
      vertical.setAttribute('y2', this.size + 1);
      if(i === 0) { vertical.setAttribute('stroke-width', 0.8); }
      g.appendChild(vertical);
    }

    defs.appendChild(pattern);
    canvas.element.appendChild(defs);

    this.element = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    this.element.setAttribute('fill', 'url(#pattern)');
    canvas.element.appendChild(this.element);
  }
}