var toggleUnits = function($units, next){
  var time = 200;
  var $shuffled = shuffle($units);

  $shuffled.each(function(i, unit){
    setTimeout(function(){
      $(unit).toggleClass('hide');
      if(i == $shuffled.length-1 && next){
        setTimeout(next, (i+1*time));
      }
    }, i*time);
  });
};


var showFullScreenVideo = function(videoURL, next){
  $('#video-master')[0].setAttribute('src', videoURL);
  $('#video-master')[0].playbackRate = '.1';
  $('#video-master').removeClass('hide');

  toggleUnits($('.unit'), function(){
    if(next) next();
  });
};


var hideAll = function(next){
  toggleUnits($('.unit'), function(){
    $.each($('video'), function(i, video){
      video.setAttribute('src', '');
    });
    $('#video-master').addClass('hide');
    if(next) next();
  });
};


var showBlockVideo = function(videoURL, blockIndex, next){
  var $block = $('#block-' + blockIndex);
  $block.find('video').removeClass('hide');
  $block.find('video')[0].setAttribute('src', videoURL);
  $block.find('video')[0].playbackRate = '.1';
  toggleUnits($block.find('.unit'), function(){
    if(next) next();
  });
};


var hideBlockVideo = function(blockIndex, next){
  var $block = $('#block-' + blockIndex);

  toggleUnits($block.find('.unit'), function(){
    if(next) next();
    $block.find('video').addClass('hide');
  });
};


var shuffle = function(o){
  for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
};
