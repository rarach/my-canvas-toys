var UIPoint = function(x, y) {
  var _x = x;
  var _y = y;

  this.getX = function() {return _x;};
  this.getY = function() {return _y;};

  this.multiply = function(factor) {
    return new UIPoint(factor * this.getX(), factor * this.getY());
  };

  this.add = function(incX, incY) {
    return new UIPoint(incX + this.getX(), incY + this.getY());
  };
};
