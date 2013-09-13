var viewPortCanvas;
var offCanvas;



function initScene() {
  offCanvas = document.createElement('canvas');
  offCanvas.width = 10000;
  offCanvas.height = 8400;

  
  viewPortCanvas = document.getElementById('viewPort');
//  var vpWidth = viewPortCanvas.width;
//  var vpHeight = viewPortCanvas.height;

var vpWidth = offCanvas.width;
var vpHeight = offCanvas.height;

  //Random rectangles
//  var _context = viewPortCanvas.getContext("2d");
  var _context = offCanvas.getContext('2d');

  for (var i = 0; i<20000; i++) {
    var color = '#' + Math.round(Math.random() * 999999);

    _context.save();
    _context.fillStyle = color;
    _context.strokeStyle = "#000000";
    _context.lineWidth = 2;

    var x = Math.random() * vpWidth;
    var y = Math.random() * vpHeight;
    _context.fillRect(x, y, 14, 8);
    _context.strokeRect(x, y, 14, 8);

    _context.restore();
  }

  var vpContext = viewPortCanvas.getContext("2d");
  vpWidth = viewPortCanvas.width;
  vpHeight = viewPortCanvas.height;
  viewPortCanvas.width = viewPortCanvas.height = 0;  
  viewPortCanvas.width = vpWidth;
  viewPortCanvas.height = vpHeight;
  vpContext.drawImage(offCanvas, 0, 0);
}


var shiftX = 0;
var shiftY = 0;

function panX(shift) {
  shiftX += shift;
  var vpContext = viewPortCanvas.getContext("2d");
  var vpWidth = viewPortCanvas.width;
  var vpHeight = viewPortCanvas.height;
  viewPortCanvas.width = viewPortCanvas.height = 0;
  viewPortCanvas.width = vpWidth;
  viewPortCanvas.height = vpHeight;
  vpContext.drawImage(offCanvas, shiftX, shiftY);

  message("Overall X pan offset: " + shiftX);
}

function panY(shift) {
  shiftY += shift;
  var vpContext = viewPortCanvas.getContext("2d");
  var vpWidth = viewPortCanvas.width;
  var vpHeight = viewPortCanvas.height;
  viewPortCanvas.width = viewPortCanvas.height = 0;
  viewPortCanvas.width = vpWidth;
  viewPortCanvas.height = vpHeight;
  vpContext.drawImage(offCanvas, shiftX, shiftY);

  message("Overall Y pan offset: " + shiftY);
}


function message(text) {
  document.getElementById('messageSpan').innerHTML = text;
}