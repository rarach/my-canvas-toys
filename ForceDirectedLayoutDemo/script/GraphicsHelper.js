/* Static class with helper calculations related to vector graphics */
var GraphicsHelper = (function() {
  var canvas = document.getElementById('diaCanvas');

  var coef = 400.0;       //TOTALY HARD-CODE FOR FDLayout ONLY

  var _toScreen = function(graph, pogPoint) {        //edu: from relative vector points (<-1.0; 1.0>)
//del    var currentBB = layout.getBoundingBox();
//    var currentBB = _getBoundingBox(graph);       //No! Infinite loop!
/*    var sizeVec = currentBB.bottomright.subtract(currentBB.topleft);
    var sx = pogPoint.subtract(currentBB.topleft).divide(sizeVec.x).x * canvas.width;
    var sy = pogPoint.subtract(currentBB.topleft).divide(sizeVec.y).y * canvas.height;
*/
    var sx = pogPoint.x;
    var sy = pogPoint.y;
    //TODO: add padding?

    return new Vector(sx*4.0, sy*4.0);



/*DEBUG    var topLeft = layout.getTopLeftCorner();         //TODO: this is re-computed everytime a node is drawn!
    var leftOffset = topLeft.x < 0 ? -1.0*topLeft.x : 0;
    var topOffset = topLeft.y < 0 ? -1.0*topLeft.y : 0;
    var layoutPadding = 50.0;  //FUJ! Todo
    return new Vector(pogPoint.x + leftOffset, pogPoint.y + topOffset).multiply(coef)
           .add(new Vector(layoutPadding, layoutPadding));
*/
  };

  var _fromScreen = function(layout, sPoint) {              //TODO: currently totally unused method
/*DEBUG    var currentBB = layout.getBoundingBox();
    var size = currentBB.bottomright.subtract(currentBB.topleft);
    var px = (sPoint.x / canvas.width) * size.x + currentBB.topleft.x;
    var py = (sPoint.y / canvas.height) * size.y + currentBB.topleft.y;

    return new Vector(px, py);
*/
    
 
    var topLeft = layout.getTopLeftCorner();         //TODO: aaand pointOfGravity should go back to layout. It's layout's business
    var leftOffset = topLeft.x < 0 ? -1.0*topLeft.x : 0;
    var topOffset = topLeft.y < 0 ? -1.0*topLeft.y : 0;
    return new Vector(sPoint.x/coef - leftOffset, sPoint.y/coef - topOffset);
  };
  
  var _intersect_line_line = function(p1, p2, p3, p4)
  {
//    var denom = ((p4.y - p3.y)*(p2.x - p1.x) - (p4.x - p3.x)*(p2.y - p1.y));
    var denom = ((p4.getY() - p3.getY())*(p2.getX() - p1.getX()) - (p4.getX() - p3.getX())*(p2.getY() - p1.getY()));

    // lines are parallel
    if (denom === 0)
      return null;

/*    var ua = ((p4.x - p3.x)*(p1.y - p3.y) - (p4.y - p3.y)*(p1.x - p3.x)) / denom;
    var ub = ((p2.x - p1.x)*(p1.y - p3.y) - (p2.y - p1.y)*(p1.x - p3.x)) / denom;
*/
    var ua = ((p4.getX() - p3.getX())*(p1.getY() - p3.getY()) - (p4.getY() - p3.getY())*(p1.getX() - p3.getX())) / denom;
    var ub = ((p2.getX() - p1.getX())*(p1.getY() - p3.getY()) - (p2.getY() - p1.getY())*(p1.getX() - p3.getX())) / denom;

    if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
      return null;
    }

//    return new Vector(p1.x + ua * (p2.x - p1.x), p1.y + ua * (p2.y - p1.y));
    return new Vector(p1.getX() + ua * (p2.getX() - p1.getX()), p1.getY() + ua * (p2.getY() - p1.getY()));
  };

  var _lineBoxIntersection = function (p1, p2, p3, w, h)
  {
/*    var tl = {x: p3.x, y: p3.y};
    var tr = {x: p3.x + w, y: p3.y};
    var bl = {x: p3.x, y: p3.y + h};
    var br = {x: p3.x + w, y: p3.y + h};
*/
    var tl = new UIPoint(p3.getX(), p3.getY());
    var tr = new UIPoint(p3.getX() + w, p3.getY());
    var bl = new UIPoint(p3.getX(), p3.getY() + h);
    var br = new UIPoint(p3.getX() + w, p3.getY() + h);

    var result;
    if (result = _intersect_line_line(p1, p2, tl, tr))
      return result; // top
    if (result = _intersect_line_line(p1, p2, tr, br)) 
      return result; // right
    if (result = _intersect_line_line(p1, p2, br, bl))
      return result; // bottom
    if (result = _intersect_line_line(p1, p2, bl, tl))
      return result; // left

    return null;
  };

  var _getBoundingBox = function(graph)     //TODO: could return directly Frame to avoid awkward 'castings'
  {
    var topleft = new Vector(1000000, 1000000);             //TODO: I don't like the mixing of Vectors and WRPoints
    var bottomright = new Vector(-1000000, -1000000);

    var nodeCount = graph.nodes.length;
    for (var i=0; i < nodeCount; i++) {
      var position = graph.nodes[i].getPosition();

      if (position.getX() < topleft.x) {
        topleft.x = position.getX();
      }
      if (position.getY() < topleft.y) {
        topleft.y = position.getY();
      }
      if (position.getX() > bottomright.x) {
        bottomright.x = position.getX();
      }
      if (position.getY() > bottomright.y) {
        bottomright.y = position.getY();
      }
    }

  //  var padding = bottomright.subtract(topleft).multiply(0.05); // 5% padding
  var padding = new Vector(0, 0);

    return {topleft: topleft.subtract(padding), bottomright: bottomright.add(padding)};
  };

  return  {
    //Converts local layout point to global screen coordinates
    toScreen : _toScreen,
    //Converts global screen poing to local diagram point
    fromScreen : _fromScreen,
    //Helpers for figuring out where to draw arrows
    intersect_line_box : _lineBoxIntersection,
    //Bounding box of a graph
    getBoundingBox : _getBoundingBox
  };
})();
