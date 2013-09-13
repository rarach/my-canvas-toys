/* Graph retrievs and holds nodes/edges data. */
var Graph = function()              //TODO: entityId, get the graph data
{
  this.nodeSet = {};      //edu: really good if nodes are accessed by ID. But so far there's no such use
  this.nodes = [];
  this.edges = [];
  this.adjacency = {};

  //key = node ID, value = array of in-/out-coming adjacent nodes
  this.incomingNodes = new Array();
  this.outcomingNodes = new Array();

  this.nextNodeId = 0;
  this.nextEdgeId = 1000;
  this.eventListeners = [];
};

Graph.prototype.addNode = function(node)        //TODO: private
{
  this.nodes.push(node);
  this.nodeSet[node.id] = node;

  return node;
};

Graph.prototype.addEdge = function(edge)        //TODO: private
{
  this.edges.push(edge);

  if (typeof(this.adjacency[edge.source.id]) === 'undefined')
    this.adjacency[edge.source.id] = [];      //TODO: use new Array() so your code seems at least a bit consistent ;)

  if (typeof(this.adjacency[edge.source.id][edge.target.id]) === 'undefined')
    this.adjacency[edge.source.id][edge.target.id] = [];

  this.adjacency[edge.source.id][edge.target.id].push(edge);

  this.incomingNodes[edge.target.id].push(edge.source);
  this.outcomingNodes[edge.source.id].push(edge.target);

  return edge;
};

Graph.prototype.newNode = function(data)
{
  var node = new Node(this.nextNodeId++, data);
  this.addNode(node);

  this.incomingNodes[node.id] = new Array();
  this.outcomingNodes[node.id] = new Array();

  return node;
};

Graph.prototype.newEdge = function(source, target, data)
{
  var edge = new Edge(this.nextEdgeId++, source, target, data);
  this.addEdge(edge);
  return edge;
};

// find the edges from node1 to node2
Graph.prototype.getEdges = function(sourceNode, targetNode)
{
  if (typeof(this.adjacency[sourceNode.id]) !== 'undefined' && typeof(this.adjacency[sourceNode.id][targetNode.id]) !== 'undefined')
    return this.adjacency[sourceNode.id][targetNode.id];

  return [];
};
