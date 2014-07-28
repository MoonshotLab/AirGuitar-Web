templates.slowmo = _.template([
  '<h2>',
    '<span class="key">Short Code</span>',
    '<span class="val"><%= shortCode %>',
  '</h2>',
  '<div class="slowmo-container">',
    '<video id="slowmo-<%= shortCode %>" width="750" autoplay="true" loop="true">',
      '<source src="<%=url%>"></source>',
    '</video>',
  '</div>'
].join(''));


templates.awesome = _.template([
  '<h2>',
    '<span class="key">Short Code</span>',
    '<span class="val"><%= shortCode %>',
  '</h2>',
  '<% columns.forEach(function(column){ %>',
    '<ul>',
      '<% column.forEach(function(url){ %>',
        '<li>',
          '<img width="150px" src="<%= rootUrl %>/<%= url %>"',
        '</li>',
      '<% }); %>',
    '</ul>',
  '<% }); %>'
].join(''));
