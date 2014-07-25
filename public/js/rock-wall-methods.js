var overflowClasses = [
  'fade',
  'move',
  'implode',
  'move-fade'
];

var nonOverflowClasses = [
  'rotate-scale',
  'explode',
  'perspective'
];

var animationClasses = [].concat(overflowClasses, nonOverflowClasses);

// time: milliseconds it takes to init the transition
// effect: the css class to apply or unapply
// $units: an array of $.ified unites
var toggleUnits = function(opts){
  var deferred = Q.defer();

  var time = opts.time || 100;
  var effect = opts.effect || 'hide';
  var $shuffled = shuffle(opts.$units);

  if(overflowClasses.indexOf(effect) != -1)
    $shuffled.parent().css('overflow', 'hidden');
  else
    $shuffled.parent().css('overflow', 'visible');

  $shuffled.each(function(i, unit){
    setTimeout(function(){
      if(i == $shuffled.length-1)
        deferred.resolve();
      else
        deferred.notify(i);

      var isHidden = $(unit).hasClass('hide');

      if(isHidden){
        $(unit).addClass(effect);
        $(unit).removeClass('hide');
        setTimeout(function(){
          $(unit).addClass('animate');
        }, 10);
        setTimeout(function(){
          $(unit).removeClass(effect);
        }, 100);
      } else{
        $(unit).addClass('animate');
        $(unit).addClass(effect);
      }

      setTimeout(function(){
        if(!isHidden) {
          $(unit).addClass('hide');
          $(unit).removeClass(effect);
        }

        $(unit).removeClass('animate');
      }, (i+1)*(time*2));
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
