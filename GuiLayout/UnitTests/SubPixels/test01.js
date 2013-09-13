(function() {
  var canvas = document.createElement("canvas");
  canvas.width = 175;
  canvas.height = 100;

  var _render = function() {
    var context = canvas.getContext("2d");

    //Test-case 1
    var topRec = new Rectangle();
    topRec.borderColor("Chocolate");
    topRec.borderWidth(8);
    topRec.color("Magenta");
    topRec.size(new UiSize(0.4, 0.4));
    topRec.actualPosition(new UiPoint(10, 12));     //TODO: must be placed in Scene that has hard FreeLayout

    var centerRec = new Rectangle();
    centerRec.id = function() {return 4;};          //TODO: you know what
    centerRec.color("Salmon");
    centerRec.size(new UiSize(null, null));
    topRec.addChild(centerRec);

    var bl = new BorderLayout(topRec);
    topRec.layout(bl);
    bl.center(centerRec);

    topRec.doLayout();
    topRec.render(context);


    //Test-case 2
    var topRec2 = new Rectangle();
    topRec2.borderColor("Chocolate");
    topRec2.borderWidth(8);
    topRec2.color("Linen");
    topRec2.size(new UiSize(null, null));
    topRec2.actualPosition(new UiPoint(50, 12));    //TODO: must be placed in Scene that has hard FreeLayout

    var centerRec2 = new Rectangle();
    centerRec2.id = function() {return 4;};         //TODO: you know what
    centerRec2.color("Salmon");
    centerRec2.borderColor("Yellow");
    centerRec2.borderWidth(0.5);
    centerRec2.size(new UiSize(null, null));
    topRec2.addChild(centerRec2);

    var bl2 = new BorderLayout(topRec2);
    topRec2.layout(bl2);
    bl2.center(centerRec2);

    topRec2.doLayout();
    topRec2.render(context);


    //Test-case 3
    var topRec3 = new Rectangle();
    topRec3.borderColor("Chocolate");
    topRec3.borderWidth(8);
    topRec3.color("Lime");
    topRec3.size(new UiSize(null, null));
    topRec3.actualPosition(new UiPoint(90, 12));    //TODO: must be placed in Scene that has hard FreeLayout

    var centerRec3 = new Rectangle();
    centerRec3.id = function() {return 4;};         //TODO: you know what
    centerRec3.color("Salmon");
    centerRec3.borderColor("Yellow");
    centerRec3.borderWidth(0.5);
    centerRec3.size(new UiSize(10, 10));
    topRec3.addChild(centerRec3);

    var bl3 = new BorderLayout(topRec3);
    topRec3.layout(bl3);
    bl3.center(centerRec3);

    topRec3.doLayout();
    topRec3.render(context);


    //Test-case 4
    var topRec4 = new Rectangle();
    topRec4.borderColor("Chocolate");
    topRec4.borderWidth(4.33);
    topRec4.color("Lime");
    topRec4.size(new UiSize(null, null));
    topRec4.actualPosition(new UiPoint(28.7, 40));    //TODO: must be placed in Scene that has hard FreeLayout

    var centerRec4 = new Rectangle();
    centerRec4.id = function() {return 3;};           //TODO: you know what
    centerRec4.color("Blue");
    centerRec4.borderColor("Yellow");
    centerRec4.borderWidth(0.5);
    centerRec4.size(new UiSize(26.5, 27.5));
    topRec4.addChild(centerRec4);

    var innerRect = new Rectangle();
    innerRect.id = function() {return 2;};
    innerRect.color("Magenta");
    innerRect.borderColor("Black");
    innerRect.borderWidth(0.8);
    centerRec4.addChild(innerRect);

    var bl41 = new BorderLayout(centerRec4);
    centerRec4.layout(bl41);
    bl41.center(innerRect);

    var bl4 = new BorderLayout(topRec4);
    topRec4.layout(bl4);
    bl4.center(centerRec4);

    topRec4.doLayout();
    topRec4.render(context);


    //Test-case 5
    var topRec5 = new Rectangle();
    topRec5.borderColor("Chocolate");
    topRec5.borderWidth(2.5);
    topRec5.color("Lime");
    topRec5.size(new UiSize(null, null));
    topRec5.actualPosition(new UiPoint(148.7, 12));     //TODO: must be placed in Scene that has hard FreeLayout

    var centerRec5 = new Rectangle();
    centerRec5.id = function() {return 3;};         //TODO: you know what
    centerRec5.color("Salmon");
    centerRec5.borderColor("Yellow");
    centerRec5.borderWidth(0.5);
    centerRec5.size(new UiSize(6.5, 7.5));
    topRec5.addChild(centerRec5);

    var bl5 = new BorderLayout(topRec5);
    topRec5.layout(bl5);
    bl5.center(centerRec5);

    topRec5.doLayout();
    topRec5.render(context);
  };

  var image = new Image();
  image.id = "sub_test01";      //DEBUG
  image.src = "SubPixels/test1.png";
  registerTest(canvas, image, 2, _render, "5 cases of subpixel coordinates and/or dimensions. All Rectangles use BorderLayout.<br/>" +
                                          "You can zoom in your browser to see the subtle blured lines<br/>" +
                                          "of borders and centered placements of embeded Rectangles. Using tolerance of 2.");
})();
