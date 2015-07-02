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
    var ends = Pipes.BoardSizes[size]
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
        $square.attr("data-type", "square");
        $square.attr("data-end", "false");
        $square.addClass("null");
        $square.css("height", that.frameLength / size - 2);
        $square.css("width", that.frameLength / size - 2);
        var click = function () {
          that.game.selectPipeColor($square.attr("class"))
        };
        $square.on("mousedown", click);
        if ($.inArray((row + "-" + col), that.pipeEndPositions) === -1) {
          $square.on("mouseover", that.game.fillPath.bind(that.game));
        }

        $displayRow.append($square);
      });
    });

    this.drawPipeEnds();
  };

  Board.prototype.reDraw = function reDraw(frameLength) {
    var size = this.size;
    var that = this;
    times(size, function(row) {
      var squareHeight = (frameLength / size);
      $(".row").css("height", squareHeight)
      $(".row").css("width", frameLength)
      $("[data-type=\"square\"]").css("height", frameLength / size - 2);
      $("[data-type=\"square\"]").css("width", frameLength / size - 2);
    });
  };

  Board.prototype.drawPipeEnds = function drawPipeEnds() {
    this.pipeEndPairs.forEach(function(pipeEndPair){
      pipeEndPair[0].draw();
      pipeEndPair[1].draw();
    })
  };

})();
