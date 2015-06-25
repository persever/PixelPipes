(function () {
  if ( window.Pipes === undefined ) {
    window.Pipes = {};
  }

  Number.prototype.times = function(callback) {
    var i = 0;
    while (i <= this) {
      callback(i);
      i++
    }

    // ensure that this works!!
    return this;
  }


})();
