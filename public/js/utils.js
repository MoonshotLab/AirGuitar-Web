// Create a global opts object
var opts = {
  videoPlaybackRate : '.25'
};

var queryParams = location.search.replace('?', '').split('&');
queryParams.forEach(function(param){
  var split = param.split('=');
  opts[split[0]] = split[1];
});



// Reverse the order of a named object
var reverseNamedObject = function(obj){
  var arr = [];
  for(var key in obj){
    arr.push(obj[key]);
  }

  arr.reverse();
  arr.forEach(function(item, i){
    obj[i] = item;
  });
};
