(function() {
  var canvas = document.createElement("canvas");
  canvas.width = 1120;
  canvas.height = 600;

  var _render = function() {
    var context = canvas.getContext("2d");

    var topRec = new Rectangle();
    topRec.borderColor("Crimson");
    topRec.borderWidth(11);
    topRec.color("PaleGoldenRod ");
    topRec.size(new UiSize(1024, 555));
    topRec.actualPosition(new UiPoint(33, 19));     //TODO: must be placed in Scene that has hard FreeLayout

    var row1col1Rec = new Rectangle();
    row1col1Rec.margin(new Margin(3, 8, 8, 3));
    row1col1Rec.color("Blue");
    row1col1Rec.size(new UiSize(null, 1000));
    topRec.addChild(row1col1Rec);

    var row3col2Rec = new Rectangle();
    row3col2Rec.color("Silver");
    row3col2Rec.size(new UiSize(null, null));
    topRec.addChild(row3col2Rec);

    var row2col2Rec = new Rectangle();
    row2col2Rec.color("Yellow");
    row2col2Rec.borderColor("Black");
    row2col2Rec.borderWidth(2);
    row2col2Rec.size(new UiSize(101.14, null));
    topRec.addChild(row2col2Rec);

    var row1col3Rec = new Rectangle();
    row1col3Rec.color("Pink");
    row1col3Rec.borderColor("White");
    row1col3Rec.borderWidth(17);
    row1col3Rec.margin(new Margin(70, 0, 0, 0));
    row1col3Rec.size(new UiSize(10, 510));
    topRec.addChild(row1col3Rec);

    var row4col7Rec = new Rectangle();
    row4col7Rec.color("Plum");
    row4col7Rec.borderColor("Purple");
    row4col7Rec.borderWidth(6);
    row4col7Rec.margin(new Margin(6, 6, 6, 6));
    row4col7Rec.size(new UiSize(74, 50));
    topRec.addChild(row4col7Rec);

    var row2col4Rec = new Rectangle();
    row2col4Rec.color("White");
    row2col4Rec.borderColor("Black");
    row2col4Rec.borderWidth(3);
    row2col4Rec.size(new UiSize(null, null));
    topRec.addChild(row2col4Rec);

    var row3col5Rec = new Rectangle();
    row3col5Rec.color("White");
    row3col5Rec.borderColor("Black");
    row3col5Rec.borderWidth(3);
    row3col5Rec.size(new UiSize(null, null));
    topRec.addChild(row3col5Rec);

    var row1col6Rec = new Rectangle();
    row1col6Rec.color("White");
    row1col6Rec.borderColor("Black");
    row1col6Rec.borderWidth(3);
    row1col6Rec.size(new UiSize(null, null));
    topRec.addChild(row1col6Rec);

    var freeRect1 = new Rectangle();
    freeRect1.color("RoyalBlue");
    freeRect1.size(new UiSize(565, 90.908));
    row1col6Rec.addChild(freeRect1);
    row1col6Rec.layout().position(freeRect1, new UiPoint(145.45, 3));

    var innerFreeRect1 = new Rectangle();
    innerFreeRect1.color("PeachPuff");
    innerFreeRect1.borderWidth(0.91);
    innerFreeRect1.borderColor("Red");
    innerFreeRect1.size(new UiSize(10, 10));
    freeRect1.addChild(innerFreeRect1);
    freeRect1.layout().position(innerFreeRect1, new UiPoint(71.14, 28.2828));

    var topGl = new GridLayout(topRec);
    topGl.columnsCount(7);
    topGl.rowsCount(4);
    topGl.columnWidth(0, 74);
    topGl.columnWidth(1, 122);
    //topGl.columnWidth(2, null);
    //topGl.columnWidth(3, null);
    topGl.columnWidth(4, 17);
    //topGl.columnWidth(5, null);
    topGl.columnWidth(6, 58);
    topGl.rowHeight(0, 120);
    topGl.rowHeight(1, 18);
    //topGl.rowHeight(2, null);
    topGl.rowHeight(3, 69.91);
    topGl.childAt(0, 0, row1col1Rec);
    topGl.childAt(2, 1, row3col2Rec);
    topGl.childAt(0, 5, row1col6Rec);
    topGl.childAt(1, 1, row2col2Rec);
    topGl.childAt(0, 2, row1col3Rec);
    topGl.childAt(3, 6, row4col7Rec);
    topGl.childAt(2, 4, row3col5Rec);
    topGl.childAt(1, 3, row2col4Rec);
    topRec.layout(topGl);

    topRec.doLayout();
    topRec.render(context);
  };

  var image = new Image();
  image.id = "gl_test2";      //DEBUG
  image.src = "GridLayoutTests/test2.png";
  registerTest(canvas, image, 1, _render, "GridLayout with 4 row and 7 columns. Tolerance 1.");
})();
