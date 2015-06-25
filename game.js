(function () {
  if ( window.Pipes === undefined ) {
    window.Pipes = {};
  };

// take in optional grid size

  var Game = Pipes.Game = function Game(sizeOption) {
    var size = sizeOption || 5;
    // this.dim_x = DIM_X;
    // this.dim_y = DIM_Y;
    this.board = new Pipes.Board(size);
    $(window).on("resize", this.draw.bind(this));
  };

  // var DIM_X = Pipes.DIM_X = 900; // use the lesser of window.height to make square side length, -100px -- responsive??
  // var DIM_Y = Pipes.DIM_Y = DIM_X;

  Game.prototype.isWon = function isWon() {
    if (this.board.pipes.every(function (pipe) {
      pipe.isConnected();
    })) {
      return true;
    } else {
      return false;
    }
  };

  // Game.prototype.draw = function draw(ctx) {
  //   ctx.clearRect(0, 0, DIM_X + 100, DIM_Y + 100);
  //   this.allObjects().forEach( function(obj) {
  //     obj.draw(ctx);
  //   });
  // };

  Game.prototype.draw = function draw() {
    $("#game-canvas").empty();
    
    // factor sizing out into separate method

    var frameLength = $(window).height();
    if ($(window).width() < $(window).height()) {
      frameLength = $(window).width();
    };
    frameLength -= 200;
    frameLength = (frameLength < 300) ? 300 : Math.floor(frameLength);
    $("#game-canvas").css("height", frameLength);
    $("#game-canvas").css("width", frameLength);

    var grid = this.board.grid
    times(grid.length, function(row) {
      var $displayRow = $("<div>").attr("data-row", row)
      $displayRow.css("height", frameLength / grid.length)
      $displayRow.css("width", frameLength)
      $displayRow.addClass("row");
      $("#game-canvas").append($displayRow);
      times(grid.length, function(col) {
        var $square = $("<div>").attr("data-row-and-col", row + "," + col)
        $displayRow.append($square);
        $square.addClass("col");
        $square.css("height", frameLength / grid.length )
        $square.css("width", frameLength / grid.length )
      });
    });

    var pipeEnds = this.board.pipeEnds;
    for (var position in pipeEnds) {
      var $square = $("[data-row-and-col=\"" + position[1] + "," + position[3] + "\"]");
      $square.addClass("end").addClass(pipeEnds[position]);
    };
  };

})();
