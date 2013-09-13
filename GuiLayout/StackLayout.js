/**
 * Layout that stacks child controls of given container in either horizontal
 * or vertical direction.
 * 
 * @param {Rectangle} container  element which has child elements to be positioned.
 */
var StackLayout = function(container) {
  var _container = container;
  _container.layout(this);
  var _orientation = StackOrientation.VERTICAL;
  var _horAlignment = HorizontalContentAlignment.LEFT;
  var _verAlignment = VerticalContentAlignment.TOP;

  /** Get the container element assigned to this StackLayout */
  this.container = function() {return _container;};

  /** Get or set orientation of this StackLayout */
  this.orientation = function(orientation) {
    if (typeof orientation != "undefined")
      _orientation = orientation;

    return _orientation;
  };

  /**
   * Get or set horizontal content alignment. The alignment becomes effective
   * only for VERTICAL stacking.
   */
  this.horizontalContentAlignment = function(alignment) {
    if (typeof alignment != "undefined")
      _horAlignment = alignment;

    return _horAlignment;
  };

  /**
   * Get or set vertical content alignment. The alignment becomes effective
   * only for HORIZONTAL stacking.
   */
  this.verticalContentAlignment = function(alignment) {
    if (typeof alignment != "undefined")
      _verAlignment = alignment;

    return _verAlignment;
  };
};


/** Enum to specify horizontal/vertical orientation of StackLayout. */
var StackOrientation = Object.freeze({
  HORIZONTAL : "StackOrientation_HORIZONTAL",
  VERTICAL : "StackOrientation_VERTICAL"
});

/**
 * Enum. Horizontal alignment of a container element. Will apply for all children elements that are narrower (including Margin)
 * than the container.
 */
var HorizontalContentAlignment = Object.freeze({
  LEFT : "HorizontalContentAlignment_LEFT",
  RIGHT : "HorizontalContentAlignment_RIGHT"
});

/**
 * Enum. Vertical alignment of a container element. Will apply for all children elements that are lower (including Margin) than
 * the container.
 */
var VerticalContentAlignment = Object.freeze({
  TOP : "VerticalContentAlignment_TOP",
  BOTTOM : "VerticalContentAlignment_BOTTOM"
});


/**
 * Peforms the stacking layout for container.
 */
StackLayout.prototype.layout = function() {       //TODO: terrible bug: child.borderWidth() can be treated this way only for
                                                  //      rectangle. Ex. "sharp" triangle will have actual border much thicker on the spiky tip.
  var cont = this.container();
  var children = cont.children();
  var childCount = children.length;
  var widthSum = 0.0;
  var maxWidth = 0.0;
  var heightSum = 0.0;
  var maxHeight = 0.0;

  var horStretchingChildCount = 0;
  var verStretchingChildCount = 0;

  var isHorFitting = this.container().size().width() === null;
  var isVerFitting = this.container().size().height() === null;

  //Phase 0 - preset container's actualSize
  if (!isHorFitting)
    this.container().actualSize().width(this.container().size().width());
  if (!isVerFitting)
    this.container().actualSize().height(this.container().size().height());

  //Phase 1 - tell children to layout
  var ch;
  var child;
  for (ch = 0; ch < childCount; ch++) {       //TODO: merge this with the blocks in Phase 2
    child = children[ch];
//DEBUG    child.doLayout();

    if (child.size().width() === null)      //TODO: child.size().xxx() repeated to many times!
      horStretchingChildCount++;
    if (child.size().height() === null)
      verStretchingChildCount++;

    if (isHorFitting && !cont.widthStretched()) {       //Find width of widest child
/*DEBUG
     var caw = child.actualSize().width() +
                child.margin().left() + child.borderWidth() +
                child.margin().right() + child.borderWidth();
*/
     var caw = child.layout().getDesiredWidth();

      widthSum += caw;
      if (caw > maxWidth)
        maxWidth = caw;
    }
    if (isVerFitting && !cont.heightStretched()) {       //Find highest child
/*DEBUG
      var cah = child.actualSize().height() +
                child.margin().top() + child.borderWidth() +
                child.margin().bottom() + child.borderWidth();
*/
      var cah = child.layout().getDesiredHeight();

      heightSum += cah;
      if (cah > maxHeight)
        maxHeight = cah;
    }
  }

  //Phase 2 - fit to content if a dimension is NULL and haven't been stretched by parent
  if (isHorFitting && !cont.widthStretched()) {
    if (this.orientation() === StackOrientation.HORIZONTAL)
      this.container().actualSize().width(widthSum);
    else //StackOrientation.VERTICAL
      this.container().actualSize().width(maxWidth);
  }

  if (isVerFitting && !cont.heightStretched()) {
    if (this.orientation() === StackOrientation.HORIZONTAL)
      this.container().actualSize().height(maxHeight);
    else //StackOrientation.VERTICAL
      this.container().actualSize().height(heightSum);
  }

  //Phase 3 - position children, stretch those with NULL dimension, set clippingBox
  var horFreePart = (this.container().actualSize().width() - widthSum) / horStretchingChildCount;       //TODO: this should be futile. NO STRETCHing in direction of orientation.
  var verFreePart = (this.container().actualSize().height() - heightSum) / verStretchingChildCount;

  var takenX = 0.0;
  var takenY = 0.0;

  for (ch = 0; ch < childCount; ch++) {
    child = children[ch];

    //The child wishes to have width stretched by layout. Or fit to content.
    if (child.size().width() === null) {
        var sideMargin = child.margin().left() + child.margin().right();
        var sideBorder = 2*child.borderWidth();

        if (this.orientation() === StackOrientation.HORIZONTAL) {
/*          var w1 = horFreePart - sideMargin - sideBorder;
          child.actualSize().width(w1 > 0.0 ? w1 : 0.0);
*/
          child.actualSize().width(0.0);
        }
        else
        { //this.orientation() === StackOrientation.VERTICAL
          var w2 = this.container().actualSize().width() - sideMargin - sideBorder;
          child.actualSize().width(w2 > 0.0 ? w2 : 0.0);
          child.widthStretched(true);
        }
      
      
      
    }
    else
      child.actualSize().width(child.size().width());

    //Stretch height by layout
    if (child.size().height() === null) {
        var topDownMargin = child.margin().top() + child.margin().bottom();
        var topDownBorder = 2*child.borderWidth();

        if (this.orientation() === StackOrientation.VERTICAL) {
/*          var h1 = verFreePart - topDownMargin - topDownBorder;
          child.actualSize().height(h1 > 0.0 ? h1 : 0.0);
*/
          child.actualSize().height(0.0);
        }
        else {
          var h2 = this.container().actualSize().height() - topDownMargin - topDownBorder;
          child.actualSize().height(h2 > 0.0 ? h2 : 0.0);
          child.heightStretched(true);
        }
      
      

    }
    else
      child.actualSize().height(child.size().height());

    var chMargin = child.margin();
    var chBorder = child.borderWidth();
    var childX = -1.0;
    var childY = -1.0;

    if (this.orientation() === StackOrientation.HORIZONTAL) {
      switch (this.horizontalContentAlignment()) {
        case HorizontalContentAlignment.LEFT :
          childX = takenX + chMargin.left() + chBorder;
        break;
        case HorizontalContentAlignment.RIGHT :
          childX = this.container().actualSize().width() - takenX - chMargin.right() - chBorder - child.actualSize().width();
        break;
        default :
          throw "Unknown horizontal content alignment value: " + this.horizontalContentAlignment();
        break;
      }

      switch (this.verticalContentAlignment()) {
        case VerticalContentAlignment.TOP :
          childY = chMargin.top() + chBorder;
        break;
        case VerticalContentAlignment.BOTTOM :
          childY = this.container().actualSize().height() - chMargin.bottom() - chBorder - child.actualSize().height();
        break;
        default :
          throw "Unknown vertical content alignment value: " + this.verticalContentAlignment();
        break;
      }

      takenX += child.layout().getDesiredWidth(); //DEBUG child.actualSize().width() + chMargin.left() + 2*chBorder + chMargin.right();
    }
    else { //StackOrientation.VERTICAL
      switch (this.verticalContentAlignment()) {
        case VerticalContentAlignment.TOP :
          childY = takenY + chMargin.top() + chBorder;
        break;
        case VerticalContentAlignment.BOTTOM :
          childY = this.container().actualSize().height() - takenY - chMargin.bottom() - chBorder - child.actualSize().height();
        break;
        default :
          throw "Unknown vertical content alignment value: " + this.verticalContentAlignment();
        break;
      }

      switch (this.horizontalContentAlignment()) {
        case HorizontalContentAlignment.LEFT :
          childX = chMargin.left() + chBorder;
        break;
        case HorizontalContentAlignment.RIGHT :
          childX = this.container().actualSize().width() -
                   chMargin.right() - chBorder - child.actualSize().width();
        break;
        default :
          throw "Unknown horizontal content alignment value: " + this.horizontalContentAlignment();
        break;
      }

      takenY += child.layout().getDesiredHeight(); //DEBUG child.actualSize().height() + chMargin.top() + 2*chBorder + chMargin.bottom();
    }

    //Do the placement
    child.actualPosition(new UiPoint(childX, childY));
    //Set clipping rectangle
    child.clippingBox(new ClippingBox(new UiPoint(0, 0), this.container().actualSize()));
  }




//DEBUG so far
  //Phase real3
    for (ch = 0; ch < childCount; ch++)
      children[ch].doLayout();
};


/**
 * Get desired width of underlying container. Which is either set explicitely or recognized by content.
 */
StackLayout.prototype.getDesiredWidth = function() {     //TODO: IContainerLayout.getDesiredWidth
  var cont = this.container();
  var contWidth = cont.size().width();
  var margin = cont.margin();

  if (contWidth !== null)
    return contWidth + margin.left() + margin.right() + 2*cont.borderWidth();

  var width = 0.0;
  var children = cont.children();
  var childCount = children.length;
  var ch;
  var child;

  if (this.orientation() === StackOrientation.HORIZONTAL) {
    for (ch = 0; ch < childCount; ch++) {
      child = children[ch];
      width += child.layout().getDesiredWidth();
    }
  }
  else {
    //Find widest child
    for (ch = 0; ch < childCount; ch++) {
      child = children[ch];
      var w = child.layout().getDesiredWidth();
      if (w > width)
        width = w;
    }
  }

  return width + margin.left() + margin.right() + 2*cont.borderWidth();
};

/**
 * Get desired height of underlying container. Which is either set explicitely or recognized by content.
 */
StackLayout.prototype.getDesiredHeight = function() {     //TODO: IContainerLayout.getDesiredWidth
  var cont = this.container();
  var contHeight = cont.size().height();
  var margin = cont.margin();

  if (contHeight !== null)
    return contHeight + margin.top() + margin.bottom() + 2*cont.borderWidth();

  var height = 0.0;
  var children = cont.children();
  var childCount = children.length;
  var ch;
  var child;

  if (this.orientation() === StackOrientation.VERTICAL) {
    for (ch = 0; ch < childCount; ch++) {
      child = children[ch];
      height += child.layout().getDesiredHeight();
    }
  }
  else {
    //Find highest child
    for (ch = 0; ch < childCount; ch++) {
      child = children[ch];
      var h = child.layout().getDesiredHeight();
      if (h > height)
        height = h;
    }
  }

  return height + margin.top() + margin.bottom() + 2*cont.borderWidth();
};
