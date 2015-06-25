(function () {
  if ( window.Pipes === undefined ) {
    window.Pipes = {};
  };

// take in optional grid size

  var Game = Pipes.Game = function Game(sizeOption) {
    var size = sizeOption || 5;
    this.dim_x = DIM_X;
    this.dim_y = DIM_Y;
    this.board = new Pipes.Board(size);
  };

  var DIM_X = Pipes.DIM_X = 900; // use the lesser of window.height to make square side length, -100px -- responsive??
  var DIM_Y = Pipes.DIM_Y = DIM_X;

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
    this.board.grid.forEach(function(row) {
      var $displayRow = $("#game-canvas").append($("<div>").attr("data-row", row));
      $displayRow.forEach(function(displayRow) {
        times(grid.length, function(col) {
          displayRow.append($("<div>").attr("data-col", col))
        })
      });
    })

    var pipeEnds = this.board.pipeEnds;
    for (var position in pipeEnds) {
      $("div")
        .data("row", position[0])
        .data("col", position[1])
        .addClass("end")
        .addClass(pipeEnds[position]);
    };
  };

})();
