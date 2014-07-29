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
// $units: an array of $.ified units
var toggleUnits = function(opts){
  var deferred = Q.defer();

  var time = opts.time || 100;
  var effect = opts.effect || 'hidden';
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



var colorUnits = function(){
  var $units = $('.unit');

  $.each($units, function(i, unit){
    var color = [
      'rgb(',
        Math.floor(Math.random() * 255) + 1,
        ',',
        Math.floor(Math.random() * 255) + 1,
        ',',
        Math.floor(Math.random() * 255) + 1,
      ')'
    ].join('');

    $(unit).css('backgroundColor', color);
  });
};



var shuffle = function(o){
  for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
};
