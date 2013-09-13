Layout.WeightedRadial = function(graph, rootNode)
{
  this.graph = graph;       //TODO: protected getter
  this.root = rootNode;     //TODO: protected getter

  this.LEAF_ANGLE_VARIATION = 360.0 * 0.9 * 0.5;      //TODO: find out how to do protected read-only constant

  this.graphStructure = new Layout.GraphStructure(graph, rootNode);   //TODO: protected getter

  this.nodesLayoutData = new Array();   //TODO: protected getter
  var surr = this.evalSurrSpace(this.root);
  this.nodesLayoutData[this.root.id] = new Layout.WeightedRadial.WRLayoutData(0.0, 360.0, 0.0, new Layout.WeightedRadial.WRPoint(0.0, 0.0), 0.0, surr);


  //DEBUG, only for compatibility purposes. Must definitely be refactored to get rid of this
  this.edgeSprings = {};      // keep track of springs associated with edges
};


//TODO: private method
Layout.WeightedRadial.prototype.placeChildren = function(node)
{
  var subNodes = this.graphStructure.getSubNodes(node);
  var subNodesCount = subNodes.length;

  if (subNodesCount == 0)    //Leaf node
    return;

  var layoutData = this.nodesLayoutData[node.id];
  var weight = this.graphStructure.getNodeWeight(node);
  var angleOffset = layoutData.angleStart;

  for (var i = 0; i < subNodesCount; i++) {
    var subNode = subNodes[i];

    //Check if the node wasn't already placed by different parent
    if (typeof(this.nodesLayoutData[subNode.id]) != 'undefined')
      continue;

    //If it's a leaf node, place it evenly around parent, with some random variation.
    if (this.graphStructure.isLeaf(subNode)) {
      var _angleStart = 360.0 * i / subNodesCount ;
      var _angleEnd = 360.0 * (i+1) / subNodesCount ;
      var _parentRadius = Math.sqrt(layoutData.surroundingSpace / Math.PI);
      var _distance = _parentRadius * (1.8 - Math.random());
      this.nodesLayoutData[subNode.id] = new Layout.WeightedRadial.WRLayoutData(_angleStart, _angleEnd, 0.7, layoutData.getPoint(), _distance, 0.0);
    }
    else {
      var angle = (this.graphStructure.getNodeWeight(subNode) + 1) / weight * layoutData.getAngleRange();
      var surr = this.evalSurrSpace(subNode);

      //Get the distance from parent
      var parentRadius = Math.sqrt(layoutData.surroundingSpace / Math.PI);
      var radius = Math.sqrt(surr / Math.PI);
      var distance = parentRadius *2/*+ MIN_EDGE_LENGHT*/ + radius * (1.0 + 5.0*Math.random());
      this.nodesLayoutData[subNode.id] = new Layout.WeightedRadial.WRLayoutData(angleOffset, angleOffset + angle, 0.0, layoutData.getPoint(), distance, surr);
      angleOffset += angle;

      this.placeChildren(subNode);
    }
  }
};


//TODO: private
Layout.WeightedRadial.prototype.evalSurrSpace = function(node)
{
  var MAX_NODE_VOLUME = 120.0 * 65.0;   //TODO: do I have to write how bad this is?
  var SPACING_COEF = 38.0;    //TODO: function of graph size (small graph => smaller coef)

  var subNodesCount = this.graphStructure.getSubNodes(node).length;
  return (subNodesCount * MAX_NODE_VOLUME * SPACING_COEF);
};


//TODO: must implement the interface of Layout
Layout.WeightedRadial.prototype.start = function(interval, render, active, doneCallback)      //TODO: brand new IDEA: layout doesn't do rendering. It just fires a progress
                                                                                              //      event on regular basis. Consumer can opt to render() as handler. Layout
                                                                                              //      takes stepsCount argument to know how often the event is fired (0=never).
                                                                                              //      A 'step' is placing one node in WRLayout. In FD it could be one iteration.
{
  this.placeChildren(this.root);     //TODO: so far continuous rendering not supported. It could be after placing every _chunk_ nodes.



  //DEBUG. Shift every node so they're aligned to top left corner of canvas
  var topLeftCorner = this.getTopLeftCorner();



  var nodeCount = this.graph.nodes.length;
  var bBox = GraphicsHelper.getBoundingBox(this.graph);
  var bbWidth = bBox.bottomright.x - bBox.topleft.x;
  var bbHeight = bBox.bottomright.y - bBox.topleft.y;

  //Assign computed WRPoints to actual points of gravity. TODO: could be done in a function
  for (var i=0; i < nodeCount; i++) {
    var node = this.graph.nodes[i];
    
    if (typeof(this.nodesLayoutData[node.id]) !== 'undefined') {
      var layData = this.nodesLayoutData[node.id];

      var x0 = layData.getPoint().getX() - topLeftCorner.x;
      var y0 = layData.getPoint().getY() - topLeftCorner.y;
      node.setPosition(new UIPoint(x0, y0));
    }
    else {      //The node is part of disconnected graph, must be placed now
      var hDist = 0.5 - Math.random();
      var vDist = 0.5 - Math.random();
      var side = Math.random() < 0.5;

      if (side) {     //Place it left or right from graph's bounding box
        var x1 = (hDist < 0 ? bBox.topleft.x : bBox.bottomright.x) + (hDist * bbHeight) - topLeftCorner.x;
        var y1 = (vDist < 0 ? bBox.bottomright.y : bBox.topleft.y) + (vDist * bbWidth) - topLeftCorner.y;
        node.setPosition(new UIPoint(x1, y1));
      }
      else {          //Above or under
        var x2 = (hDist < 0 ? bBox.bottomright.x : bBox.topleft.x) + (hDist * bbHeight) - topLeftCorner.x;
        var y2 = (vDist < 0 ? bBox.topleft.y : bBox.bottomright.y) + (vDist * bbWidth) - topLeftCorner.y;
        node.setPosition(new UIPoint(x2, y2));
      }
    }
  }

  render();     //TODO: No. onStep();
  doneCallback();
};


//Get string attached to given edge
Layout.WeightedRadial.prototype.spring = function(edge)
{
  if (typeof(this.edgeSprings[edge.id]) == 'undefined') {
    this.edgeSprings[edge.id] = new Layout.ForceDirected.Spring(edge.source.getPosition(), edge.target.getPosition(), 0.0, 0.0);
  }

  return this.edgeSprings[edge.id];
};








/** Layout data container to be asociated with a node. Enough data to place the respective node
    relatively to its parent.
    Param @angleVariation is number between 0.0 and 1.0. It's percentage of allowed variation
          within given angle range.
          Ex. 0.0 means that getAzimuth() returns value right between @angleStart and @angleEnd.
          0.9 means that the azimuth will be randomly changed to be up to 90% close to either
          @angleStart or @angleEnd. */
Layout.WeightedRadial.WRLayoutData = function(angleStart, angleEnd, angleVariation, parentPoint, distance, surrounding/*TODO: even the arg name sucks*/)
{
  this.angleStart = angleStart;
  this.angleEnd = angleEnd;
  this.getAngleRange = function() {return this.angleEnd - this.angleStart;};

  //Random angle variation. Counted as angleVariation 
  var _angleVariation = (Math.random() - 0.5) * angleVariation * this.getAngleRange();

  this.getAzimuth = function() {
    var clearAzimuth = (this.angleEnd - this.angleStart) / 2.0 + this.angleStart;
    return clearAzimuth + _angleVariation;
  };

  this.surroundingSpace = surrounding;    //TODO: better name, better usage

  this.parentPoint = parentPoint;

  //Get point for underlying node from parent point, angle (azimuth from positive X axis) and distance
  var radians = this.getAzimuth() * (Math.PI / 180.0);
  var newX = this.parentPoint.getX() + Math.cos(radians)*distance;
  var newY = this.parentPoint.getY() + Math.sin(radians)*distance;
  var _point = new Layout.WeightedRadial.WRPoint(newX, newY);

  this.getPoint = function(){return _point;};
};



//TODO: implementation is too similar to the one of ForceDirected. This probably could be merged to use some generic Point
Layout.WeightedRadial.prototype.getTopLeftCorner = function()
{
  var topLeft = new Vector(0, 0);

  var nodeCount = this.graph.nodes.length;
  for (var i=0; i < nodeCount; i++) {
    var node = this.graph.nodes[i];
    if (typeof(this.nodesLayoutData[node.id]) !== 'undefined') {
      var point = this.nodesLayoutData[node.id].getPoint();

      if (point.getX() < topLeft.x)
        topLeft.x = point.getX();
      if (point.getY() < topLeft.y)
        topLeft.y = point.getY();
    }
  }

  return topLeft/*.multiply(1.05)*/;      //5% padding. Besides it allows to drag far away from the flock
                                          //UPDATE: No paddings here! Diagram (or layout?) must ensureVisibility(node) after
                                          //node has been moved on the rim or selection changed to a node on the rim
};

//Immutable coordinates in the canvas
Layout.WeightedRadial.WRPoint = function(x, y)
{
  var _x = x;
  var _y = y;

  this.getX = function() {return _x;};
  this.getY = function() {return _y;};
};




//TODO: will surely have value for TreeLayout too. Move to its own file.
/** Additional meta-data about elements of a graph */
Layout.GraphStructure = function(graph, rootNode)
{
  var nodeWeights = new Array();  //key = node's ID, value = number of nodes in sub-tree (any depth)


  /* Traverse in breadth and store each node's level as shortest path to the root */
  var _nodeLevels = {};
  var _processedLevelNodes = [];

  function initLevels(level, levelNodes) {
    var levelSize = levelNodes.length;

    if (levelSize == 0)
      return;

    var _nextLevelNodes = new Array();

    for (var l=0; l<levelSize; l++) {
      //Assign the level number to the current nodes
      var aNode = levelNodes[l];
      _nodeLevels[aNode.id] = level;
      _processedLevelNodes[aNode.id] = true;

      //Harvest next level nodes
      var inCount = graph.incomingNodes[aNode.id].length;

      for (var i=0; i<inCount; i++) {
        var inNode = graph.incomingNodes[aNode.id][i];
        if (_processedLevelNodes[inNode.id] !== true) {
          _nextLevelNodes.push(inNode);
          _processedLevelNodes[inNode.id] = true;
        }
      }

      var outCount = graph.outcomingNodes[aNode.id].length;
      for (var o=0; o<outCount; o++) {
        var outNode = graph.outcomingNodes[aNode.id][o];
        if (_processedLevelNodes[outNode.id] !== true) {
          _nextLevelNodes.push(outNode);
          _processedLevelNodes[outNode.id] = true;
        }
      }
    }

    initLevels(level+1, _nextLevelNodes);
  }

  initLevels(0, [ rootNode ]);


  this.getSubNodes = function(parentNode) {
    var _subNodes = new Array();

    //Used to determine already added subnodes (in case of multiple edges in one direction)
    var _usedSubNodes = [];
    var _level = _nodeLevels[parentNode.id];

    var inCount = graph.incomingNodes[parentNode.id].length;
    for (var i=0; i<inCount; i++) {
      var inNode = graph.incomingNodes[parentNode.id][i];
      if (_nodeLevels[inNode.id] > _level && _usedSubNodes[inNode.id] != true) {
        _subNodes.push(inNode);
        _usedSubNodes[inNode.id] = true;
      }
    }

    var outCount = graph.outcomingNodes[parentNode.id].length;
    for (var o=0; o<outCount; o++) {
      var outNode = graph.outcomingNodes[parentNode.id][o];
      if (_nodeLevels[outNode.id] > _level && _usedSubNodes[outNode.id] != true) {
        _subNodes.push(outNode);
        _usedSubNodes[outNode.id] = true;
      }
    }

    return _subNodes;
  };


  var _that = this;
  //Init the number of nodes in sub-trees
  function getWeight(aNode) {             //TODO: I can't recall what's access modifier of such methods. Private? Refactor if not.
    var subs = _that.getSubNodes(aNode);
    if (subs.length == 0) {    //Leaf
      nodeWeights[aNode.id] = 0;
      return 0;
    }
    else {
      var count = subs.length;
      for (var s = 0; s < count; s++) {
        if (typeof(nodeWeights[aNode.id]) == 'undefined')
          nodeWeights[aNode.id] = 0;
        nodeWeights[aNode.id] += 1 + getWeight(subs[s]);
      }

      return nodeWeights[aNode.id];
    }
  }

  nodeWeights[rootNode.id] = getWeight(rootNode);


  this.getNodeWeight = function(node) {
    return nodeWeights[node.id];
  };

  this.isLeaf = function(node) {
    return this.getSubNodes(node).length == 0;
  };
};
