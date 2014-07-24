// time: milliseconds it takes to init the transition
// effect: the css class to apply or unapply
// $units: an array of $.ified unites

var toggleUnits = function(opts){
  var deferred = Q.defer();
  var time = opts.time || 100;
  var effect = opts.effect || 'hide';
  var $shuffled = shuffle(opts.$units);

  $shuffled.each(function(i, unit){
    setTimeout(function(){
      $(unit).toggleClass(effect);
      if(i == $shuffled.length-1)
        deferred.resolve();
      else
        deferred.notify(i);
    }, i*time);
  });

  return deferred.promise;
};


var showFullScreenVideo = function(videoURL){
  var deferred = Q.defer();

  $('#video-master')[0].setAttribute('src', videoURL);
  $('#video-master')[0].playbackRate = '.1';
  $('#video-master').removeClass('hide');

  var allUnits = $('.unit');

  toggleUnits(allUnits)
    .then(deferred.resolve);

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
