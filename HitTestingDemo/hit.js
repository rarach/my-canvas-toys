function hitSpot(xPos, yPos)
{
  //First report
  var p = ctx.getImageData(xPos, yPos, 1, 1).data; 
  message("Color hit: " + p[0] + ", " + p[1] + ", " + p[2] + ", a=" + p[3]);

  ctx.save();
  ctx.strokeStyle="red";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(xPos, yPos, 5.0, 0.0, Math.PI*2, false);
  ctx.stroke();
  
  ctx.strokeStyle = "black";
  ctx.beginPath();
  ctx.moveTo(xPos-4, yPos);
  ctx.lineTo(xPos+4, yPos);
  ctx.moveTo(xPos, yPos-4);
  ctx.lineTo(xPos, yPos+4);
  ctx.stroke();
  ctx.restore();
  
  if (path.hit(xPos, yPos, 3.0))
    message("LINE HIT! (delta=3)");
}


var Path = function()
{
  var controlPoints = [];
  
  
  this.getPoints = function() {return controlPoints;};
  this.appendPoint = function(pointX, pointY) {
    controlPoints.push({x: pointX, y: pointY});
  };
  
  this.draw = function(ctx) {         //TODO: brush
    var segs = controlPoints.length;
    if (2 > segs)
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
      dash = ctx.dashedLine(controlPoints[i-1].x, controlPoints[i-1].y, controlPoints[i].x, controlPoints[i].y, [11, 11], !dash);
    }
  };


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
      if (xShiftLeft > beginX && xShiftRight > endX)
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
};



var path = new Path();

function diagram()
{
  path.appendPoint(150, 80);
  path.appendPoint(150, 20);
  path.appendPoint(290, 250);
  path.appendPoint(240, 20);
  path.appendPoint(830, 450);
  path.appendPoint(940, 5);

  ctx.save();
  ctx.strokeStyle="green";
  ctx.lineWidth = 3;
  
  path.draw(ctx);
//  path.drawDashed(ctx);
  ctx.restore();
}

function dashed()
{
  var dPath = new Path();
  dPath.appendPoint(50, 450);
  dPath.appendPoint(620, 333);
  dPath.appendPoint(360, 680);
  dPath.appendPoint(50, 420);
  dPath.appendPoint(25, 420);
  dPath.appendPoint(50, 400);
  dPath.appendPoint(325, 26);

  ctx.save();
  ctx.strokeStyle = "blue";
  ctx.lineWidth = 3;
  ctx.lineCap = "round";
  dPath.drawDashed(ctx);
  ctx.restore();
}