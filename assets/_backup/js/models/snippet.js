
var app = app || {};

app.Snippet = Backbone.Model.extend({

    /*
    defaults:{
        owner:  'me',
        title:  'First snippet',
        code:   '<\\>',
        lineos: '1',
        language:   'English',
        highlight:    '1',
        style:  'normal'
    },*/

    parse: function( response ) {
        //response.id = response._id;
        //response.id = response.url;
        return response;
    }

});