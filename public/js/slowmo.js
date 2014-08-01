var slowmoTemplate = _.template([
  '<div class="slowmo-container">',
    "<a href='/slowmo/<%= shortCode %>'>",
      '<video id="slowmo-<%= shortCode %>" autoplay="true" loop="true">',
        '<source src="<%=mp4%>" type="video/mp4"></source>',
        '<source src="<%=webm%>" type="video/webm"></source>',
      '</video>',
      '</a>',
  '</div>'
].join(''));


var makeSlowmo = function(slowmo){
  var rendered = slowmoTemplate(slowmo);
  var selector = '#slowmo-' + slowmo.shortCode;

  $('#content').prepend(rendered);
};


socket.on('new-slowmo', makeSlowmo);


$(function(){
  if(preloadedSlowmos){
    preloadedSlowmos.forEach(function(slowmo){
      makeSlowmo(slowmo);
    });
  }
});
