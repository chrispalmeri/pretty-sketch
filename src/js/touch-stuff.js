function Cursor(touches) {
  this.touches = touches;
  this.x = 0;
  this.y = 0;
  this.z = 0;
  
  // center
  for(var i = 0; i < touches.length; i++) {
    this.x = this.x + touches[i].x;
    this.y = this.y + touches[i].y;
  }
  this.x = this.x / touches.length;
  this.y = this.y / touches.length;
  
  // scale
  for(var i = 0; i < touches.length; i++) {
    var a = this.x - touches[i].x;
    var b = this.y - touches[i].y;
    var c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
    this.z = this.z + c;
  }
  this.z = this.z / touches.length;
}

var last, next;

function cursorDown(touches) {
  if(touches.length < 1) {
    requestAnimationFrame(function() { cursor.scale(); });
  } else {
    last = new Cursor(touches);
    // if > 1 draw/scale everything, else only cursor
    // THIS ^^^
    requestAnimationFrame(function() { cursor.render(); drawing.render(); graph.render(); });
  }
}

function cursorMove(touches) {
  if(touches.length > 1 && last.touches.length > 1) {
    next = new Cursor(touches);
    
    // zoom
    var oldScale = view.z; // you prob do need to store this in Cursor in case of wheel events
    view.z = oldScale * (next.z / last.z);

    // pan
    view.x = view.x + ((next.x * window.devicePixelRatio) / (view.z * view.ratio)) - ((last.x * window.devicePixelRatio) / (oldScale * view.ratio));
    view.y = view.y + ((next.y * window.devicePixelRatio) / (view.z * view.ratio)) - ((last.y * window.devicePixelRatio) / (oldScale * view.ratio));
  }
  cursorDown(touches);
}

function wheelHandler(e) {
  var oldScale = view.z;
  if(e.deltaY > 0) {
    // zoom out
    view.z = oldScale / 1.1;
  }
  if(e.deltaY < 0) {
    // zoom in
    view.z = oldScale * 1.1;
  }
  // pan
  // last  for everything ok?
  view.x = view.x + ((last.x * window.devicePixelRatio) / (view.z * view.ratio)) - ((last.x * window.devicePixelRatio) / (oldScale * view.ratio));
  view.y = view.y + ((last.y * window.devicePixelRatio) / (view.z * view.ratio)) - ((last.y * window.devicePixelRatio) / (oldScale * view.ratio));
  
   // / (view.ratio / window.devicePixelRatio)
  
  requestAnimationFrame(function() { cursor.render(); drawing.render(); graph.render(); });
  e.preventDefault();
}

var touches = [];

// abstract the conversions cause there are duplicates now


// having one of several pointers leave the area and then come back
// breaks things, grid disappears and drawing stops moving
// no errors logged though
function pointerHandler(e) {
  var touch = {
    id: e.pointerId,
    type: e.pointerType,
    x: e.clientX,
    y: e.clientY
  };
  var i = touches.length;
  while (i--) {
    if(touches[i].id === touch.id || touches[i].type !== touch.type) {
      touches.splice(i, 1);
    }
  }
  touches.push(touch);
  cursorMove(touches);
  e.preventDefault();
}

function pointerHandlerD(e) {
  var touch = {
    id: e.pointerId,
    type: e.pointerType,
    x: e.clientX,
    y: e.clientY
  };
  var i = touches.length;
  while (i--) {
    if(touches[i].id === touch.id || touches[i].type !== touch.type) {
      touches.splice(i, 1);
    }
  }
  touches.push(touch);
  cursorDown(touches);
  e.preventDefault();
}

function pointerUp(e) {
  var touch = {
    id: e.pointerId,
    x: e.clientX,
    y: e.clientY
  };
  var i = touches.length;
  while (i--) {
    if(touches[i].id === touch.id) {
      touches.splice(i, 1);
    }
  }
  cursorDown(touches);
  e.preventDefault();
}

function mouseHandler(e) {
  touches = [{
    x: e.clientX,
    y: e.clientY
  }];
  cursorMove(touches);
}
function mouseOut(e) {
  touches = [];
  cursorMove(touches);
}

function touchHandler(e) {
  touches = [];
  for(var i = 0; i < e.touches.length; i++) {
    var touch = {
      x: e.touches[i].clientX,
      y: e.touches[i].clientY
    };
    touches.push(touch);
  }
  cursorMove(touches);
  e.preventDefault();
}

function touchHandlerD(e) {
  touches = [];
  for(var i = 0; i < e.touches.length; i++) {
    var touch = {
      x: e.touches[i].clientX,
      y: e.touches[i].clientY
    };
    touches.push(touch);
  }
  cursorDown(touches);
  e.preventDefault();
}

if (window.PointerEvent) {
  cursor.canvas.addEventListener("pointerdown", pointerHandlerD);
  cursor.canvas.addEventListener("pointermove", pointerHandler);
  cursor.canvas.addEventListener("pointerout", pointerUp);
} else {
  cursor.canvas.addEventListener("mousemove", mouseHandler);
  cursor.canvas.addEventListener("mouseout", mouseOut);
  cursor.canvas.addEventListener("touchstart", touchHandlerD);
  cursor.canvas.addEventListener("touchmove", touchHandler);
  cursor.canvas.addEventListener("touchend", touchHandlerD);
}
  cursor.canvas.addEventListener("wheel", wheelHandler);