
var app = app || {};

app.SnippetsView = Backbone.View.extends({
    el: '#snippets',

    initialize: function(initialSnippets){
        this.collection = new app.Snippets(initialSnippets);
        this.render();
    },

    // render snippets by render each snippet in its collection
    render: function(){
        this.collection.each(function(item){
            this.renderSnippet(item);
        }, this);
    },

    // render a snippet by creating a snippetView and appending the element it renders to the snippet's element
    renderSnippet: function(item){
        var snippetView = new app.SnippetView({
            model: item
        });
        this.$el.append(snippetView.render().el);
    }

});