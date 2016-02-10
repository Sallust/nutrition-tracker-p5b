//js/views/sidebarView.js

/**
* @description Houses logic for sidebar View :search, autocomplete, favorites
* @constructor
* @param {collection}  app.searchResults - gets passed the collection with the search results
*/

var app = app || {};

app.SidebarView = Backbone.View.extend({
	el: '#sidebar',

	events: {
		'click #search': 'startSearch',
		'keypress #autocomplete': 'onEnter',
		'click #close': 'close'
	},

	initialize: function() {
		this.$input = this.$('#autocomplete');
		this.$search = this.$('#search-ul');
		this.$favorites = this.$('#favorites-ul');

		this.listenTo(this.collection, 'reset', this.showSearch); //reset triggered by fetching data

		this.listenTo(app.masterList, 'add', this.addFavorite);
		this.listenTo(app.masterList, 'reset', this.addAllFavorites);

		var url = 'https://apibeta.nutritionix.com/v2/autocomplete';
		var url2 = '&appId=0b882a3e&appKey=e7ff6dcf85cfe80ff009aea9fa767e8c';
		self = this;
		/**
		* @description Jquery autocomplete widget; makes AJAX calls, parses, and displays autocomplete
		* @description source: makes AJAX call, parses data into simple array and runs response on it (passing it to autocomplete)
		*/
		$("#autocomplete").autocomplete({
	  		source: function(request, response) {
	  			$.getJSON ( url + '?q=' + request.term + url2 , function(data) {
	  				var array = []
	  				data.forEach(function(item){
	  					array.push(item.text)
	  				});
	  				response(array); //passing autocomplete the simple array of autocomplete result names
	  			});
			},
	  		select: function( event, ui) { //on Select, set input and run search on it
	  			self.$input.val(ui.item.label)
	  			self.startSearch();
	  		}
		});
	},
	render: function() {
		this.$search.html(''); //clears any existing search items
		this.collection.each(function(food) {
			var itemView = new app.SearchItemView({ model: food });
			this.$search.append( itemView.render().el);
		}, this)//context

	},

	/**
	* @description Creates views for Favorited Search items
	* @param {obj} food - a food method that has been added to Favorites List
	*/
	addFavorite: function( food ) {
		if(food.get('favorited')){ //double checks food has been favorited
			var favItemView = new app.SearchItemView({ model: food });
			$('#favorites-ul').append( favItemView.render().el );
		}
	},
	addAllFavorites: function() {
		this.$favorites.html('');
		app.masterList.favorited().each(this.addFavorite, this);
	},
	/**
	* @description New search results having returned, it creates new views
	* @description and then renders and appends those views
	*/
	showSearch: function() {
		this.$search.html(''); //clears any previous search items
		this.collection.each(function(food) {
			var itemView = new app.SearchItemView({ model: food });
			this.$search.append( itemView.render().el);
		}, this); //context
	},
	/**
	* @description captures user input, formats it, and passes it to a searchResult method
	*/
	startSearch: function () {
		var searchTerm = this.$input.val().trim().replace(/ /g, '%20'); //makes search term pretty and ready to make ajax request
		this.collection.getSearch(searchTerm);
		this.$favorites.hide(); // User sees either favorites OR search, but never both
		this.$search.show();
		this.$search.html('<h2 class="loading">Loading Results...</h2>'); //loading indicator, cleared on return of search results
		this.$input.val('')
	},
	onEnter: function( e ) {
		if( e.keyCode === 13) { //ENTER KEY
			this.startSearch();
		}
	},
	/**
	* @description Closes view, prepares favorites to be seen on re-open
	*/
	close: function() {
		this.$input.val('')
		this.$favorites.show();
		this.$search.hide();
		$('#wrapper').toggleClass('toggled');
	}
})

app.sidebarView = new app.SidebarView({collection: app.searchResults});
