/**
 * A rectangle by which an element will be clipped inside its parent. Defined by position, width and height.
 * 
 * @param {UiPoint}  position  coordinates relative to parent
 * @param {UiSize}  size  width and height of the clipping box
 */
var ClippingBox = function(position, size) {
  var _position = position || new UiPoint(0, 0);
  var _dimensions = size || new UiSize(0, 0);

  this.position = function(newPosition) {
    return (_position = newPosition || _position);           //TODO: I suspect that the encapsulation negatively affects performance. Make some benchmarks and if so, tradeoff speed for encapsulation
  };
  this.size = function(newSize) {
    return (_dimensions = newSize || _dimensions);
  };
};

/**
 * Evaluates intersection of this and given box and returns it in new instance of ClippingBox. If they do not intersect,
 * ClippingBox with zero dimensions and position X=-1, Y=-1 is returned.
 */
ClippingBox.prototype.intersect = function(otherClipBox) {
  var x = this.position().X();
  var y = this.position().Y();
  var width = this.size().width();
  var height = this.size().height();
  var otherX = otherClipBox.position().X();
  var otherY = otherClipBox.position().Y();
  var otherWidth = otherClipBox.size().width();
  var otherHeight = otherClipBox.size().height();
  var outX = -1.0;
  var outY = -1.0;
  var outWidth = 0.0;
  var outHeight = 0.0;
  var getFail = function() {
    return new ClippingBox(new UiPoint(-1.0, -1.0), new UiSize(0, 0));
  };

  if (x <= otherX) {
    if (x + width <= otherX)
      return getFail();
    else {
      outX = otherX;
      if (x + width <= otherX + otherWidth)
        outWidth = (x + width) - otherX;
      else
        outWidth = otherWidth;
    }
  }
  else {
    if (otherX + otherWidth <= x)
      return getFail();
    else {
      outX = x;
      if (otherX + otherWidth <= x + width)
        outWidth = (otherX + otherWidth) - x;
      else
        outWidth = width;
    }
  }

  if (y <= otherY) {
    if (y + height <= otherY)
      return getFail();
    else {
      outY = otherY;
      if (y + height <= otherY + otherHeight)
        outHeight = (y + height) - otherY;
      else
        outHeight = otherHeight;
    }
  }
  else {
    if (otherY + otherHeight <= y)
      return getFail();
    else {
      outY = y;
      if (otherY + otherHeight <= y + height)
        outHeight = (otherY + otherHeight) - y;
      else
        outHeight = height;
    }
  }

  return new ClippingBox(new UiPoint(outX, outY), new UiSize(outWidth, outHeight));
};
