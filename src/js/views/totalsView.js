//js/views/totalsView.js

//I will store the view for the totals

var app = app || {};

console.log("grettings from the summary")

app.TotalsView = Backbone.View.extend({
	el:'#totals-view',

	template: _.template($('#totals-template').html() ),

	initialize: function() {
		//this.listenTo(app.foodList, 'all', this.render);
		//this.listenTo(app.dateModel, 'change', this.updateListeners);
		this.listenTo(this.model, 'change', this.render);

		console.log("I've been started");
		this.render();
	},
	render: function() {
		//var totals = app.foodList.getTotalCalories();
		this.$el.html(this.template({
			calorieTotal: this.model.get('cal')
		}))
		console.log('I have noticed a change');

	},
	updateListeners: function() {
		this.listenTo(app.foodList, 'all', this.render);
	}


})
