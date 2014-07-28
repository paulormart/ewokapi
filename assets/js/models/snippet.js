
define([
    'underscore',
    'backbone'
    ],
    function(_, Backbone) {

        'use strict';

        var Snippet = Backbone.Model.extend({


            /*defaults:{
                owner:  'me',
                title:  'First snippet',
                code:   '<\\>',
                linenos: '1',
                language:   'English',
                highlight:    '1',
                style:  'normal'
            },*/

            initialize: function(){},

            parse: function( response ) {
                //response.id = response._id;
                //response.id = response.url;
                return response;
            }

        });

        return Snippet;
});



