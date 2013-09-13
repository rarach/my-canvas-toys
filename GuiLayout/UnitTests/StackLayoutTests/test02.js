(function() {
  var canvas = document.createElement("canvas");
  canvas.width = 160;
  canvas.height = 350;

  var _render = function() {
    var context = canvas.getContext("2d");

    var topRec = new Rectangle();
    topRec.borderColor("Navy");
    topRec.borderWidth(8);
    topRec.color("AliceBlue");
    topRec.size(new UiSize(80, 271.820));
    topRec.actualPosition(new UiPoint(12, 31));     //TODO: must be placed in Scene that has hard FreeLayout

    //////////////////////////////// Rectangle 1 ////////////////////////////////
    var innerRec1 = new Rectangle();
    innerRec1.id = function() {return 1;};         //TODO: you know what
    innerRec1.borderColor("Orange");
    innerRec1.color("Bisque");
    innerRec1.borderWidth(3);
    innerRec1.size(new UiSize(143, 60));
    topRec.addChild(innerRec1);

    var innerRec12 = new Rectangle();
    innerRec12.id = function() {return 12;};         //TODO: you know what
    innerRec12.borderColor("Black");
    innerRec12.color("Gray");
    innerRec12.borderWidth(4.5);
    innerRec12.size(new UiSize(140, 50));
    innerRec1.addChild(innerRec12);

    var rec1Sl = new StackLayout(innerRec1);
    rec1Sl.orientation(StackOrientation.HORIZONTAL);
    rec1Sl.horizontalContentAlignment(HorizontalContentAlignment.LEFT);
    rec1Sl.verticalContentAlignment(VerticalContentAlignment.TOP);
    innerRec1.layout(rec1Sl);

    //////////////////////////////// Rectangle 2 ////////////////////////////////
    var innerRec2 = new Rectangle();
    innerRec2.id = function() {return 2;};         //TODO: you know what
    innerRec2.borderColor("Green");
    innerRec2.color("DarkOliveGreen");
    innerRec2.borderWidth(4.5);
    innerRec2.margin(new Margin(5, 15, 5, 2));
    innerRec2.size(new UiSize(140, 50));
    topRec.addChild(innerRec2);

    var innerRec21 = new Rectangle();
    innerRec21.id = function() {return 21;};         //TODO: you know what
    innerRec21.borderColor("Maroon");
    innerRec21.color("Red");
    innerRec21.borderWidth(4.5);
    innerRec21.size(new UiSize(101, 21));
    innerRec2.addChild(innerRec21);

    var innerRec22 = new Rectangle();
    innerRec22.id = function() {return 22;};         //TODO: you know what
    innerRec22.borderColor("Indigo");
    innerRec22.color("MediumPurple");
    innerRec22.borderWidth(5);
    innerRec22.margin(new Margin(2, 2, 2, 2));
    innerRec22.size(new UiSize(4, 31.88));
    innerRec2.addChild(innerRec22);

    var innerRec23 = new Rectangle();
    innerRec23.id = function() {return 23;};         //TODO: you know what
    innerRec23.color("LightPink");
    innerRec23.size(new UiSize(40, 251.111));
    innerRec2.addChild(innerRec23);

    var rec2Sl = new StackLayout(innerRec2);
    rec2Sl.orientation(StackOrientation.HORIZONTAL);
    rec2Sl.horizontalContentAlignment(HorizontalContentAlignment.RIGHT);
    rec2Sl.verticalContentAlignment(VerticalContentAlignment.TOP);
    innerRec2.layout(rec2Sl);

    //////////////////////////////// Rectangle 3 ////////////////////////////////
    var innerRec3 = new Rectangle();
    innerRec3.id = function() {return 3;};         //TODO: you know what
    innerRec3.borderColor("Salmon");
    innerRec3.color("MediumSeaGreen");
    innerRec3.borderWidth(4.5);
    innerRec3.margin(new Margin(0, 7.43, 0, 7.43));
    innerRec3.size(new UiSize(43.336, 150));
    topRec.addChild(innerRec3);

    var innerRec31 = new Rectangle();
    innerRec31.id = function() {return 31;};         //TODO: you know what
    innerRec31.borderColor("Orange");
    innerRec31.color("Yellow");
    innerRec31.borderWidth(25);
    innerRec31.margin(new Margin(7.77, 0, 21, 2.19));
    innerRec31.size(new UiSize(144, 3.91));
    innerRec3.addChild(innerRec31);

    var innerRec32 = new Rectangle();
    innerRec32.id = function() {return 32;};         //TODO: you know what
    innerRec32.borderColor("Teal");
    innerRec32.color("LightGray");
    innerRec32.borderWidth(3);
    innerRec32.size(new UiSize(null, 9));
    innerRec3.addChild(innerRec32);

    var innerRec33 = new Rectangle();
    innerRec33.id = function() {return 33;};         //TODO: you know what
    innerRec33.color("HotPink");
    innerRec33.size(new UiSize(900, 900));
    innerRec33.margin(new Margin(12.12, 12.12, 12.12, 12.12));
    innerRec3.addChild(innerRec33);

    var rec3Sl = new StackLayout(innerRec3);
    rec3Sl.orientation(StackOrientation.VERTICAL);
    rec3Sl.horizontalContentAlignment(HorizontalContentAlignment.RIGHT);
    rec3Sl.verticalContentAlignment(VerticalContentAlignment.BOTTOM);
    innerRec3.layout(rec3Sl);
    /////////////////////////////////////////////////////////////////////////////


    var topSl = new StackLayout(topRec);
    topSl.orientation(StackOrientation.VERTICAL);
    topSl.horizontalContentAlignment(HorizontalContentAlignment.LEFT);
    topSl.verticalContentAlignment(VerticalContentAlignment.TOP);
    topRec.layout(topSl);

    topRec.doLayout();
    topRec.render(context);
  };

  var image = new Image();
  image.id = "sl_test02";      //DEBUG
  image.src = "StackLayoutTests/test2.png";
  registerTest(canvas, image, 1, _render, "Multiple Rectangles with StackLayout. The green one has Width=140 and Margin: left=5, top=15, bottom=5, right=2.<br/>" +
                                          "The salmon-bordered under has top margin 7.43. Using RGB tolerance of 1.");
})();
