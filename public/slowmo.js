$(function(){
  content.slowmos.forEach(function(slowmo){
    makeSlowmo(slowmo);
  });
});


var makeSlowmo = function(slowmo){
  var rendered = templates.slowmo(slowmo);
  var selector = '#slowmo-' + slowmo.shortCode;

  $('#content').prepend(rendered);
  $(selector)[0].playbackRate = '.25';
};
