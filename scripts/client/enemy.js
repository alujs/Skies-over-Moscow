var Enemy = function(x, y, src) {
	this.x = x;
	this.y = y;
	this.src = "";
	this.hp = 500;
};


var Jaeger = function(x, y, src, id) {
	Enemy.call(this, x,y);
	this.src = src;
	this.tid = "e"+id.toString();
	this.shots = 0;
	this.type = {
	  speed: 5,
	  radius: 5,
	  interval: 300, 	  
	};
	this.render();
}
Jaeger.prototype = Object.create(Enemy.prototype);
Jaeger.prototype.constructor = Jaeger;

Jaeger.prototype.move = function() {
  var jg = d3.select('[id='+this.tid+']')
  console.log(this.tid)
  var x =  parseInt(jg.attr('cx'));
  var y =  parseInt(jg.attr('cy'));
  jg.attr({cy: y + 2 , cx: x + 2 })
  var that = this;
  setTimeout(function(){ that.move(); }, 10);
};

Jaeger.prototype.destruction = function() {
  
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
  
  this.move(type.speed);
};

enemy_shot.prototype.move = function(speed) {
  var that = this;
  var _b = d3.select('[id='+that.bc+']');
  var y =  parseInt(_b.attr('cy')); 
  _b.attr({cy: y + speed});

  setTimeout(function() {
    that.move(speed);
  },10)
};