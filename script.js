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
	
	this.addNode = function(parentX, parentY, x, y, text) {
		this.graph.appendChild(createLink(parentX, parentY, x, y));
		this.graph.appendChild(createNode(x-30, y, text));
	}
	
	this.draw = function(json, startX, startY, x, y) {
		this.addNode(startX, startY, x, y, json.page);
		var newX = x; var newY = y + 100;
		if (json.children) {
			for (var i = 0; i < json.children.length; i++) {
				this.draw(json.children[i], x+10, y+30, newX, newY);
				newX += 170;
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
			{page: "subpage"}
		 ]},
		{page: "test3"},
		{page: "test5"},
		{page: "test33"},
		{page: "test22"}
		]},
	100, 100, 100, 100);
