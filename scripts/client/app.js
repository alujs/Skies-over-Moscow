
var board = function(width, height) {
  var board = d3.select(".background").selectAll("svg").data([1]);
  board.enter().append('svg')
  .attr({class: "board", width: width, height: height})
  .style({});
};


var Game = function(width, height, mode) {
	this.game = {};
	if(mode === "debug") {
		window.gameData = this.game; 
	}
	this.game['player'] = new Player();
	//this.game['stage'] = new Stage();

	board(width, height);
	this.game['player'].render();
	this.game['player'].controls();

	new Jaeger(200,200, "", 5)

};


var boardClear = function() {
	// if x value is out of bounds
	// if y value is out of bounds
	// select all pb 
	// select all eb
	// select all enemies
};