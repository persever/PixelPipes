(function () {
  if ( window.Pipes === undefined ) {
    window.Pipes = {};
  }

// take in optional grid size

  var Game = Pipes.Game = function Game() {
    this.dim_x = DIM_X;
    this.dim_y = DIM_Y;
    this.board = this.generateBoard();
  }

  var DIM_X = Pipes.DIM_X = 900; // use the lesser of window.height to make square side length, -100px -- responsive??
  var DIM_Y = Pipes.DIM_Y = DIM_X;

  Game.prototype.isWon = function isWon() {
    if (this.board.pipes.every(function (pipe) {
      pipe.isConnected();
    })) {
      return true;
    } else {
      return false;
    }
  };

  Game.prototype.generateBoard = function generateBoard() {
    Pipes.Board.
  };

  // Game.prototype.checkCollisions = function checkCollisions() {
  //   var asteroids = this.asteroids;
  //   var bullets = this.bullets;
  //   for (var a = 0; a < asteroids.length; a++) {
  //     if (asteroids[a].isCollidedWith(this.ship)) {
  //       this.ship.relocate();
  //     }
  //     for (var b = 0; b < bullets.length; b++) {
  //       if (asteroids[a].isCollidedWith(bullets[b])) {
  //         this.asteroids.splice(a, 1);
  //         a--;
  //         this.bullets.splice(b, 1);
  //         b--;
  //         break;
  //       }
  //     }
  //   }
  // };

  Game.prototype.draw = function draw(ctx) {
    ctx.clearRect(0, 0, DIM_X + 100, DIM_Y + 100);
    this.allObjects().forEach( function(obj) {
      obj.draw(ctx);
    });
  };

})();
