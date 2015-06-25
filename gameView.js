(function () {

if ( window.Pipes === undefined ) {
  window.Pipes = {};
};

var GameView = Pipes.GameView = function GameView(game) {
  this.game = game;
};

GameView.prototype.start = function start() {
  // setInterval(function () {
    this.game.draw();
  // }.bind(this), 16);
};

})();
