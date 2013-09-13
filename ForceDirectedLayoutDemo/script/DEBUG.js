var fdLayoutCreateLinearGraph = function(graph, nodeCount)
{
    var noData = new Array();   //Like asociative array

  for(var n=0; n<nodeCount; n++)
    noData[n.toString()] = new NodeData(n, 'node_'+n);

  message("DEBUG: nodeCount=" + nodeCount);

  var visualNodes = [];
  for (var key in noData) {
    visualNodes.push(graph.newNode(noData[key]));
  }

  for (var i=1; i<nodeCount; i++){
    var n1 = visualNodes[i-1];
    var n2 = visualNodes[i];
    
    graph.newEdge(n1, n2);
  }

  return noData;
}


//Build a random mesh graph with given number of nodes
var fdLayoutCreateMashGraph = function(graph, nodeCount)
{
  var noData = new Array();   //Like asociative array

  for(var n=0; n<nodeCount; n++)
    noData[n.toString()] = new NodeData(n, 'node_'+n);

  message("DEBUG: nodeCount=" + nodeCount);

  var visualNodes = [];
  for (var key in noData) {
    visualNodes.push(graph.newNode(noData[key]));
  }

  var colors = ['#00A0B0', '#6A4A3C', '#CC333F', '#EB6841', '#EDC951', '#7DBE3C', '#222222', "pink", "#0000BB", "magenta"];
  var cols = colors.length;
  var edgeCount = /*1.5*/1.0 * nodeCount;

  for (var i=0; i<edgeCount; i++) {
    var i1 = Math.floor(Math.random() * nodeCount);
    var i2 = i1;

    while (i1 === i2)
      i2 = Math.floor(Math.random() * nodeCount);

    var n1 = visualNodes[i1];
    var n2 = visualNodes[i2];

    var e = graph.newEdge(n1, n2);
    e.data.stroke = colors[Math.floor(Math.random() * cols)];
  }

  return noData;
}


//Build a "sunny" graph with given number of nodes
//Former BUG case: nodeCount=16, 6
var fdLayoutCreateSunnyGraph = function(graph, nodeCount)
{
  var noData = new Array();   //Like asociative array

  for(var n=0; n<nodeCount; n++)
    noData[n.toString()] = new NodeData(n, 'node_'+n);

  message("DEBUG: level1count=" + (nodeCount-1));

  var visualNodes = [];
  for (var key in noData) {
    visualNodes.push(graph.newNode(noData[key]));
  }

  for(var x=1; x<nodeCount; x++) {
    var root = visualNodes[0];
    var n2 = visualNodes[x];
    var from = Math.random() > 0.5;

    var hist = x%2 == 0;
    var edge = from ? graph.newEdge(root, n2, {stroke: "#A35712", isHistorical: hist})
                    : graph.newEdge(n2, root, {stroke: "#A3571D", isHistorical: hist});
  }

  return noData;
};


//Tree graph with equal sub-tree distribution
//Buggy case: 60, 4
var fdLayoutCreateLayeredStarGraph = function(graph, nodeCount, nodesInLevel)
{
  var noData = new Array();   //Like asociative array

  for(var n=0; n<nodeCount; n++)
    noData[n.toString()] = new NodeData(n, 'node_'+n);

  message("DEBUG: nodesCount=" + nodeCount);

  var visualNodes = [];
  for (var key in noData) {
    visualNodes.push(graph.newNode(noData[key]));
  }

  var edges = new Array();

  for(var x=1; x<nodeCount; x++) {
    var n1 = visualNodes[Math.floor((x-1) / nodesInLevel)];
    var n2 = visualNodes[x];
    var from = Math.random() > 0.5;

    var hist = x%2 == 0;
    var edge = from ? graph.newEdge(n1, n2, {stroke: "#A35712", isHistorical: hist})
                    : graph.newEdge(n2, n1, {stroke: "#A3571D", isHistorical: hist});
    edges.push(edge);
  }


  //DEBUG: set neighbour count for each node
  var eCount = edges.length;
  for (var e=0; e<eCount; e++) {
    edges[e].source.data.neighbors += 3;
    edges[e].target.data.neighbors += 3;
  }

  //DEBUG setup an edge constant to divide its stifness with. Want to have tough springs connected to lonely nodes
  for (var e=0; e<eCount; e++) {
    var nodWeiDiff = Math.abs(edges[e].source.data.neighbors + edges[e].target.data.neighbors);
    edges[e].data.debug = 1 / 0.5 * (1 + nodWeiDiff);
//debug    edges[e].data.debug = 1.0;
  }

  return noData;
};



var wrLayoutCreateSimpleWeightedGraph = function(graph)
{
  var root = graph.newNode(new NodeData(0, "0_root"));
  var lvl1_1 = graph.newNode(new NodeData(1, "1_george"));
  var lvl1_2 = graph.newNode(new NodeData(2, "1_alicia"));
  var lvl2_1 = graph.newNode(new NodeData(3, "2_bruno"));
  var lvl2_2 = graph.newNode(new NodeData(4, "2_judith"));

  var lvl2_3 = graph.newNode(new NodeData(5, "2_margareth"));
  var lvl2_4 = graph.newNode(new NodeData(6, "2_josh"));
  var lvl2_5 = graph.newNode(new NodeData(7, "2_marty"));
  var lvl2_6 = graph.newNode(new NodeData(8, "2_eve"));
  var lvl2_7 = graph.newNode(new NodeData(9, "2_nicolas"));

  var osider = graph.newNode(new NodeData(10, "out sider"));

  graph.newEdge(root, lvl1_1, {stroke: "pink", debug: 2});
  graph.newEdge(lvl1_2, root, {stroke: "magenta", debug: 3});
  graph.newEdge(lvl1_1, lvl2_1, {stroke: "yellow", debug: 2});
  graph.newEdge(lvl2_2, lvl1_2, {stroke: "green", debug: 1.3});

  graph.newEdge(lvl1_2, lvl2_3, {stroke: "green", debug: 1.3});
  graph.newEdge(lvl1_2, lvl2_4, {stroke: "green", debug: 1.3});
  graph.newEdge(lvl1_2, lvl2_5, {stroke: "green", debug: 1.3});
  graph.newEdge(lvl1_2, lvl2_6, {stroke: "green", debug: 1.3});
  graph.newEdge(lvl1_2, lvl2_7, {stroke: "green", debug: 1.3});

  graph.newEdge(osider, root, {stroke: "blue", debug: 4});
  graph.newEdge(lvl1_1, osider, {stroke: "#404040", debug: 0.9});

  var gs = new Layout.GraphStructure(graph, root);
/*
  root.data.neighbors = gs.getNodeWeight(root);
  lvl1_1.data.neighbors = gs.getNodeWeight(lvl1_1);
  lvl1_2.data.neighbors = gs.getNodeWeight(lvl1_2);
  lvl2_1.data.neighbors = gs.getNodeWeight(lvl2_1);
  lvl2_2.data.neighbors = gs.getNodeWeight(lvl2_2);
*/
  root.data.neighbors = gs.isLeaf(root);        //FUJ! Numeric data expected by layout algorithms!!!
  lvl1_1.data.neighbors = gs.isLeaf(lvl1_1);
  lvl1_2.data.neighbors = gs.isLeaf(lvl1_2);
  lvl2_1.data.neighbors = gs.isLeaf(lvl2_1);
  lvl2_2.data.neighbors = gs.isLeaf(lvl2_2);
  osider.data.neighbors = gs.isLeaf(osider);
};



var wrLayoutSunnyGraph = function(graph)
{
  var root = graph.newNode(new NodeData(0, "0_root"));
  var lvl1_1 = graph.newNode(new NodeData(1, "1_george"));
  var lvl1_2 = graph.newNode(new NodeData(2, "1_alicia"));
  var lvl1_3 = graph.newNode(new NodeData(3, "2_margareth"));
  var lvl1_4 = graph.newNode(new NodeData(4, "2_josh"));
  var lvl1_5 = graph.newNode(new NodeData(5, "2_marty"));
  var lvl1_6 = graph.newNode(new NodeData(6, "2_eve"));
  var lvl1_7 = graph.newNode(new NodeData(7, "2_nicolas"));
  var lvl1_8 = graph.newNode(new NodeData(8, "8_petra"));
  var lvl1_9 = graph.newNode(new NodeData(9, "9_walker"));
  var lvl1_10 = graph.newNode(new NodeData(10, "10_nicolas"));
  var lvl1_11 = graph.newNode(new NodeData(11, "11_nicolas"));
  var lvl1_12 = graph.newNode(new NodeData(12, "12_nicolas"));
  var lvl1_13 = graph.newNode(new NodeData(13, "13_nicolas"));
  var lvl1_14 = graph.newNode(new NodeData(14, "14_nicolas"));
  var lvl1_15 = graph.newNode(new NodeData(15, "15_nicolas"));
  var lvl1_16 = graph.newNode(new NodeData(16, "16_charles"));
  var lvl1_17 = graph.newNode(new NodeData(17, "17_chris"));
  var lvl1_18 = graph.newNode(new NodeData(18, "18_trevor"));

  graph.newEdge(root, lvl1_1, {stroke: "pink", debug: 2});
  graph.newEdge(root, lvl1_2, {stroke: "pink", debug: 2});
  graph.newEdge(root, lvl1_3, {stroke: "pink", debug: 2});
  graph.newEdge(root, lvl1_4, {stroke: "pink", debug: 2});
  graph.newEdge(root, lvl1_5, {stroke: "pink", debug: 2});
  graph.newEdge(root, lvl1_6, {stroke: "pink", debug: 2});
  graph.newEdge(root, lvl1_7, {stroke: "pink", debug: 2});
  graph.newEdge(root, lvl1_8, {stroke: "pink", debug: 2});
  graph.newEdge(root, lvl1_9, {stroke: "pink", debug: 2});
  graph.newEdge(root, lvl1_10, {stroke: "pink", debug: 2});
  graph.newEdge(root, lvl1_11, {stroke: "pink", debug: 2});
  graph.newEdge(root, lvl1_12, {stroke: "pink", debug: 2});
  graph.newEdge(root, lvl1_13, {stroke: "pink", debug: 2});
  graph.newEdge(root, lvl1_14, {stroke: "pink", debug: 2});
  graph.newEdge(root, lvl1_15, {stroke: "pink", debug: 2});
  graph.newEdge(root, lvl1_16, {stroke: "pink", debug: 2});
  graph.newEdge(root, lvl1_17, {stroke: "pink", debug: 2});
  graph.newEdge(root, lvl1_18, {stroke: "pink", debug: 2});
};



var wrLayoutFlockGraph = function(graph)
{
  var root = graph.newNode(new NodeData(0, "0_root"));
  var lvl1_1 = graph.newNode(new NodeData(1, "1_george"));
  var lvl1_2 = graph.newNode(new NodeData(2, "1_alicia"));
  var lvl1_3 = graph.newNode(new NodeData(3, "2_margareth"));
  var lvl1_4 = graph.newNode(new NodeData(4, "2_josh"));
  var lvl1_5 = graph.newNode(new NodeData(5, "2_marty"));
  var lvl1_6 = graph.newNode(new NodeData(6, "2_eve"));
  var lvl1_7 = graph.newNode(new NodeData(7, "2_nicolas"));
  var lvl1_8 = graph.newNode(new NodeData(8, "8_petra"));
  var lvl1_9 = graph.newNode(new NodeData(9, "9_walker"));
  var lvl1_10 = graph.newNode(new NodeData(10, "10_nicolas"));
  var lvl1_11 = graph.newNode(new NodeData(11, "11_nicolas"));
  var lvl1_12 = graph.newNode(new NodeData(12, "12_nicolas"));
  var lvl1_13 = graph.newNode(new NodeData(13, "13_nicolas"));
  var lvl1_14 = graph.newNode(new NodeData(14, "14_nicolas"));
  var lvl1_15 = graph.newNode(new NodeData(15, "15_nicolas"));
  var lvl1_16 = graph.newNode(new NodeData(16, "16_charles"));
  var lvl1_17 = graph.newNode(new NodeData(17, "17_chris"));
  var lvl1_18 = graph.newNode(new NodeData(18, "18_trevor"));

  var lvl2_1 = graph.newNode(new NodeData(21, "21_###"));
  var lvl2_2 = graph.newNode(new NodeData(22, "22_###"));
  var lvl2_3 = graph.newNode(new NodeData(23, "23_###"));
  var lvl2_4 = graph.newNode(new NodeData(24, "24_###"));
  var lvl2_5 = graph.newNode(new NodeData(25, "25_###"));
  var lvl2_6 = graph.newNode(new NodeData(26, "26_###"));
  var lvl2_7 = graph.newNode(new NodeData(27, "27_###"));
  var lvl2_8 = graph.newNode(new NodeData(28, "28_###"));
  var lvl2_9 = graph.newNode(new NodeData(29, "29_###"));

  var lvl2_10 = graph.newNode(new NodeData(210, "210_###"));
  var lvl2_11 = graph.newNode(new NodeData(211, "211_###"));
  var lvl2_12 = graph.newNode(new NodeData(212, "212_###"));
  var lvl2_13 = graph.newNode(new NodeData(213, "213_###"));
  var lvl2_14 = graph.newNode(new NodeData(214, "214_###"));
  var lvl2_15 = graph.newNode(new NodeData(215, "215_###"));
  var lvl2_16 = graph.newNode(new NodeData(216, "216_###"));
  var lvl2_17 = graph.newNode(new NodeData(217, "217_###"));
  var lvl2_18 = graph.newNode(new NodeData(218, "218_###"));
  var lvl2_19 = graph.newNode(new NodeData(219, "219_###"));
  var lvl2_20 = graph.newNode(new NodeData(220, "220_###"));

  graph.newEdge(root, lvl1_1, {stroke: "pink", debug: 2});
  graph.newEdge(root, lvl1_2, {stroke: "pink", debug: 2});
  graph.newEdge(root, lvl1_3, {stroke: "pink", debug: 2});
  graph.newEdge(root, lvl1_4, {stroke: "pink", debug: 2});
  graph.newEdge(root, lvl1_5, {stroke: "pink", debug: 2});
  graph.newEdge(root, lvl1_6, {stroke: "pink", debug: 2});
  graph.newEdge(root, lvl1_7, {stroke: "pink", debug: 2});
  graph.newEdge(root, lvl1_8, {stroke: "pink", debug: 2});
  graph.newEdge(root, lvl1_9, {stroke: "pink", debug: 2});
  graph.newEdge(root, lvl1_10, {stroke: "pink", debug: 2});
  graph.newEdge(root, lvl1_11, {stroke: "pink", debug: 2});
  graph.newEdge(root, lvl1_12, {stroke: "pink", debug: 2});
  graph.newEdge(root, lvl1_13, {stroke: "pink", debug: 2});
  graph.newEdge(root, lvl1_14, {stroke: "pink", debug: 2});
  graph.newEdge(root, lvl1_15, {stroke: "pink", debug: 2});
  graph.newEdge(root, lvl1_16, {stroke: "pink", debug: 2});
  graph.newEdge(root, lvl1_17, {stroke: "pink", debug: 2});
  graph.newEdge(root, lvl1_18, {stroke: "pink", debug: 2});

  graph.newEdge(lvl1_6, lvl2_1, {stroke: "green", debug: 2});
  graph.newEdge(lvl1_6, lvl2_2, {stroke: "green", debug: 2});
  graph.newEdge(lvl1_6, lvl2_3, {stroke: "green", debug: 2});
  graph.newEdge(lvl1_6, lvl2_4, {stroke: "green", debug: 2});
  graph.newEdge(lvl1_6, lvl2_5, {stroke: "green", debug: 2});
  graph.newEdge(lvl1_6, lvl2_6, {stroke: "green", debug: 2});
  graph.newEdge(lvl1_6, lvl2_7, {stroke: "green", debug: 2});
  graph.newEdge(lvl1_6, lvl2_8, {stroke: "green", debug: 2});
  graph.newEdge(lvl1_6, lvl2_9, {stroke: "green", debug: 2});

  graph.newEdge(lvl1_14, lvl2_10, {stroke: "blue", debug: 2});
  graph.newEdge(lvl1_14, lvl2_11, {stroke: "blue", debug: 2});
  graph.newEdge(lvl1_14, lvl2_12, {stroke: "blue", debug: 2});
  graph.newEdge(lvl1_14, lvl2_13, {stroke: "blue", debug: 2});
  graph.newEdge(lvl1_14, lvl2_14, {stroke: "blue", debug: 2});
  graph.newEdge(lvl1_14, lvl2_15, {stroke: "blue", debug: 2});
  graph.newEdge(lvl1_14, lvl2_16, {stroke: "blue", debug: 2});
  graph.newEdge(lvl1_14, lvl2_17, {stroke: "blue", debug: 2});
  graph.newEdge(lvl1_14, lvl2_18, {stroke: "blue", debug: 2});
  graph.newEdge(lvl1_14, lvl2_19, {stroke: "blue", debug: 2});
  graph.newEdge(lvl1_14, lvl2_20, {stroke: "blue", debug: 2});
};



var wrLayoutSuperConnectedGraph = function(graph)
{
  var root = graph.newNode(new NodeData(0, "0_root"));

  var a1 = graph.newNode(new NodeData(1, 'a1'));
  var a2 = graph.newNode(new NodeData(2, 'a2'));
  var a3 = graph.newNode(new NodeData(3, 'a3'));
  var a4 = graph.newNode(new NodeData(4, 'a4'));
  var b1 = graph.newNode(new NodeData(5, 'b1'));
  var b2 = graph.newNode(new NodeData(6, 'b2'));
  var c1 = graph.newNode(new NodeData(7, 'c1'));
  var d1 = graph.newNode(new NodeData(8, 'd1'));

  graph.newEdge(root, a1, {stroke: "magenta", debug: 0.8});
  graph.newEdge(a2, root, {stroke: "magenta", debug: 0.8});
  graph.newEdge(root, a3, {stroke: "magenta", debug: 0.8});
  graph.newEdge(a4, root, {stroke: "magenta", debug: 0.8});

  graph.newEdge(a3, a2, {stroke: "blue", debug: 0.8});
  graph.newEdge(a4, a3, {stroke: "blue", debug: 0.8});

  graph.newEdge(a4, b1, {stroke: "orange", debug: 0.8});
  graph.newEdge(a4, b2, {stroke: "orange", debug: 0.8});
  graph.newEdge(b2, b1, {stroke: "orange", debug: 0.8});  
  graph.newEdge(a4, b1, {stroke: "orange", debug: 0.8});
  graph.newEdge(b2, a2, {stroke: "orange", debug: 0.8});

  graph.newEdge(a1, c1, {stroke: "gray", debug: 0.8});
  graph.newEdge(d1, c1, {stroke: "gray", debug: 0.8});
  graph.newEdge(d1, a2, {stroke: "gray", debug: 0.8});
};



var wrLayoutDiamond = function(graph)
{
  var root = graph.newNode(new NodeData(0, "Root"));
  var l11 = graph.newNode(new NodeData(11, "L11_"));
  var l12 = graph.newNode(new NodeData(12, "L12_"));
  var l13 = graph.newNode(new NodeData(13, "L13_"));
  var l14 = graph.newNode(new NodeData(14, "L14_"));
  var l15 = graph.newNode(new NodeData(15, "L15_"));
  var dest = graph.newNode(new NodeData(20, "DESTIN"));

  graph.newEdge(root, l11, {stroke: "brown", debug: 1.3});
  graph.newEdge(l12, root, {stroke: "red", debug: 1.3});
  graph.newEdge(root, l13, {stroke: "brown", debug: 1.3});
  graph.newEdge(l14, root, {stroke: "red", debug: 1.3});
  graph.newEdge(root, l15, {stroke: "brown", debug: 1.3});

  graph.newEdge(dest, l11, {stroke: "green", debug: 1.3});
  graph.newEdge(dest, l12, {stroke: "green", debug: 1.3});
  graph.newEdge(dest, l13, {stroke: "green", debug: 1.3});
  graph.newEdge(l14, dest, {stroke: "green", debug: 1.3});
  graph.newEdge(dest, l15, {stroke: "green", debug: 1.3});
};




var wrLayoutCompanyTree = function(graph)
{
  var root = graph.newNode(new NodeData(0, "Microsoft"));
  var l11 = graph.newNode(new NodeData(111, "L101_")); var l12 = graph.newNode(new NodeData(112, "L112_"));
  var l13 = graph.newNode(new NodeData(113, "L103_")); var l14 = graph.newNode(new NodeData(114, "L114_"));
  var l15 = graph.newNode(new NodeData(115, "L115_")); var l16 = graph.newNode(new NodeData(116, "L116_"));
  var l17 = graph.newNode(new NodeData(117, "L117_")); var l18 = graph.newNode(new NodeData(118, "L118_"));
  var l19 = graph.newNode(new NodeData(119, "L119_")); var l20 = graph.newNode(new NodeData(120, "L120_"));
  var l21 = graph.newNode(new NodeData(121, "L121_")); var l22 = graph.newNode(new NodeData(122, "L122_"));
  var l23 = graph.newNode(new NodeData(123, "L123_")); var l24 = graph.newNode(new NodeData(124, "L124_"));
  var l25 = graph.newNode(new NodeData(125, "L125_")); var l26 = graph.newNode(new NodeData(126, "L126_"));
  var l27 = graph.newNode(new NodeData(127, "L127_")); var l28 = graph.newNode(new NodeData(128, "L128_"));
  var l29 = graph.newNode(new NodeData(129, "L129_")); var l30 = graph.newNode(new NodeData(130, "L130_"));

  var s01 = graph.newNode(new NodeData(201, "sec:201_")); var s02 = graph.newNode(new NodeData(202, "sec:202_"));
  var s03 = graph.newNode(new NodeData(203, "sec:203_")); var s04 = graph.newNode(new NodeData(204, "sec:204_"));
  var s05 = graph.newNode(new NodeData(205, "sec:205_")); var s06 = graph.newNode(new NodeData(206, "sec:206_"));
  var s07 = graph.newNode(new NodeData(207, "sec:207_")); var s08 = graph.newNode(new NodeData(208, "sec:208_"));
  var s09 = graph.newNode(new NodeData(209, "sec:209_")); var s10 = graph.newNode(new NodeData(210, "sec:210_"));
  var s11 = graph.newNode(new NodeData(211, "sec:211_")); var s12 = graph.newNode(new NodeData(212, "sec:212_"));
  var s13 = graph.newNode(new NodeData(213, "sec:213_")); var s14 = graph.newNode(new NodeData(214, "sec:214_"));
  var s15 = graph.newNode(new NodeData(215, "sec:215_")); var s16 = graph.newNode(new NodeData(216, "sec:216_"));
  var s17 = graph.newNode(new NodeData(217, "sec:217_")); var s18 = graph.newNode(new NodeData(218, "sec:218_"));
  var s19 = graph.newNode(new NodeData(219, "sec:219_")); var s20 = graph.newNode(new NodeData(220, "sec:220_"));
  var s21 = graph.newNode(new NodeData(221, "sec:221_")); var s22 = graph.newNode(new NodeData(222, "sec:222_"));
  var s23 = graph.newNode(new NodeData(223, "sec:223_")); var s24 = graph.newNode(new NodeData(224, "sec:224_"));
  var s25 = graph.newNode(new NodeData(225, "sec:225_")); var s26 = graph.newNode(new NodeData(226, "sec:226_"));
  var s27 = graph.newNode(new NodeData(227, "sec:227_")); var s28 = graph.newNode(new NodeData(228, "sec:228_"));
  var s29 = graph.newNode(new NodeData(229, "sec:229_")); var s30 = graph.newNode(new NodeData(230, "sec:230_"));
  var s31 = graph.newNode(new NodeData(231, "sec:231_")); var s32 = graph.newNode(new NodeData(232, "sec:232_"));
  var s33 = graph.newNode(new NodeData(233, "sec:233_")); var s34 = graph.newNode(new NodeData(234, "sec:234_"));
  var s35 = graph.newNode(new NodeData(235, "sec:235_")); var s36 = graph.newNode(new NodeData(236, "sec:236_"));
  var s37 = graph.newNode(new NodeData(237, "sec:237_")); var s38 = graph.newNode(new NodeData(238, "sec:238_"));
  var s39 = graph.newNode(new NodeData(239, "sec:239_")); var s40 = graph.newNode(new NodeData(240, "sec:240_"));
  var s41 = graph.newNode(new NodeData(241, "sec:241_")); var s42 = graph.newNode(new NodeData(242, "sec:242_"));
  var s43 = graph.newNode(new NodeData(243, "sec:243_"));

  graph.newEdge(l11, root, {stroke: "lightblue", debug: 1.6}); graph.newEdge(l12, root, {stroke: "lightblue", debug: 1.6});
  graph.newEdge(root, l12, {stroke: "lightblue", debug: 1.6}); graph.newEdge(l12, root, {stroke: "lightblue", debug: 1.6});
  graph.newEdge(root, l12, {stroke: "lightblue", debug: 1.6}); graph.newEdge(root, l13, {stroke: "lightblue", debug: 1.6});
  graph.newEdge(root, l14, {stroke: "lightblue", debug: 1.6}); graph.newEdge(l15, root, {stroke: "lightblue", debug: 1.6});
  graph.newEdge(l15, root, {stroke: "lightblue", debug: 1.6}); graph.newEdge(root, l16, {stroke: "lightblue", debug: 1.6});
  graph.newEdge(l17, root, {stroke: "lightblue", debug: 1.6}); graph.newEdge(l18, root, {stroke: "lightblue", debug: 1.6});
  graph.newEdge(l19, root, {stroke: "lightblue", debug: 1.6}); graph.newEdge(l20, root, {stroke: "lightblue", debug: 1.6});
  graph.newEdge(root, l21, {stroke: "lightblue", debug: 1.6}); graph.newEdge(root, l22, {stroke: "lightblue", debug: 1.6});
  graph.newEdge(l22, root, {stroke: "lightblue", debug: 1.6}); graph.newEdge(root, l22, {stroke: "lightblue", debug: 1.6});
  graph.newEdge(root, l23, {stroke: "lightblue", debug: 1.6}); graph.newEdge(root, l24, {stroke: "lightblue", debug: 1.6});
  graph.newEdge(root, l25, {stroke: "lightblue", debug: 1.6}); graph.newEdge(l26, root, {stroke: "lightblue", debug: 1.6});
  graph.newEdge(l27, root, {stroke: "lightblue", debug: 1.6}); graph.newEdge(root, l27, {stroke: "lightblue", debug: 1.6});
  graph.newEdge(root, l28, {stroke: "lightblue", debug: 1.6}); graph.newEdge(root, l29, {stroke: "lightblue", debug: 1.6});
  graph.newEdge(l30, root, {stroke: "lightblue", debug: 1.6});

  graph.newEdge(s01, l11, {stroke: "salmon", debug: 2.8}); graph.newEdge(s02, l11, {stroke: "salmon", debug: 2.8});
  graph.newEdge(s03, l11, {stroke: "salmon", debug: 2.8}); graph.newEdge(l11, s01, {stroke: "salmon", debug: 2.8});
  graph.newEdge(l12, s04, {stroke: "salmon", debug: 2.8}); graph.newEdge(s05, l12, {stroke: "salmon", debug: 2.8});
  graph.newEdge(s06, l13, {stroke: "salmon", debug: 2.8}); graph.newEdge(l14, s07, {stroke: "salmon", debug: 2.8});
  graph.newEdge(s08, l14, {stroke: "salmon", debug: 2.8}); graph.newEdge(s09, l14, {stroke: "salmon", debug: 2.8});
  graph.newEdge(l15, s10, {stroke: "salmon", debug: 2.8}); graph.newEdge(s11, l15, {stroke: "salmon", debug: 2.8});
  graph.newEdge(s12, l16, {stroke: "salmon", debug: 2.8}); graph.newEdge(l16, s13, {stroke: "salmon", debug: 2.8});
  graph.newEdge(l17, s14, {stroke: "salmon", debug: 2.8}); graph.newEdge(l17, s15, {stroke: "salmon", debug: 2.8});
  graph.newEdge(l18, s16, {stroke: "salmon", debug: 2.8}); graph.newEdge(s16, l19, {stroke: "salmon", debug: 2.8});
  graph.newEdge(s17, l19, {stroke: "salmon", debug: 2.8}); graph.newEdge(l20, s18, {stroke: "salmon", debug: 2.8});
  graph.newEdge(l20, s19, {stroke: "salmon", debug: 2.8}); graph.newEdge(s20, l20, {stroke: "salmon", debug: 2.8});
  graph.newEdge(l20, s20, {stroke: "salmon", debug: 2.8}); graph.newEdge(l20, s21, {stroke: "salmon", debug: 2.8});
  graph.newEdge(s22, l21, {stroke: "salmon", debug: 2.8}); graph.newEdge(l21, s23, {stroke: "salmon", debug: 2.8});
  graph.newEdge(l22, s24, {stroke: "salmon", debug: 2.8}); graph.newEdge(l22, s25, {stroke: "salmon", debug: 2.8});
  graph.newEdge(l22, s26, {stroke: "salmon", debug: 2.8}); graph.newEdge(s27, l23, {stroke: "salmon", debug: 2.8});
  graph.newEdge(l23, s28, {stroke: "salmon", debug: 2.8}); graph.newEdge(l23, s08, {stroke: "salmon", debug: 2.8});
  graph.newEdge(l23, s18, {stroke: "salmon", debug: 2.8}); graph.newEdge(s29, l24, {stroke: "salmon", debug: 2.8});
  graph.newEdge(s30, l24, {stroke: "salmon", debug: 2.8}); graph.newEdge(s31, l24, {stroke: "salmon", debug: 2.8});
  graph.newEdge(l25, s31, {stroke: "salmon", debug: 2.8}); graph.newEdge(s32, l25, {stroke: "salmon", debug: 2.8});
  graph.newEdge(s33, l26, {stroke: "salmon", debug: 2.8}); graph.newEdge(l26, s34, {stroke: "salmon", debug: 2.8});
  graph.newEdge(l26, s35, {stroke: "salmon", debug: 2.8}); graph.newEdge(s11, l27, {stroke: "salmon", debug: 2.8});
  graph.newEdge(l27, s36, {stroke: "salmon", debug: 2.8}); graph.newEdge(s37, l28, {stroke: "salmon", debug: 2.8});
  graph.newEdge(l28, s38, {stroke: "salmon", debug: 2.8}); graph.newEdge(s39, l28, {stroke: "salmon", debug: 2.8});
  graph.newEdge(s40, l28, {stroke: "salmon", debug: 2.8}); graph.newEdge(s10, l28, {stroke: "salmon", debug: 2.8});
  graph.newEdge(s10, l28, {stroke: "salmon", debug: 2.8}); graph.newEdge(l30, s41, {stroke: "salmon", debug: 2.8});
  graph.newEdge(l30, s42, {stroke: "salmon", debug: 2.8}); graph.newEdge(l30, s43, {stroke: "salmon", debug: 2.8});

  graph.newEdge(s07, s20, {stroke: "yellowgreen", debug: 1.1});
  graph.newEdge(s11, s07, {stroke: "yellowgreen", debug: 1.1});
  graph.newEdge(s37, s10, {stroke: "yellowgreen", debug: 1.1});
  graph.newEdge(s37, s12, {stroke: "yellowgreen", debug: 1.1});
};



var wrLayoutSunnyLike = function(graph)
{
  var root = graph.newNode(new NodeData(0, "Root"));
  var l11 = graph.newNode(new NodeData(11, "L11_"));
  var l12 = graph.newNode(new NodeData(12, "L12_"));
  var l13 = graph.newNode(new NodeData(13, "L13_"));
  var l14 = graph.newNode(new NodeData(14, "L14_"));
  var l15 = graph.newNode(new NodeData(15, "L15_"));
  var l16 = graph.newNode(new NodeData(16, "L16_"));
  var l17 = graph.newNode(new NodeData(17, "L17_"));
  var l18 = graph.newNode(new NodeData(18, "L18_"));
  var l19 = graph.newNode(new NodeData(19, "L19_"));
  var l20 = graph.newNode(new NodeData(20, "L20_"));
  var l21 = graph.newNode(new NodeData(21, "L21_"));
  var l22 = graph.newNode(new NodeData(22, "L22_"));

  var dest = graph.newNode(new NodeData(30, "DESTIN"));
  var dest2 = graph.newNode(new NodeData(31, "DESTIN2"));
  var dest3 = graph.newNode(new NodeData(32, "DESTIN3"));
  var dest4 = graph.newNode(new NodeData(33, "DESTIN4"));
  var dest5 = graph.newNode(new NodeData(34, "DESTIN5"));
  var dest6 = graph.newNode(new NodeData(35, "DESTIN6"));

  graph.newEdge(root, l11, {stroke: "brown", debug: 1.3});
  graph.newEdge(l12, root, {stroke: "red", debug: 1.3});
  graph.newEdge(root, l13, {stroke: "brown", debug: 1.3});
  graph.newEdge(l14, root, {stroke: "red", debug: 1.3});
  graph.newEdge(root, l15, {stroke: "brown", debug: 1.3});
  graph.newEdge(l16, root, {stroke: "red", debug: 1.3});
  graph.newEdge(root, l17, {stroke: "brown", debug: 1.3});
  graph.newEdge(l18, root, {stroke: "red", debug: 1.3});
  graph.newEdge(root, l19, {stroke: "brown", debug: 1.3});
  graph.newEdge(l20, root, {stroke: "red", debug: 1.3});
  graph.newEdge(root, l21, {stroke: "brown", debug: 1.3});
  graph.newEdge(l22, root, {stroke: "red", debug: 1.3});

  graph.newEdge(dest, l14, {stroke: "darkgray", debug: 1.3});
  graph.newEdge(dest2, l14, {stroke: "darkgray", debug: 1.3});
  graph.newEdge(dest3, l14, {stroke: "darkgray", debug: 1.3});
  graph.newEdge(dest4, l19, {stroke: "teal", debug: 1.3});
  graph.newEdge(dest5, l19, {stroke: "teal", debug: 1.3});
  graph.newEdge(dest6, l19, {stroke: "teal", debug: 1.3});
};



var wrLayoutDEBUGBadPositioning = function(graph)
{
  var root = graph.newNode(new NodeData(0, "0_root"));

  var lvl1_1 = graph.newNode(new NodeData(1, "1_george"));
  var lvl1_2 = graph.newNode(new NodeData(2, "1_alicia"));
  var lvl1_3 = graph.newNode(new NodeData(3, "1_robert"));

  var lvl2_1 = graph.newNode(new NodeData(21, "2_george"));
  var lvl2_2 = graph.newNode(new NodeData(22, "2_alicia"));
  var lvl2_3 = graph.newNode(new NodeData(23, "2_robert"));

  graph.newEdge(root, lvl1_1, {stroke: "pink", debug: 2});
  graph.newEdge(root, lvl1_2, {stroke: "pink", debug: 2});
  graph.newEdge(lvl1_3, root, {stroke: "pink", debug: 2});
  graph.newEdge(lvl1_1, lvl2_1, {stroke: "teal", debug: 2});
  graph.newEdge(lvl2_2, lvl1_2, {stroke: "teal", debug: 2});
  graph.newEdge(lvl1_3, lvl2_3, {stroke: "teal", debug: 2});
};


var wrLayoutDisconnectedGraph = function(graph)
{
  var root = graph.newNode(new NodeData(0, "0_root"));

  var lvl1_1 = graph.newNode(new NodeData(1, "1_george"));
  var lvl1_2 = graph.newNode(new NodeData(2, "1_alicia"));
  var lvl1_3 = graph.newNode(new NodeData(3, "1_robert"));

  var lvl2_1 = graph.newNode(new NodeData(21, "2_george"));
  var lvl2_2 = graph.newNode(new NodeData(22, "2_alicia"));
  var lvl2_3 = graph.newNode(new NodeData(23, "2_robert"));

  var orphan1 = graph.newNode(new NodeData(31, "orpah1"));
  var orphan2 = graph.newNode(new NodeData(32, "orpah2"));
  var orphan3 = graph.newNode(new NodeData(33, "orpah3"));
  var orphan4 = graph.newNode(new NodeData(34, "orpah4"));
  var orphan5 = graph.newNode(new NodeData(35, "orpah5"));
  var orphan6 = graph.newNode(new NodeData(36, "orpah6"));
  var orphan7 = graph.newNode(new NodeData(37, "orpah7"));
  var orphan8 = graph.newNode(new NodeData(38, "orpah8"));
  var orphan9 = graph.newNode(new NodeData(39, "orpah9"));
  var orphan10 = graph.newNode(new NodeData(40, "orpah10"));
  var orphan11 = graph.newNode(new NodeData(41, "orpah11"));
  var orphan12 = graph.newNode(new NodeData(42, "orpah12"));

  graph.newEdge(root, lvl1_1, {stroke: "pink", debug: 2});
  graph.newEdge(root, lvl1_2, {stroke: "pink", debug: 2});
  graph.newEdge(lvl1_3, root, {stroke: "pink", debug: 2});
  graph.newEdge(lvl1_1, lvl2_1, {stroke: "teal", debug: 2});
  graph.newEdge(lvl2_2, lvl1_2, {stroke: "teal", debug: 2});
  graph.newEdge(lvl1_3, lvl2_3, {stroke: "teal", debug: 2});
};
