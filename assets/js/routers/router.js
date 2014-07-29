
define([
    'underscore',
    'backbone',
    'collections/snippets',
    'common'
    ],
    function(_, Backbone, SnippetCollection, Common) {

        'use strict';

        var SnippetRouter = Backbone.Router.extend({

            routes: {
                '*filter': 'setFilter'
            },

            setFilter: function (param){

                // Set the current filter to be used
                Common.SnippetFilter = param || '';

                // Trigger a collection filter event, causing hiding/unhiding
                SnippetCollection.trigger('filter');
            }
        });

        return SnippetRouter;

    });