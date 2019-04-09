// src/controls/pointer.js

import svg from './../svg.js';
import touch from './touch.js';
import input from './input.js';
import last from './../last.js';
import view from './../view.js';

export default new function() {
  this.touches = [];

  this.enable = function() {
    svg.element.addEventListener("pointerenter", function(e) {
      this.recalc(e);
      touch.touch({touches: this.touches});
      e.preventDefault();
    }.bind(this));
    
    svg.element.addEventListener("pointermove", function(e) {
      this.recalc(e);
      touch.recalc({touches: this.touches});
      if(this.touches.length > 1 && last.touches === this.touches.length) {
        input.pan = true;
        input.zoom = last.zoom * (input.z / last.z);
      }
      view.refresh();
      e.preventDefault();
    }.bind(this));
    
    svg.element.addEventListener("pointerleave", function(e) {
      var point = {
        id: e.pointerId,
        clientX: e.clientX,
        clientY: e.clientY
      };
      var i = this.touches.length;
      while (i--) {
        if(this.touches[i].id === point.id) {
          this.touches.splice(i, 1);
        }
      }
      touch.touch({touches: this.touches});
      e.preventDefault();
    }.bind(this));

    svg.element.addEventListener('pointerdown', function(e) {
      if(e.button === 1) {
        input.pan = true;
        view.refresh();
        e.preventDefault();
      }
    });
    
    svg.element.addEventListener('pointerup', function(e) {
      if(e.button === 1) {
        input.pan = false;
        view.refresh();
      }
    });

    // cursor flashes after zoom
    // probably cause cursor display change is outside the animation loop

    // chrome is using pointer too now
    // two finger tap is left click in chrome
    // Edge is laggy as hell
    // pinch to zoom is not always the right ratio
  }

  this.recalc = function(e) {
    var point = {
      id: e.pointerId,
      type: e.pointerType,
      clientX: e.clientX,
      clientY: e.clientY
    };
    var i = this.touches.length;
    while (i--) {
      if(this.touches[i].id === point.id || this.touches[i].type !== point.type) {
        this.touches.splice(i, 1);
      }
    }
    this.touches.push(point);
  }
}