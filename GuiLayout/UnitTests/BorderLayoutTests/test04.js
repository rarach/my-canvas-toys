(function() {
  var canvas = document.createElement("canvas");
  canvas.width = 220;
  canvas.height = 60;

  var _render = function() {
    var context = canvas.getContext("2d");

    //Test-case 1
    var topRec = new Rectangle();
    topRec.borderColor("Chocolate");
    topRec.borderWidth(8);
    topRec.color("Linen");
    topRec.size(new UiSize(null, null));
    topRec.actualPosition(new UiPoint(10, 12));     //TODO: must be placed in Scene that has hard FreeLayout

    var centerRec = new Rectangle();
    centerRec.id = function() {return 4;};          //TODO: you know what
    centerRec.color("Salmon");
    centerRec.size(new UiSize(null, null));
    topRec.addChild(centerRec);

    var bl = new BorderLayout(topRec);
    topRec.layout(bl);
    bl.center(centerRec);


    topRec.doLayout();
    topRec.render(context);


    //Test-case 2
    var topRec2 = new Rectangle();
    topRec2.borderColor("Chocolate");
    topRec2.borderWidth(8);
    topRec2.color("Linen");
    topRec2.size(new UiSize(null, null));
    topRec2.actualPosition(new UiPoint(50, 12));    //TODO: must be placed in Scene that has hard FreeLayout

    var centerRec2 = new Rectangle();
    centerRec2.id = function() {return 4;};         //TODO: you know what
    centerRec2.color("Salmon");
    centerRec2.borderColor("Yellow");
    centerRec2.borderWidth(0.5);
    centerRec2.size(new UiSize(null, null));
    topRec2.addChild(centerRec2);

    var bl2 = new BorderLayout(topRec2);
    topRec2.layout(bl2);
    bl2.center(centerRec2);

    topRec2.doLayout();
    topRec2.render(context);


    //Test-case 3
    var topRec3 = new Rectangle();
    topRec3.borderColor("Chocolate");
    topRec3.borderWidth(8);
    topRec3.color("Lime");
    topRec3.size(new UiSize(null, null));
    topRec3.actualPosition(new UiPoint(90, 12));    //TODO: must be placed in Scene that has hard FreeLayout

    var centerRec3 = new Rectangle();
    centerRec3.id = function() {return 4;};         //TODO: you know what
    centerRec3.color("Salmon");
    centerRec3.borderColor("Yellow");
    centerRec3.borderWidth(0.5);
    centerRec3.size(new UiSize(10, 10));
    topRec3.addChild(centerRec3);

    var bl3 = new BorderLayout(topRec3);
    topRec3.layout(bl3);
    bl3.center(centerRec3);

    topRec3.doLayout();
    topRec3.render(context);


    //Test-case 4
    var topRec4 = new Rectangle();
    topRec4.borderColor("Chocolate");
    topRec4.borderWidth(8);
    topRec4.color("Blue");
    topRec4.size(new UiSize(null, null));
    topRec4.actualPosition(new UiPoint(130, 12));   //TODO: must be placed in Scene that has hard FreeLayout

    var centerRec4 = new Rectangle();
    centerRec4.id = function() {return 14;};        //TODO: you know what
    centerRec4.color("White");
    centerRec4.borderColor("Yellow");
    centerRec4.borderWidth(1.5);
    centerRec4.size(new UiSize(10, 10));
    topRec4.addChild(centerRec4);

    var bl4 = new BorderLayout(topRec4);
    topRec4.layout(bl4);
    bl4.center(centerRec4);

    topRec4.doLayout();
    topRec4.render(context);


    //Test-case 5
    var topRec5 = new Rectangle();
    topRec5.borderColor("Chocolate");
    topRec5.borderWidth(8);
    topRec5.color("Blue");
    topRec5.size(new UiSize(null, null));
    topRec5.actualPosition(new UiPoint(170.2, 12));   //TODO: must be placed in Scene that has hard FreeLayout

    var centerRec5 = new Rectangle();
    centerRec5.id = function() {return 14;};          //TODO: you know what
    centerRec5.color("White");
    centerRec5.borderColor("Yellow");
    centerRec5.borderWidth(1.5);
    centerRec5.size(new UiSize(10, 10));
    topRec5.addChild(centerRec5);

    var bl5 = new BorderLayout(topRec5);
    topRec5.layout(bl5);
    bl5.center(centerRec5);

    topRec5.doLayout();
    topRec5.render(context);
  };

  var image = new Image();
  image.id = "bl_test04";      //DEBUG
  image.src = "BorderLayoutTests/test4.png";
  registerTest(canvas, image, 1, _render, "5 tests of a Rectangle with BorderLayout, unset dimensions and 8px brown border. From left to right:<br/>" +
                                          "1.) inner element with unset dimensions and no border.<br/>" +
                                          "2.) inner element with unsed dimensions and 0.5 px yellow border.<br/>" +
                                          "3.) inner element 10x10 px, 0.5 px yellow border.<br/>" +
                                          "4.) inner element 10x10 px, 1.5 px yellow border, white body.<br/>" +
                                          "5.) outer Rectangle with brown border and blue background is placed at X=170.2. Due to poor anti-aliasing the yellow inner Rectangle's border is greyed");
})();
