// src/canvas.js

export default new function() {
  this.element = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  this.recalc = function() {
    this.width = this.element.getBoundingClientRect().width;
    this.height = this.element.getBoundingClientRect().height;
    this.top = this.element.getBoundingClientRect().top;
    this.left = this.element.getBoundingClientRect().left;
  }
}