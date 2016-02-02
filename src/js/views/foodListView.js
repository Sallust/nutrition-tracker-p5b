//js/views/foodListView.js

//This is the box that will house the actual food items

console.log("greetings from the foodBox")


var app = app || {};


app.FoodListView = Backbone.View.extend({
	//this element is parked here
	el: '#food-list',

	//Maybe for now we Include a running subtotal at the bottom?


	events: {
		//when someone clicks add item

	},

	initialize: function () {
		this.listenTo(app.foodList, 'add', this.addFood);
		this.listenTo(app.foodList, 'all', this.render);

		//for now this is the mother view so totals gets initialized here
		app.totalsView = new app.TotalsView();
		app.sidebarView = new app.SidebarView();

	},
	render: function() {

	},

	addFood: function( food ) {
		var newView = new app.FoodView({ model: food});
		$('#food-list').append( newView.render().el);

	}

})



