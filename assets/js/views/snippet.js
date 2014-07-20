
var app = app || {};

app.SnippetView = Backbone.View.extend({
    tagName: 'div',
    className: 'snippetContainer',
    template: _.template($('#snippetTemplate').html()), // this is the snippetTemplate id from the script tag, which willl be replaced

    render: function(){

        this.$el.html(this.template(this.model.attributes)); // this.$el is what we have just defined in the tagName above

        return this;

    }

});