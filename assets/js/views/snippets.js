
var app = app || {};

app.SnippetsView = Backbone.View.extend({

    el: '#snippets',

    initialize: function(initialSnippets){
        this.collection = new app.Snippets(initialSnippets);
        this.render();

        // Initialize the event listener
        this.listenTo(this.collection, 'add', this.renderSnippet );

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

        this.collection.add( new app.Snippet( formData ) );
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
