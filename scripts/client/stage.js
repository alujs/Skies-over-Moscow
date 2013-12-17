var Stage = function(file) {

  // load file
  // parse it
  this.counter = 0; // counter increases every second; 
  this.queue = {};
  this.mobs = {'Jaeger': Jaeger, 'Storm': Storm, 'Wreckage': Wreckage, 'Flak': Flak, 'Panzer': Panzer, 'Fred': Fred};
  this.initialize();

};


Stage.prototype.initialize = function() {
  // read the file
  // case / switch to add to queue

  	this.queue[5] =  wave('Jaeger', 7, 700, 10, 1);
    this.queue[10] =  wave('Jaeger', 7, 15, 10, 0);
    this.queue[20] =  wave('Jaeger', 7, 300, 10, 0);
  // for(var x = 0; x < 3; x++) {
  // 	this.queue.push(eventing('Storm', 2, "", i+10));
  // 	this.queue.push(eventing('Wreckage', 8, "", i+10));
  // 	this.queue.push(eventing('Flak', 10, "", i+8));
  // }
  // for(var z = 0; z < 5; z++) {
  //   this.queue.push(wave('Panzer', 1, "", i+5));
  // }
  // this.queue.push(wave('Fred', 1, "", 40));

  this.loop(this.queue);
};

var wave = function(mob, number, x, y, type) {
    var wave = {mob: mob, number: number, x: x, y:y, type: type}
    return wave;
};



var eventing = function(events, number, coords, interval) {
    var events = {events: events, number: number, cr: coords}
    return events;
};

Stage.prototype.loop = function(stack) {
   var that = this;

   setTimeout(function() {
    
    if(that.queue[that.counter] !== undefined) {
      var x = that.queue[that.counter]; //caching it 
      for(var i = 0; i < x.number; i++) {
      	if(x.type === 1) { // L to R
      	  new that.mobs[x.mob](x.x - i*40,x.y + i*10, "", i+that.counter,x.type );
        }
        if(x.type === 0) { // R to L
          new that.mobs[x.mob](x.x + i*40 ,x.y + i*10, "", i+that.counter,x.type );	
        }
        if(x.type === 5) { // events only 

        }
      }
    }
    
    that.counter++;
    that.loop(that.queue)
   }, 1000)
};