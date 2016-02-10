//js/views/dateView.js
var app = app || {};
/**
* @description Displays Current Date info and takes user input to change date
* @constructor View
* @param {model} app.date - the model holding date related data
*/
app.DateView = Backbone.View.extend({

	el:'#date',

	template: _.template($('#date-template').html() ),

	events: {
		'click #left-btn': 'goToYesterday',
		'click #left-d': 'goToYesterday',
		'click #right-btn': 'goToTmrw',
		'click #right-d': 'goToTmrw'
	},

	initialize: function() {
		this.listenTo(this.model, 'all', this.render);
		this.render();
	},
	render: function() {
		this.$el.html( this.template( this.model.attributes) ); //the template which is passed the attibutes to change placeholders
	},

	goToYesterday: function() {
		this.model.setRelativeDay(-1);
		this.newFoodList();
	},
	goToTmrw: function() {
		this.model.setRelativeDay(1);
		this.newFoodList();
	},
	/**
	* @description Clears currentFoodList and instantiates a new one
	* @ This allows foodlist with new url to be fetched
	* @ TODO refactor the data organization so this workaround isn't needed
	*/

	newFoodList: function() {
		delete app.foodList; //attempt to delete refernce to old date's foodList
		app.foodList = new FoodList();
		this.model.trigger('new-list'); //triggers update of listeners ->current Totals & foodlist
	}
});

