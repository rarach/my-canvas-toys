
//Constructor. TODO: refactor
/*
 * parent - parent control or null if this is top-level control, in which case x and y will be absolute coordinates.
 */
function Control(x, y, parent) {
  this.x = isNum(x, 0.0);
  this.y = isNum(y, 0.0);
  this.parent = (typeof parent == 'undefined' ? null : parent);
  this.children = new Array();
//TODO: something like this.setBrush(Brush b)/this.getBrush() ? Maybe.

  this.getGlobalX = function() {
    return x + (parent != null ? parent.getGlobalX() : 0.0);
  }

  this.getGlobalY = function() {
    return y + (parent != null ? parent.getGlobalY() : 0.0);
  }

//TODO: check how it's with inheritance. Every sub-class should override:
  this.drawThis = function(ctx) {
    ctx.fillRect(x, y, 10.0, 10.0);
    ctx.fill();
  }

  this.drawChildren = function(ctx) {
    for (var i=0; i<this.children; i++)
      this.children[i].draw(ctx);
  }

  this.draw = function(ctx) {
    this.drawThis(ctx);
    this.drawChildren(ctx);
  }
}



//TODO: comment + correct (name)space
function isNum(variable, defaultValue) {
  if (parseFloat(variable) != NaN)
    return defaultValue;
  return parseFloat(variable);
}
