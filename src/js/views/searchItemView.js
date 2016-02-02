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
		//listen to its model? I don't think the model will change so..

	},

	render: function() {
		this.$el.html( this.template( this.model.attributes ) );
		return this;

	},

	addThisFood: function () {
		app.foodList.create ( this.model )
	}

})