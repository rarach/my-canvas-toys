//Note: anonymous function necessary to scope used variables as not global (to avoid possible conflicts with other tests)

(function() {
  var canvas1 = document.createElement("canvas");
  canvas1.width = 250;   //Must match the dimensions
  canvas1.height = 250;  //of reference image

  var _render = function() {
    var context = canvas1.getContext("2d");

    var rec2 = new Rectangle();
    rec2.borderColor("red");
    rec2.borderWidth(50);
    rec2.color("pink");
    rec2.size(new UiSize(100, 100));
    rec2.actualPosition(new UiPoint(60, 80));       //TODO: must be placed in Scene that has hard FreeLayout

    var kidRec20 = new Rectangle();
    kidRec20.borderColor("green");
    kidRec20.borderWidth(10);
    kidRec20.color("LightGreen");
    kidRec20.size(new UiSize(20, 20));
    rec2.addChild(kidRec20);

    var kidRec21 = new Rectangle();
    kidRec21.color("Navy");
    kidRec21.size(new UiSize(20, 20));
    rec2.addChild(kidRec21);

    var kidRec22 = new Rectangle();
    kidRec22.borderColor("DarkViolet");
    kidRec22.borderWidth(10);
    kidRec22.color("MediumOrchid");
    kidRec22.size(new UiSize(75, 25));
    rec2.addChild(kidRec22);

    var sl2 = new StackLayout(rec2);
    sl2.orientation(StackOrientation.VERTICAL);
    sl2.horizontalContentAlignment(HorizontalContentAlignment.LEFT);
    sl2.verticalContentAlignment(VerticalContentAlignment.TOP);
    rec2.doLayout();
    rec2.render(context);
  };

  var image1 = new Image();
  image1.id = "test1";      //DEBUG
  image1.src = "tests01/test1.png";
  registerTest(canvas1, image1, 0, _render, "StackLayouted rectangle with 50px border. Vertical with TOP vertical<br/> and LEFT horizontal alignment. Must clip the violet inner rectangle.");
})();
