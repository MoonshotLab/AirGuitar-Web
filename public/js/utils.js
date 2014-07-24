var debugMode = false;
var params = window.location.search.replace('?', '').split('&');

if(params.indexOf('debug=true') != -1)
  debugMode = true;


$(function(){
  if(debugMode){
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
  }
});
