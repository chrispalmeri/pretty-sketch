// src/noise.js

import element from './element.js';
import svg from './svg.js';

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
      element.create('circle', {
        parent: svg.element,
        attributes: {
          cx: noise[i].x,
          cy: noise[i].y,
          r: noise[i].r,
          fill: 'transparent',
          'stroke-width': 1,
          stroke: '#000'
        }
      });
    }
  }
}