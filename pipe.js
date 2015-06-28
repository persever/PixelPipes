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
  this.connected = false;
};

// MAKE GOING OVER FILLED SQUARE OF SELECTED COLOR REMOVE THAT CLASS,
// AND DO NOTHING TO SQUARES OF OTHER COLORS

PipeEnd.prototype.draw = function draw() {
  var $pipeEndSquare = $("#" + this.row + "-" + this.col)
  $pipeEndSquare.removeClass();
  $pipeEndSquare.addClass(this.color);
  var that = this;
  (function ($el, color) {
    $el.on("mousedown", function () { that.board.game.selectPipeColor(color) });
  })($pipeEndSquare, this.color);
  (function ($el, color) {
    $el.on("mouseup", function () {
      that.isConnected();
    });
  })($pipeEndSquare);
};

PipeEnd.prototype.isConnected = function isConnected(pos, lastPos) {
  var pos = pos || this.pos;
  // is this missing some of the middle tiles??
  // in util, make array comparing function
  if ("" + pos + "" === "" + this.oppositeEndPos + "") {
    this.connected = true;
  } else if (!this.hasAdjacentTile(pos, lastPos)) {
    this.connected = false;
  } else {
    var newPos = this.adjacentTile(pos, lastPos);
    this.isConnected(newPos, pos);
  }

  return this.connected;
};

PipeEnd.prototype.hasAdjacentTile = function hasAdjacentTile(currentPos, lastPos) {
  // please refactor so you're not calling that function twice when true
  // just test truthiness of return value of main function
  if (this.adjacentTile(currentPos, lastPos)) {
    return true;
  } else {
    return false;
  }
};

PipeEnd.prototype.adjacentTile = function adjacentTile(currentPos, lastPos) {
  var adjacentPositions = [];
  ADJACENT_POSITIONS.forEach(function(distance) {
    adjacentPositions.push([ currentPos[0] + distance[0], currentPos[1] + distance[1] ]);
  });
  var tile = null;
  adjacentPositions.forEach(function(adjacentPos) {
// instead of lastPos, track checked positions in case of multiple adjacent (for whether you make it to fill requirement or just need to prevent infinite loop when user fills multiple adjacent)
    if ("" + adjacentPos + "" !== "" + lastPos + "") {
      var $square = $("#" + adjacentPos[0] + "-" + adjacentPos[1])
      if ($square.hasClass(this.color)) {
        tile = adjacentPos;
      }
    }
  }.bind(this));
  return tile;
};

var ADJACENT_POSITIONS = [
  [0,1],
  [1,0],
  [0,-1],
  [-1,0]
];

})();
