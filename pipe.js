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
  var borderWidth = this.board.frameLength / this.board.size / 4;
  var borderColor = "rgba(255,255,255,.2)";
  if (this.color === "d") {
    borderColor = "rgba(255,255,255,.4)";
  }
  $pipeEndSquare.css("box-shadow",
                     "inset 0px 0px 0px " + borderWidth + "px " + borderColor);
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
  var adjacent = this.adjacentTile(pos, checkedPositions);
  if ("" + pos + "" === "" + this.oppositeEndPos + "") {
    this.connected = true;
  } else if (!adjacent) {
    this.connected = false;
  } else {
    checkedPositions.push("" + pos + "")
    this.isConnected(adjacent, checkedPositions);
  }

  return this.connected;
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
