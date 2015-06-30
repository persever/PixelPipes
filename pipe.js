(function () {

if ( window.Pipes === undefined ) {
  window.Pipes = {};
};

var PipeEnd = Pipes.PipeEnd = function PipeEnd(board, pos, color, oppositeEndPos) {
  this.board = board;
  this.pos = pos
  this.color = color;
  this.oppositeEndPos = oppositeEndPos;
  this.connected = false;
};

PipeEnd.prototype.draw = function draw() {
  var $pipeEndSquare = $("#" + this.pos[0] + "-" + this.pos[1])
  $pipeEndSquare.removeClass();
  $pipeEndSquare.addClass(this.color);
  var that = this;
  (function ($el, color) {
    $el.on("mouseup", function () {
      that.isConnected();
    });
  })($pipeEndSquare);
};

PipeEnd.prototype.isConnected = function isConnected(pos, checkedPositions) {
  var pos = pos || this.pos;
  var checkedPositions = checkedPositions || [];
  if ("" + pos + "" === "" + this.oppositeEndPos + "") {
    this.connected = true;
  } else if (!this.hasAdjacentTile(pos, checkedPositions)) {
    this.connected = false;
  } else {
    var newPos = this.adjacentTile(pos, checkedPositions);
    checkedPositions.push("" + pos + "")
    this.isConnected(newPos, checkedPositions);
  }

  return this.connected;
};

PipeEnd.prototype.hasAdjacentTile = function hasAdjacentTile(currentPos, checkedPositions) {
  // please refactor so you're not calling that function twice when true
  // just test truthiness of return value of main function
  if (this.adjacentTile(currentPos, checkedPositions)) {
    return true;
  } else {
    return false;
  }
};

PipeEnd.prototype.adjacentTile = function adjacentTile(currentPos, checkedPositions) {
  var adjacentPositions = [];
  Pipes.ADJACENT_POSITIONS.forEach(function(distance) {
    adjacentPositions.push([ currentPos[0] + distance[0], currentPos[1] + distance[1] ]);
  });
  var tile = null;
  adjacentPositions.forEach(function(adjacentPos) {
    if (checkedPositions.indexOf("" + adjacentPos + "") === -1) {
      var $square = $("#" + adjacentPos[0] + "-" + adjacentPos[1])
      if ($square.hasClass(this.color)) {
        tile = adjacentPos;
      }
    }
  }.bind(this));
  return tile;
};

Pipes.ADJACENT_POSITIONS = [
  [0,1],
  [1,0],
  [0,-1],
  [-1,0]
];

})();
