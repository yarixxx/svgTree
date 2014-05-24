var SVGNS = "http://www.w3.org/2000/svg";

function Graph() {
	this.graph = document.getElementById("graph");
	
	function createLink(x1, y1, x2, y2) {
		var newLink = document.createElementNS(SVGNS, 'line');
		newLink.setAttribute('class','connection');
		newLink.setAttribute('x1',x1);
		newLink.setAttribute('x2',x2);
		newLink.setAttribute('y1',y1);
		newLink.setAttribute('y2',y2);
		return newLink;		
	}
	
	function createNode(x, y, text) {
		var newNode = document.createElementNS(SVGNS, 'g');
		
		var rect = document.createElementNS(SVGNS, 'rect');
		rect.setAttribute('class','node');
		rect.setAttribute('width', '150');
		rect.setAttribute('height', '30');
		rect.setAttribute('rx', '10');
		rect.setAttribute('ry', '10');
		rect.setAttribute('y', y);
		rect.setAttribute('x', x);

		var textNode = document.createElementNS(SVGNS, 'text');
		textNode.setAttribute('y', y + 20);
		textNode.setAttribute('x', x + 10);
		textNode.appendChild(document.createTextNode(text));
		
		newNode.appendChild(rect);
		newNode.appendChild(textNode);
		return newNode;
	}

  this.levels = {};
	
	this.addNode = function(parentX, parentY, x, y, text) {
		this.graph.appendChild(createLink(parentX, parentY, x, y));
		this.graph.appendChild(createNode(x-30, y, text));
	}
	
	this.draw = function(json, startX, startY, level) {
    debugger;
    var currentLevel = this.levels["l" + level];
    var nodeX = 100;
    var nodeY = level * 100;
    if (currentLevel) {
      nodeX = currentLevel[currentLevel.length-1] + 170;
      this.levels["l" + level].push(nodeX);
    } else {
      this.levels["l" + level] = [];
      this.levels["l" + level].push(100);
    }

		this.addNode(startX, startY, nodeX, nodeY, json.page);
  	if (json.children) {
			for (var i = 0; i < json.children.length; i++) {
				this.draw(json.children[i], nodeX+10, nodeY+30, level + 1);
			}
		}
	}
}

var graph = new Graph();
graph.draw({
	page: "http://test.com/",
	children: [
		{page: "test1",
		 children: [
			{page: "subpage"},
      {page: "subpage2"}
		 ]},
		{page: "test3"},
		{page: "test5",
     children: [{page: "subpage"},{page: "subpage2"}]},
		{page: "test33",
		 children: [
			{page: "subpage"},
      {page: "subpage2"},
      {page: "subpage3"}
		 ]},
		{page: "test22"}
		]},
	100, 100, 1);
