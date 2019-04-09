// src/svg.js

import element from './element.js';

export default new function() {
  this.element = element.create('svg');
  this.recalc = function() {
    this.width = this.element.getBoundingClientRect().width;
    this.height = this.element.getBoundingClientRect().height;
    this.top = this.element.getBoundingClientRect().top;
    this.left = this.element.getBoundingClientRect().left;
  }
}