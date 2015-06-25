(function () {
  if ( window.Pipes === undefined ) {
    window.Pipes = {};
  };

  var times = function(n, callback) {
    var i = 1;
    while (i <= n) {
      callback(i);
      i++
    }

    return n;
  };

})();
