var makeSlowmo = function(slowmo){
  var rendered = templates.slowmo(slowmo);
  var selector = '#slowmo-' + slowmo.shortCode;

  $('#content').prepend(rendered);
  $(selector)[0].playbackRate = opts.videoPlaybackRate;
};


socket.on('new-slowmo', makeSlowmo);


$(function(){
  if(content.slowmos){
    content.slowmos.forEach(function(slowmo){
      makeSlowmo(slowmo);
    });
  }
});
