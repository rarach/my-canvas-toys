/* Path composed of straight lines with equal width */
var Polyline = function()         //TODO: rename to Polyline
{
  var controlPoints = [];

  /* Get path points (objects with properties 'x' and 'y') */
  this.getPoints = function() { return controlPoints; };
  this.appendPoint = function(pointX, pointY) {
    controlPoints.push({x: pointX, y: pointY});
  };
  
  this.draw = function(ctx) {         //TODO: brush
    var segs = controlPoints.length;
    if(2 > segs)
      return;

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(controlPoints[0].x, controlPoints[0].y);
    for (var i=0; i<segs; i++) {
      ctx.lineTo(controlPoints[i].x, controlPoints[i].y);
    }
    ctx.stroke();
    ctx.restore();
  };

  this.drawDashed = function(ctx) {
    var pnts = controlPoints.length;
    if (2 > pnts)
      return;

    var dash = true;
    for (var i=1; i<pnts; i++) {
      dash = ctx.dashedLine(controlPoints[i-1].x, controlPoints[i-1].y, controlPoints[i].x, controlPoints[i].y, [8, 12], !dash);
    }
  };
  
/*Delete if all right. This is job of HitService
  this.hit = function(clickX, clickY, delta) {
    var segs = controlPoints.length;
    if (2 > segs)
      return false;

    for(var i=1; i<segs; i++) {
      var beginX = controlPoints[i-1].x;
      var endX = controlPoints[i].x

      //First check if not too far from bounding rectangle
      var xShiftRight = clickX+delta;
      if (xShiftRight < beginX && xShiftRight < endX)
        continue;       //It's far left

      var xShiftLeft = clickX-delta;
      if (xShiftLeft > beginX && xShiftLeft > endX)
        continue;       //Far too right

      var beginY = controlPoints[i-1].y;
      var endY = controlPoints[i].y;

      var yShiftUp = clickY-delta;
      if (yShiftUp > beginY && yShiftUp > endY)
        continue;

      var yShiftDown = clickY+delta;
      if (yShiftDown < beginY && yShiftDown < endY)
        continue;

      //Compute distance between point and a straight line segment
      var K = clickX - beginX;
      var L = clickY - beginY;
      var xDiff = endX - beginX;
      var yDiff = endY - beginY;
      var lineLen = Math.sqrt(xDiff*xDiff + yDiff*yDiff);       //TODO: could be save as a property of line segment?
      
      var dist = Math.abs(K*yDiff - L*xDiff) / lineLen;

      if (dist <= delta)
        return true;
    }

    return false;
  };
*/
};
