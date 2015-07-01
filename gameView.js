(function () {

if ( window.Pipes === undefined ) {
  window.Pipes = {};
};

var GameView = Pipes.GameView = function GameView() {
  this.color = Pipes.Colors[Math.floor(Math.random()*10 % Pipes.Colors.length)];
  this.setFrameLength();
  this.size();
  this.addButtons();
  $("#title").css("color", this.color);
  $("button.continue").css("background-color", this.color);
  $("#game-container").css("box-shadow",
                           "0px 0px 0px 1px black, 0px 0px 0px 3px" + this.color);
  $(window).on("resize", this.resize.bind(this));
};

GameView.prototype.addButtons = function addButtons() {
  var that = this;
  Object.keys(Pipes.Board.Sizes).forEach(function(size) {
    $button = $("<button>").append(size + "x" + size);
    $button.css("color", that.color);
    $button.on("click", function () {
      $("#selection").addClass("hidden");
      that.game = new Pipes.Game(size, that.frameLength);
      that.start(size);
    });
    $("#selection .buttons").append($button);
  })
};

GameView.prototype.resize = function resize() {
  this.setFrameLength();
  this.size();
  if (this.game) {
    this.game.board.reDraw(this.frameLength);
  }
};

GameView.prototype.setFrameLength = function setFrameLength() {
  this.frameLength = $(window).height();
  if ($(window).width() < $(window).height()) {
    this.frameLength = $(window).width();
  };
  this.frameLength -= 100;
  this.frameLength = Math.floor(this.frameLength)
  this.frameLength = (this.frameLength < 200) ? 200 : Math.floor(this.frameLength);
};

GameView.prototype.size = function size() {
  $("body").css("height", $(window).height());
  $("body").css("width", $(window).width());
  $("#game-container").css("height", this.frameLength);
  $("#game-container").css("width", this.frameLength);
  $("#title-container").css("width", this.frameLength);
};

GameView.prototype.start = function start(size) {
  this.game.draw();
};

})();
