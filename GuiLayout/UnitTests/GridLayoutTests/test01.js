(function() {
  var canvas = document.createElement("canvas");
  canvas.width = 500;
  canvas.height = 450;

  var _render = function() {
    var context = canvas.getContext("2d");

    var topRec = new Rectangle();
    topRec.borderColor("Crimson");
    topRec.borderWidth(11);
    topRec.color("PaleGoldenRod ");
    topRec.size(new UiSize(433.337, 336));
    topRec.actualPosition(new UiPoint(33, 19));

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

    var topGl = new GridLayout(topRec);
    topGl.columnsCount(3);
    topGl.rowsCount(3);
    topGl.columnWidth(0, 115);
    topGl.columnWidth(1, 222);
    topGl.rowHeight(0, 200);
    topGl.rowHeight(1, 18);
    topGl.rowHeight(2, 629);
    topGl.childAt(0, 0, row1col1Rec);
    topGl.childAt(2, 1, row3col2Rec);
    topGl.childAt(1, 1, row2col2Rec);
    topGl.childAt(0, 2, row1col3Rec);
    topRec.layout(topGl);

    topRec.doLayout();
    topRec.render(context);
  };

  var image = new Image();
  image.id = "gl_test1";      //DEBUG
  image.src = "GridLayoutTests/test1.png";
  registerTest(canvas, image, 1, _render, "GridLayout with 3 row and 3 columns. Tolerance 1.");
})();
