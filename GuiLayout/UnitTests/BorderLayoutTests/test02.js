(function() {
  var canvas = document.createElement("canvas");
  canvas.width = 250;
  canvas.height = 350;

  var _render = function() {
    var context = canvas.getContext("2d");

    var topRec = new Rectangle();
    topRec.borderColor("Chocolate");
    topRec.borderWidth(8);
    topRec.color("Linen");
    topRec.size(new UiSize(222, 300));
    topRec.actualPosition(new UiPoint(10, 20));   //TODO: must be placed in Scene that has hard FreeLayout

    var eastRec = new Rectangle();
    eastRec.id = function() {return 2;};          //TODO: you know what
    eastRec.color("DodgerBlue");
    eastRec.borderColor("MidnightBlue");
    eastRec.borderWidth(5);
    eastRec.size(new UiSize(5, 1000));
    topRec.addChild(eastRec);

    var northRec = new Rectangle();
    northRec.id = function() {return 1;};         //TODO: you know what
    northRec.color("Red");
    northRec.borderWidth(2);
    northRec.size(new UiSize(200, 50));
    topRec.addChild(northRec);

    var southRec = new Rectangle();
    southRec.id = function() {return 5;};         //TODO: you know what
    southRec.color("DarkOrange");
    southRec.size(new UiSize(154, 97));
    topRec.addChild(southRec);

    var bl = new BorderLayout(topRec);
    topRec.layout(bl);
    bl.north(northRec);
    bl.south(southRec);
    bl.east(eastRec);


    topRec.doLayout();
    topRec.render(context);
  };

  var image = new Image();
  image.id = "bl_test02";      //DEBUG
  image.src = "BorderLayoutTests/test2.png";
  registerTest(canvas, image, 0, _render, "BorderLayout with only NORTH, SOUTH and EAST inner elements. NORTH and SOUTH<br/> have widths explicitely set, so are not stretched. EAST's height as well.");
})();
