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

  Pipes.Colors = [
    "#A80099",
    "#FF0000",
    "#FF9201",
    "#F9FF00",
    "#00A335",
    "#009ACE",
    "#2A659B"
  ];

  Pipes.BoardSizes = {
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
