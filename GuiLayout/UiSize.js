/**
 * Dimensions of an element. If null is assigned to a dimension, the real numeric
 * value will be recognized by layout.
 */
var UiSize = function(width, height) {            //TODO: what about merging this with UiPoint to BoundingBox? Check usage of UiPoint and decide.
  var _width = null;
  var _height = null;

  this.width = function(newWidth) {
    if (typeof newWidth != "undefined")     //TODO: I can check directly for UiDimension
      _width = newWidth;

    return _width;
  };

  this.height = function(newHeight) {
    if (typeof newHeight != "undefined")
      _height = newHeight;

    return _height;
  };

  this.width(width);
  this.height(height);
};
