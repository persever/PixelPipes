(function () {
  if ( window.Pipes === undefined ) {
    window.Pipes = {};
  }

  var Board = Pipes.Board = function Board() {
    this.dim_x = DIM_X;
    this.dim_y = DIM_Y;
    this.board = this.generateBoard();
  }

})();
