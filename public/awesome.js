$(function(){
  content.awesomes.forEach(function(awesome){
    makeAwesome(awesome);
  });
});


var makeAwesome = function(awesome){
  var rendered = templates.awesome(awesome);
  $('#content').prepend(rendered);
};
