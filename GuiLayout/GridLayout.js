/**
 * Container element with GridLayout places child elements in a grid. Grid is defined by rows and columns. Every grid cell can
 * contain only one child element. Alignment of child inside a cell is always top left.
 * Setting a child for a grid cell more than once throws and exception. If cell is not specified for a child element, it will not
 * be layed out and will not show.
 * 
 * @param {Rectangle} container  element which has child elements to be positioned.
 */
var GridLayout = function(container) {      //TODO: the @param type
  var _container = container;
  var _rowsCount = 1;
  var _colsCount = 1;
  var _rowHeights = new Array();  //key=row index; value=row height
  var _colWidths = new Array();   //key=column index; value=width
  var _actRowHeight = new Array();
  var _actColWidths = new Array();
  var _children = [[]];

  /** Get the container element assigned to this StackLayout */
  this.container = function() {return _container;};

  /**
   * Get or set number of rows in the grid.
   */
  this.rowsCount = function(count) {
    _rowsCount = count || _rowsCount;
    return _rowsCount;
  };

  /**
   * Get or set number of columns in the grid.
   */
  this.columnsCount = function(count) {
    _colsCount = count || _colsCount;
    return _colsCount;
  };

  /**
   * Get or set row's height. Set NULL to let the height be adjusted to available space. Computed height will then be available
   * via @see actRowHeight.
   */
  this.rowHeight = function(rowIndex, height) {
    if (typeof(rowIndex) == "undefined")
      throw "Argument exception: rowIndex not given";
    if (rowIndex >= _rowsCount)
      throw "Argument exception: rowIndex out of range. Rows defined: " + _rowsCount + ", rowIndex: " + rowIndex;

    if (typeof(height) != "undefined")
      _rowHeights[rowIndex] = height;

    return _rowHeights[rowIndex];
  };

  /**
   * Get or set column's width. Set NULL to let the width be adjusted to available space. Computed width will then be available
   * via @see actColWidth.
   */
  this.columnWidth = function(colIndex, width) {
    if (typeof(colIndex) == "undefined")
      throw "Argument exception: colIndex not given";
    if (colIndex >= _colsCount)
      throw "Argument exception: colIndex out of range. Columns defined: " + _colsCount + ", colIndex: " + colIndex;

    if (typeof(width) != "undefined")
      _colWidths[colIndex] = width;

    return _colWidths[colIndex];
  };

  /**
   * Gets actual row height after the layout has been performed.
   */
  this.actRowHeight = function(rowIndex, height) {      //TODO: setter private
    if (typeof(height) != "undefined")
      _actRowHeight[rowIndex] = height;

    return _actRowHeight[rowIndex];
  };

  this.actColWidth = function(colIndex, width) {
    if (typeof(width) != "undefined")
      _actColWidths[colIndex] = width;

    return _actColWidths[colIndex];
  };

  /**
   * Get child in cell stated by row and column, or set child to that cell.
   * 
   * @param {Number}  rowIndex  zero-based row index
   * @param {Number}  colIndex  zero-based column index
   * @param {VisualElement}  element  optional parameter. If given, the visual element it represents will be placed in the grid
   *                                  cell defined by previous two arguments.
   */
  this.childAt = function(rowIndex, colIndex, element) {
    if (typeof(rowIndex) == "undefined")
      throw "Argument exception: rowIndex not given";
    if (typeof(colIndex) == "undefined")
      throw "Argument exception: colIndex not given";
    if (rowIndex >= _rowsCount)
      throw "Argument exception: rowIndex out of range. Rows defined: " + _rowsCount + ", rowIndex: " + rowIndex;
    if (colIndex >= _colsCount)
      throw "Argument exception: colIndex out of range. Columns defined: " + _colsCount + ", colIndex: " + colIndex;

    if (typeof(element) != "undefined" && element.parent() == _container) {
      if (_children[rowIndex] && _children[rowIndex][colIndex])
        throw "Element already placed in row " + rowIndex + ", column " + colIndex;

      if (typeof(_children[rowIndex]) == "undefined")
        _children[rowIndex] = new Array();
      _children[rowIndex][colIndex] = element;
    }

    if (_children[rowIndex])    //Avoid error for empty rows
      return _children[rowIndex][colIndex];
    else
      return null;
  };
};


/**
 * Peforms the GridLayout for container.
 */
GridLayout.prototype.layout = function() {
  var children = this.container().children();
  var childCount = children.length;
  var rowsCount = this.rowsCount();
  var colsCount = this.columnsCount();

  var isHorFitting = this.container().size().width() === null;          //TODO: isHorAdaptive
  var isVerFitting = this.container().size().height() === null;

  //Phase 0 - preset container's actualSize
  if (!isHorFitting)
    this.container().actualSize().width(this.container().size().width());
  if (!isVerFitting)
    this.container().actualSize().height(this.container().size().height());




  //Phase 1 - tell children to layout
/*DEBUG so far 
  for (var ch = 0; ch < childCount; ch++)
    children[ch].doLayout();
*/




  //Phase 2 - assign the actual heights/widths of rows/columns that have them defined
  var takenHorSpace = 0.0;
  var stretchingCells = 0;
  var col;
  for (col = 0; col < colsCount; col++) {
    var cw = this.columnWidth(col);

    if (typeof(cw) != "undefined" && cw != null) {
      this.actColWidth(col, cw);
      takenHorSpace += cw;
    }
    else {
      stretchingCells++;
      this.actColWidth(col, 0.0);   //Just for case it couldn't be set later
    }
  }

  var takenVerSpace = 0.0;
  var stretchingRows = 0;
  var row;
  for (row = 0; row < rowsCount; row++) {
    var rh = this.rowHeight(row);

    if (typeof(rh) != "undefined" && rh != null) {
      this.actRowHeight(row, rh);
      takenVerSpace += rh;
    }
    else {
      stretchingRows++;
      this.actRowHeight(row, 0.0);  //Just for case it couldn't be set later
    }
  }

  //Phase 3 - fit to sized content if a dimension is NULL, else stretch unsized content
  if (isHorFitting) {
    if (!this.container().widthStretched())
      this.container().actualSize().width(takenHorSpace);
  }
  else {
    var horFreePart = (this.container().actualSize().width() - takenHorSpace) / stretchingCells;

    if (horFreePart > 0) {
      for (col = 0; col < colsCount; col++) {
        var colw = this.columnWidth(col);

        if (typeof(colw) != "undefined" && colw != null)
          this.actColWidth(col, colw);
        else
          this.actColWidth(col, horFreePart);
      }
    } //else let them be 0 wide
  }

  if (isVerFitting) {
    if (!this.container().heightStretched())
      this.container().actualSize().height(takenVerSpace);
  }
  else {
    var verFreePart = (this.container().actualSize().height() - takenVerSpace) / stretchingRows;

    if (verFreePart > 0) {
      for (row = 0; row < rowsCount; row++) {
        var rowh = this.rowHeight(row);

        if (typeof(rowh) != "undefined" && rowh != null)
          this.actRowHeight(row, rowh);
        else
          this.actRowHeight(row, verFreePart);
      }
    } //else let them be 0 high
  }

  //Phase 4 - position children, set dimensions and clipping bounds
  var verOffset = 0.0;
  for (row = 0; row < rowsCount; row++) {
    var horOffset = 0.0;
    var cellHeight = this.actRowHeight(row);

    for (col = 0; col < colsCount; col++) {
      var cellChild = this.childAt(row, col);
      var cellWidth = this.actColWidth(col);

      if (typeof(cellChild) != "undefined" && cellChild != null) {
        var chMargin = cellChild.margin();
        var border = cellChild.borderWidth();

        //The child wishes to have width stretched by layout
        if (cellChild.size().width() == null) {
          var sideMargin = chMargin.left() + chMargin.right();

          var wantWidth = cellWidth - sideMargin - 2*border;
          cellChild.actualSize().width(wantWidth > 0.0 ? wantWidth : 0.0);
          cellChild.widthStretched(true);
        }
        //And height too
        if (cellChild.size().height() == null) {
          var topDownMargin = chMargin.top() + chMargin.bottom();

          var wantHeight = cellHeight - topDownMargin - 2*border;
          cellChild.actualSize().height(wantHeight > 0.0 ? wantHeight : 0.0);
          cellChild.heightStretched(true);
        }

        cellChild.actualPosition(new UiPoint(horOffset + chMargin.left() + border, verOffset + chMargin.top() + border));
        cellChild.clippingBox(new ClippingBox(new UiPoint(horOffset, verOffset), new UiSize(cellWidth, cellHeight))
                              .intersect(new ClippingBox(new UiPoint(), this.container().actualSize())));
      }

      horOffset += cellWidth;
    }
    horOffset = 0.0;
    verOffset += cellHeight;
  }



//DEBUG so far
  //Phase real4 - tell children to layout
  for (var ch = 0; ch < childCount; ch++)
    children[ch].doLayout();



};



GridLayout.prototype.getDesiredWidth = function() {     //TODO: IContainerLayout.getDesiredWidth
  var cont = this.container();
  var contWidth = cont.size().width();
  var margin = cont.margin();

  if (contWidth !== null)
    return contWidth + margin.left() + margin.right() + 2*cont.borderWidth();

  //Check how would this fit to content width
  var cols = this.columnsCount();
  var width = 0.0;

  for (var col = 0; col < cols; col++) {
    var w = this.columnWidth(col);
    width += w === null ? 0.0 : w;
  }

  return width + margin.left() + margin.right() + 2*cont.borderWidth();
};

GridLayout.prototype.getDesiredHeight = function() {     //TODO: IContainerLayout.getDesiredHeight
  var cont = this.container();
  var contHeight = this.container().size().height();
  var margin = cont.margin();

  if (contHeight !== null)
    return contHeight + margin.top() + margin.bottom() + 2*cont.borderWidth();

  //Check how would this fit to content height
  var rows = this.rowsCount();
  var height = 0.0;

  for (var row = 0; row < rows; row++) {
    var h = this.rowHeight(row);
    height += h === null ? 0.0 : h;
  }

  return height + margin.top() + margin.bottom() + 2*cont.borderWidth();
};
