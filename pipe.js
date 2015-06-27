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

// MOUSEOVER HOVER CLASS-ADDER SHOULD ONLY ALLOW [0,1], [1,0], [0,-1], [-1,0],
// AND MAKE GOING OVER FILLED SQUARE OF SELECTED COLOR REMOVE THAT CLASS,
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


PipeEnd.prototype.isConnected = function isConnected(pos, lastPos) {
  var pos = pos || this.pos;
  // console.log("i'm looking at " + pos);
  // lastPos starts undefined

  // console.log(lastPos);
  // debugger
  // is this missing some of the middle tiles??
  // make it just strings (in board construction of new Pipe too!), or in util make array comparing function
  // console.log("pos === " + pos);
  // console.log("lastPos === " + lastPos);
  // debugger
  if ("" + pos + "" === "" + this.oppositeEndPos + "") {
    console.log("PIPE IS CONNECTED!");
    this.connected = true;
  } else if (!this.hasAdjacentTile(pos, lastPos)) {
    console.log("not connected");
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
  // var $sameTile = null;
  // var sameTilePos = null;
  var adjacentPositions = [];
  ADJACENT_POSITIONS.forEach(function(distance) {
    adjacentPositions.push([ currentPos[0] + distance[0], currentPos[1] + distance[1] ]);
  });
  var tile = null;
  // console.log(currentPos);
  // console.log(lastPos);
  // console.log(adjacentPositions);
  // debugger
  adjacentPositions.forEach(function(adjacentPos) {
// in game or board or wherever, prevent going back over self! (mousing back over can remove class (except on ends))
// and don't let it write over other ends!! what happened to that??
// instead of lastPos, track checked positions in case of multiple adjacent
// (whether make it to fill more or just need to prevent infinite loop when user fills multiple adjacent)
// make this more efficient...
    if ("" + adjacentPos + "" !== "" + lastPos + "") {
      var $square = $("#" + adjacentPos[0] + "-" + adjacentPos[1])
      if ($square.hasClass(this.color)) {
        // $sameTile = $square;
        // sameTilePos = [adjacentPos[0], adjacentPos[1]];
        // console.log(adjacentPos);
        tile = adjacentPos;
      }
    }
  }.bind(this));
  return tile;
};

// ***

var ADJACENT_POSITIONS = [
  [0,1],
  [1,0],
  [0,-1],
  [-1,0]
];

})();
