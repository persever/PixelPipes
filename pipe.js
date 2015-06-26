(function () {

if ( window.Pipes === undefined ) {
  window.Pipes = {};
};

var PipeEnd = Pipes.PipeEnd = function PipeEnd(board, row, col, color, oppositeEndPos) {
  this.board = board;
  this.row = row;
  this.col = col;
  this.pos = [row,col]
  this.color = color;
  this.oppositeEndPos = oppositeEndPos;
};

PipeEnd.prototype.draw = function draw() {
  var $pipeEndSquare = $("#" + this.row + "-" + this.col)
  $pipeEndSquare.removeClass();
  $pipeEndSquare.addClass(this.color);
  var that = this;
  (function ($el, color) {
    $el.on("mousedown", function () { that.board.game.selectPipeColor(color) });
  })($pipeEndSquare, this.color);
};

PipeEnd.prototype.isConnected = function isConnected(pos) {
  var that = this;
  var pos = pos || this.pos;

  return true if pos = this.oppositeEndPos;

  var $tile = null
  function adjacentSameTile(pos) {
    var adjacentPositions = []
    ADJACENT_POSITIONS.forEach(function(distance) {
      adjacentPositions.push([pos[0] + distance[0], pos[1]+distance[1]);
    };
    adjacentPositions.forEach(function(pos) {
      var $square = $("#" + pos[0] + "-" + pos[1])
      // in game or board or wherever, prevent going back over self! (mousing back over can remove class (except on ends))
      $tile = $square if square.hasClass(that.color);
    });
  }

  while (hasAdjacentSameTile(pos)) {
    if (pos !== that.oppositeEndPos) {
      that.isConnected.call(that, pos)
    }
  }

  return false;
};

var ADJACENT_POSITIONS = [
  [0,1],
  [1,1],
  [1,0],
  [1,-1],
  [0,-1],
  [-1,-1],
  [-1,0],
  [-1,1]
]

})();
