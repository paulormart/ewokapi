
define([
    'jquery',
    'underscore',
    'backbone',
    'models/snippet'
    ],
    function($, _, Backbone, Snippet){

        'use strict';

        var SnippetsCollection = Backbone.Collection.extend({

            model: Snippet,

            // > api backend
            // url: '/api/snippets/',

            // testing filters
            available: function(){
                return this.where({linenos : true})
            },
            remaining: function(){
                return this.where({linenos : false})
            },

            // Server response
            parse: function(response) {
                // by default response is returned, but you can manipulate the response here.
                //return response.results;
                return response;
                //return [{"content":"Hi there","id":1},{"content":"How are you?","id":2}];
            }

        });

        return new SnippetsCollection();

});
