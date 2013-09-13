(function() {
  var canvas4 = document.createElement("canvas");
  canvas4.width = 650;
  canvas4.height = 170;

  var _render = function() {
    var context = canvas4.getContext("2d");

    var topRec = new Rectangle();
    topRec.borderColor("#0b0b50");
    topRec.borderWidth(7);
    topRec.size(new UiSize(600, 100));
    topRec.actualPosition(new UiPoint(10, 40));     //TODO: must be placed in Scene that has hard FreeLayout

    var greenMidRec = new Rectangle();
    greenMidRec.borderColor("green");
    greenMidRec.borderWidth(10);
    greenMidRec.color("LightGreen");
    greenMidRec.size(new UiSize(200, 280));
    topRec.addChild(greenMidRec);

    var innermostKid = new Rectangle();
    innermostKid.borderColor("FireBrick");
    innermostKid.borderWidth(4);
    innermostKid.color("Coral");
    innermostKid.size(new UiSize(195, 84));
    greenMidRec.addChild(innermostKid);

    var freeRec = new Rectangle();
    freeRec.color("blue");
    freeRec.size(new UiSize(18, 30));
//    freeRec.actualPosition(new UiPoint(5, 5));      //TODO: must be set via innermostKid's FreeLayout!
    innermostKid.addChild(freeRec);
    innermostKid.layout().position(freeRec, new UiPoint(5, 5));

    var sl1 = new StackLayout(greenMidRec);
    sl1.orientation(StackOrientation.VERTICAL);
    sl1.horizontalContentAlignment(HorizontalContentAlignment.RIGHT);
    sl1.verticalContentAlignment(VerticalContentAlignment.TOP);
    greenMidRec.doLayout();           //Only the framework can call doLayout() internally on TOP-LEVEL container
    //greenMidRec.render(context);      //It's a clear fail to call render() before ALL layouting was done AND scene was cleared from previous render

    var sl2 = new StackLayout(topRec);
    sl2.orientation(StackOrientation.VERTICAL);
    sl2.horizontalContentAlignment(HorizontalContentAlignment.LEFT);
    sl2.verticalContentAlignment(VerticalContentAlignment.TOP);
    topRec.doLayout();
    topRec.render(context);
  };

  var image4 = new Image();
  image4.id = "test4";      //DEBUG
  image4.src = "StackLayoutTests/test1.png";
  registerTest(canvas4, image4, 0, _render, "Embeded StackLayout containers");
})();
