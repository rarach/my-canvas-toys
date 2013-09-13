/* Vector holds direction and magnitude ("length"), not position. The beginning is always at coordinates 0, 0 */
Vector = function(x, y)
{
  this.x = x;
  this.y = y;
};

//Static method. Random Vector with coordinate ranges [-1.0; 1.0]
Vector.random = function()
{
  return new Vector(2.0 * (Math.random() - 0.5), 2.0 * (Math.random() - 0.5));
};

Vector.prototype.add = function(v2)
{
  return new Vector(this.x + v2.x, this.y + v2.y);
};

Vector.prototype.subtract = function(v2)
{
  return new Vector(this.x - v2.x, this.y - v2.y);
};

Vector.prototype.multiply = function(n)
{
  return new Vector(this.x * n, this.y * n);
};

Vector.prototype.divide = function(n)
{
  return new Vector(this.x / n, this.y / n);
};

//The "length" of the vector
Vector.prototype.magnitude = function()
{
  return Math.sqrt(this.x*this.x + this.y*this.y);
};

Vector.prototype.normal = function()
{
  return new Vector(-this.y, this.x);
};

Vector.prototype.normalise = function()
{
  return this.divide(this.magnitude());
};
