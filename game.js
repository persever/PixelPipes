(function () {
  if ( window.Pipes === undefined ) {
    window.Pipes = {};
  };

  var Game = Pipes.Game = function Game(sizeOption, frameLength) {
    this.size = sizeOption || 5;
    this.frameLength = frameLength;
    this.board = new Pipes.Board(this, this.size);
    this.selectedPipeColor = null;
    // $(window).on("resize", this.draw.bind(this));
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
    $("#game-canvas").empty();

    var size = this.size;
    var that = this;
    times(size, function(row) {
      var $displayRow = $("<div>").attr("data-row", row)
      $displayRow.css("height", that.frameLength / size )
      $displayRow.css("width", that.frameLength)
      $displayRow.addClass("row");
      $("#game-canvas").append($displayRow);
      times(size, function(col) {
        var $square = $("<div>").attr("id", row + "-" + col)
        $displayRow.append($square);
        $square.addClass("null");
        $square.css("height", that.frameLength / size);
        $square.css("width", that.frameLength / size);
        if ($.inArray((row + "-" + col), that.board.pipeEndPositions) === -1) {
          $square.on("mouseover", that.fillPath.bind(that));
        }
        $square.on("mousedown", function () { that.selectPipeColor($square.attr("class")) });
      });
    });

    this.board.drawPipeEnds.call(this.board);
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

    // make these different! quit should go to splash screen!
    $("button.quit").on("click", function () {
      $(".victory-modal").addClass("hidden");
      $(".victory-backdrop").addClass("hidden");
      $("#game-canvas").empty();
      $("#selection").removeClass("hidden");
    });

    var color = Pipes.Colors[Math.floor(Math.random()*10 % Pipes.Colors.length)];
    $("button.continue").css("background-color", color)
    $("button.continue").on("click", function () {
      $(".victory-modal").addClass("hidden");
      $(".victory-backdrop").addClass("hidden");
      $("#game-canvas").empty();
      $("#selection").removeClass("hidden");
    });
  };

})();
