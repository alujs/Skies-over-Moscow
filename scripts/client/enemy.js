var Enemy = function(x, y, src) {
	this.x = x;
	this.y = y;
	this.src = "";
	this.hp = 500;
};


var Jaeger = function(x, y, src) {
	Enemy.call(this, x,y);
	this.src = src;

}
Jaeger.prototype = Object.create(Enemy.prototype);
Jaeger.prototype.constructor = Jaeger;

Jaeger.prototype.move = function() {

};

Jaeger.prototype.destruction = function() {

};

Jaeger.prototype.shoot = function() {

};

Jaeger.prototype.render = function() {
  var jg = d3.select()
   
};


