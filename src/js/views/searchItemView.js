//js/view/searchItemView.js
var app = app || {};
/**
* @description Individual View tied to one search item result;
* @description controls addition of its model to main food list or favorites list
* @constructor View
* @param {model}  app.food - passed the food models from search Results fetch
*/
app.SearchItemView = Backbone.View.extend({
	tagName: 'li',

	className: 'search-li',

	template: _.template($('#search-item-template').html() ),

	events: {
		'click .search-name': 'addThisFood',
		'click .side-25': 'addThisFood',
		'click .star:not(.favorited)': 'makeFavorite', //only non-favorited items can be made favorite
		'click .favorited': 'removeFavorite'
	},
	initialize: function() {
		this.listenTo(this.model, 'change:imageUrl', this.render);
		this.listenTo(this.model, 'change:favorited', this.render);
		this.listenTo(this.model, 'destroy', this.remove);
	},
	render: function() {
		this.$el.html( this.template( this.model.attributes) );
		return this;
	},
	/**
	* @description Create/save new food model in foodList by passing attributes from search food
	* @description Closes parent side window
	*/
	addThisFood: function () {
		app.foodList.create ( this.model.attributes );
		app.sidebarView.close();
	},
	makeFavorite: function() {
		this.model.set('favorited', true);
		app.masterList.create( this.model.attributes );
	},
	removeFavorite:function () {
		this.model.set('favorited', false);
		this.model.destroy();
	}
})