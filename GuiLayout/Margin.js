/** Immutable margin around rectangular bounding box of an element */
var Margin = function(left, top, bottom, right) {
  var _left = 0.0;
  var _top = 0.0;
  var _right = 0.0;
  var _bottom = 0.0;

  if (typeof left === "number")
    _left = left;
  if (typeof top === "number")
    _top = top;
  if (typeof right === "number")
    _right = right;
  if (typeof bottom === "number")
    _bottom = bottom;

  this.left = function() { return _left; }
  this.top = function() { return _top; }
  this.right = function() { return _right; }
  this.bottom = function() { return _bottom; }
};
