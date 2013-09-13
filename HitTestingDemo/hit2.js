var mainCanvas;
var hitCanvas;

var init = function() {
  var LINE_WIDTH = 6.0;
  mainCanvas = document.getElementById('sceneCanvas');
  hitCanvas = document.getElementById('hitCanvas');

  var maxX = mainCanvas.width;
  var maxY = mainCanvas.height;
  var _context = mainCanvas.getContext('2d');
  var _hitContext = hitCanvas.getContext('2d');

  for (var i = 0; i<50; i++) {
    var bColor = '#' + Math.round(Math.random() * 999999);

    _context.save();
    _context.fillStyle = bColor;
    _context.strokeStyle = "#000000";
    _context.lineWidth = LINE_WIDTH;

    var x = Math.random() * maxX;
    var y = Math.random() * maxY;
    _context.fillRect(x, y, 40, 32);
    _context.strokeRect(x, y, 40, 32);

    _context.restore();

    //Register the shape in hit canvas
    _hitContext.save();
    _hitContext.fillStyle = getRandomColorKey();
    _hitContext.fillRect(x - LINE_WIDTH/2, y - LINE_WIDTH/2, 40 + LINE_WIDTH, 32 + LINE_WIDTH);       // LINE_WIDTH/2 to cover thick border
    _hitContext.restore();
  }

  var lineColors = ['pink', 'yellowgreen', 'lightgrey', 'magenta', 'navy', 'orange', 'teal', 'brown'];

  _context.save();
  _context.lineWidth = 4.0;
  _hitContext.lineWidth = 4.0;
  for (var l = 0; l<30; l++) {
    var lColor = lineColors[Math.round(Math.random() * lineColors.length) - 1];
    var beginX = Math.random() * maxX;
    var beginY = Math.random() * maxY;
    var endX = Math.random() * maxX;
    var endY = Math.random() * maxY;

    _context.strokeStyle = lColor;
    _context.beginPath();
    _context.moveTo(beginX, beginY);
    _context.lineTo(endX, endY);
    _context.stroke();

    //Register the shape in hit canvas
    _hitContext.save();
    _hitContext.strokeStyle = getRandomColorKey();
    _hitContext.beginPath();
    _hitContext.moveTo(beginX, beginY);
    _hitContext.lineTo(endX, endY);
    _hitContext.stroke();
    _hitContext.restore();
  }
  _context.restore();
};


var hitSpot = function(xPos, yPos) {
  var ctx = hitCanvas.getContext('2d');
  //First report
  var p = ctx.getImageData(xPos, yPos, 1, 1).data; 
  message("Shadow color hit: " + p[0] + ", " + p[1] + ", " + p[2] + ", a=" + p[3]);
};


var getRandomColorKey = function() {
/*  var key = 'rgba(' + Math.round(Math.random() * 256) + "," +
                      Math.round(Math.random() * 256) + "," +
                      Math.round(Math.random() * 256) + "," +
                      Math.random() + ")";
*/
  var key = '#' + Math.round(Math.random() * 256 * 256 * 256).toString(16);

//  message("Created key " + key);

  return key;
};
