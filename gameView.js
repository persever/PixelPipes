(function () {

if ( window.Pipes === undefined ) {
  window.Pipes = {};
};

var GameView = Pipes.GameView = function GameView() {};

GameView.prototype.choose = function choose() {
  $selection = $("<div>").attr("id", "selection").text("Select a board size.");
  var that = this;
  Object.keys(Pipes.Board.Sizes).forEach(function(size) {
    $button = $("<button>").append(size + "x" + size);
    $button.on("click", function () { that.start(Pipes.Board.Sizes[size]) });
    $selection.append($button);
  })
  $("#game-canvas").append($selection);
};

GameView.prototype.start = function start(size) {
  var game = new Pipes.Game(size);
  game.draw();
};

})();
