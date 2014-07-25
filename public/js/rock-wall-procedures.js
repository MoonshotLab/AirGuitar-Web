// Transitions:
//  x Evaporate
//  Vertical Waterfall
//  Horizontal Waterfall
//  x Diagonal Waterfall
//  Blowout


$(function(){
  setTimeout(function(){
    // diagonalWaterfall({ effect: 'fade', time: 200 });
  }, 1000);
});


// Regular            x:0, y:0 to x:max, y:max
// Reverse            x:max, y:max to x:0, y:0
// Backwards          x:max, y:0 to x:0, y:max
// Reverse Backwards  x:0, y:max to x:max, y:0
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




var horizontalPeelDown = function(){
  var times = 0;
  var $blocks = $('.block');

  var callBlock = function(block){
    var units = $(block).find('.unit');

    toggleUnits({
      time: 30,
      effect: 'hide',
      $units: units
    }).progress(function(progression){
      if(progression == 2){
        times++;
        if($blocks[times])
          callBlock($blocks[times]);
      }
    });
  };

  callBlock($blocks[0]);
};



var evaporate = function(){
  var units = $('.unit');

  toggleUnits({
    time: 10,
    effect: 'hide',
    $units: units
  });
};
