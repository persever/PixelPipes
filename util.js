(function () {
  if ( window.Pipes === undefined ) {
    window.Pipes = {};
  };

  times = function(n, callback) {
    var i = 0;
    while (i < n) {
      callback(i);
      i++
    }

    return n;
  };

})();
