/**
 * Basic layout that accepts desired dimensions of children elements.
 * Every inner element has position inside container with FreeLayout.
 * 
 * @param {Rectangle} container  element which has child elements to be positioned.
 */
var FreeLayout = function(container) {    //todo: @param {ContainerVisualElement}
  var _container = container;

  /** Get the container element assigned to this FreeLayout */
  this.container = function() {return _container;};

  /**
   * Set position of child element inside the container.
   * @param {VisualElement} childElement  child element inside underlying container
   * @param {UiPoint} position  X and Y coordinate of the child
   */
  this.position = function(childElement, position) {
    if (childElement.parent() !== _container)
      throw new String("Argument exception: element not child of container of this layout");

    if (typeof position != "undefined")
      childElement.actualPosition(position);

    return childElement.actualPosition();
  };
};


/** Perform the layout for container and its child elements. */
FreeLayout.prototype.layout = function() {
  //Set container's actualSize
  var cont = this.container();
  var contWidth = cont.size().width();
  var contHeight = cont.size().height();

  if (contWidth === null) {
    if (!cont.widthStretched())
      cont.actualSize().width(0.0);
  }
  else
    cont.actualSize().width(contWidth);

  if (contHeight === null) {
    if (!cont.heightStretched())
      cont.actualSize().height(0.0);
  }
  else
    cont.actualSize().height(contHeight);

  var childCount = this.container().children().length;

  //Tell children to layout too
  for (var ch = 0 ; ch < childCount; ch++) {
    var child = this.container().children()[ch];
    child.doLayout();
    child.clippingBox(null);
  }
};

FreeLayout.prototype.getDesiredWidth = function() {     //TODO: IContainerLayout.getDesiredWidth
  var cont = this.container();
  var contWidth = cont.size().width();
  var margin = cont.margin();

  return (contWidth === null ? 0.0 : contWidth) + margin.left() + margin.right() + 2*cont.borderWidth();
};

FreeLayout.prototype.getDesiredHeight = function() {     //TODO: IContainerLayout.getDesiredHeight
  var cont = this.container();
  var contHeight = this.container().size().height();
  var margin = cont.margin();

  return (contHeight === null ? 0.0 : contHeight) + margin.top() + margin.bottom() + 2*cont.borderWidth();
};
