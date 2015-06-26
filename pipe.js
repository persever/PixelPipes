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

  console.log(pos);
  console.log(this.oppositeEndPos);

  if (pos === this.oppositeEndPos) {
    return true;
  }

  var $sameTile = null;
  var sameTilePos = null;
  // function adjacentSameTile(pos) {
    // console.log("checking adjacent");
    var adjacentPositions = []
    ADJACENT_POSITIONS.forEach(function(distance) {
      adjacentPositions.push([ parseInt(pos[0]) + distance[0], parseInt(pos[1]) + distance[1] ]);
    });
    adjacentPositions.forEach(function(adjacentPos) {
      // in game or board or wherever, prevent going back over self! (mousing back over can remove class (except on ends))
      // and don't let it write over other ends!! what happened to that??
      var $square = $("#" + adjacentPos[0] + "-" + adjacentPos[1])
      if ($square.hasClass(that.color)) {
        $sameTile = $square;
        sameTilePos = [adjacentPos[0], adjacentPos[1]];
      }
    });

    // return $sameTile;
  // }

  // adjacentSameTile(pos);
  // console.log($sameTile);
  // console.log(sameTilePos);

  if ($sameTile && sameTilePos !== that.oppositeEndPos) {
    that.isConnected.call(that, sameTilePos)
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
