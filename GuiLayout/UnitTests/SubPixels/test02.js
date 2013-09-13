(function() {
  var canvas = document.createElement("canvas");
  canvas.width = 350;
  canvas.height = 230;

  var _render = function() {
    var context = canvas.getContext("2d");

    var topRec = new Rectangle();
    topRec.id = function() {return 0;};         //TODO: you know what
    topRec.borderColor("DimGrey");
    topRec.borderWidth(10.7);
    topRec.color("Blue");
    topRec.size(new UiSize(null, null));
    topRec.actualPosition(new UiPoint(20.2, 20.2));     //TODO: must be placed in Scene that has hard FreeLayout

    var innerRec1 = new Rectangle();
    innerRec1.id = function() {return 1;};         //TODO: you know what
    innerRec1.color("Red");
    innerRec1.borderColor("Aqua");
    innerRec1.borderWidth(10.7);
    innerRec1.size(new UiSize(null, null));
    topRec.addChild(innerRec1);

    var innerRec2 = new Rectangle();
    innerRec2.id = function() {return 2;};         //TODO: you know what
    innerRec2.color("White");
    innerRec2.borderColor("Magenta");
    innerRec2.borderWidth(10.7);
    innerRec2.size(new UiSize(null, null));
    innerRec1.addChild(innerRec2);

    var innerRec3 = new Rectangle();
    innerRec3.id = function() {return 3;};         //TODO: you know what
    innerRec3.color("LightGray");
    innerRec3.borderColor("GhostWhite");
    innerRec3.borderWidth(10.7);
    innerRec3.size(new UiSize(null, null));
    innerRec2.addChild(innerRec3);

    var innerRec4 = new Rectangle();
    innerRec4.id = function() {return 4;};         //TODO: you know what
    innerRec4.color("Violet");
    innerRec4.borderColor("SpringGreen");
    innerRec4.borderWidth(10.7);
    innerRec4.size(new UiSize(null, null));
    innerRec3.addChild(innerRec4);

    var innerRec5 = new Rectangle();
    innerRec5.id = function() {return 5;};         //TODO: you know what
    innerRec5.color("SkyBlue");
    innerRec5.borderColor("Pink");
    innerRec5.borderWidth(10.7);
    innerRec5.size(new UiSize(null, null));
    innerRec4.addChild(innerRec5);

    var innerRec6 = new Rectangle();
    innerRec6.id = function() {return 4;};         //TODO: you know what
    innerRec6.color("Teal");
    innerRec6.borderColor("Yellow");
    innerRec6.borderWidth(10.7);
    innerRec6.size(new UiSize(null, null));
    innerRec5.addChild(innerRec6);

    var innerRec7 = new Rectangle();
    innerRec7.id = function() {return 4;};         //TODO: you know what
    innerRec7.color("DeepPink");
    innerRec7.borderColor("Black");
    innerRec7.borderWidth(10.7);
    innerRec7.size(new UiSize(30, 20));
    innerRec6.addChild(innerRec7);


    var bl = new BorderLayout(topRec);
    topRec.layout(bl);
    bl.center(innerRec1);

    var bl1 = new BorderLayout(innerRec1);
    innerRec1.layout(bl1);
    bl1.center(innerRec2);

    var bl2 = new BorderLayout(innerRec2);
    innerRec2.layout(bl2);
    bl2.center(innerRec3);

    var bl3 = new BorderLayout(innerRec3);
    innerRec3.layout(bl3);
    bl3.center(innerRec4);

    var bl4 = new BorderLayout(innerRec4);
    innerRec4.layout(bl4);
    bl4.center(innerRec5);

    var bl5 = new BorderLayout(innerRec5);
    innerRec5.layout(bl5);
    bl5.center(innerRec6);

    var bl6 = new BorderLayout(innerRec6);
    innerRec6.layout(bl6);
    bl6.center(innerRec7);


    topRec.doLayout();
    topRec.render(context);
  };

  var image = new Image();
  image.id = "sub_test02";      //DEBUG
  image.src = "SubPixels/test2.png";
  registerTest(canvas, image, 1, _render, "Subpixel coordinates and/or dimensions. Tolerance 1.");
})();
