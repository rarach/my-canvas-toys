(function() {
  var canvas = document.createElement("canvas");
  canvas.width = 700;
  canvas.height = 600;

  var _render = function() {
    var context = canvas.getContext("2d");

    var topRec = new Rectangle();
    topRec.borderColor("Crimson");
    topRec.borderWidth(0.5);
    topRec.color("PaleGoldenRod");
    topRec.size(new UiSize(633, 587.006));
    topRec.actualPosition(new UiPoint(27.7, 8.28));

    ///////////////////////////////row 1///////////////////////////////
    var row1col1Rec = new Rectangle();
    row1col1Rec.color("Black");
    row1col1Rec.size(new UiSize(null, null));
    topRec.addChild(row1col1Rec);

    var row1col2Rec = new Rectangle();
    row1col2Rec.color("White");
    row1col2Rec.size(new UiSize(null, null));
    topRec.addChild(row1col2Rec);

    var row1col4Rec = new Rectangle();
    row1col4Rec.color("White");
    row1col4Rec.size(new UiSize(null, null));
    topRec.addChild(row1col4Rec);

    var row1col5Rec = new Rectangle();
    row1col5Rec.color("Black");
    row1col5Rec.size(new UiSize(null, null));
    topRec.addChild(row1col5Rec);

    ///////////////////////////////row 2///////////////////////////////
    var row2col1Rec = new Rectangle();
    row2col1Rec.color("White");
    row2col1Rec.size(new UiSize(null, null));
    topRec.addChild(row2col1Rec);

    var row2col2Rec = new Rectangle();
    row2col2Rec.color("Black");
    row2col2Rec.size(new UiSize(null, null));
    topRec.addChild(row2col2Rec);

    var row2col4Rec = new Rectangle();
    row2col4Rec.color("Black");
    row2col4Rec.size(new UiSize(null, null));
    topRec.addChild(row2col4Rec);

    var row2col5Rec = new Rectangle();
    row2col5Rec.color("White");
    row2col5Rec.size(new UiSize(null, null));
    topRec.addChild(row2col5Rec);

    ///////////////////////////////row 3///////////////////////////////
    var row3col1Rec = new Rectangle();
    row3col1Rec.color("Black");
    row3col1Rec.size(new UiSize(null, null));
    topRec.addChild(row3col1Rec);

    var row3col2Rec = new Rectangle();
    row3col2Rec.color("White");
    row3col2Rec.size(new UiSize(null, null));
    topRec.addChild(row3col2Rec);

    var row3col4Rec = new Rectangle();
    row3col4Rec.color("White");
    row3col4Rec.size(new UiSize(null, null));
    topRec.addChild(row3col4Rec);

    var row3col5Rec = new Rectangle();
    row3col5Rec.color("Black");
    row3col5Rec.size(new UiSize(null, null));
    topRec.addChild(row3col5Rec);

    ///////////////////////////////row 4///////////////////////////////
    var row4col1Rec = new Rectangle();
    row4col1Rec.color("White");
    row4col1Rec.size(new UiSize(null, null));
    topRec.addChild(row4col1Rec);

    var row4col2Rec = new Rectangle();
    row4col2Rec.color("Black");
    row4col2Rec.size(new UiSize(null, null));
    topRec.addChild(row4col2Rec);

    var row4col4Rec = new Rectangle();
    row4col4Rec.color("Black");
    row4col4Rec.size(new UiSize(null, null));
    topRec.addChild(row4col4Rec);

    var row4col5Rec = new Rectangle();
    row4col5Rec.color("White");
    row4col5Rec.size(new UiSize(null, null));
    topRec.addChild(row4col5Rec);

    ///////////////////////////////row 5///////////////////////////////
    var row5col1Rec = new Rectangle();
    row5col1Rec.color("Black");
    row5col1Rec.size(new UiSize(null, null));
    topRec.addChild(row5col1Rec);

    var row5col2Rec = new Rectangle();
    row5col2Rec.color("White");
    row5col2Rec.size(new UiSize(null, null));
    topRec.addChild(row5col2Rec);

    var row5col4Rec = new Rectangle();
    row5col4Rec.color("White");
    row5col4Rec.size(new UiSize(null, null));
    topRec.addChild(row5col4Rec);

    var row5col5Rec = new Rectangle();
    row5col5Rec.color("Black");
    row5col5Rec.size(new UiSize(null, null));
    topRec.addChild(row5col5Rec);

    ///////////////////////////////row 6///////////////////////////////
    var row6col1Rec = new Rectangle();
    row6col1Rec.color("White");
    row6col1Rec.size(new UiSize(null, null));
    topRec.addChild(row6col1Rec);

    var row6col2Rec = new Rectangle();
    row6col2Rec.color("Black");
    row6col2Rec.size(new UiSize(null, null));
    topRec.addChild(row6col2Rec);

    var row6col4Rec = new Rectangle();
    row6col4Rec.color("Black");
    row6col4Rec.size(new UiSize(null, null));
    topRec.addChild(row6col4Rec);

    var row6col5Rec = new Rectangle();
    row6col5Rec.color("White");
    row6col5Rec.size(new UiSize(null, null));
    topRec.addChild(row6col5Rec);


    var topGl = new GridLayout(topRec);
    topGl.columnsCount(5);
    topGl.rowsCount(6);
    topGl.columnWidth(0, 96.61);
    topGl.columnWidth(1, 96.61);
    topGl.columnWidth(2, 96.61);
    topGl.columnWidth(3, 96.61);
    topGl.columnWidth(4, null);
    topGl.rowHeight(0, 96.61);
    topGl.rowHeight(1, 96.61);
    topGl.rowHeight(2, 96.61);
    topGl.rowHeight(3, 96.61);
    topGl.rowHeight(4, 96.61);
    topGl.rowHeight(5, 96.61);
    topGl.childAt(0, 0, row1col1Rec);
    topGl.childAt(0, 1, row1col2Rec);
    topGl.childAt(0, 3, row1col4Rec);
    topGl.childAt(0, 4, row1col5Rec);
    topGl.childAt(1, 0, row2col1Rec);
    topGl.childAt(1, 1, row2col2Rec);
    topGl.childAt(1, 3, row2col4Rec);
    topGl.childAt(1, 4, row2col5Rec);
    topGl.childAt(2, 0, row3col1Rec);
    topGl.childAt(2, 1, row3col2Rec);
    topGl.childAt(2, 3, row3col4Rec);
    topGl.childAt(2, 4, row3col5Rec);
    topGl.childAt(3, 0, row4col1Rec);
    topGl.childAt(3, 1, row4col2Rec);
    topGl.childAt(3, 3, row4col4Rec);
    topGl.childAt(3, 4, row4col5Rec);
    topGl.childAt(4, 0, row5col1Rec);
    topGl.childAt(4, 1, row5col2Rec);
    topGl.childAt(4, 3, row5col4Rec);
    topGl.childAt(4, 4, row5col5Rec);
    topGl.childAt(5, 0, row6col1Rec);
    topGl.childAt(5, 1, row6col2Rec);
    topGl.childAt(5, 3, row6col4Rec);
    topGl.childAt(5, 4, row6col5Rec);
    topRec.layout(topGl);

    topRec.doLayout();
    topRec.render(context);
  };

  var image = new Image();
  image.id = "gl_test3";      //DEBUG
  image.src = "GridLayoutTests/test3.png";
  registerTest(canvas, image, 1, _render, "GridLayout with 6 row and 5 columns. 3<sup>rd</sup> colum is empty, 5<sup>th</sup> is stretching. Tolerance 1.");
})();
