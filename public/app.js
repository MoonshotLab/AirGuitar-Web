var makeAwesome = function(awesome){
  var rendered = templates.awesome(awesome);
  $('#content').prepend(rendered);
};

var makeSlowmo = function(slowmo){
  var rendered = templates.slowmo(slowmo);
  var selector = '#slowmo-' + slowmo.shortCode;

  $('#content').prepend(rendered);
  $(selector)[0].playbackRate = '.25';
};


socket.on('new-awesome', makeAwesome);
socket.on('new-slowmo', makeSlowmo);


$(function(){

  if(content.awesomes){
    content.awesomes.forEach(function(awesome){
      makeAwesome(awesome);
    });
  }

  if(content.slowmos){
    content.slowmos.forEach(function(slowmo){
      makeSlowmo(slowmo);
    });
  }

});
