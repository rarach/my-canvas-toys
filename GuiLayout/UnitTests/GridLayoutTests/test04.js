(function() {
  var canvas = document.createElement("canvas");
  canvas.width = 460;
  canvas.height = 400;

  var _render = function() {
    var context = canvas.getContext("2d");

    var topRec = new Rectangle();
    topRec.borderColor("Crimson");
    topRec.borderWidth(5.35);
    topRec.color("PaleGoldenRod");
    topRec.size(new UiSize(383.691, 347.006));
    topRec.actualPosition(new UiPoint(27.7, 8.28));

    var row2col2Rec = new Rectangle();
    row2col2Rec.color("Black");
    row2col2Rec.size(new UiSize(null, null));
    topRec.addChild(row2col2Rec);

    var northRect = new Rectangle();
    northRect.color("Blue");
    northRect.id = function () { return 2; };
    northRect.borderColor("White");
    northRect.borderWidth(3);
    northRect.size(new UiSize(null, 23));
    row2col2Rec.addChild(northRect);

    var southRect = new Rectangle();
    southRect.color("Green");
    southRect.id = function () { return 3; };
    southRect.borderColor("LightGray");
    southRect.borderWidth(7);
    southRect.size(new UiSize(null, 49.99));
    row2col2Rec.addChild(southRect);


    var borLayout = new BorderLayout(row2col2Rec);
    row2col2Rec.layout(borLayout);
    borLayout.north(northRect);
    borLayout.south(southRect);

    var topGl = new GridLayout(topRec);
    topGl.columnsCount(3);
    topGl.rowsCount(3);
    topGl.columnWidth(0, 44.61);
    topGl.columnWidth(1, 303.099);
    topGl.columnWidth(2, null);
    topGl.rowHeight(0, 11);
    topGl.rowHeight(1, 286.68);
    topGl.rowHeight(2, null);
    topGl.childAt(1, 1, row2col2Rec);
    topRec.layout(topGl);


    topRec.doLayout();
    topRec.render(context);
  };

  var image = new Image();
  image.id = "gl_test4";      //DEBUG
  image.src = "GridLayoutTests/test4.png";
  registerTest(canvas, image, 2, _render, "GridLayout Rectangle with BorderLayout in inner cell. The inner Rectangle has NULLed Width and Height, so must stretch.<br/>" +
                                          "In NORTH and SOUTH regions there are contents with NULLed Width, so must stretch as well. Tolerance 2.");
})();
