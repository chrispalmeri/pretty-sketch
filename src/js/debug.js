// src/debug.js

export default new function() {
  this.element = document.createElement("pre");
  this.enable = function() {
    this.enabled = true;
  }
  this.log = function(info) {
    if(this.enabled) {
      this.element.innerHTML = JSON.stringify(info, null, 2);
    } else {
      this.element.innerHTML = '';
    }
  }
}