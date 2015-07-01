(function () {
  if ( window.Pipes === undefined ) {
    window.Pipes = {};
  };

  var Board = Pipes.Board = function Board(game, size, frameLength) {
    this.size = size;
    this.frameLength = frameLength;
    this.game = game;
    this.pipeEndPositions = [];
    this.pipeEndPairs = this.setPipeEndPairs(size);
  };

  Board.prototype.setPipeEndPairs = function setPipeEndPairs(size) {
    // MAKE MULTIPLE AND ALLOW SELECTION?
    var ends = Board.Sizes[size]
    var pipeEndPairs = [];
    Object.keys(ends).forEach(function(color) {
      var pipeEnd1 = new Pipes.PipeEnd(
        this,
        [parseInt(ends[color][0][0]), parseInt(ends[color][0][2])],
        color,
        [parseInt(ends[color][1][0]), parseInt(ends[color][1][2])]
      );
      this.pipeEndPositions.push(parseInt(ends[color][0][0]) + "-" + parseInt(ends[color][0][2]));
      var pipeEnd2 = new Pipes.PipeEnd(
        this,
        [parseInt(ends[color][1][0]), parseInt(ends[color][1][2])],
        color,
        [parseInt(ends[color][0][0]), parseInt(ends[color][0][2])]
      );
      pipeEndPairs.push([pipeEnd1, pipeEnd2]);
      this.pipeEndPositions.push(parseInt(ends[color][1][0]) + "-" + parseInt(ends[color][1][2]));
    }.bind(this));

    return pipeEndPairs;
  };

  Board.prototype.draw = function draw() {
    $("#game-canvas").empty();

    var size = this.size;
    var that = this;
    times(size, function(row) {
      var $displayRow = $("<div>").attr("data-row", row)
      var squareHeight = (that.frameLength / size);
      $displayRow.css("height", squareHeight)
      $displayRow.css("width", that.frameLength)
      $displayRow.addClass("row");
      $("#game-canvas").append($displayRow);
      times(size, function(col) {
        var $square = $("<div>").attr("id", row + "-" + col)
        $displayRow.append($square);
        $square.addClass("null");
        $square.css("height", that.frameLength / size - 2);
        $square.css("width", that.frameLength / size - 2);
        if ($.inArray((row + "-" + col), that.pipeEndPositions) === -1) {
          $square.on("mouseover", that.game.fillPath.bind(that.game));
        }
        $square.on("mousedown", function () { that.game.selectPipeColor($square.attr("class")) });
      });
    });

    this.drawPipeEnds();
  };

  Board.prototype.drawPipeEnds = function drawPipeEnds() {
    this.pipeEndPairs.forEach(function(pipeEndPair){
      pipeEndPair[0].draw();
      pipeEndPair[1].draw();
    })
  };

  // STORE IN A SEPARATE FILE (util? with colors? both in other)

  Board.Sizes = {
    "5":  {
      "a": ["2-2", "0-4"],
      "b": ["4-0", "2-3"],
      "c": ["1-3", "4-4"],
      "d": ["1-0", "3-2"],
      "e": ["0-0", "2-1"]
    },
    "6": {
      "a": ["0-1", "4-0"],
      "b": ["5-5", "2-3"],
      "c": ["4-5", "1-4"],
      "d": ["5-0", "1-3"],
      "e": ["0-2", "2-5"],
      "f": ["2-2", "5-3"]
    },
    "7": {
      "a": ["0-6", "6-0"],
      "b": ["4-1", "3-5"],
      "c": ["0-0", "5-5"],
      "d": ["2-1", "3-2"],
      "e": ["0-1", "3-3"],
      "f": ["0-2", "2-5"],
      "g": ["1-3", "3-4"]
    },
    "8": {
      "a": ["0-1", "5-5"],
      "b": ["0-0", "4-2"],
      "c": ["2-5", "4-7"],
      "d": ["3-0", "6-3"],
      "e": ["1-1", "3-1"],
      "f": ["7-0", "6-6"],
      "g": ["1-6", "3-5"],
      "h": ["4-5", "7-5"]
    },
    "9": {
      "a": ["5-0", "8-3"],
      "b": ["3-0", "5-5"],
      "c": ["0-0", "7-3"],
      "d": ["7-1", "5-3"],
      "e": ["4-0", "3-6"],
      "f": ["7-2", "6-3"],
      "g": ["2-0", "2-6"],
      "h": ["1-0", "7-5"]
    }
  }

})();
