/* Visual edge
 * DEBUG: it's custom control, build of RogaloUI built-in elements.
 * TODO: rename to Link.
 */
var Edge = function(id, source, target, data)
{
  var linePath = null;
  var _lineWidth = 5.0;
  var _scale = 1.0;

  var _hittable = false;
  var _colorKey = null;
  
  this.isHittable = function() {return _hittable;};
  this.setHittable = function(hittable) {
    _hittable = hittable;

    if (_hittable === true) {
      _colorKey = HitService.getInstance().registerControl(this);
      var ttDiv = document.createElement('div');
      ttDiv.style.width = "100px";
      ttDiv.style.height = "40px";
      ttDiv.style.border = "1px solid yellow";
      ttDiv.style.backgroundColor = 'pink';
      ttDiv.innerHTML = '<h4 style="color: darkred;">edge.id=' + id + '</h4>';
      TooltipService.getInstance().registerControl(id, ttDiv);
    }
    else {
      HitService.getInstance().unregisterColorKey(_colorKey);
      _colorKey = null;
    }
  };

  this.isDraggable = function() {return false;};

  this.id = id;
  this.isSelected = false;  //TODO: this should really by like in super-class (VisualElement?)
  this.source = source;
  this.target = target;
  this.data = typeof(data) !== 'undefined' ? data : {isHistorical: (id%3==0)};


  var _label = new Label(this, source.data.displayname + " >> " + target.data.displayname, 12, '10px Verdana', "#F6F6F6");    //TODO: the label background equal to diagram

  this.getLineWidth = function() {return _scale * _lineWidth;};
  this.setLineWidth = function(w) {_lineWidth=w;};

  this.getScale = function() {return _scale;};
  this.setScale = function(scale) {
    _scale = scale;

    //Set scale also to children
    _label.setScale(scale);
  };

  this.draw = function(ctx, diagram)      //TODO: get rid of diagram, use graph (set in constructor)
  {
    var hitCtx;
    if (_hittable === true) {
      hitCtx = HitService.getInstance().getContext();
      hitCtx.strokeStyle = _colorKey;
      hitCtx.fillStyle = _colorKey;
      hitCtx.lineWidth = this.getLineWidth() + 2;     //+2 for a bit better hit tolerance (cause edges are anti-aliased). TODO: _scale dependent
    }


    //DEBUG so far
    var springNodePoint1 = this.source.getPosition();
    var springNodePoint2 = this.target.getPosition();

/*    var x1 = springNodePoint1.x;
    var y1 = springNodePoint1.y;
    var x2 = springNodePoint2.x;
    var y2 = springNodePoint2.y;*/
    var x1 = springNodePoint1.getX();
    var y1 = springNodePoint1.getY();
    var x2 = springNodePoint2.getX();
    var y2 = springNodePoint2.getY();

    var direction = new Vector(x2-x1, y2-y1);
    var normal = direction.normal().normalise();

    var from = diagram.getGraph().getEdges(this.source, this.target);     //I don't like this. TODO: Should ask its source if has another edges with the same target
    var to = diagram.getGraph().getEdges(this.target, this.source);       //...here too

    var total = from.length + to.length;
    var idx = from.indexOf(this);

    var PORT_SPACING = 12.0;

    // Figure out how far off centre the line should be drawn
    var offset = normal.multiply(-((total - 1) * PORT_SPACING)/2.0 + (idx * PORT_SPACING))
                       .multiply(_scale);

//DEBUG    var s1 = springNodePoint1.add(offset);
//    var s2 = springNodePoint2.add(offset);
    var s1 = springNodePoint1.add(offset.x, offset.y);
    var s2 = springNodePoint2.add(offset.x, offset.y);


    //edu: using the fact that springNodePoint2 is edge.target
    var intersection = GraphicsHelper.intersect_line_box(s1, s2, /*{x: x2-this.target.getWidth()/2.0,
                                                                  y: y2-this.target.getHeight()/2.0},*/
                                                                 new UIPoint(x2-this.target.getWidth()/2.0, y2-this.target.getHeight()/2.0),
                                                          this.target.getWidth(), this.target.getHeight());

    if (!intersection)
//DEBUG      intersection = s2;
      intersection = new Vector(s2.getX(), s2.getY());

    var stroke = typeof(this.data.stroke) !== 'undefined' ? this.data.stroke
                                                          : "#000000";
    if (this.data.isHistorical)
      stroke = "blue";          //TODO: clean this stroke decision mess
    ctx.lineWidth = this.getLineWidth();

    if (this.isSelected) {
      stroke = "orange";
      ctx.lineWidth = this.getLineWidth()+1;
    }

    ctx.strokeStyle = stroke;
    ctx.lineCap = "round";

    var arrowWidth = 14;
    var arrowLength = 28;

    // line
    var lineEnd = intersection.subtract(direction.normalise().multiply(arrowLength * 0.5));
    linePath = new Polyline();
//    linePath.appendPoint(s1.x, s1.y);
    linePath.appendPoint(s1.getX(), s1.getY());
    linePath.appendPoint(lineEnd.x, lineEnd.y);
    if (this.data.isHistorical === true) {
      linePath.drawDashed(ctx);
    }
    else linePath.draw(ctx);

    //For hit-canvas
    if (_hittable === true)
      linePath.draw(hitCtx);

    //edge's text data
    ctx.save();
    var lineCenterX = Math.abs((x2+x1)/2.0);
    var lineCenterY = Math.abs((y2+y1)/2.0);
    ctx.moveTo(0.0, 0.0);
    ctx.translate(lineCenterX + offset.x, lineCenterY + offset.y);
    var labelRot = Math.atan2(y2 - y1, x2 - x1);
    if (labelRot < (-1.0 * Math.PI/2.0) && labelRot >= (-1.0 * Math.PI))    //Forth quartal (CW)
        labelRot += Math.PI;
    if (labelRot > Math.PI/2.0 && labelRot <= Math.PI)                     //Third quartal (CW)
      labelRot -= Math.PI;
    ctx.rotate(labelRot);
    _label.draw(-1* (_label.getWidth()/2.0), -1*(_label.getHeight()/2.0), ctx);       //-2 is correction offset, TODO
    ctx.restore();

    //Stamp label's bounding box to hit-canvas
    if (_hittable === true) {
      hitCtx.save();
      hitCtx.moveTo(0.0, 0.0);
      hitCtx.translate(lineCenterX + offset.x, lineCenterY + offset.y);
      hitCtx.rotate(labelRot);
      hitCtx.fillRect(-1* (_label.getWidth()/2.0), -1*(_label.getHeight()/2.0), _label.getWidth(), _label.getHeight());
      hitCtx.restore();
    }

    //Arrow
    ctx.save();
    ctx.fillStyle = stroke;
    ctx.translate(intersection.x, intersection.y);
    ctx.rotate(Math.atan2(y2 - y1, x2 - x1));
    ctx.beginPath();
    ctx.moveTo(-arrowLength * _scale, arrowWidth * _scale);
    ctx.lineTo(0, 0);
    ctx.lineTo(-arrowLength * _scale, -arrowWidth * _scale);
    ctx.lineTo(-arrowLength * 0.8 * _scale, -0);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    //Arrow again for hit-canvas
    if (_hittable === true) {
      hitCtx.save();
      hitCtx.translate(intersection.x, intersection.y);
      hitCtx.rotate(Math.atan2(y2 - y1, x2 - x1));
      hitCtx.beginPath();
      hitCtx.moveTo(-arrowLength * _scale, arrowWidth * _scale);
      hitCtx.lineTo(0, 0);
      hitCtx.lineTo(-arrowLength * _scale, -arrowWidth * _scale);
      hitCtx.lineTo(-arrowLength * 0.8 * _scale, -0);
      hitCtx.closePath();
      hitCtx.fill();
      hitCtx.restore();
    }
  };
};
