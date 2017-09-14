// src/canvas.js
import view from './view.js';

export default function(e) {
  this.canvas = e;
  this.context = e.getContext("2d");
  this.refresh = function() {
    this.canvas.style.width = window.innerWidth + 'px';
    this.canvas.style.height = window.innerHeight + 'px';
    this.canvas.width = window.innerWidth * view.upsample;
    this.canvas.height = window.innerHeight * view.upsample;
  }
  this.scale = function() { // drawing, graph
    this.refresh();
    this.context.scale(view.z * view.ratio, view.z * view.ratio);
    this.context.translate(view.x, view.y);
  }
  this.size = function() { // cursor
    this.refresh();
    this.context.scale(window.devicePixelRatio, window.devicePixelRatio);
    // you are using window.devicePixelRatio several places I think
    // should be added to view somehow
    // make sure this still works with random ppi corrections
  }
  this.render = null;
}