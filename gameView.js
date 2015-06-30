(function () {

if ( window.Pipes === undefined ) {
  window.Pipes = {};
};

var GameView = Pipes.GameView = function GameView() {
  this.size();
};

GameView.prototype.size = function size() {
  this.frameLength = $(window).height();
  if ($(window).width() < $(window).height()) {
    this.frameLength = $(window).width();
  };
  this.frameLength -= 300;
  this.frameLength = (this.frameLength < 200) ? 200 : Math.floor(this.frameLength);
  $("#game-container").css("height", this.frameLength);
  $("#game-container").css("width", this.frameLength);

  var that = this;
  Object.keys(Pipes.Board.Sizes).forEach(function(size) {
    $button = $("<button>").append(size + "x" + size);
    $button.on("click", function () {
      $("#selection").addClass("hidden");
      that.start(size);
    });
    $("#selection .buttons").append($button);
  })
};

GameView.prototype.start = function start(size) {
  var game = new Pipes.Game(size, this.frameLength);
  game.draw();
};

})();
