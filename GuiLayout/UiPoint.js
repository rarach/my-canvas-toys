/** Position of top left corner inside container. This is immutable class. */
var UiPoint = function(x, y) {
  var _x = x || 0.0;
  var _y = y || 0.0;

  this.X = function() {return _x;};
  this.Y = function() {return _y;};
};

/**
 * Return new instance of UiPoint that is shift of this by given point.
 */
UiPoint.prototype.add = function(point) {
  return new UiPoint(this.X() + point.X(), this.Y() + point.Y());
};
