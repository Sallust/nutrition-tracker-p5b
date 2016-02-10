'use strict'
//js/views/foodListView.js
var app = app || {};

/**
* @description Builds view where added food items are displayed
* @constructor View
* @param none - only one instance
*/
app.FoodListView = Backbone.View.extend({

	el: '#food-main',

	events: {
		'click .addFood': 'toggleOpen'
	},

	initialize: function () {
		this.$list = this.$('#food-list')

		this.listenTo(app.foodList, 'add', this.addFood);
		this.listenTo(app.foodList, 'reset', this.addAllFood);
		this.listenTo(app.dateModel, 'new-list', this.updateListeners);//custom event fired when new app.foodList with new date created
	},
	/**
	* @description Create & append food views, runs an animation on append
	* @param {model} food - the food model just added to foodList
	*/
	addFood: function( food ) {
		var newView = new app.FoodView({ model: food});
		this.$list.append( newView.render().el).hide().slideDown(300);
	},
	addAllFood: function() {
		this.$list.html('');
		app.foodList.each(this.addFood, this);
	},
	toggleOpen: function() {
		$('#wrapper').toggleClass('toggled');
	},
	/**
	* @description Update listeners to new instance of app.foodList
	*/
	updateListeners:function() {
		this.listenTo(app.foodList, 'add', this.addFood);
		this.listenTo(app.foodList, 'new', this.addAllFood);
	}
})
