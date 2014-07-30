var configColors = {
  'takeover': [{0:'y'}, {1:'y'}, {2:'y'}, {3:'y'}, {4:'y'}, {5:'y'}, {6:'y'}, {7:'y'}, {8:'y'}, {9:'y'}, {10:'y'}, {11:'y'}, {12:'y'}, {13:'y'}, {14:'y'}, {15:'y'}, {16:'y'}, {17:'y'}, {18:'y'}, {19:'y'}, {20:'y'}, {21:'y'}, {22:'y'}, {23:'y'}],
  'two-up': [{0:'y'}, {1:'y'}, {2:'y'}, {3:'y'}, {4:'y'}, {5:'y'}, {6:'y'}, {7:'y'}, {8:'y'}, {9:'y'}, {10:'y'}, {11:'y'}, {12:'y'}, {13:'y'}, {14:'y'}, {15:'y'}, {16:'y'}, {17:'y'}, {18:'y'}, {19:'y'}, {20:'y'}, {21:'y'}, {22:'y'}, {23:'y'}],
  'three-up-tilt': [{0:'y'}, {1:'y'}, {2:'y'}, {3:'y'}, {4:'y'}, {5:'y'}, {6:'y'}, {7:'y'}, {8:'y'}, {9:'y'}, {10:'y'}, {11:'y'}, {12:'y'}, {13:'y'}, {14:'y'}, {15:'y'}, {16:'y'}, {17:'y'}, {18:'y'}, {19:'y'}, {20:'y'}, {21:'y'}, {22:'y'}, {23:'y'}],
  'three-up-balance': [{0:'y'}, {1:'y'}, {2:'y'}, {3:'y'}, {4:'y'}, {5:'y'}, {6:'y'}, {7:'y'}, {8:'y'}, {9:'y'}, {10:'y'}, {11:'y'}, {12:'y'}, {13:'y'}, {14:'y'}, {15:'y'}, {16:'y'}, {17:'y'}, {18:'y'}, {19:'y'}, {20:'y'}, {21:'y'}, {22:'y'}, {23:'y'}],
  'three-up': [{0:'y'}, {1:'y'}, {2:'y'}, {3:'y'}, {4:'y'}, {5:'y'}, {6:'y'}, {7:'y'}, {8:'y'}, {9:'y'}, {10:'y'}, {11:'y'}, {12:'y'}, {13:'y'}, {14:'y'}, {15:'y'}, {16:'y'}, {17:'y'}, {18:'y'}, {19:'y'}, {20:'y'}, {21:'y'}, {22:'y'}, {23:'y'}],
  'three-up-balance-right': [{0:'y'}, {1:'y'}, {2:'y'}, {3:'y'}, {4:'y'}, {5:'y'}, {6:'y'}, {7:'y'}, {8:'y'}, {9:'y'}, {10:'y'}, {11:'y'}, {12:'y'}, {13:'y'}, {14:'y'}, {15:'y'}, {16:'y'}, {17:'y'}, {18:'y'}, {19:'y'}, {20:'y'}, {21:'y'}, {22:'y'}, {23:'y'}],
  'three-up-balance-left': [{0:'y'}, {1:'y'}, {2:'y'}, {3:'y'}, {4:'y'}, {5:'y'}, {6:'y'}, {7:'y'}, {8:'y'}, {9:'y'}, {10:'y'}, {11:'y'}, {12:'y'}, {13:'y'}, {14:'y'}, {15:'y'}, {16:'y'}, {17:'y'}, {18:'y'}, {19:'y'}, {20:'y'}, {21:'y'}, {22:'y'}, {23:'y'}]
};


// Look at the DOM and pick a random config
var getRandomConfig = function(){
  var configs = [];

  $('.config.multi').each(function(i, item){
    configs.push($(item).data('config'));
  });

  var index = Math.floor(Math.random() * configs.length);
  return configs[index];
};



// Apply the unit colors
var addColorFacetClass = function(config){
  var colorMap = configColors[config];
  colorMap.forEach(function(map){
    var key = Object.keys(map)[0];
    var selector = '#block-' + key;
    $(selector).addClass(map[key]);
  });
};



// Find all videos and set their playback rate to
// the URL param
var setPlaybackRates = function(){
  $('video').each(function(i, video){
    video.playbackRate = opts.videoPlaybackRate;
  });
};



// Clear the videos of their src attribute so we're
// not playing like a billion at one time
var clearVideos = function(){
  $('video').each(function(i, video){
    $(video).attr('src', '');
  });
};



// Showcases a primary video
var showcase = function(slowmo){
  var video = $('.config.takeover').find('video')[0];
  pendingShowcase = false;

  var showVid = function(){
    addColorFacetClass('takeover');
    video.attr('src', slowmo.url);
    setPlaybackRates();

    diagonalWaterfall({
      effect: 'fade',
      time: 500
    });
  };


  var hideVid = function(){
    colorUnits();

    diagonalWaterfall({
      effect: 'fade',
      time: 500
    }).then(function(){
      clearVideos();
      setTimeout(routine, 1000);
    });
  };


  setTimeout(showVid, 1000);
  setTimeout(hideVid, 15000);
};



// Pick a random routine and run dat
var routine = function(){
  var config = getRandomConfig();
  var selector = '.config.' + config;
  var $videos = $(selector).find('video');

  $videos.each(function(i, video){
    $(video).attr('src', content.slowmos[i].url);
  });

  var showVids = function(){
    addColorFacetClass('takeover');
    setPlaybackRates();
    $(selector).show();

    diagonalWaterfall({
      effect: 'fade',
      time: 500
    });
  };

  var hideVids = function(){
    colorUnits();

    diagonalWaterfall({
      effect: 'fade',
      time: 100
    }).then(function(){
      clearVideos();

      if(!pendingShowcase) routine();
      else showcase();
    });
  };

  // Give the videos just a second to get loaded in
  setTimeout(showVids, 1000);
  // setTimeout(hideVids, 15000);
};



// Listen to new slowmo events and schedule them
var pendingShowcase = false;
socket.on('new-slowmo', function(slowmo){
  pendingShowcase = slowmo;
});



// Kick us off with a routine and a random colorer
$(function(){
  colorUnits();
  routine();
});
