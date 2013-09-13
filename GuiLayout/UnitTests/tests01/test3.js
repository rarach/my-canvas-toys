(function() {
  var canvas3 = document.createElement("canvas");
  canvas3.width = 350;
  canvas3.height = 220;

  var _render = function() {
    var context = canvas3.getContext("2d");

    var rec = new Rectangle();
    rec.borderColor("orange");
    rec.borderWidth(10);
    rec.color("yellow");
    rec.size(new UiSize(null, null));
    rec.actualPosition(new UiPoint(12, 50));      //only layout can do that

    var kidRec = new Rectangle();
    kidRec.color("LightGreen");
    kidRec.borderColor("green");
    kidRec.size(new UiSize(40, 40));
    rec.addChild(kidRec);

    var kid2 = new Rectangle();
    kid2.borderColor("magenta");
    kid2.borderWidth(4);
    kid2.color("#ba55d3");    //MediumOrchid
    kid2.size(new UiSize(70, 30));
    rec.addChild(kid2);

    var kid3 = new Rectangle();
    kid3.borderColor("blue");
    kid3.color("LightBlue");
    kid3.size(new UiSize(60, 130));
    rec.addChild(kid3);

    var kid4 = new Rectangle();
    kid4.color("LightCoral");
    kid4.borderWidth(4);
    kid4.borderColor("brown");
    kid4.size(new UiSize(90, 90));
    rec.addChild(kid4);


    var sl = new StackLayout(rec);
    sl.orientation(StackOrientation.HORIZONTAL);
    sl.horizontalContentAlignment(HorizontalContentAlignment.LEFT);
    sl.verticalContentAlignment(VerticalContentAlignment.BOTTOM);
    rec.doLayout();
    rec.render(context);
  };

  var image3 = new Image();
  image3.id = "test3";      //DEBUG
  image3.src = "tests01/test3.png";
  registerTest(canvas3, image3, 0, _render, "Horizontal StackLayout, alligned left & bottom");
})();
