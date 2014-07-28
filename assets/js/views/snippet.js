
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/snippet_detail.html'],
    function($, _, Backbone, snippetTemplate){

        'use strict';

        var SnippetView = Backbone.View.extend({
            tagName: 'div',
            className: 'snippetContainer',
            template: _.template(snippetTemplate),

            // DOM events
            events: {
                'click .remove':'removeSnippet'
            },

            initialize: function(){
                this.listenTo(this.model, 'change', this.render);
                this.listenTo(this.model, 'destroy', this.remove);
            },

            render: function(){

                this.$el.html(this.template(this.model.attributes));
                return this;

            },

            removeSnippet: function(){
                // Delete model
                this.model.destroy();

            }

        });

        return SnippetView;
    });