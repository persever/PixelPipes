(function () {
  if ( window.Pipes === undefined ) {
    window.Pipes = {};
  };

  var Board = Pipes.Board = function Board(game, size) {
    this.game = game;
    this.pipeEndPositions = [];
    this.pipeEndPairs = this.setPipeEndPairs(size);
  };

  Board.prototype.setPipeEndPairs = function setPipeEndPairs(size) {
    var ends = null
    if (size === 5) {
      ends = FIVES[Math.floor(Math.random() * FIVES.length)]; //factor out
    }
    var pipeEndPairs = [];
    // make it a hash instead of an array?
    Object.keys(ends).forEach(function(color) {
      var pipeEnd1 = new Pipes.PipeEnd(
        this,
        [parseInt(ends[color][0][0]), parseInt(ends[color][0][2])],
        color,
        [parseInt(ends[color][1][0]), parseInt(ends[color][1][2])]
      );
      this.pipeEndPositions.push(parseInt(ends[color][0][0]) + "-" + parseInt(ends[color][0][2]));
      var pipeEnd2 = new Pipes.PipeEnd(
        this,
        [parseInt(ends[color][1][0]), parseInt(ends[color][1][2])],
        color,
        [parseInt(ends[color][0][0]), parseInt(ends[color][0][2])]
      );
      pipeEndPairs.push([pipeEnd1, pipeEnd2]);
      this.pipeEndPositions.push(parseInt(ends[color][1][0]) + "-" + parseInt(ends[color][1][2]));
    }.bind(this));

    return pipeEndPairs;
  };

  Board.prototype.drawPipeEnds = function drawPipeEnds() {
    this.pipeEndPairs.forEach(function(pipeEndPair){
      pipeEndPair[0].draw();
      pipeEndPair[1].draw();
    })
  };

  var FIVES = [
    {
      "L": ["2-2", "0-4"],
      "B": ["4-0", "2-3"],
      "W": ["1-3", "4-4"],
      "O": ["1-0", "3-2"],
      "Y": ["0-0", "2-1"]
    }
  ]

})();
