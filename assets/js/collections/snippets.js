
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
            url: '/api/snippets/',

            // Filters
            completed: function(){
                return this.where({linenos : true})
            },
            remaining: function(){
                return this.where({linenos : false})
            },

            // Server response
            parse: function(response) {

                // Paginator
                this.totalRecords = response.count;
                this.nextPage = response.next;
                this.previousPage = response.previous;

                return response.results;

                //return [{"content":"Hi there","id":1},{"content":"How are you?","id":2}];
            }

        });

        return new SnippetsCollection();

});
