//js/views foodView
var app = app || {};

/**
* @description Individual View for model in the Food List, controls self-delete and favorite
* @constructor View
* @param {obj}  {model: food} - gets passed the model added to foodList
*/
app.FoodView = Backbone.View.extend({
	tagName: 'li',

	template:_.template( $('#food-template').html() ),

	events: {
		'click .destroy': 'clear',
		'click .star:not(.favorited)': 'makeFavorite', //only non-favorited items can be made favorite
		'click .favorited': 'removeFavorite'
	},

	initialize: function() {
		this.listenTo(this.model, 'destroy', this.disappear);
		this.listenTo(this.model, 'change:favorited', this.render); //re-renders on favorite status change
	},

	render: function() {
		this.$el.html( this.template( this.model.attributes ) );
		return this;
	},
	/**
	* @description Toggle the state of favorited item and remove/add to collection
	*/
	makeFavorite: function() {
		this.model.save('favorited', true);
		app.masterList.add( this.model );
	},
	removeFavorite:function () {
		this.model.save('favorited', false);
		app.masterList.remove( this.model );
	},
	/**
	* @description Destroy model & then remove it's html with a little animation
	*/
	clear: function() {
		this.model.destroy();
	},
	disappear: function() {
		this.$el.fadeOut(400,'swing', function() {
			this.remove();
		} );
	}
});