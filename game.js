(function () {
  if ( window.Asteroids === undefined ) {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function Game() {
    this.dim_x = DIM_X;
    this.dim_y = DIM_Y;
    this.asteroids = []
    this.addAsteroids(NUM_AST);
    this.ship = new Asteroids.Ship({ game: this });
    this.bullets = [];
  }

  var DIM_X = Asteroids.DIM_X = 900;
  var DIM_Y = Asteroids.DIM_Y = 700;
  var NUM_AST = Asteroids.NUM_AST = 10;

  Game.randomPos = function randomPos() {
    var x = Math.floor(Math.random() * DIM_X);
    var y = Math.floor(Math.random() * DIM_Y);
    return [x,y];
  };

  Game.prototype.addAsteroids = function addAsteroids(num) {
    for (var i = 0; i < num; i++){
      this.asteroids.push(
        new Asteroids.Asteroid({
          game: this,
          pos: Game.randomPos()
        })
      );
    }
  };

  Game.prototype.allObjects = function allObjects() {
    return this.asteroids.concat(this.bullets).concat([this.ship]);
  };

  Game.prototype.checkCollisions = function checkCollisions() {
    var asteroids = this.asteroids;
    var bullets = this.bullets;
    for (var a = 0; a < asteroids.length; a++) {
      if (asteroids[a].isCollidedWith(this.ship)) {
        this.ship.relocate();
      }
      for (var b = 0; b < bullets.length; b++) {
        if (asteroids[a].isCollidedWith(bullets[b])) {
          this.asteroids.splice(a, 1);
          a--;
          this.bullets.splice(b, 1);
          b--;
          break;
        }
      }
    }
  };

  Game.prototype.draw = function draw(ctx) {
    ctx.clearRect(0, 0, DIM_X + 100, DIM_Y + 100);
    this.allObjects().forEach( function(obj) {
      obj.draw(ctx);
    });
  };

  Game.prototype.moveObjects = function moveObjects() {
    this.asteroids.forEach( function(obj) {
      obj.move();
    });
    this.ship.move();
    for (var i = 0; i < this.bullets.length; i++) {
      this.bullets[i].move();
      if (this.outOfBounds(this.bullets[i].pos)) {
        this.bullets.splice(i, 1);
        i--;
      }
    }
  };

  Game.prototype.outOfBounds = function outOfBounds(pos) {
    return pos[0] < 0 || pos[1] < 0 || pos[0] > this.dim_x || pos[1] > this.dim_y;
  };

  // Game.prototype.remove = function remove(asteroidIdx) {
  //   this.asteroids.splice(asteroidIdx, 1)
  // };

  Game.prototype.step = function step(ctx) {
    this.draw(ctx);
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.wrap = function wrap (pos) {
    var wrappedPos = pos;
    if ( pos[0] < 0 ) {
      wrappedPos[0] = (pos[0] % DIM_X) + DIM_X;
    } else if ( pos[0] > DIM_X ) {
      wrappedPos[0] = pos[0] % DIM_X;
    }
    if ( pos[1] < 0 ) {
      wrappedPos[1] = (pos[1] % DIM_Y) + DIM_Y;
    } else if ( pos[1] > DIM_Y ) {
      wrappedPos[1] = pos[1] % DIM_Y;
    }

    return wrappedPos;
  };



})();
