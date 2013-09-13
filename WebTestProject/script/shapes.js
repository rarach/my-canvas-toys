CanvasRenderingContext2D.prototype.circle = function(x, y, radius, fill) {
  this.beginPath();
  this.arc(x, y, radius, 0.0, Math.PI*2, true);
  this.closePath();
  if (typeof fill != "undefined" && fill)
    this.fill();
  this.stroke();
}

