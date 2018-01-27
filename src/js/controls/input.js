// src/controls/input.js

import pointer from './pointer.js';
import mouse from './mouse.js';
import touch from './touch.js';
import wheel from './wheel.js';
import keyboard from './keyboard.js';

export default new function() {
  this.x = 0;
  this.y = 0;
  this.z = 0;
  this.pan = false;
  this.zoom = 1;
  this.touches = 0;

  this.enable = function() {
    if (window.PointerEvent) {
      pointer.enable();
    } else {
      mouse.enable();
      touch.enable();
    }
    wheel.enable();
    keyboard.enable();
  }
}