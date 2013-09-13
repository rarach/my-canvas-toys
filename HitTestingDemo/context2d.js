/* Draw dashed line. Returns true if last drawn segment was dash, false if gap (for path continuing purposes). */
CanvasRenderingContext2D.prototype.dashedLine = function(startX, startY, endX, endY, da, startGap) {
  if (!da)
    da = [10, 5];

  //Make the line fully hittable by filling gaps with almost transparent overlay
  this.save();
  this.strokeStyle = "rgba(0, 0, 0, 0.015)";
  this.beginPath();
  this.moveTo(startX, startY);
  this.lineTo(endX, endY);
  this.stroke();
  this.restore();

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
