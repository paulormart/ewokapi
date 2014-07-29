
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/snippet_detail.html',
    'common'
    ],
    function($, _, Backbone, snippetTemplate, Common){

        'use strict';

        var SnippetView = Backbone.View.extend({

            tagName: 'div',
            className: 'snippetContainer',
            template: _.template(snippetTemplate),

            // DOM events
            events: {
                'click .toggle':	'toggleCompleted',
                'click .remove':    'clear'
            },

            initialize: function(){
                this.listenTo(this.model, 'change', this.render);
                this.listenTo(this.model, 'destroy', this.remove);
                this.listenTo(this.model, 'visible', this.toggleVisible);
            },

            render: function(){

                this.$el.html(this.template(this.model.attributes));
                this.$el.toggleClass('completed', this.model.get('linenos'));
                this.toggleVisible();
                return this;

            },

            // Remove the item, destroy the model from *api* and delete its view.
		    clear: function(){
                this.model.destroy();
            },

            toggleVisible: function(){
                this.$el.toggleClass('hidden',  this.isHidden());
            },

            isHidden: function () {
			    var isCompleted = this.model.get('linenos');
			    return (
			        // hidden cases only
				    (!isCompleted && Common.SnippetFilter === 'completed') ||
				    (isCompleted && Common.SnippetFilter === 'active')
			    );
		    },

            // Toggle the `"linenos"` state of the model.
            toggleCompleted: function () {
                this.model.toggle();
            }

        });

        return SnippetView;
    });