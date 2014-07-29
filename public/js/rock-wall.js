// Look at the DOM and pick a random config
var getRandomConfig = function(){
  var configs = [];

  $('.config.multi').each(function(i, item){
    configs.push($(item).data('config'));
  });

  var index = Math.floor(Math.random() * configs.length);
  return configs[index];
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
      time: 500
    }).then(function(){
      clearVideos();

      if(!pendingShowcase) routine();
      else showcase();
    });
  };

  // Give the videos just a second to get loaded in
  setTimeout(showVids, 1000);
  setTimeout(hideVids, 15000);
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
