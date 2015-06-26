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
  };

  Game.prototype.isWon = function isWon() {
    if (this.board.pipes.every(function (pipe) {
      pipe.isConnected();
    })) {
      return true;
    } else {
      return false;
    }
  };

  Game.prototype.draw = function draw() {
    this.$canvas.empty();

    // factor sizing out into separate method

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
        $square.addClass("col");
        $square.css("height", frameLength / size);
        $square.css("width", frameLength / size);
        $square.on("mouseover", that.fillPath.bind(that));
        $square.on("mouseup", that.deselectPipeColor.bind(that));
      });
    });

    setTimeout(this.board.drawPipeEnds.bind(this.board), 1);

    // var pipeEnds = this.board.pipeEnds;
    // var that = this;
    // for (var position in pipeEnds) {
    //   var $pipeEndSquare = $("[data-row-and-col=\""
    //                           + position[1] + "," + position[3] + "\"]");
    //   $pipeEndSquare.addClass("end").addClass(pipeEnds[position]);
    //
    //   $pipeEndSquare.on("mousedown", function () {
    //     that.selectPipeColor(pipeEnds[position])
    //     console.log(pipeEnds[position])
    //   });
    // };
  };

  Game.prototype.selectPipeColor = function selectPipeColor(color) {
    this.selectedPipeColor = color;
  };

  Game.prototype.deselectPipeColor = function deselectPipeColor() {
    this.selectedPipeColor = null;
  };

  Game.prototype.fillPath = function fillPath(event) {
    if (this.selectedPipeColor) {
      $(event.currentTarget).addClass(this.selectedPipeColor);
    }
  };

})();
