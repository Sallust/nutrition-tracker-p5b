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
		'click #close': 'close',

		//important events!!
		//addition of new food item

		//hit search button

		//movement? or maybe that's handled in side file
	},

	initialize: function() {
		this.$input = this.$('#autocomplete');
		this.$search = this.$('#search-ul');
		this.$favorites = this.$('#favorites-ul');

		this.listenTo(app.searchResults, 'reset', this.showSearch); //reset triggered by fetching data

		this.listenTo(app.masterList, 'add', this.addFavorite);
		this.listenTo(app.masterList, 'reset', this.addAllFavorites);

		//this.renderFavorites();
	},

	render: function() {
		this.$search.html(''); //clears any existing search items

		app.searchResults.each(function(food) {
			var itemView = new app.SearchItemView({ model: food });
			this.$search.append( itemView.render().el);
		}, this)//context

	},
	addFavorite: function( food ) {
		if(food.get('favorited')){
			var favItemView = new app.SearchItemView({ model: food });
			$('#favorites-ul').append( favItemView.render().el );
		}
	},
	addAllFavorites: function() {
		this.$favorites.html('');
		app.masterList.favorited().each(this.addFavorite, this);
	},

	/*
	renderFavorites: function() {

		app.masterList.favorited().forEach(function( food ) {
			var favItemView = new app.SearchItemView({ model: food});
			this.$favorites.append( favItemView.render().el);
		})
	}, */
	showSearch: function() {
		this.$favorites.hide();
		this.$search.show();
		this.$search.html(''); //clears any existing search items

		app.searchResults.each(function(food) {
			var itemView = new app.SearchItemView({ model: food });
			this.$search.append( itemView.render().el);
		}, this)//context
	},

	addFoodModel: function() {

	},
	addFoodView: function() {

	},
	startSearch: function () {
		var searchTerm = this.$input.val().trim().replace(/ /g, '%20'); //makes search term pretty and ready to make ajax request
		app.searchResults.getSearch(searchTerm);

		this.$input.val('')

	},
	onEnter: function( e ) {
		if( e.keyCode === 13) { //ENTER KEY
			this.startSearch();
		}
	},

	close: function() {  //addition of anything to food list causes this
		this.$favorites.show();
		this.$search.hide();
		$('#wrapper').toggleClass('toggled');

	}

})