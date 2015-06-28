(function () {
  if ( window.Pipes === undefined ) {
    window.Pipes = {};
  };

// take in optional grid size
  var Game = Pipes.Game = function Game(sizeOption) {
    this.size = sizeOption || 5;
    this.board = new Pipes.Board(this, this.size);
    this.$canvas = $("#game-canvas");
    this.selectedPipeColor = null;
    $(window).on("resize", this.draw.bind(this));
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

    if (won) {
      $("#game-canvas").trigger("won")
    }

    return won;
  };

  Game.prototype.draw = function draw() {
    this.$canvas.empty();

    // factor sizing out into separate method?

    var frameLength = $(window).height();
    if ($(window).width() < $(window).height()) {
      frameLength = $(window).width();
    };
    frameLength -= 200;
    frameLength = (frameLength < 300) ? 300 : Math.floor(frameLength);
    this.$canvas.css("height", frameLength);
    this.$canvas.css("width", frameLength);

    var size = this.size;
    var that = this;
    times(size, function(row) {
      var $displayRow = $("<div>").attr("data-row", row)
      $displayRow.css("height", frameLength / size )
      $displayRow.css("width", frameLength)
      $displayRow.addClass("row");
      that.$canvas.append($displayRow);
      times(size, function(col) {
        var $square = $("<div>").attr("id", row + "-" + col)
        $displayRow.append($square);
        $square.addClass("null");
        $square.css("height", frameLength / size);
        $square.css("width", frameLength / size);
        if (!that.board.pipeEndPairs.some(function (pair) {
            pair.hasOwnProperty(row + "-" + col);
          })) {
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
    if (this.selectedPipeColor) {
      $(event.currentTarget).removeClass();
      $(event.currentTarget).addClass(this.selectedPipeColor);
    }
  };

  Game.prototype.victory = function victory() {
    // render just in/over #game-canvas!
    $victoryModal = $("<div id=\"victory-modal\"><div class=\"text\">You won!</div></div>");
    $victoryModal.append($("<button id=\"quit\">QUIT</button>")).append($("<button id=\"continue\">ANOTHER!</button>"));
    $("body").prepend($("<div id=\"victory-backdrop\"></div>")).prepend($victoryModal);
    $("#victory-backdrop").on("click", function () {
      $("#victory-modal").remove(),
      $("#victory-backdrop").remove();
    });
  };

})();
