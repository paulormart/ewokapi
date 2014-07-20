
var app = app || {};

app.Snippet = Backbone.Model.extend({
    defaults:{
        owner:  'me',
        title:  'First snippet',
        code:   '<\\>',
        lineos: '1',
        language:   'English',
        highlighted:    '1',
        style:  'normal'
    }
});