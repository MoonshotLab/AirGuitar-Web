var configColors = {
  'takeover': [{0:'y'}, {1:'r'}, {2:'r'}, {3:'r'}, {4:'r'}, {5:'y'}, {6:'y'}, {7:'r'}, {8:'r'}, {9:'r'}, {10:'r'}, {11:'y'}, {12:'y'}, {13:'r'}, {14:'r'}, {15:'r'}, {16:'r'}, {17:'y'}, {18:'y'}, {19:'r'}, {20:'r'}, {21:'r'}, {22:'r'}, {23:'y'}],
  'two-up': [{0:'y'}, {1:'y'}, {2:'y'}, {3:'r'}, {4:'r'}, {5:'r'}, {6:'b'}, {7:'b'}, {8:'b'}, {9:'r'}, {10:'r'}, {11:'r'}, {12:'b'}, {13:'b'}, {14:'b'}, {15:'r'}, {16:'r'}, {17:'r'}, {18:'b'}, {19:'b'}, {20:'b'}, {21:'y'}, {22:'y'}, {23:'y'}],
  'three-up-tilt': [{0:'y'}, {1:'y'}, {2:'y'}, {3:'y'}, {4:'r'}, {5:'r'}, {6:'b'}, {7:'b'}, {8:'y'}, {9:'y'}, {10:'r'}, {11:'r'}, {12:'b'}, {13:'b'}, {14:'g'}, {15:'g'}, {16:'y'}, {17:'y'}, {18:'y'}, {19:'y'}, {20:'g'}, {21:'g'}, {22:'y'}, {23:'y'}],
  'three-up-balance': [{0:'r'}, {1:'r'}, {2:'y'}, {3:'y'}, {4:'g'}, {5:'g'}, {6:'r'}, {7:'r'}, {8:'b'}, {9:'b'}, {10:'g'}, {11:'g'}, {12:'y'}, {13:'y'}, {14:'b'}, {15:'b'}, {16:'y'}, {17:'y'}, {18:'y'}, {19:'y'}, {20:'y'}, {21:'y'}, {22:'y'}, {23:'y'}],
  'three-up': [{0:'y'}, {1:'y'}, {2:'y'}, {3:'y'}, {4:'y'}, {5:'y'}, {6:'b'}, {7:'b'}, {8:'r'}, {9:'r'}, {10:'g'}, {11:'g'}, {12:'b'}, {13:'b'}, {14:'r'}, {15:'r'}, {16:'g'}, {17:'g'}, {18:'y'}, {19:'y'}, {20:'y'}, {21:'y'}, {22:'y'}, {23:'y'}],
  'three-up-balance-right': [{0:'y'}, {1:'y'}, {2:'y'}, {3:'y'}, {4:'r'}, {5:'r'}, {6:'b'}, {7:'b'}, {8:'y'}, {9:'y'}, {10:'r'}, {11:'r'}, {12:'b'}, {13:'b'}, {14:'y'}, {15:'y'}, {16:'g'}, {17:'g'}, {18:'y'}, {19:'y'}, {20:'y'}, {21:'y'}, {22:'g'}, {23:'g'}],
  'three-up-balance-left': [{0:'r'}, {1:'r'}, {2:'y'}, {3:'y'}, {4:'y'}, {5:'y'}, {6:'r'}, {7:'r'}, {8:'y'}, {9:'y'}, {10:'b'}, {11:'b'}, {12:'g'}, {13:'g'}, {14:'y'}, {15:'y'}, {16:'b'}, {17:'b'}, {18:'g'}, {19:'g'}, {20:'y'}, {21:'y'}, {22:'y'}, {23:'y'}]
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
    $(selector).removeClass('r y b g');
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
  preloadedSlowmos.unshift(slowmo);

  var showVid = function(){
    $('.config.takeover').show();
    addColorFacetClass('takeover');
    $(video).attr('src', slowmo.url);
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
      setTimeout(function(){
        $('.config.takeover').hide();
        clearVideos();
        routine();
      }, 3000);
    });
  };


  setTimeout(showVid, 1000);
  setTimeout(hideVid, 30000);
};



// Pick a random routine and run dat
var routine = function(){
  // var config = getRandomConfig();
  var config = 'two-up';
  var selector = '.config.' + config;
  var $videos = $(selector).find('video');

  $videos.each(function(i, video){
    $(video).attr('src', preloadedSlowmos[i].url);
  });

  var showVids = function(){
    addColorFacetClass(config);
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
      time: 300
    }).then(function(){
      setTimeout(function(){
        $(selector).show();
        clearVideos();

        if(!pendingShowcase) routine();
        else showcase();
      }, 3000);
    });
  };

  // Give the videos just a second to get loaded in
  setTimeout(showVids, 1000);
  setTimeout(hideVids, 30000);
};



// Listen to new slowmo events and schedule them
var pendingShowcase = false;
socket.on('new-slowmo', function(slowmo){
  pendingShowcase = slowmo;
});


// Kick us off with a routine and a random colorer
$(function(){
  colorUnits();
  if(!opts.debug)
    routine();
});
