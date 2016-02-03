//js/view/searchItemView.js

//this is where the view for each search item lives

console.log("SEARCH ITEM!!!!");

var app = app || {};

app.SearchItemView = Backbone.View.extend({
	tagName: 'li',

	template: _.template($('#search-item-template').html() ),

	events: {
		'click': 'addThisFood'
		//Favorited
		//Add to list

	},

	initialize: function() {
		this.listenTo(this.model.get('image'), 'change', this.render);
		//listen to its model? I don't think the model will change so..

	},

	render: function() {
		this.$el.html( this.template( {
			foodName: this.model.get('foodName'),
			calories: this.model.get('calories'),
			url: this.model.get('image').get('url')

			} ) );
		return this;

	},

	addThisFood: function () {
		app.foodList.add ( this.model ); //I think create is causing weird errors
		app.sidebarView.close(); //close side window
	}

})