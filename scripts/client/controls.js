var Player = function() {
	this.x = 400;
	this.y = 600;
	this.lives = 1;
	this.src = "";
  this.bcount = 0;
};

Player.prototype.render = function() {
  var _p = d3.select('svg').selectAll('svg.background').data([{cy: this.y, cx: this.x}]);
  _p.enter().append('circle')
  .attr({class: "player", fill: 'blue', cx: this.x, cy: this.y, r: 10})
};

Player.prototype.fire = function () {
  this.bcount++;
  new Pbullet(this.bcount);
};

Player.prototype.controls = function() { 
  var that = this; 
  d3.select('body').on('keydown', function() {
  	console.log(d3.event.keyCode)
  	var _p = d3.select('circle.player');
  	var x =  parseInt(_p.attr('cx'));
  	var y =  parseInt(_p.attr('cy'));

  	if(d3.event.keyCode === 68) { // right
  	  _p.attr({cx: x + 5});
    }
    if(d3.event.keyCode === 65) { // left
      _p.attr({cx: x - 5});
    }
    if(d3.event.keyCode === 87) { // up
      _p.attr({cy: y - 5});
      
    }
    if(d3.event.keyCode === 83) { // down
      _p.attr({cy: y + 5});
    }
    if(d3.event.keyCode === 81) { // left up
      _p.attr({cy: y - 5, cx: x-5});
    }
    if(d3.event.keyCode === 69) {
      _p.attr({cy: y + 5, cx: x+5}); // right up	
    }
    if(d3.event.keyCode === 90) {
      _p.attr({cy: y + 5, cx: x-5});  // down left	
    }
    if(d3.event.keyCode === 67) { // down right
      _p.attr({cy: y + 5, cx: x+5});	
    }
    if(d3.event.keyCode === 32) {
      that.fire();
    }
  });
};


var Pbullet = function(bcount) {
  this._p = d3.select('circle.player');
  this.bc = "a"+bcount.toString();
  this.x =  parseInt(this._p.attr('cx'));
  this.y =  parseInt(this._p.attr('cy'));
  this.field = d3.select('svg').selectAll('svg.background').data([{cy: this.y -4, cx: this.x}]);
  this.field.enter().append('circle').attr({class: 'pb', fill: 'black', cy: this.y -10, cx: this.x, r: 3, id: this.bc})
  this.move(); 
};

Pbullet.prototype.move = function() {
  var that = this;
  var _b = d3.select('[id='+that.bc+']');
  var y =  parseInt(_b.attr('cy')); 
  _b.attr({cy: y - 5});

  setTimeout(function() {that.move()}, 10)
}