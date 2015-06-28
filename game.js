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
    // l and o are the only pipes that don't infinitely loop... only l recognizes connection.... wtf...
    // this.board.pipeEnds[0].isConnected();
    // this.board.pipeEnds[2].isConnected();
    // this.board.pipeEnds[4].isConnected();
    // this.board.pipeEnds[6].isConnected();
    // this.board.pipeEnds[8].isConnected();

    this.board.pipeEnds.forEach(function(pipeEnd) {
      // lose the line below, make the graphics make it obvious that you need to connect to the end (mouse up on the end)
      // unless you don't give a **** about this awful algorithm
      // make sure you cut down to checking one pipe end
      pipeEnd.isConnected();
      console.log(pipeEnd.color + " " + pipeEnd.connected);
    });
      // console.log("won!");
    // } else {
    //   console.log("not won");
    // }

    // make it not check pipe connection front to back and back to front, just store pipe starts separately
    // var won = true;
    // this.board.pipeEnds.forEach(function (pipeEnd){
    //   if (!pipeEnd.isConnected.call(pipeEnd)) {
    //     console.log("checking " + pipeEnd.pos);
    //     won = false;
    //   }
    // });
    // console.log("finished checking all");
    // return won;
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
        $square.addClass("empty");
        $square.css("height", frameLength / size);
        $square.css("width", frameLength / size);
        if (!that.board.pipeEnds.hasOwnProperty(row + "-" + col)) {
          $square.on("mouseover", that.fillPath.bind(that));
        }
        // $square.on("mouseup", that.mouseUp.bind(that));
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
    $victoryModal = $("<div id=\"victory-modal\">You won!</div>");
    $("body").prepend($("<div id=\"victory-backdrop\"></div>")).prepend($victoryModal);
  };

})();
