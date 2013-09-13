(function() {
  var canvas = document.createElement("canvas");
  canvas.width = 120;
  canvas.height = 90;

  var _render = function() {
    var context = canvas.getContext("2d");

    var topRec = new Rectangle();
    topRec.borderColor("Chocolate");
    topRec.borderWidth(8);
    topRec.color("Linen");
    topRec.size(new UiSize(null, null));
    topRec.actualPosition(new UiPoint(10, 20));   //TODO: must be placed in Scene that has hard FreeLayout

    var eastRec = new Rectangle();
    eastRec.id = function() {return 2;};          //TODO: you know what
    eastRec.color("DodgerBlue");
    eastRec.borderColor("MidnightBlue");
    eastRec.borderWidth(5);
    eastRec.size(new UiSize(5, null));
    topRec.addChild(eastRec);

    var westRec = new Rectangle();
    westRec.id = function() {return 3;};          //TODO: you know what
    westRec.color("DarkTurquoise");
    westRec.borderWidth(20);
    westRec.borderColor("Magenta");
    westRec.size(new UiSize(40, null));
    topRec.addChild(westRec);

    var bl = new BorderLayout(topRec);
    topRec.layout(bl);
    bl.west(westRec);
    bl.east(eastRec);

    topRec.doLayout();
    topRec.render(context);
  };

  var image = new Image();
  image.id = "bl_test03";      //DEBUG
  image.src = "BorderLayoutTests/test3.png";
  registerTest(canvas, image, 0, _render, "BorderLayout on a Rectangle with unset width and height. WEST element has unset<br/>height too, but is 40px wide and has 20px Magenta border.<br/>EAST: 5px wide, 5px border, stretching height.");
})();
