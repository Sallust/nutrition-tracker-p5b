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

	//I might not need this template if template is delagated to indiv items
	//resultsTemplate: _.template($('#results-template').html() ),

	events: {
		'click #search': 'startSearch',
		'keypress #autocomplete': 'onEnter',
		'click #close': 'close'

		//important events!!
		//addition of new food item

		//hit search button

		//movement? or maybe that's handled in side file
	},

	initialize: function() {
		this.$input = this.$('#autocomplete');

		this.listenTo(app.searchResults, 'reset', this.render);

	},

	render: function() {
		this.$('#search-ul').html(''); //clears any existing search items

		app.searchResults.each(function(food) {
			var itemView = new app.SearchItemView({ model: food });
			$('#search-ul').append( itemView.render().el);
		})

	},

	addFoodModel: function() {

	},
	addFoodView: function() {

	},
	startSearch: function () {
		var searchTerm = this.$input.val().trim().replace(/ /g, '%20'); //makes search term pretty and ready to make ajax request
		console.log(searchTerm)
		app.searchResults.getSearch(searchTerm);

	},
	onEnter: function( e ) {
		if( e.keyCode === 13) { //ENTER KEY
			this.startSearch();
		}
	},

	close: function() {
		console.log("Fancy closing logic");
		$('#wrapper').toggleClass('toggled');

	}

})