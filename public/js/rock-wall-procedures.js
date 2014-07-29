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
  var deferred = Q.defer();

  if(!opts) opts = {};
  opts.time = opts.time || 100;

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
        time: opts.time,
        effect: opts.effect,
        $units: units
      }).progress(function(progression){
        if(progression == 2){
          if(opts.reverse && opts.backwards) times++;
          else if(opts.reverse || opts.backwards) times--;
          else times++;

          if(blocks[times])
            callBlock(blocks[times]);
          else
            deferred.resolve();
        }
      });
    };

    setTimeout(function(){
      callBlock(blocks[times]);
    }, index*opts.time);
  };

  if(opts.reverse === true)
    reverseNamedObject(columns);

  for(var key in columns){
    callColumn(key);
  }

  return deferred.promise;
};



// A center out effect
//   reverse: go from outside in
//              default: false
var blowout = function(opts){
  var deferred = Q.defer();

  if(!opts) opts = {};
  opts.time = opts.time || 100;

  var blocks = $('.block');
  var groups = {
    0: [ blocks[8], blocks[9], blocks[14], blocks[15] ],
    1: [ blocks[1], blocks[2], blocks[3], blocks[4], blocks[7], blocks[10], blocks[13], blocks[16], blocks[19], blocks[20], blocks[21], blocks[22] ],
    2: [ blocks[0], blocks[6], blocks[12], blocks[18], blocks[5], blocks[11], blocks[17], blocks[23] ]
  };

  var iterations = 0;
  var callGroup = function(index){
    var dones = 0;
    var blocks = groups[index];
    blocks.forEach(function(block){
      var units = $(block).find('.unit');

      toggleUnits({
        time: opts.time,
        effect: opts.effect,
        $units: units
      }).done(function(){
        dones++;
        if(dones == groups[iterations].length){
          iterations++;
          if(groups[iterations])
            callGroup(iterations);
          else
            deferred.resolve();
        }
      });
    });
  };

  if(opts.reverse === true)
    reverseNamedObject(groups);

  callGroup(0);

  return deferred.promise;
};



// Defaults to create effect from left to right
//   reverse: go from right to left
//              default: false
var wipe = function(opts){
  var deferred = Q.defer();

  if(!opts) opts = {};
  opts.time = opts.time || 100;

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
          time: opts.time,
          effect: opts.effect,
          $units: units
        });
      });
    }, index*opts.time);
  };

  if(opts.reverse === true)
    reverseNamedObject(columns);

  for(var key in columns){
    callColumn(key);
  }

  return deferred.promise;
};



// Randomly select each fact and apply effect
var evaporate = function(opts){
  var deferred = Q.defer();

  if(!opts) opts = {};
  var units = $('.unit');

  toggleUnits({
    time: opts.time,
    effect: opts.effect,
    $units: units
  }).then(deferred.resolve);

  return deferred.promise;
};
