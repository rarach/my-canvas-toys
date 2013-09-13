/**
 * Prerendered label in form of canvas
 */
var Label = function(parent, text, height, font, backgroundFill)            //TODO: meaningful modul/namespace
{
  var _parent = parent;
  var _offCanvas = document.createElement("canvas");
  var MARGIN = 3.0;
  var _scale = 1.0;

  this.getScale = function() {return _scale;};
  this.setScale = function(scale) {_scale = scale;};
  //TODO: should also support scaling by layout. With poor performance but sharp text.

  this.getWidth = function() { return _scale * _offCanvas.width; };
  this.getHeight = function() { return _scale * _offCanvas.height; };

  _offCanvas.height = _scale * (height + MARGIN);

  var offContext = _offCanvas.getContext("2d");
  offContext.textAlign = "left";
  offContext.font = font;
  offContext.fillStyle = "black";
  var labelW = offContext.measureText(text).width + MARGIN + MARGIN;
  _offCanvas.width = labelW;
  if(backgroundFill) {
    offContext.save();
    offContext.fillStyle = backgroundFill;
    offContext.fillRect(0, 0, labelW, height);
    offContext.restore();
  }

  //Note: must be set again because setting width did reset
  offContext.textAlign = "left";
  offContext.textBaseline = "top";
  offContext.font = font;
  offContext.fillText(text, MARGIN, 0.0);

  this.draw = function(x, y, context) {
    var ctx;
    if (context)
      ctx = context;
    else
      ctx = _parent.getContext();

    ctx.save();
    ctx.drawImage(_offCanvas, x, y, _scale * _offCanvas.width, _scale * _offCanvas.height);
    ctx.restore();
  };
};


/* Draw dashed line. Returns true if last drawn segment was dash, false if gap (for path continuing purposes). */
//TODO: No, No, No! That's standalone GUI element, not canvas extension!
CanvasRenderingContext2D.prototype.dashedLine = function(startX, startY, endX, endY, da, startGap) {      //TODO: this really doesn't belong here
  if (!da)
    da = [10, 5];

  //Make the line fully hittable by filling gaps with almost transparent overlay
/* Nevermind, HitService does that. TODO: delete
  this.save();
  this.strokeStyle = "rgba(0, 0, 0, 0.015)";
  this.beginPath();
  this.moveTo(startX, startY);
  this.lineTo(endX, endY);
  this.stroke();
  this.restore();
*/
  this.save();
  var dx = (endX-startX), dy = (endY-startY);
  var len = Math.sqrt(dx*dx + dy*dy);
  var rot = Math.atan2(dy, dx);
  this.translate(startX, startY);
  this.moveTo(0, 0);
  this.rotate(rot);
  var di = startGap? 1 : 0;
  var draw = !startGap;
  var gotoX = 0;

  this.beginPath();
  this.moveTo(0, 0);
  while (len > gotoX) {
    gotoX += da[di++ % 2];
    if (gotoX > len)
      gotoX = len;
    draw ? this.lineTo(gotoX, 0) : this.moveTo(gotoX, 0);
    draw = !draw;
  }
  this.stroke();

  this.restore();

  return draw;
};


/* Rectangular bounding frame of a grafic object. This is not a visual element, only dimension data container. */
//...and hence shouldn't be here!
var Frame = function(x, y, width, height)
{
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
};
