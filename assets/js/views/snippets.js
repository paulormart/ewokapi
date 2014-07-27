
var app = app || {};

app.SnippetsView = Backbone.View.extend({

    el: '#snippets',

    initialize: function(initialSnippets){
        this.collection = new app.Snippets(initialSnippets);
        // > api backend, to get the app to retrieve the models at page load
        this.collection.fetch({reset: true}),
        // The Backbone documentation recommends inserting all models when the page is generated
        // on the server side, rather than fetching them from the client side once the page is loaded.
        // Since this chapter is trying to give you a more complete picture of how to communicate with
        // a server, we will go ahead and ignore that recommendation.
        this.render();

        // Initialize the event listener
        this.listenTo(this.collection, 'add', this.renderSnippet );

        // > We need to do this since the models are fetched asynchronously after the page is rendered.
        // When the fetch completes, Backbone fires the reset event, as requested by the reset: true option,
        // and our listener re-renders the view.
        this.listenTo(this.collection, 'reset', this.render);


    },

    // Events
    events: {
        'click #add':'addSnippet'
    },

    // Functions
    addSnippet: function( e ) {

        e.preventDefault();

        var formData = {};

        $( '#addSnippet div' ).children( 'input' ).each( function( i, el ) {
            if( $( el ).val() != '' )
            {
                formData[ el.id ] = $( el ).val();
            }
        });

        //this.collection.add( new app.Snippet( formData ) );

        formData = [{
    "owner": "dev",
    "title": "Pauloe",
    "code": "def hello(self):\r\n    return \"hello\"",
    "linenos": false,
    "language": "Clipper",
    "style": "autumn"
}]
        this.collection.add( formData ); // to get the snippets persisted in db
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
