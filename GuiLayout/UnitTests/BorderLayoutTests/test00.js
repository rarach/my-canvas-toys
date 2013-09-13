(function() {
  var canvas = document.createElement("canvas");
  canvas.width = 570;
  canvas.height = 520;

  var _render = function() {
    var context = canvas.getContext("2d");

    var topRec = new Rectangle();
    topRec.borderColor("Chocolate");
    //TODO: topRec.borderWidth(8);
    topRec.color("Linen");
    topRec.size(new UiSize(540, 500));
    topRec.actualPosition(new UiPoint(10, 2));    //TODO: must be placed in Scene that has hard FreeLayout

    var centerRec = new Rectangle();
    centerRec.id = function() {return 4;};         //TODO: you know what
    centerRec.color("Salmon");
    centerRec.borderColor("White");
    centerRec.borderWidth(3);
    centerRec.size(new UiSize(null, null));
    topRec.addChild(centerRec);

    var northRec = new Rectangle();
    northRec.id = function() {return 1;};         //TODO: you know what
    northRec.color("red");
    northRec.borderWidth(2);
    northRec.size(new UiSize(null, 90));
    topRec.addChild(northRec);

    var eastRec = new Rectangle();
    eastRec.id = function() {return 2;};         //TODO: you know what
    eastRec.color("DodgerBlue");
    eastRec.borderWidth(5);
    eastRec.size(new UiSize(5, null));
    topRec.addChild(eastRec);

    var westRec = new Rectangle();
    westRec.id = function() {return 3;};         //TODO: you know what
    westRec.color("DarkTurquoise");
    westRec.borderWidth(20);
    westRec.borderColor("Magenta");
    westRec.size(new UiSize(40, null));
    topRec.addChild(westRec);

    var southRec = new Rectangle();
    southRec.id = function() {return 5;};         //TODO: you know what
    southRec.color("DarkOrange");
    southRec.size(new UiSize(null, 97));
    topRec.addChild(southRec);


    var bl = new BorderLayout(topRec);
    topRec.layout(bl);
    bl.north(northRec);
    bl.south(southRec);
    bl.west(westRec);
    bl.east(eastRec);
    bl.center(centerRec);


    topRec.doLayout();
    topRec.render(context);
  };

  var image = new Image();
  image.id = "test00";      //DEBUG
  image.src = "BorderLayoutTests/test0.png";
  registerTest(canvas, image, 0, _render, "BorderLayout in it's full beauty. WEST and EAST child are stretched horizontally, NORTH and SOUTH vertically, CENTER in both directions.");
})();
