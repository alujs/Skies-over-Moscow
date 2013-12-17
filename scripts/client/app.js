
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
	this.game['stage'] = new Stage();

	board(width, height);
	this.game['player'].render();
	this.game['player'].controls();

	// new Jaeger(10,10, "", 5, 0)
	// new Jaeger(700,10, "", 7, 1)
	//  new Jaeger(600,10, "", 8, 1)
	//  new Jaeger(500,10, "", 9, 1)
	// new Jaeger(80,10, "", 3, 0)
	// new Jaeger(10,10, "", 7, 1)
	// this.collision();
	
};


// Game.prototype.boardClear = function(width, height) {

// };

// Game.prototype.collision = function() {
//   var e_b = d3.select('svg.board').selectAll('circle.eb');
//   var player_y = d3.select('svg.board').select('circle.player').attr("cy");
//   var player_x = d3.select('svg.board').select('circle.player').attr("cx");
  
//   e_b.each(function(d) {
//   	if(d.cy === 600 && d.cy === 400) {
  		
//   		console.log(true);
  		
//   	}
//   })
  
//   var that = this;
//   setTimeout(function() {that.collision();},-1);
  
// };