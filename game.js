(function () {
  if ( window.Pipes === undefined ) {
    window.Pipes = {};
  };

// take in optional grid size
  var Game = Pipes.Game = function Game(sizeOption) {
    this.size = sizeOption || 5;
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

    // factor sizing out into separate method?

    var frameLength = $(window).height();
    if ($(window).width() < $(window).height()) {
      frameLength = $(window).width();
    };
    frameLength -= 300;
    frameLength = (frameLength < 200) ? 200 : Math.floor(frameLength);
    $("#game-container").css("height", frameLength);
    $("#game-container").css("width", frameLength);

    var size = this.size;
    var that = this;
    times(size, function(row) {
      var $displayRow = $("<div>").attr("data-row", row)
      $displayRow.css("height", frameLength / size )
      $displayRow.css("width", frameLength)
      $displayRow.addClass("row");
      $("#game-canvas").append($displayRow);
      times(size, function(col) {
        var $square = $("<div>").attr("id", row + "-" + col)
        $displayRow.append($square);
        $square.addClass("null");
        $square.css("height", frameLength / size);
        $square.css("width", frameLength / size);
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
    // var row = parseInt($square.attr("id")[0])
    // var col = parseInt($square.attr("id")[2])
    if (this.selectedPipeColor) {
      // var adjacentPositions = []
      // Pipes.ADJACENT_POSITIONS.forEach(function(distance) {
      //   var adjacent_row = row + distance[0];
      //   var adjacent_col = col + distance[1];
      //   if (adjacent_row > -1 && adjacent_row < this.size && adjacent_col > -1 && adjacent_col < this.size) {
      //     adjacentPositions.push(adjacent_row + "-" + adjacent_col);
      //   }
      // }.bind(this));
      // if (adjacentPositions.indexOf(this.lastPos) !== -1) {
        // if ($square.hasClass("null")) {
          $square.removeClass();
          $square.addClass(this.selectedPipeColor);
        // } else if ($square.hasClass(this.selectedPipeColor)) {
        //   $square.removeClass();
        //   $square.addClass("null");,
        // }
      // }
      // this.lastPos = row + "-" + col;
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
      new Pipes.GameView().choose();
    });

    var color = Pipes.Colors[Math.floor(Math.random()*10 % Pipes.Colors.length)];
    $("button.continue").css("background-color", color)
    $("button.continue").on("click", function () {
      $(".victory-modal").addClass("hidden");
      $(".victory-backdrop").addClass("hidden");
      $("#game-canvas").empty();
      new Pipes.GameView().choose();
    });
  };

})();
