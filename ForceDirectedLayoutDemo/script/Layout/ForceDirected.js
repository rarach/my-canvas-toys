/* Force directed graph layout */
var Layout = {};    //edu: namespace

//TODO: this implementation is slow, bad. Look for better sample in JUNG etc.
Layout.ForceDirected = function(graph, maxIters)      //TODO; use maxIters if set
{
  this.graph = graph;
/*  this.ATTRACTION = stiffness; // spring stiffness constant
  this.REPULSION = repulsion; // repulsion constant
  this.DAMPING = damping;     // velocity damping factor
*/

  var DYNAMICS = 500.0;
  var nodeCount = graph.nodes.length;
  this.ATTRACTION = DYNAMICS; //1.8 * DYNAMICS / nodeCount;
  this.REPULSION = DYNAMICS;
  this.DAMPING = 0.5;

//del  this.nodePoints = {}; // keep track of points associated with nodes
  this.edgeSprings = {};      // keep track of springs associated with edges

  this.intervalId = null;

  this.pointsOfGravity = new Array();   //key = node ID, value = current point of gravity of the node
  for (var n = 0; n < nodeCount; n++) {
    this.pointsOfGravity[graph.nodes[n].id] = new Layout.ForceDirected.Point(Vector.random(), 1.0);
  }
};

//Get string attached to given edge
Layout.ForceDirected.prototype.spring = function(edge)      //TODO: can't be public
{
  if (typeof(this.edgeSprings[edge.id]) == 'undefined')
  {
    var length = typeof(edge.data.length) != 'undefined' ? edge.data.length : 5.0;
    var existingSpring = false;     //TODO: I don't like this mixing of types. NULL should rather be used to flag yet unfound spring

    //edu: share spring with similar edges...
    var from = this.graph.getEdges(edge.source, edge.target);
    from.forEach(function(e){
      if (existingSpring === false && typeof(this.edgeSprings[e.id]) != 'undefined') {
        existingSpring = this.edgeSprings[e.id];
      }
    }, this);

    if (existingSpring !== false) {
      return this.edgeSprings[edge.id] = new Layout.ForceDirected.Spring(existingSpring.point1, existingSpring.point2, 0.0, 0.0);
    }

    //edu: ...or almost similar (oposite direction)
    var to = this.graph.getEdges(edge.target, edge.source);
    to.forEach(function(e){
      if (existingSpring === false && typeof(this.edgeSprings[e.id]) != 'undefined') {
        existingSpring = this.edgeSprings[e.id];
      }
    }, this);

    if (existingSpring !== false) {
      return this.edgeSprings[edge.id] = 
        new Layout.ForceDirected.Spring(existingSpring.point2, existingSpring.point1, 0.0, 0.0);
    }

    //Failed to find existing spring, create new
    this.edgeSprings[edge.id] = new Layout.ForceDirected.Spring(
      this.pointsOfGravity[edge.source.id], this.pointsOfGravity[edge.target.id], length, this.ATTRACTION
    );
  }

  return this.edgeSprings[edge.id];
};


// callback should accept argument: Node
Layout.ForceDirected.prototype.eachNode = function(callback)      //TODO: this makes profiling harder. For debug's sake, get rid of it :-\
{
  var t = this;
  this.graph.nodes.forEach(function(n){
    callback.call(t, n);
  });
};

// Physics stuff
Layout.ForceDirected.prototype.applyCoulombsLaw = function()        //edu: applies repulsive force
{
  this.eachNode(function(node1) {
    this.eachNode(function(node2) {
      if (this.pointsOfGravity[node1.id] !== this.pointsOfGravity[node2.id])
      {
        var diff = this.pointsOfGravity[node1.id].p.subtract(this.pointsOfGravity[node2.id].p);
        var distance = diff.magnitude() + 1.0;
        var direction = diff.normalise();     //edu: "direction" has same direction, just is shifted (normalised) to have length 1

        //DEBUG
        var repulCoef1 = node2.data.neighbors *node2.data.neighbors *1.5;
        var repulCoef2 = node1.data.neighbors *node1.data.neighbors *1.5;

        // apply force to each end point
        this.pointsOfGravity[node1.id].applyForce( direction.multiply(this.REPULSION   *repulCoef1   ).divide(distance * distance * 0.5) );
        this.pointsOfGravity[node2.id].applyForce( direction.multiply(this.REPULSION   *repulCoef2   ).divide(distance * distance * -0.5) );
      }
    });
  });
};

Layout.ForceDirected.prototype.applyHookesLaw = function()          //edu: applies attracting force
{
  var count = this.graph.edges.length;
  for(var e=0; e<count; e++) {
    var spring = this.spring(this.graph.edges[e]);
    var diff = spring.point2.p.subtract(spring.point1.p); // the direction of the spring
    var displacement = spring.length - diff.magnitude();
    var direction = diff.normalise();
    
    
    var stifCoef = this.graph.edges[e].data.debug;    //DEBUG, clear?
    

    // apply force to each end point
    spring.point1.applyForce( direction.multiply(spring.stiffness   /stifCoef    * displacement * (-0.5)) );
    spring.point2.applyForce( direction.multiply(spring.stiffness   /stifCoef    * displacement * 0.5) );
  }
};

Layout.ForceDirected.prototype.attractToCentre = function()
{
/*  this.eachNode(function(node) {
    var direction = node.pointOfGravity.p.multiply(-1.0);
    node.pointOfGravity.applyForce(direction.multiply(this.REPULSION / 5.0));
  });
*/
};


Layout.ForceDirected.prototype.updateVelocity = function(timestep)
{
  this.eachNode(function(node) {
    var point = this.pointsOfGravity[node.id];
    point.velocity = point.velocity.add(point.force.multiply(timestep)).multiply(this.DAMPING);
    point.force = new Vector(0,0);
  });
};

Layout.ForceDirected.prototype.updatePosition = function(timestep)
{
  this.eachNode(function(node) {
    this.pointsOfGravity[node.id].p = this.pointsOfGravity[node.id].p.add(this.pointsOfGravity[node.id].velocity.multiply(timestep));
  });
};

Layout.ForceDirected.prototype.totalEnergy = function()
{
  var energy = 0.0;
  this.eachNode(function(node) {
    var speed = this.pointsOfGravity[node.id].velocity.magnitude();
    energy += speed * speed;
  });

  return energy;
};


var _bb=null;
Layout.ForceDirected.prototype.toScreen = function(pogPoint) {        //edu: from relative vector points (<-1.0; 1.0>)
  if (_bb == null)
    _bb = this.getBoundingBox();

  var sizeVec = _bb.bottomright.subtract(_bb.topleft);
  var sx = pogPoint.subtract(_bb.topleft).divide(sizeVec.x).x * /*canvas.width*/1000;
  var sy = pogPoint.subtract(_bb.topleft).divide(sizeVec.y).y * /*canvas.height*/1000;

  return new Vector(sx, sy);
};

// start simulation
//edu: active=true means continuous rendering during laying out
Layout.ForceDirected.prototype.start = function(interval, render, active, done)
{
  var t = this;

  //edu
  var lastEnergy = -1.0;
  var maxIterations = 320;     //edu: could be function of node count?
  var iteration = 0;

  if (this.intervalId !== null)
    return; // already running

  this.intervalId = setInterval(function() {

    if(!debugLayoutDone)     //edu
    {
      t.applyCoulombsLaw();
      t.applyHookesLaw();
      t.attractToCentre();
      t.updateVelocity(0.04);
      t.updatePosition(0.04);
    }

    if (typeof(render) !== 'undefined' && active)
      render();

    iteration++;
    var total = t.totalEnergy();
    message("DEBUG: iter=" + iteration + "; energy=" + total);

    //edu
//    message("Total energy = " + total);


    // stop simulation when energy of the system goes below a threshold
    if (total < /*0.1)*/1.0       //edu: bigger graphs should have finer thresholds
//        || Math.abs(lastEnergy - total) < 1.0    //edu: otherwise risking deadlock
        || iteration >= maxIterations)           //edu: else it could take too long
    {
      clearInterval(t.intervalId);
      t.intervalId = null;
      if (typeof(done) !== 'undefined') {
//        message("Total energy = " + total);
        
        
        
        //DEBUG SO FAR (aprox copy-pasta from WRLayout)...Assign computed Vector points to actual points of gravity. TODO: could be done in a function
        var nodeCount = t.graph.nodes.length;
        for (var i=0; i < nodeCount; i++) {
          var node = t.graph.nodes[i];
          var s = t.toScreen(t.pointsOfGravity[node.id].p);

          node.setPosition(new UIPoint(s.x, s.y));
        }
        
        
        done();
      }
      
      
        //edu: final render when layout is done
        render();
    }
    else lastEnergy = total;
  }, interval);
};


// returns [bottomleft, topright]
Layout.ForceDirected.prototype.getBoundingBox = function()      //TODO: this should be method of Graph (maybe graphics helper)
{
  var topleft = new Vector(-0.1, -0.1);
  var bottomright = new Vector(0.1, 0.1);

  this.eachNode(function(node) {
    var point = this.pointsOfGravity[node.id];
    if (point.p.x < topleft.x) {
      topleft.x = point.p.x;
    }
    if (point.p.y < topleft.y) {
      topleft.y = point.p.y;
    }
    if (point.p.x > bottomright.x) {
      bottomright.x = point.p.x;
    }
    if (point.p.y > bottomright.y) {
      bottomright.y = point.p.y;
    }
  });

//  var padding = bottomright.subtract(topleft).multiply(0.05); // 5% padding
var padding = new Vector(0, 0);

  return {topleft: topleft.subtract(padding), bottomright: bottomright.add(padding)};
};


Layout.ForceDirected.prototype.getTopLeftCorner = function()      //TODO: this should be method of Graph (maybe graphics helper)
{
  var topLeft = new Vector(0, 0);

  this.eachNode(function(node) {
    var pog = this.pointsOfGravity[node.id];
    if (pog.p.x < topLeft.x)
      topLeft.x = pog.p.x;
    if (pog.p.y < topLeft.y)
      topLeft.y = pog.p.y;
  });
  
  return topLeft/*.multiply(1.05)*/;      //5% padding. Besides it allows to drag far away from the flock
                                          //UPDATE: No paddings here! Diagram (or layout?) must ensureVisibility(node) after
                                          //node has been moved on the rim or selection changed to a node on the rim
};


// Point (edu: actually a NodeData extension!!!)
Layout.ForceDirected.Point = function(position, mass)
{
  this.p = position;      //Position vector
  this.mass = mass;       //TODO: this is constant => should be private var
  this.velocity = new Vector(0, 0);
  this.force = new Vector(0, 0);
};

Layout.ForceDirected.Point.prototype.applyForce = function(force)
{
  this.force = this.force.add(force.divide(this.mass));
};



// Spring, only for FDLayout's purposes
Layout.ForceDirected.Spring = function(sourceNode, targetNode, length, stiffness)
{
  this.point1 = sourceNode;
  this.point2 = targetNode;
  this.length = length; // spring length at rest
  this.stiffness = stiffness; // spring constant (See Hooke's law) .. how stiff the spring is
};
