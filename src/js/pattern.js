// src/pattern.js

import element from './element.js';
import svg from './svg.js';

export default new function() {
  this.size = 96;
  this.division = 8;

  this.enable = function() {
    // refactor to enable changing on the fly
    var defs = element.create('defs', {
      parent: svg.element
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

    if(window.chrome && window.chrome.webstore) {
      var g = element.create('g', {
        parent: pattern,
        attributes: {
          fill: '#00f',
          transform: 'translate(-0.5, -0.5)'
        }
      });
  
      for (var i = 0; i < this.division; i += 1) {
        element.create('rect', {
          parent: g,
          attributes: {
            x: 0,
            y: (space * i) + half - (i === 0 ? 0.4 : 0.1),
            width: this.size + 1,
            height: i === 0 ? 0.8 : 0.2
          }
        });
  
        element.create('rect', {
          parent: g,
          attributes: {
            x: (space * i) + half - (i === 0 ? 0.4 : 0.1),
            y: 0,
            height: this.size + 1,
            width: i === 0 ? 0.8 : 0.2
          }
        });
      }
    } else {
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
    }

    this.element = element.create('rect', {
      parent: svg.element,
      attributes: {
        fill: 'url(#pattern)'
      }
    });
  }
}