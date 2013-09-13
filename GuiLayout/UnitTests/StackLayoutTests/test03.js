(function() {
  var canvas = document.createElement("canvas");
  canvas.width = 300;
  canvas.height = 140;

  var _render = function() {
    var context = canvas.getContext("2d");

    var topRec = new Rectangle();
    topRec.borderColor("Crimson");
    topRec.borderWidth(5.35);
    topRec.color("PaleGoldenRod");
    topRec.size(new UiSize(200, 80));
    topRec.actualPosition(new UiPoint(27.7, 8.28));

    var midRec = new Rectangle();
    midRec.color("OrangeRed");
    midRec.borderWidth(5);
    midRec.borderColor("Yellow");
    topRec.addChild(midRec);

    var midRec2 = new Rectangle();
    midRec2.color("White");
    midRec2.borderWidth(3);
    midRec2.borderColor("Black");
    midRec.addChild(midRec2);

    var innerRec = new Rectangle();
    innerRec.color("Pink");
    innerRec.borderColor("Green");
    innerRec.borderWidth(2);
    midRec2.addChild(innerRec);


    var topRecSl = new StackLayout(topRec);
    topRecSl.orientation(StackOrientation.HORIZONTAL);
    topRecSl.horizontalContentAlignment(HorizontalContentAlignment.LEFT);
    topRecSl.verticalContentAlignment(VerticalContentAlignment.TOP);
    topRec.layout(topRecSl);

    var midRecSl = new StackLayout(midRec);
    midRecSl.orientation(StackOrientation.HORIZONTAL);
    midRecSl.horizontalContentAlignment(HorizontalContentAlignment.LEFT);
    midRecSl.verticalContentAlignment(VerticalContentAlignment.TOP);
    midRec.layout(midRecSl);

    var midRec2Sl = new StackLayout(midRec2);
    midRec2Sl.orientation(StackOrientation.HORIZONTAL);
    midRec2Sl.horizontalContentAlignment(HorizontalContentAlignment.LEFT);
    midRec2Sl.verticalContentAlignment(VerticalContentAlignment.TOP);
    midRec2.layout(midRec2Sl);

    var innerRecSl = new StackLayout(innerRec);
    innerRecSl.orientation(StackOrientation.HORIZONTAL);
    innerRecSl.horizontalContentAlignment(HorizontalContentAlignment.LEFT);
    innerRecSl.verticalContentAlignment(VerticalContentAlignment.TOP);
    innerRec.layout(innerRecSl);


    topRec.doLayout();
    topRec.render(context);
  };

  var image = new Image();
  image.id = "sl_test03";      //DEBUG
  image.src = "StackLayoutTests/test3.png";
  registerTest(canvas, image, 2, _render, "Embeded StackLayout Rectangles. Only the outer-most has dimensions specified. All are HORIZONTAL, alligned LEFT.<br/>" +
                                          "RGB tolerance is 2.");
})();
