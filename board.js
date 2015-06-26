(function () {
  if ( window.Pipes === undefined ) {
    window.Pipes = {};
  };

  var Board = Pipes.Board = function Board(game, size) {
    this.game = game;
    this.pipeEnds = this.setPipeEnds(size);
    // this.grid = Board.generateGrid(size);
  };

  // take a size!
  // Board.generateGrid = function generateGrid(size) {
  //   var grid = [];
  //   times(size, function () {
  //     var row = new Array(size);
  //     grid.push(row);
  //     });
  //   return grid;
  // };

  Board.prototype.setPipeEnds = function pipeEnds(size) {
    var ends = null
    if (size === 5) {
      ends = FIVES[Math.floor(Math.random() * FIVES.length)]; //factor out
    }
    // var pipeEnds = []
    // var that = this;
    // for (var position in ends) {
    //   var pipeEnd = new Pipes.PipeEnd(this.game, position[1], position[3], ends[position]);
    //   pipeEnds.push(pipeEnd);
    // };

    return ends;
    // return pipeEnds;
  };

  Board.prototype.drawPipeEnds = function drawPipeEnds() {
    var that = this;
    for (var position in this.pipeEnds) {
      var $pipeEndSquare = $("#" + position[1] + "-" + position[3])
      $pipeEndSquare.addClass("end").addClass(this.pipeEnds[position]);
      $pipeEndSquare.on("mousedown", function () {
        that.game.selectPipeColor(color)
      });
    };
  };

  var FIVES = [
    {
      "[0,0]": "Y",
      "[2,1]": "Y",
      "[0,1]": "O",
      "[3,2]": "O",
      "[4,0]": "L",
      "[2,3]": "L",
      "[2,2]": "B",
      "[0,4]": "B",
      "[1,3]": "W",
      "[4,4]": "W"
    }
  ]

})();
