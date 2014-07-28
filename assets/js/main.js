
/* global require*/
'use strict';

// Require.js allows us to configure shortcut alias
require.config({

    shim:{
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        }
    },

    baseUrl:'static/js',

    paths:{
        jquery: 'lib/jquery/jquery',
        $cookie: 'lib/jquery/jquery.cookie',
        bootstrap: 'lib/bootstrap/js/bootstrap.js',
        underscore: 'lib/underscore/underscore',
        backbone: 'lib/backbone/backbone',
        text: 'lib/require/text'
    }
});

require(['backbone','views/app'], function(Backbone, AppView){

    // TODO Not working...
    _.templateSettings = {
            interpolate: /\{\{(.+?)\}\}/g
        };
    //

    // ===========
    // Ajax Setup
    // https://docs.djangoproject.com/en/dev/ref/contrib/csrf/#ajax
    // ===========
    function csrfSafeMethod(method) {
        // these HTTP methods do not require CSRF protection
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }

    $.ajaxSetup({
        beforeSend: function (xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });
    // ===========
    // http://plugins.jquery.com/cookie/
    var csrftoken = $.cookie('csrftoken');
    // ===========

    new AppView();

});