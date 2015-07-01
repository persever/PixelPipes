(function () {
  if ( window.Pipes === undefined ) {
    window.Pipes = {};
  };

  var Game = Pipes.Game = function Game(sizeOption, frameLength) {
    this.size = sizeOption || 5;
    this.frameLength = frameLength;
    this.board = new Pipes.Board(this, this.size, this.frameLength);
    this.selectedPipeColor = null;
    $("#game-canvas").on("won", this.victory.bind(this))
    $("#game-canvas").on("mouseup", this.mouseUp.bind(this))
  };

  Game.prototype.isWon = function isWon() {
    var won = true
    this.board.pipeEndPairs.forEach(function(pipeEndPair) {
      // make it not check pipe connection front to back and back to front -- just store pipe starts separately and check those? or store as pairs?
      if (!pipeEndPair[0].isConnected()) {
       won = false
      }
    });
    if (won && $(".victory-modal").hasClass("hidden")) {
      $("#game-canvas").trigger("won")
    }

    return won;
  };

  Game.prototype.draw = function draw() {
    this.board.draw();
  };

  Game.prototype.selectPipeColor = function selectPipeColor(color) {
    this.selectedPipeColor = color;
  };

  Game.prototype.mouseUp = function mouseUp() {
    this.selectedPipeColor = null;
    this.isWon();
  };

  Game.prototype.fillPath = function fillPath(event) {
    var $square = $(event.currentTarget);
    if (this.selectedPipeColor) {
          $square.removeClass();
          $square.addClass(this.selectedPipeColor);
    }
  };

  Game.prototype.victory = function victory() {
    $(".victory-modal").removeClass("hidden");
    $(".victory-backdrop").removeClass("hidden");

    $(".victory-backdrop").on("click", function () {
      $(".victory-modal").addClass("hidden");
      $(".victory-backdrop").addClass("hidden");
    });

    // // make these different! quit should go to splash screen!
    // $("button.quit").on("click", function () {
    //   delete gameView;
    //   $("#selection").removeClass("hidden");
    //   $(".buttons").empty();
    //   $("#game-canvas").empty();
    //   window.gameView = new Pipes.GameView();
    // });
    //
    // var color = Pipes.Colors[Math.floor(Math.random()*10 % Pipes.Colors.length)];
    // $("button.continue").css("background-color", color)
    // $("button.continue").on("click", function () {
    //   $(".victory-modal").addClass("hidden");
    //   $(".victory-backdrop").addClass("hidden");
    //   $("#game-canvas").empty();
    //   $("#selection").removeClass("hidden");
    // });
  };

})();
