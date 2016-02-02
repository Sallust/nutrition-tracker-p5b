//js/views/sidebarView.js

//This is where the search and favorite items will live

//It will be structured similar to the app.js it will cach references to stuff


//Logic that needs to live here

//   The actual addition of a food item to the list
//    maybe favorite it now? maybe later

var app = app || {};

console.log("hey from the other side");

app.SidebarView = Backbone.View.extend({
	el: '#sidebar',

	resultsTemplate: _.template($('#results-template').html() ),

	events: {
		//important events!!
		//addition of new food item

		//movement? or maybe that's handled in side file
	},

	initialize: function() {

	},

	render: function() {

	},

	addFoodModel: function() {

	},
	addFoodView: function() {

	}

})