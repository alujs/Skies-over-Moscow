var Enemy = function(x, y, src) {
	this.x = x;
	this.y = y;
	this.src = "";
	this.hp = 500;
};

var Panzer = function() {

};

var Fred = function() {

};

var Flanker = function() {

};

var Crosspattern = function() {

};

var BlinkyShooter = function() {

};

var Jaeger = function(x, y, src, id, val) {
	Enemy.call(this, x,y);
	this.side = val;  // 1 = left to right  0= right to left
	this.src = src;
	this.tid = "e"+id.toString();
	this.shots = 0;
	this.type = {
	  speed: 5,
	  radius: 5,
	  interval: 300, 	  
	};
	this.render();
  this.destruction();
}
Jaeger.prototype = Object.create(Enemy.prototype);
Jaeger.prototype.constructor = Jaeger;

Jaeger.prototype.move = function() {
  var jg = d3.select('[id='+this.tid+']')
  
  var x =  parseInt(jg.attr('cx'));
  var y =  parseInt(jg.attr('cy'));
  if(this.side === 0) {
    jg.attr({cy: y + 2 , cx: x + 2 });
  } else {
  	jg.attr({cy: y + 2 , cx: x - 2 });
  }
  var that = this;
  setTimeout(function(){ that.move(); }, 10);
};

Jaeger.prototype.destruction = function(trig) {
  var that = this;
  var sel = d3.select('[id='+this.tid+']');
  if(parseInt(sel.attr('cy')) > 900){
     console.log("Destroying self");
     sel.remove();
     delete this;
  }

  if(trig !== undefined) {
    sel.remove();
    delete this;
  }
  setTimeout(function(){that.destruction();},1)
};

Jaeger.prototype.shoot = function(interval) {
  var that = this;
  setTimeout( function() {
  	that.shots++;
  	new enemy_shot(that.type, that.tid, that.shots)
  	that.shoot(interval);
  }, interval);
};

Jaeger.prototype.render = function() {
  var jg = d3.select('svg').selectAll('svg.background').data([{cy: this.y, cx: this.x}]);
  jg.enter().append('circle').attr({class: "enemy", id: this.tid, fill: "red", cy: this.y, cx: this.x, r: 8});
  this.move();
  this.shoot(this.type.interval);
};


var enemy_shot = function(type, bcount, shots) {
  this._p = d3.select('[id='+bcount+']');
  this.bc = bcount+shots.toString();
  this.x =  parseInt(this._p.attr('cx'));
  this.y =  parseInt(this._p.attr('cy'));
  this.field = d3.select('svg').selectAll('svg.background').data([{cy: this.y, cx: this.x}]);
  this.field.enter().append('circle').attr({class: 'eb', fill: 'yellow', cy: this.y -10, cx: this.x, r: type.radius, id: this.bc})
  this.move(type.speed, type.radius);
};

enemy_shot.prototype.move = function(speed) {
  var that = this;
  var _b = d3.select('[id='+that.bc+']');
  var y =  parseInt(_b.attr('cy'));
  var x =  parseInt(_b.attr('cx')); 
  _b.attr({cy: y + speed});

  var py = d3.select('svg.board').select('circle.player').attr("cy");
  var px = d3.select('svg.board').select('circle.player').attr("cx");
  
  py = parseInt(py);
  px = parseInt(px);
  
  if(y <= py+10 && y >= py-10 && x >= px -10 && x <= px +10) {
    console.log("Hit!")
  }
  
  if(y > 900){
    _b.remove();
    delete this;
  }
  setTimeout(function() {
    that.move(speed);
  },10)
};

// var collision = function(y,x,r) {
//   var py = d3.select('svg.board').select('circle.player').attr("cy");
//   var px = d3.select('svg.board').select('circle.player').attr("cx");
//   py = parseInt(py);
//   px = parseInt(px);
//   console.log(px)
//   if(y <= py+r && y >= py-r && x >= px -r && x <= px +r) {
//     console.log("Hit!")   
//   }
// }


