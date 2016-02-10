'use strict'
//js/views/foodListView.js

//This is the box that will house the actual food items

console.log("greetings from the foodBox")


var app = app || {};


app.FoodListView = Backbone.View.extend({

	el: '#food-main',

	events: {
		'click .addFood': 'toggleOpen'
	},

	initialize: function () {
		this.$list = this.$('#food-list')

		this.listenTo(app.foodList, 'add', this.addFood);
		this.listenTo(app.foodList, 'reset', this.addAllFood);

		this.listenTo(app.dateModel, 'new-list', this.updateListeners);


		//for now this is the mother view so totals gets initialized here
		app.totalsView = new app.TotalsView({model: app.currentTotals});
		app.sidebarView = new app.SidebarView();
		app.dateView = new app.DateView({model: app.dateModel});
		app.trendsView = new app.TrendsView({collection: app.totals});

	},
	addFood: function( food ) {
		var newView = new app.FoodView({ model: food});
		this.$list.append( newView.render().el).hide().slideDown(300);

	},
	addAllFood: function() {
		this.$list.html('');
		console.log(app.foodList.toJSON());
		app.foodList.each(this.addFood, this);
	},
	toggleOpen: function() {
		console.log("I'm open");
		$('#wrapper').toggleClass('toggled');
	},
	updateListeners:function() {
		//delete app.foodList

		//app.foodList = new FoodList();

		this.listenTo(app.foodList, 'add', this.addFood);
		this.listenTo(app.foodList, 'new', this.addAllFood);

		//app.currentTotals.updateListeners(); //now
	}


//TODO ADD LOGIC FOR GOING BETWEEN DIFFERENT COLLECTIONS
//It will probably use fetch
})



