
var app = app || {};

app.Snippets = Backbone.Collection.extend({
    model: app.Snippet,

    // > api backend
    url: '/api/snippets/',

   parse:function(response) {
    // by default response is returned, but you can manipulate the response here.
    // given your example - we just return the static content - will be set on collection

       return response.results;
       //return [{"content":"Hi there","id":1},{"content":"How are you?","id":2}];
  }

});
