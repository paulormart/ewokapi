
define([
    'jquery',
    'underscore',
    'backbone',
    'collections/snippets',
    'views/snippet',
    'text!templates/snippet_stats.html',
    'common'
    ],
    function($, _, Backbone, SnippetsCollection, SnippetView, statsTemplate, Common){

        'use strict';

        var SnippetsView = Backbone.View.extend({

            el: '#snippet-app',

            template: _.template(statsTemplate),

            // Events
            events: {
                'click #add': 'createSnippet'
            },


            initialize: function(){

                this.$main = this.$('#main');
                this.$snippetList = this.$('#snippet-list');
                this.$snippetStats = this.$('#snippet-stats');

                this.listenTo(SnippetsCollection, 'add', this.addOne );
                this.listenTo(SnippetsCollection, 'reset', this.addAll);
                this.listenTo(SnippetsCollection, 'change:completed', this.filterOne);
                this.listenTo(SnippetsCollection, 'filter', this.filterAll);
                this.listenTo(SnippetsCollection, 'all', this.render);

                SnippetsCollection.fetch({reset: true});

            },

            // render just means refreshing the statistics
            render: function(){

                var completed = SnippetsCollection.completed().length;
                var remaining = SnippetsCollection.remaining().length;

                if (SnippetsCollection.length)
                {
                    this.$main.show();
                    this.$snippetStats.show();

                    this.$snippetStats.html(this.template({
                        completed: completed,
                        remaining: remaining
                    }));

                    this.$('#filters li a')
                        .removeClass('selected')
                        .filter('[href="#/' + (Common.SnippetFilter || '') + '"]')
                        .addClass('selected');

                }else
                {
                    this.$main.hide();
                    this.$snippetStats.hide();
                }

            },

            // add a single snippet by creating a view for it and appending its element to the selected tag
            addOne: function (snippet) {
                var view = new SnippetView({ model: snippet});
                this.$snippetList.append(view.render().el);
            },

            // add All items in the collection at once
            addAll: function(){
                this.$snippetList.empty();
                SnippetsCollection.each(this.addOne, this);
            },

            filterOne: function(snippet){
                snippet.trigger('visible');
            },

            filterAll: function(){
                SnippetsCollection.each(this.filterOne, this);
            },

            // Helper Functions
            newAttributes: function() {

                var formData = {};

                $( '#addSnippet div' ).children( 'input' ).each( function( i, el ) {

                    if ($(el).attr('type')==='checkbox')
                    {
                        formData[ el.id ] = $(el).is(':checked');
                        $( el ).prop('checked', false);
                    }
                    else if( $( el ).val() != '' )
                    {
                        formData[ el.id ] = $( el ).val();
                        // Clear input field value
                        $( el ).val('');
                    }
                });

                return formData;

            },

            // Event Functions
            createSnippet: function(e){

                e.preventDefault();

                SnippetsCollection.create(this.newAttributes());

            }

            // TODOS clearCompleted

        });

        return SnippetsView;

});
