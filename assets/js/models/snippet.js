
define([
    'underscore',
    'backbone'
    ],
    function(_, Backbone) {

        'use strict';

        var Snippet = Backbone.Model.extend({

            /*defaults:{
                owner:  'dev',
                title:  'First snippet',
                code:   '<\\>',
                linenos: true,
                language:   'English',
                highlight:    '1',
                style:  'normal'
            },
            */
            initialize: function(){},

            parse: function( response ) {
                //response.id = response._id;
                return response;
            },

            // Toggle the `linenos` state of this snippet item.
            toggle: function () {
                this.save({
                    linenos: !this.get('linenos')
                });
            }

        });

        return Snippet;
});



