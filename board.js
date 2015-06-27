(function () {
  if ( window.Pipes === undefined ) {
    window.Pipes = {};
  };

  var Board = Pipes.Board = function Board(game, size) {
    this.game = game;
    this.pipeEnds = this.setPipeEnds(size);
  };

  Board.prototype.setPipeEnds = function pipeEnds(size) {
    var ends = null
    if (size === 5) {
      ends = FIVES[Math.floor(Math.random() * FIVES.length)]; //factor out
    }
    var pipeEnds = [];

    // make it a hash instead of an array

    for (var color in ends) {
      var pipeEnd1 = new Pipes.PipeEnd(
        this,
        parseInt(ends[color][0][0]),
        parseInt(ends[color][0][2]),
        color,
        [parseInt(ends[color][1][0]), parseInt(ends[color][1][2])]
      );
      pipeEnds.push(pipeEnd1);
      var pipeEnd2 = new Pipes.PipeEnd(
        this,
        parseInt(ends[color][1][0]),
        parseInt(ends[color][1][2]),
        color,
        [parseInt(ends[color][0][0]), parseInt(ends[color][0][2])]
      );
      pipeEnds.push(pipeEnd2);
    };

    return pipeEnds;
  };

  Board.prototype.drawPipeEnds = function drawPipeEnds() {
    this.pipeEnds.forEach(function(pipeEnd){
      pipeEnd.draw();
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
