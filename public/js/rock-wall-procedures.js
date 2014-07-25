// Transitions:
//  x Evaporate
//  Vertical Waterfall
//  Horizontal Waterfall
//  x Diagonal Waterfall
//  x Wipe
//  Blowout


// All below methods take the following options:
//   time:     time in milliseconds to complete each block transformation
//             default: 100
//   effect:   the css class to be applied for the animation
//             default: "hidden"



// Defaults to create effect from top left to bottom right.
//   reverse:   start from the x and y max point - x:max, y:max to x:0, y:0
//              default: false
//   backwards: start from the x max point and y 0 point
//              default: false
var diagonalWaterfall = function(opts){
  if(!opts) opts = {};
  var time = opts.time || 100;
  var columns = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [] };
  var $blocks = $('.block');

  $blocks.forEach(function(block, i){
    columns[i%6].push(block);
  });

  var callColumn = function(index){
    var times = 0;
    if(opts.reverse || opts.backwards) times = 3;
    if(opts.reverse && opts.backwards) times = 0;

    var blocks = columns[index];

    var callBlock = function(block){
      var units = $(block).find('.unit');

      toggleUnits({
        time: time,
        effect: opts.effect,
        $units: units
      }).progress(function(progression){
        if(progression == 2){
          if(opts.reverse && opts.backwards) times++;
          else if(opts.reverse || opts.backwards) times--;
          else times++;

          if(blocks[times])
            callBlock(blocks[times]);
        }
      });
    };

    setTimeout(function(){
      callBlock(blocks[times]);
    }, index*time);
  };

  if(opts.reverse === true)
    reverseNamedObject(columns);

  for(var key in columns){
    callColumn(key);
  }
};



// Defaults to create effect from left to right
//   reverse: go from right to left
//              default: false
var wipe = function(opts){
  if(!opts) opts = {};
  var time = opts.time || 100;
  var columns = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [] };
  var $blocks = $('.block');

  $blocks.forEach(function(block, i){
    columns[i%6].push(block);
  });

  var callColumn = function(index){

    setTimeout(function(){
      var blocks = columns[index];

      blocks.forEach(function(block){
        var units = $(block).find('.unit');

        toggleUnits({
          time: time,
          effect: opts.effect,
          $units: units
        });
      });
    }, index*time);
  };

  if(opts.reverse === true)
    reverseNamedObject(columns);

  for(var key in columns){
    callColumn(key);
  }
};



var evaporate = function(opts){
  var units = $('.unit');

  toggleUnits({
    time: opts.time || 10,
    effect: opts.effect || '',
    $units: units
  });
};
