/**
 * Layout that places child visual elements in 5 regions of given container:
 * NORTH - containers top region. Child is stretched horizontally to fill containers width, height is preserved.
 * WEST - containers left region. Child stretches vertically to fill the space between NORTH and SOUTH regions. Width is untouched.
 * CENTER - center region. Child stretches both horizontal and vertical directions to fit between remaining 4 regions.
 * EAST - right region. Child keeps right, stretches vertically.
 * SOUTH - bottom region. Child stretches horizontally.
 * The stretching can only happen if respective element's dimension is not set (i.e. is NULL). Otherwise the dimension is
 * respected which may lead to empty "gaps" in the container.
 * The children elements are placed with setters north(elm), west(elm)... Only one element can be placed in a region. Calling
 * a region setter more times throws an exception. If region is not specified for a child element, it will not be layed out and
 * will not show.
 * 
 * @param {Rectangle} container  element which has child elements to be positioned.
 */
var BorderLayout = function(container) {      //TODO: the @param type
  var _container = container;
  var _northElement = null;
  var _westElement = null;
  var _centerElement = null;
  var _eastElement = null;
  var _southElement = null;
  var _childRegionFlags = new Array(); //key=child's ID; value=region name

  /** Get the container element assigned to this StackLayout */
  this.container = function() {return _container;};

  /** Get or set child element at north region */
  this.north = function(element) {
    if (typeof element != "undefined" && element.parent() === _container) {
      if (_childRegionFlags[element.id()])
        throw "Element with ID "+element.id()+" already placed at region " + _childRegionFlags[element.id()];
      else {
        _northElement = element;
        _childRegionFlags[element.id()] = "NORTH";        //TODO: this needs a good unit test
      }
    }

    return _northElement;
  };

  /** Get or set child element at west region */
  this.west = function(element) {
    if (typeof element != "undefined" && element.parent() === _container) {
      if (_childRegionFlags[element.id()])
        throw "Element with ID "+element.id()+" already placed at region " + _childRegionFlags[element.id()];
      else {
        _westElement = element;
        _childRegionFlags[element.id()] = "WEST";
      }
    }

    return _westElement;
  };

  /** Get or set child element at central region */
  this.center = function(element) {
    if (typeof element != "undefined" && element.parent() === _container) {
      if (_childRegionFlags[element.id()])
        throw "Element with ID "+element.id()+" already placed at region " + _childRegionFlags[element.id()];
      else {
        _centerElement = element;
        _childRegionFlags[element.id()] = "CENTER";
      }
    }

    return _centerElement;
  };

  /** Get or set child element at east region */
  this.east = function(element) {
    if (typeof element != "undefined" && element.parent() === _container) {
      if (_childRegionFlags[element.id()])
        throw "Element with ID "+element.id()+" already placed at region " + _childRegionFlags[element.id()];
      else {
        _eastElement = element;
        _childRegionFlags[element.id()] = "EAST";
      }
    }

    return _eastElement;
  };

  /** Get or set child element at south region */
  this.south = function(element) {
    if (typeof element != "undefined" && element.parent() === _container) {
      if (_childRegionFlags[element.id()])
        throw "Element with ID "+element.id()+" already placed at region " + _childRegionFlags[element.id()];
      else {
        _southElement = element;
        _childRegionFlags[element.id()] = "SOUTH";
      }
    }

    return _southElement;
  };
};


/**
 * Peforms the BorderLayout for container.
 */
BorderLayout.prototype.layout = function() {
  var isHorAdaptive = this.container().size().width() === null;
  var isVerAdaptive = this.container().size().height() === null;

  var cont = this.container();    //TODO; use it! (replace "this.container()")
  var northChild = this.north();
  var eastChild = this.east();
  var centerChild = this.center();
  var westChild = this.west();
  var southChild = this.south();

  //Phase 0 - preset container's actualSize
  if (!isHorAdaptive)
    this.container().actualSize().width(this.container().size().width());
  if (!isVerAdaptive)
    this.container().actualSize().height(this.container().size().height());

  //Phase 1 - tell children to layout
/*DEBUG so far
  if (this.north() != null)             //TODO: well, this should be last probably
    this.north().doLayout();
  if (this.west() != null)
    this.west().doLayout();
  if (this.center() != null)
    this.center().doLayout();
  if (this.east() != null)
    this.east().doLayout();
  if (this.south() != null)
    this.south().doLayout();
*/


  //Phase 2 - fit to content if a dimension of container is NULL and haven't been stretched by parent
  if (isHorAdaptive && !this.container().widthStretched()) {
    var maxWidth = 0.0;

    if (northChild != null) {
/*DEBUG
      maxWidth += this.north().size().width() === null ? 0.0 : this.north().size().width();
      maxWidth = this.north().margin().left() + this.north().borderWidth() +
//d                 this.north().actualSize().width() +
                 this.north().borderWidth() + this.north().margin().right();
*/
      maxWidth += northChild.layout().getDesiredWidth();
    }

    var midRowWidth = 0.0;

    if (westChild != null) {
/*DEBUG
      midRowWidth += this.west().size().width() === null ? 0.0 : this.west().size().width();
      midRowWidth += this.west().margin().left() + this.west().borderWidth() +
//d                     this.west().actualSize().width() +
                     this.west().borderWidth() + this.west().margin().right();
*/
      midRowWidth += westChild.layout().getDesiredWidth();
    }
    if (centerChild != null) {
/*DEBUG
      midRowWidth += this.center().size().width() === null ? 0.0 : this.center().size().width();
      midRowWidth += this.center().margin().left() + this.center().borderWidth() +
//d                     this.center().actualSize().width() +
                     this.center().borderWidth() + this.center().margin().right();
*/
      midRowWidth += centerChild.layout().getDesiredWidth();
    }
    if (eastChild != null) {
/*DEBUG
      midRowWidth += this.east().size().width() === null ? 0.0 : this.east().size().width();
      midRowWidth += this.east().margin().left() + this.east().borderWidth() +
//d                     this.east().actualSize().width() +
                     this.east().borderWidth() + this.east().margin().right();
*/
      midRowWidth += eastChild.layout().getDesiredWidth();
    }
    if (midRowWidth > maxWidth)
      maxWidth = midRowWidth;

    if (southChild != null) {
/*DEBUG
      var southWidth = this.south().size().width() === null ? 0.0 : this.south().size().width();
      southWidth += this.south().margin().left() + this.south().borderWidth() +
//d                       this.south().actualSize().width() +
                       this.south().borderWidth() + this.south().margin().right();
*/
      var southWidth = southChild.layout().getDesiredWidth();

      if (southWidth > maxWidth)
        maxWidth = southWidth;
    }

    this.container().actualSize().width(maxWidth);
  }
  if (isVerAdaptive && !this.container().heightStretched()) {
    var sumHeight = 0.0;

    if (northChild != null) {
/*DEBUG
      sumHeight += this.north().size().height() === null ? 0.0 : this.north().size().height();
      sumHeight += this.north().margin().top() + this.north().borderWidth() +
//d                   this.north().actualSize().height() +
                   this.north().borderWidth() + this.north().margin().bottom();
*/
      sumHeight += northChild.layout().getDesiredHeight();
    }

    var maxMidRowHeight = 0.0;
    if (westChild != null) {
/*DEBUG
      var wh = this.west().size().height() === null ? 0.0 : this.west().size().height();
      wh += this.west().margin().top() + this.west().borderWidth() +
//d               this.west().actualSize().height() +
               this.west().borderWidth() + this.west().margin().bottom();
*/
      var wh = westChild.layout().getDesiredHeight();

      if (wh > maxMidRowHeight)
        maxMidRowHeight = wh;
    }
    if (centerChild != null) {
/*DEBUG
      var ch = this.center().size().height() === null ? 0.0 : this.center().size().height();
      ch += this.center().margin().top() + this.center().borderWidth() +
//d               this.center().actualSize().height() +
               this.center().borderWidth() + this.center().margin().bottom();
*/
      var ch = centerChild.layout().getDesiredHeight();

      if (ch > maxMidRowHeight)
        maxMidRowHeight = ch;
    }
    if (eastChild != null) {
/*DEBUG
      var eh = this.east().size().height() === null ? 0.0 : this.east().size().height();
      eh += this.east().margin().top() + this.east().borderWidth() +
//d               this.east().actualSize().height() +
               this.east().borderWidth() + this.east().margin().bottom();
*/
      var eh = eastChild.layout().getDesiredHeight();

      if (eh > maxMidRowHeight)
        maxMidRowHeight = eh;
    }
    sumHeight += maxMidRowHeight;

    if (southChild != null) {
/*DEBUG
      sumHeight += this.south().size().height() === null ? 0.0 : this.south().size().height();
      sumHeight += this.south().margin().top() + this.south().borderWidth() +
//d                   this.south().actualSize().height() +
                   this.south().borderWidth() + this.south().margin().bottom();
*/
      sumHeight += southChild.layout().getDesiredHeight();
    }

    this.container().actualSize().height(sumHeight);
  }

  //Phase 3 - position children, stretch those with NULL dimension, set clipBox
  var topHeight = 0.0;
  if (northChild != null) {
    var nMargin = northChild.margin();
    var nBorder = northChild.borderWidth()
    var nBorders = 2*nBorder;
    var nWidth = northChild.size().width();
    var nHeight = 0;

    if (northChild.size().width() == null) {  //Child allows to stretch its width
      var nWantWidth = this.container().actualSize().width() - nMargin.left() - nBorders - nMargin.right();    //TODO: this.container repeated TO MANY TIMES in this function
      nWidth = nWantWidth > 0 ? nWantWidth : 0.0;
      northChild.widthStretched(true);
    }
    if (northChild.size().height() != null)
      nHeight = northChild.size().height();

    northChild.actualSize(new UiSize(nWidth, nHeight));
    northChild.actualPosition(new UiPoint(nMargin.left() + nBorder, nMargin.top() + nBorder));
//    topHeight = nMargin.top() + northChild.actualSize().height() + nBorders + nMargin.bottom();
    topHeight = northChild.layout().getDesiredHeight();
    northChild.clippingBox(new ClippingBox(new UiPoint(0, 0), this.container().actualSize()));
  }

  var bottomHeight = 0.0;
  if (southChild != null) {
    var sMargin = southChild.margin();
    var sBorder = southChild.borderWidth();
    var sBorders = 2*sBorder;
    var sWidth = southChild.size().width();
    var sHeight = 0;

    if (sWidth == null) {
      var sWantWidth = this.container().actualSize().width() - sMargin.left() - sBorders - sMargin.right();
      sWidth = sWantWidth > 0 ? sWantWidth : 0.0;
      southChild.widthStretched(true);
    }
    if (southChild.size().height() != null)
      sHeight = southChild.size().height();

    southChild.actualSize(new UiSize(sWidth, sHeight));
    var sChildY = this.container().actualSize().height() - /*southChild.actualSize().height()*/sHeight - sBorder - sMargin.bottom();
    southChild.actualPosition(new UiPoint(sMargin.left() + sBorder, sChildY));
//    bottomHeight = sMargin.top() + southChild.actualSize().height() + sBorders + sMargin.bottom();
    bottomHeight = southChild.layout().getDesiredHeight();
    southChild.clippingBox(new ClippingBox(new UiPoint(0, 0), this.container().actualSize()));
  }

  var leftWidth = 0.0;
  if (westChild != null) {
    var wMargin = westChild.margin();
    var wBorder = westChild.borderWidth();
    var wBorders = 2*wBorder;
    var wWidth = 0;
    var wHeight = westChild.size().height();

    if (westChild.size().width() != null)
      wWidth = westChild.size().width();
    if (wHeight == null) {  //Stretch the western child vertically
      var westWantHeight = this.container().actualSize().height() - topHeight - bottomHeight -
                           wMargin.top() - wBorders - wMargin.bottom();
      wHeight = westWantHeight > 0 ? westWantHeight : 0.0;
      westChild.heightStretched(true);
    }

    westChild.actualSize(new UiSize(wWidth, wHeight));
    westChild.actualPosition(new UiPoint(wMargin.left() + wBorder, topHeight + wMargin.top() + wBorder));
//    leftWidth = wMargin.left() + westChild.actualSize().width() + wBorders + wMargin.right();
    leftWidth = westChild.layout().getDesiredWidth();
    westChild.clippingBox(new ClippingBox(new UiPoint(0, 0), this.container().actualSize()));
  }

  var rightWidth = 0.0;
  if (eastChild != null) {
    var eMargin = eastChild.margin();
    var eBorder = eastChild.borderWidth();
    var eBorders = 2*eBorder;
    var eWidth = 0;
    var eHeight = eastChild.size().height();

    if (eastChild.size().width() != null)
      eWidth = eastChild.size().width();
    if (eHeight == null) {
      var eastWantHeight = this.container().actualSize().height() - topHeight - bottomHeight -
                           eMargin.top() - eBorders - eMargin.bottom();
      eHeight = eastWantHeight > 0 ? eastWantHeight : 0.0;
      eastChild.heightStretched(true);
    }

    eastChild.actualSize(new UiSize(eWidth, eHeight));
    var eChildX = this.container().actualSize().width() - /*eastChild.actualSize().width()*/eWidth - eBorder - eMargin.right();
    eastChild.actualPosition(new UiPoint(eChildX, topHeight + eMargin.top() + eBorder));
//    rightWidth = eMargin.left() + eastChild.actualSize().width() + eBorders + eMargin.right();
    rightWidth = eastChild.layout().getDesiredWidth();
    eastChild.clippingBox(new ClippingBox(new UiPoint(0, 0), this.container().actualSize()));
  }

  if (centerChild != null) {
    var cMargin = centerChild.margin();
    var cBorder = centerChild.borderWidth();
    var cBorders = 2*cBorder;
    var cWidth = centerChild.size().width();
    var cHeight = centerChild.size().height();

    if (cWidth == null) {
      var cenWantWidth = this.container().actualSize().width() - leftWidth -
                         cMargin.left() - cBorders - cMargin.right() - rightWidth;
      cWidth = cenWantWidth > 0 ? cenWantWidth : 0.0;
      centerChild.widthStretched(true);
    }
    if (cHeight == null) {
      var cenWantHeight = this.container().actualSize().height() - topHeight -
                          cMargin.top() - cBorders - cMargin.bottom() - bottomHeight;
      cHeight = cenWantHeight > 0 ? cenWantHeight : 0.0;
      centerChild.heightStretched(true);
    }

    centerChild.actualSize(new UiSize(cWidth, cHeight));
    centerChild.actualPosition(new UiPoint(leftWidth + cMargin.left() + cBorder, topHeight + cMargin.top() + cBorder));
    centerChild.clippingBox(new ClippingBox(new UiPoint(0, 0), this.container().actualSize()));
  }




  //Phase real3 - tell children to layout
  if (this.north() != null)             //TODO: well, this should be last probably
    this.north().doLayout();
  if (this.west() != null)
    this.west().doLayout();
  if (this.center() != null)
    this.center().doLayout();
  if (this.east() != null)
    this.east().doLayout();
  if (this.south() != null)
    this.south().doLayout();



};



/**
 * Get desired width of underlying container. Which is either set explicitely or recognized by content.
 */
BorderLayout.prototype.getDesiredWidth = function() {     //TODO: IContainerLayout.getDesiredWidth
  var cont = this.container();
  var contWidth = cont.size().width();
  var margin = cont.margin();

  if (contWidth !== null)
    return contWidth + margin.left() + margin.right() + 2*cont.borderWidth();

  var width = 0.0;

  var northChild = this.north();
  if (northChild !== null)
    width = northChild.layout().getDesiredWidth();

  var southChild = this.south();
  if (southChild !== null) {
    var sw = southChild.layout().getDesiredWidth();
    if (sw > width)
      width = sw;
  }

  var midRowWidth = 0.0;
  var westChild = this.west();
  if (westChild != null)
    midRowWidth += westChild.layout().getDesiredWidth();
  var centerChild = this.center();
  if (centerChild != null)
    midRowWidth += centerChild.layout().getDesiredWidth();
  var eastChild = this.east();
  if (eastChild != null)
    midRowWidth += eastChild.layout().getDesiredWidth();
  if (midRowWidth > width)
    width = midRowWidth;

  return width + margin.left() + margin.right() + 2*cont.borderWidth();
};


/**
 * Get desired height of underlying container. Which is either set explicitely or recognized by content.
 */
BorderLayout.prototype.getDesiredHeight = function() {     //TODO: IContainerLayout.getDesiredWidth
  var cont = this.container();
  var contHeight = cont.size().height();
  var margin = cont.margin();

  if (contHeight !== null)
    return contHeight + margin.top() + margin.bottom() + 2*cont.borderWidth();

  var height = 0.0;

  var northChild = this.north();
  if (northChild !== null)
    height = northChild.layout().getDesiredHeight();

  var southChild = this.south();
  if (southChild !== null)
    height += southChild.layout().getDesiredHeight();

  var midRowMaxHeight = 0.0;
    var westChild = this.west();
  if (westChild != null)
    midRowMaxHeight = westChild.layout().getDesiredHeight();
  var centerChild = this.center();
  if (centerChild != null) {
    var ch = centerChild.layout().getDesiredHeight();
    if (ch > midRowMaxHeight)
      midRowMaxHeight = ch;
  }
  var eastChild = this.east();
  if (eastChild != null) {
    var eh = eastChild.layout().getDesiredHeight();
    if (eh > midRowMaxHeight)
      midRowMaxHeight = eh;
  }

  height += midRowMaxHeight;

  return height + margin.top() + margin.bottom() + 2*cont.borderWidth();
};
