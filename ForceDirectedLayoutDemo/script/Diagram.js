/** Topmost graphical element of this app. Diagram is responsible for creating, holding
 *  and rendering of node/edge visual objects. And for handling canvas events.
 */
var Diagram = function (/*canvasId,*/entityId, level, filter)
{
  var _canvasId;
  var _level = level;
  var _filter = filter;
  var panning = false;
  var _layoutScaleFactor = 1.0;
  var graph = new Graph();
  var _toolTipService = TooltipService.getInstance();


  fdLayoutCreateLayeredStarGraph(graph, 750, 10);
//  fdLayoutCreateSunnyGraph(graph, 16, 6);
//  fdLayoutCreateMashGraph(graph, 30);
//  wrLayoutDisconnectedGraph(graph);
//  wrLayoutCreateSimpleWeightedGraph(graph);
//  wrLayoutSunnyGraph(graph);
//  wrLayoutFlockGraph(graph);
//  wrLayoutSuperConnectedGraph(graph);
//  wrLayoutDiamond(graph);
//  wrLayoutCompanyTree(graph);
//  wrLayoutSunnyLike(graph);
//  wrLayoutDEBUGBadPositioning(graph);


//  var layout = new Layout.ForceDirected(graph, graph.nodes.length);
  var layout = new Layout.WeightedRadial(graph, graph.nodes[0]);        //TODO: check if graph.nodes[0] is really always the root


  //TODO: some better construct. Do it when building the graph.
  graph.edges.forEach(function(edge){
    edge.setHittable(true);
  });
  graph.nodes.forEach(function(node){
    node.setHittable(true);
  });



  this.boundingFrame = new Frame(0, 0, -1, -1);   //Current bounding frame
                                                 //TODO: must be refreshed if node has been moved by user BEHIND ITS EDGE
                                                 //TODO: and definitely shouldn't be public too
  var canvas = document.getElementById("diaCanvas");
  var ctx = canvas.getContext("2d");

  //Prevent I-beam cursor when dragging
  canvas.onselectstart = function () {return false;}


  
//  var visualNodes = [];
//  var visualEdges = [];       //edu: only assigned. TODO: think of it

  this.selectedControl = null;      //TODO: should actually be an array of selected controls
  this.draggedControl = null;
  this.isPanning = function(){return panning;};
  this.startPanning = function() {          //TODO: NO! In no case can be public!
    panning = true;
    canvas.style.cursor = "move";
  };
  this.mouseUp = function() {
    panning = false;
    canvas.style.cursor = "default";
  };

  /** 
   * @param {Number} mouseX  X position of cursor inside canvas
   * @param {Number} mouseY  Y position of cursor inside canvas
   */
  this.mouseMove = function(mouseX, mouseY) {
    _toolTipService.handlePosition(mouseX, mouseY);
  };

  this.getScale = function() {return _layoutScaleFactor;};
  this.zoomIn = function() {
    _layoutScaleFactor *= 1.25
    this.render();

    message("Zoom " + _layoutScaleFactor);    //DEBUG
  };
  this.zoomOut = function() {
    _layoutScaleFactor *= 0.8;
    this.render();
    
    message("Zoom " + _layoutScaleFactor);    //DEBUG
  };
  this.zoomToFit = function() {
    var wScale = this.boundingFrame.width / canvas.width;
    var hScale = this.boundingFrame.height / canvas.height;

    _layoutScaleFactor = 1.0 / Math.max(wScale, hScale);
    message("Fit to scale " + _layoutScaleFactor);
    this.render();
  };

  this.panX = function(pixels) {
    var nodeCount = this.getGraph().nodes.length;
    for(var i = 0; i < nodeCount; i++) {
      var node = this.getGraph().nodes[i];
      node.setPosition(node.getPosition().add(pixels, 0.0));
    }

    this.render();
  };
  this.panY = function(pixels) {
    var nodeCount = this.getGraph().nodes.length;
    for(var i = 0; i < nodeCount; i++) {
      var node = this.getGraph().nodes[i];
      node.setPosition(node.getPosition().add(0.0, pixels));
    }

    this.render();
  };

  this.context = function() {return ctx;};
  this.getGraph = function() {return graph;};
  this.getLayout = function() {return layout;};
  this.clear = function() {                                   //TODO: check if really needs to be protected
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
  this.clearHitCanvas = function() {
    HitService.getInstance().clear();
  }
};


var debugLayoutDone = false;    //edu

Diagram.prototype.render = function()
{
  this.context().save();
  HitService.getInstance().getContext().save();
  this.clear();
  this.clearHitCanvas();
  var scale = this.getScale();
  this.context().scale(scale, scale);       //TODO: scaling controls "by layout"?
  HitService.getInstance().getContext().scale(scale, scale);
  var that = this;

  this.getGraph().edges.forEach(function(edge){
    edge.draw(that.context(), that);
  });

  this.getGraph().nodes.forEach(function(node){
    node.draw(that.context());      //TODO: no layout passing
  });
  this.context().restore();
  HitService.getInstance().getContext().restore();
};

//Layout and render the graph
Diagram.prototype.show = function()
{
  var that = this;

  this.getLayout().start(50, function() {        //TODO: the layout should return a bounding frame when done.
                               that.render.call(that);
                             },
                         false,      //edu: false=no continuous rendering, only final result
                         function() {
                           debugLayoutDone=true;
//DEBUG                           var bb = that.getLayout().getBoundingBox();
                           var bb = GraphicsHelper.getBoundingBox(that.getGraph());
                           bb.bottomright = bb.bottomright.subtract(bb.topleft);
//                           var coef = 4.0;          //FUJ! Todo
                           var layoutPadding = 50.0;  //FUJ! Todo as well
//                           that.boundingFrame = new Frame(0.0, 0.0, bb.bottomright.x*coef + layoutPadding*2, bb.bottomright.y*coef + layoutPadding*2);
                           that.boundingFrame = new Frame(0.0, 0.0, bb.bottomright.x+layoutPadding, bb.bottomright.y+layoutPadding);

                           message("bounding rect: w=" + that.boundingFrame.width + "; h=" + that.boundingFrame.height);
                         });
};

Diagram.prototype.mouseDown = function(mouseX, mouseY)      //TODO: shouldn't be this public. Diagram is owner of canvas (in OOP way) and must
                                                            //react on canvas.mousedown internaly. Same for mouse-up and -move
{
  if (this.selectedControl != null)
    this.selectedControl.isSelected = false;

  var hitControl = HitService.getInstance().getControlAt(mouseX, mouseY);
  if (hitControl == null) {
    this.selectedControl = null;
    this.draggedControl = null;
    this.startPanning();
  }
  else {
    this.selectedControl = hitControl;
    this.selectedControl.isSelected = true;     //TODO: .setSelected(true);
    if (hitControl.isDraggable())
      this.draggedControl = hitControl;
    else
      this.draggedControl = null;
  }

  this.render();      //TODO: No. Only should "Invalidate" and wait for next scheduled render to do the job.
};
