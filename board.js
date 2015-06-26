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
    for (var color in ends) {
      var pipeEnd1 = new Pipes.PipeEnd(this,
        ends[color][0][0],
        ends[color][0][2],
        color,
        [ends[color][1][0], ends[color][1][2]]
      );
      pipeEnds.push(pipeEnd1);
      var pipeEnd2 = new Pipes.PipeEnd(this,
        ends[color][1][0],
        ends[color][1][2],
        color,
        [ends[color][0][0], ends[color][0][2]]
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
      "L": ["4-0", "2-3"],
      "B": ["2-2", "0-4"],
      "W": ["1-3", "4-4"],
      "Y": ["0-0", "2-1"],
      "O": ["1-0", "3-2"]
    }
  ]

})();
