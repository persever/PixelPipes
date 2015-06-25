(function () {
  if ( window.Pipes === undefined ) {
    window.Pipes = {};
  }

  var Board = Pipes.Board = function Board(size) {
    this.grid = Board.generateGrid(size);
    this.pipeEnds = Board.setPipeEnds(size);
  }

  // take a size!
  Board.generateGrid = function generateGrid(size) {
    var grid = [new Array(size), new Array(size), new Array(size)];
    return grid;
  };

  Board.setPipeEnds = function pipeEnds(size) {
    if (size = 5) {
      return FIVES[Math.floor(Math.random() * FIVES.length)]; //factor out
    }
  };

  var FIVES = [
    {
      [0,0]: "Y",
      [2,1]: "Y",
      [0,1]: "G",
      [3,2]: "G",
      [4,0]: "R",
      [2,3]: "R",
      [2,2]: "B",
      [0,4]: "B",
      [1,3]: "P",
      [4,4]: "P"
    }
  ]

})();
