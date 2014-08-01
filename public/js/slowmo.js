var slowmoTemplate = _.template([
  '<div class="slowmo-container">',
    "<a href='/slowmo/<%= shortCode %>'>",
      '<video id="slowmo-<%= shortCode %>" autoplay loop poster="<%=poster%>">',
        '<source src="<%=mp4%>" type="video/mp4"></source>',
        '<source src="<%=webm%>" type="video/webm"></source>',
      '</video>',
      '</a>',
      '<div class="social">',
        '<span class="st_facebook_large" displayText="Facebook" st_url="http://share-guitar.com/slowmo/<%= shortCode %>"></span>',
        '<span class="st_twitter_large" displayText="Tweet" st_url="http://share-guitar.com/slowmo/<%= shortCode %>"></span>',
        '<span class="st_email_large" displayText="Email" st_url="http://share-guitar.com/slowmo/<%= shortCode %>"></span>',
      '</div>',
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

  stLight.options({
    publisher: "9a60c831-fc15-4069-b4e3-c47e81ce5b0f",
    doNotHash: false,
    doNotCopy: false,
    hashAddressBar: false
  });

});
