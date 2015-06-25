(function () {

if ( window.Pipes === undefined ) {
  window.Pipes = {};
};

var Pipe = Pipes.Pipe = function Pipe(options) {};

Pipe.prototype.draw = function draw(ctx) {
  ctx.beginPath();
  // ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI);
  ctx.fillStyle = this.color;
  ctx.fill();
  ctx.lineWidth = 5;
};

Pipe.prototype.drawEnds = function drawEnds() {};

Pipe.prototype.move = function move() {
  this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];
  this.pos = this.game.wrap(this.pos);
};

})();
