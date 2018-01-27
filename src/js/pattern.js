// src/pattern.js

import element from './element.js';
import canvas from './canvas.js';

export default new function() {
  this.size = 96;
  this.division = 8;

  this.enable = function() {
    // refactor to enable changing on the fly
    var defs = element.create('defs', {
      parent: canvas.element
    });

    var space = this.size / this.division;
    var half = space / 2;

    var pattern = element.create('pattern', {
      parent: defs,
      attributes: {
        id: 'pattern',
        x: -(half + 0.5),
        y: -(half + 0.5),
        width: this.size,
        height: this.size,
        patternUnits: 'userSpaceOnUse'
      }
    });

    var g = element.create('g', {
      parent: pattern,
      attributes: {
        'stroke-width': 0.2,
        stroke: '#00f',
        transform: 'translate(-0.5, -0.5)'
      }
    });

    for (var i = 0; i < this.division; i += 1) {
      element.create('line', {
        parent: g,
        attributes: {
          x1: 0,
          y1: (space * i) + half,
          x2: this.size + 1,
          y2: (space * i) + half,
          'stroke-width': i === 0 ? 0.8 : 0.2
        }
      });

      element.create('line', {
        parent: g,
        attributes: {
          x1: (space * i) + half,
          y1: 0,
          x2: (space * i) + half,
          y2: this.size + 1,
          'stroke-width': i === 0 ? 0.8 : 0.2
        }
      });
    }

    this.element = element.create('rect', {
      parent: canvas.element,
      attributes: {
        fill: 'url(#pattern)'
      }
    });
  }
}