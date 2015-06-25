(function () {

if ( window.Pipes === undefined ) {
  window.Pipes = {};
};

var GameView = Pipes.GameView = function GameView(game, ctx) {
  this.game = game;
  this.ctx = ctx;
};

GameView.prototype.start = function start() {
  setInterval(function () {
    that.game.draw(this.ctx);
  }.bind(this), 16);
};

})();
