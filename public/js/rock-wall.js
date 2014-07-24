var toggleUnits = function($units){
  var deferred = Q.defer();
  var time = 200;
  var $shuffled = shuffle($units);

  $shuffled.each(function(i, unit){
    setTimeout(function(){
      $(unit).toggleClass('hide');
      if(i == $shuffled.length-1){
        setTimeout(deferred.resolve, (i+1*time));
      }
    }, i*time);
  });

  return deferred.promise;
};


var showFullScreenVideo = function(videoURL){
  var deferred = Q.defer();

  $('#video-master')[0].setAttribute('src', videoURL);
  $('#video-master')[0].playbackRate = '.1';
  $('#video-master').removeClass('hide');

  toggleUnits($('.unit'), deferred.resolve);

  return deferred.promise;
};


var hideAll = function(){
  var deferred = Q.defer();

  toggleUnits($('.unit')).then(function(){
    $.each($('video'), function(i, video){
      video.setAttribute('src', '');
    });

    $('#video-master').addClass('hide');
    deferred.resolve();
  });

  return deferred.promise;
};


var showBlockVideo = function(videoURL, blockIndex){
  var deferred = Q.defer();
  var $block = $('#block-' + blockIndex);

  $block.find('video').removeClass('hide');
  $block.find('video')[0].setAttribute('src', videoURL);
  $block.find('video')[0].playbackRate = '.1';

  toggleUnits($block.find('.unit'))
    .then(deferred.resolve);

  return deferred.promise;
};


var hideBlockVideo = function(blockIndex){
  var deferred = Q.defer();
  var $block = $('#block-' + blockIndex);

  toggleUnits($block.find('.unit')).then(function(){
    $block.find('video').addClass('hide');
    deferred.resolve();
  });

  return deferred.promise;
};


var shuffle = function(o){
  for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
};
