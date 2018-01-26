// src/element.js

export default new function() {
  this.create = function(type, data) {
    var element = document.createElementNS("http://www.w3.org/2000/svg", type);
    
    if (data) {
      for (var key in data.attributes) {
        element.setAttribute(key, data.attributes[key]);
      }
  
      if(data.parent) {
        data.parent.appendChild(element);
      }
    }

    return element;
  }
}