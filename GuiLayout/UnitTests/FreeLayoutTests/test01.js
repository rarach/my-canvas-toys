(function() {
  var canvas4 = document.createElement("canvas");
  canvas4.width = 370;
  canvas4.height = 370;

  var _render = function() {
    var context = canvas4.getContext("2d");

    var topRec = new Rectangle();
    topRec.borderColor("Chocolate");
    topRec.borderWidth(8);
    topRec.color("lightgray");
    topRec.size(new UiSize(320, 260));
    topRec.actualPosition(new UiPoint(10, 40));     //TODO: must be placed in Scene that has hard FreeLayout

    var freeRec1 = new Rectangle();
    freeRec1.color("blue");
    freeRec1.size(new UiSize(49.31, 90));
    topRec.addChild(freeRec1);
    topRec.layout().position(freeRec1, new UiPoint(281, 60));

    var freeRec2 = new Rectangle();
    freeRec2.color("yellow");
    freeRec2.borderWidth(2.5);
    freeRec2.size(new UiSize(160, 170));
//    freeRec2.actualPosition(new UiPoint(150, 127));      //TODO: must be set via innermostKid's FreeLayout!
    topRec.addChild(freeRec2);
    topRec.layout().position(freeRec2, new UiPoint(150, 127));

    var redRec = new Rectangle();
    redRec.color("Maroon");
    redRec.size(new UiSize(100, 100));
//    redRec.actualPosition(new UiPoint(-30, -50));
    freeRec2.addChild(redRec);
    freeRec2.layout().position(redRec, new UiPoint(-30, -50));

    //This one will be invisible due to its position in clipped part of parent rectangle
    var white1 = new Rectangle();
    white1.color("White");
    white1.size(new UiSize(20, 20));
//    white1.actualPosition(new UiPoint(0, 0));
    redRec.addChild(white1);
    redRec.layout().position(white1, new UiPoint(0, 0));

    var white2 = new Rectangle();
    white2.color("White");
    white2.size(new UiSize(20, 2));
//    white2.actualPosition(new UiPoint(75, 92));
    redRec.addChild(white2);
    redRec.layout().position(white2, new UiPoint(75, 92));

    topRec.doLayout();
    topRec.render(context);
  };

  var image4 = new Image();
  image4.id = "test01";      //DEBUG
  image4.src = "FreeLayoutTests/test1.png";
  registerTest(canvas4, image4, 0, _render, "Embeded FreeLayout containers. The Maroon container is placed on negative coordinates inside yellow parent. It has</br>two White children. Borders are covered by inner children.");
})();
