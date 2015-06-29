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

  Pipes.Colors = ["#A80099", "#FF0000", "#FF9201", "#F9FF00", "#00A335", "#009ACE", "#2A659B"];

})();
