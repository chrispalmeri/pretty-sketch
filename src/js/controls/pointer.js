// src/controls/pointer.js

import canvas from './../canvas.js';
import touch from './touch.js';
import input from './input.js';
import last from './../last.js';
import view from './../view.js';

export default new function() {
  this.touches = [];

  this.enable = function() {
    canvas.element.addEventListener("pointerdown", function(e) {
      this.recalc(e);
      touch.touch({touches: this.touches});
      e.preventDefault();
    }.bind(this));
    
    canvas.element.addEventListener("pointermove", function(e) {
      this.recalc(e);
      touch.recalc({touches: this.touches});
      if(this.touches.length > 1 && last.touches === this.touches.length) {
        input.pan = true;
        input.zoom = last.zoom * (input.z / last.z);
      }
      view.refresh();
      e.preventDefault();
    }.bind(this));
    
    canvas.element.addEventListener("pointerup", function(e) {
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

    // would like pointerout to hide cursor
    // but it fires when you mouse over any element

    // middle click pan is not implemented for pointer yet
    // actually all clicks, maybe because they constitute pointerup

    // cursor flashes after zoom and when re-entering screen
    // maybe a timing issue cause you are piggy-backing on touch

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