/** 
 * Rectangle object. Has visual representation and is container with layout.
 */
var Rectangle = function() {    //DEBUG: implements VisualContainerElement
  var _id = 12345;      //TODO: No. Ask parent (static) ID seeder for unique one.
  var _parent = null;   //TODO: rather Scene than NULL
  var _size = new UiSize();
  var _margin = new Margin();
  var _actualPosition = new UiPoint(0.0, 0.0);
  var _actualSize = new UiSize(-1.0, -1.0);
  var _clipBox = null;
  var _visible = true;
  var _children = [];
  var _layout = new FreeLayout(this);

  var _fillColor = null;
  var _borderColor = "black";
  var _borderWidth = 0.0;

  var _offCanvas = document.createElement("canvas");
  var _invalid = true;

  /** Elements unique ID */
  this.id = function() {return _id;};

  /** Get or set parent container
   *  @return {Rectangle}
   */
  this.parent = function(element) {
    if (typeof(element) != "undefined")
      _parent = element;

    return _parent;
  };

  /** Width and height of this Rectangle */
  this.size = function(size) {
    if (typeof(size) != "undefined")
      _size = size;

    return _size;
  };

  this.margin = function(margin) {
    if (typeof(margin) != "undefined")
      _margin = margin;

    return _margin;
  };

  /** Actual position inside parent container computed by layout. */
  this.actualPosition = function(position) {    //TODO: the setter should be "internal", accessible only to layouts
    if (typeof(position) != "undefined") {
      _actualPosition = position;
      this.invalidate(true);
    }

    return _actualPosition;
  };

  /**
   * Get absolute position on canvas.
   * @return {UiPoint}
   */
  this.absolutePosition = function() {
    if (_parent == null)
      return _actualPosition;

    var parentPos = this.parent().absolutePosition();
    return new UiPoint(parentPos.X() + _actualPosition.X(), parentPos.Y() + _actualPosition.Y());     //TODO: shouldn't be computed over again on every call
  };

  /**
   * Get or set actual width and height of this Rectangle.
   * @return {UiSize}
   */
  this.actualSize = function(size) {      //TODO: internal setter only for layout
    if (typeof(size) != "undefined") {
      if (size.width() == null || size.height() == null)
        throw "Argument exception: actual dimension cannot be null.";
      else if (size.width() < 0.0 || size.height() < 0.0)
        throw "Argument exception: actual dimension cannot be negative.";
      else {
        _actualSize = size;
        this.invalidate(true);
      }
    }

    return _actualSize;
  };

  /**
   * Get or set the rectangle to be clipped by when rendering this element. Only for internal use by layout.
   * 
   * @param {ClippingBox}  clipBox  clipping rectangle to be used for this element. Position is relative to parent's position.
   */
  this.clippingBox = function(clipBox) {      //TODO: internal only for layout's sake. And move it to parent class (VE?)
    _clipBox = clipBox || _clipBox;
    return _clipBox;
  };

  /**
   * Invisible element still takes place and matters in layout.
   */
  this.visible = function(visible) {
    if (typeof(visible) != "undefined" && visible !== _visible) {
      _visible = visible;
      this.invalidate(false);
    }

    return _visible;
  };

  this.children = function() {
    return _children;
  };
  this.addChild = function(element) {
    _children.push(element);
    element.parent(this);
  };
  this.removeChild = function(element) {
    var len = _children.length;
    for (var ch=0; ch<len; ch++) {
      if (element.id() === _children[ch].id()) {
        _children.splice(ch, 1);
        return;
      }
    }
  };

  this.layout = function(layout) {
    if (typeof(layout) != "undefined" && layout !== _layout) {
      _layout = layout;
      this.invalidate(true);
    }

    return _layout;
  };

  this.doLayout = function() {
    if (_children.length > 0)         //TODO: I'm not sure of this logic being here. Shouldn't layout do that? Rethink.
      _layout.layout(this);
    else {
      if (!_wStretched)
        _actualSize.width(_size.width());
      if (!_hStretched)
        _actualSize.height(_size.height());
    }
  };



//DEBUG so far
  var _wStretched = false;
  this.widthStretched = function(stretched) {       //TODO: internal only to be used by layout
    if (typeof(stretched) !== "undefined")
      _wStretched = stretched;
    return _wStretched;
  };

  var _hStretched = false;
  this.heightStretched = function(stretched) {       //TODO: internal only to be used by layout
    if (typeof(stretched) !== "undefined")
      _hStretched = stretched;
    return _hStretched;
  };



  this.color = function(color) {
    if (typeof(color) != "undefined" && color !== _fillColor) {
      _fillColor = color;
      this.invalidate(false);
    }

    return _fillColor;
  };

  this.borderColor = function(color) {
    if (typeof(color) != "undefined" && color !== _borderColor) {
      _borderColor = color;
      this.invalidate(false);
    }

    return _borderColor;
  };

  /**
   * Border thicknes. Non-zero border outlines the Rectangle and adds to its bounding box
   */
  this.borderWidth = function(width) {
    if (typeof(width) != "undefined" && width !== _borderWidth) {
      if (width < 0.0)
        throw "Argument exception: border thickness cannot be negative.";

      _borderWidth = width;
      this.invalidate(true);
    }

    return _borderWidth;
  };

  this.offContext = function() {return _offCanvas.getContext("2d");};     //TODO: private, usable by render()
  /** Visual properties of this Rectangle changed and it needs to be rendered. */
  this.isInvalid = function(invalid) {             //TODO: the setter MUST be private, only for render()
    if (typeof(invalid) != "undefined")
      _invalid = invalid;

    return _invalid;
  };

  /**
   * Invalidate this element. Only invalid element will be actually redrawn on next call to render().
   * @param {Boolean} invalidateChildren  TRUE means that also children elements will be invalidated.
   */
  this.invalidate = function(invalidateChildren) {
    _invalid = true;

    if (invalidateChildren === true) {
      var chLen = _children.length;
      for (var ch=0; ch<chLen; ch++)
        _children[ch].invalidate(true);
    }
  };
};


/** 
 *  Draw the rectangle on given canvas context. Ought to be called after the Rectangle with
 *  its child elements have been layed out.
 *  
 *  @param {CanvasRenderingContext2D}  ctx   2D context of a canvas
 */
Rectangle.prototype.render = function(ctx) {
  var absPos = this.absolutePosition();
  var size = this.actualSize();

  ctx.save();

  var clipBox = this.clippingBox();
  if (clipBox != null) {      //Top-most element surely have no clippingBox
    var cbWidth = clipBox.size().width();
    var cbHeight = clipBox.size().height();

    //Check if clipped out of view
    if (cbWidth <= 0 || cbHeight <= 0) {
      ctx.restore();
      return;
    }

    ctx.beginPath();
    var crAbsPos = this.parent().absolutePosition().add(clipBox.position());
    ctx.rect(crAbsPos.X(), crAbsPos.Y(), cbWidth, cbHeight);
    ctx.clip();
  }

  if (size.width() > 0 && size.height() > 0) {
    //Draw background if needed
    if (this.isInvalid()) {
      var fillColor = this.color();
      if (fillColor === null) {
        //Go up the parent hirarchy and find first with defined background brush
        var superElm = this.parent();
        while (superElm != null) {
          if (superElm.color() != null){
            fillColor = superElm.color();
            break;
          }
          else superElm = superElm.parent();
        }
      }
      if (fillColor !== null) {
        ctx.fillStyle = fillColor;        
        ctx.fillRect(absPos.X(), absPos.Y(), size.width(), size.height());
      }
      //else nothing found. Give up and leave transparent
    }
  }

  //Draw border to the "parent" canvas context
  var border = this.borderWidth();
  if (this.isInvalid() && border > 0) {
    ctx.strokeStyle = this.borderColor();
    ctx.lineWidth = border;
    ctx.strokeRect(absPos.X() - border/2, absPos.Y() - border/2, size.width() + border, size.height() + border);
  }

  if (size.width() > 0 && size.height() > 0) {
    //Tell children to render too
    var len = this.children().length;
    for (var ch=0; ch<len; ch++)
      this.children()[ch].render(ctx);
  }

  ctx.restore();
  this.isInvalid(false);
};
