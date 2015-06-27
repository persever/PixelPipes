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

// ***

// PipeEnd.prototype.isConnected = function isConnected(pos, lastPos) {
//   var that = this;
//   var pos = pos || this.pos;
//
//   console.log(pos);
//   // console.log(this.oppositeEndPos);
//
//   if (pos === this.oppositeEndPos) {
//     return true;
//   }
//
//   var $sameTile = null;
//   var sameTilePos = null;
//   var adjacentPositions = []
//   ADJACENT_POSITIONS.forEach(function(distance) {
//     adjacentPositions.push([ parseInt(pos[0]) + distance[0], parseInt(pos[1]) + distance[1] ]);
//   });
//   adjacentPositions.forEach(function(adjacentPos) {
//     // in game or board or wherever, prevent going back over self! (mousing back over can remove class (except on ends))
//     // and don't let it write over other ends!! what happened to that??
//     console.log(adjacentPos);
//     console.log(lastPos);
//     if (adjacentPos !== lastPos) {
//       var $square = $("#" + adjacentPos[0] + "-" + adjacentPos[1])
//       if ($square.hasClass(that.color)) {
//         $sameTile = $square;
//         sameTilePos = [adjacentPos[0], adjacentPos[1]];
//       }
//     }
//   });
//
//   if ($sameTile && sameTilePos !== that.oppositeEndPos) {
//     that.isConnected.call(that, sameTilePos, pos)
//   }
//
//   return false;
// };


// ***


// PipeEnd.prototype.isConnected = function isConnected(pos, lastPos) {
//   var pos = pos || this.pos;
//
//   console.log(pos);
//
//   if (pos === this.oppositeEndPos) {
//     return true;
//   } else if (!this.hasAdjacentTile(pos, lastPos)) {
//     return false;
//   }
//
//   this.isConnected(this.adjacentTile(pos, lastPos), pos);
//
//   return false;
// };
//
// PipeEnd.prototype.hasAdjacentTile = function hasAdjacentTile(currentPos, lastPos) {
//   // please refactor so you're not calling that function twice when true
//   // just test truthiness of return value of main function
//   if (this.adjacentTile(currentPos, lastPos)) {
//     return true;
//   }
//   return false;
// };
//
// PipeEnd.prototype.adjacentTile = function adjacentTile(currentPos, lastPos) {
//   // var $sameTile = null;
//   // var sameTilePos = null;
//   var adjacentPositions = [];
//   ADJACENT_POSITIONS.forEach(function(distance) {
//     adjacentPositions.push([ currentPos[0] + distance[0], currentPos[1] + distance[1] ]);
//   });
//   adjacentPositions.forEach(function(adjacentPos) {
// // in game or board or wherever, prevent going back over self! (mousing back over can remove class (except on ends))
// // and don't let it write over other ends!! what happened to that??
//     if (adjacentPos !== lastPos) {
//       var $square = $("#" + adjacentPos[0] + "-" + adjacentPos[1])
//       if ($square.hasClass(this.color)) {
//         // $sameTile = $square;
//         // sameTilePos = [adjacentPos[0], adjacentPos[1]];
//         return [adjacentPos[0], adjacentPos[1]];
//       }
//     }
//   }.bind(this));
//   return null;
// };

// ***

var ADJACENT_POSITIONS = [
  [0,1],
  [1,1],
  [1,0],
  [1,-1],
  [0,-1],
  [-1,-1],
  [-1,0],
  [-1,1]
];

})();
