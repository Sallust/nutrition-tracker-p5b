'use strict'
//js/views/foodListView.js

//This is the box that will house the actual food items

console.log("greetings from the foodBox")


var app = app || {};


app.FoodListView = Backbone.View.extend({
	//this element is parked here
	el: '#food-main',

	//Maybe for now we Include a running subtotal at the bottom?


	events: {
		'click .addFood': 'toggleOpen'
		//when someone clicks add item
		//Event something changing the selected date

	},

	initialize: function () {
		this.$list = this.$('#food-list')

		this.listenTo(app.foodList, 'add', this.addFood);
		this.listenTo(app.foodList, 'reset', this.addAllFood);
		this.listenTo(app.foodList, 'all', this.render);

		this.listenTo(app.dateModel, 'change', this.updateListeners);


		//for now this is the mother view so totals gets initialized here
		app.totalsView = new app.TotalsView({model: app.currentTotals});
		app.sidebarView = new app.SidebarView();
		app.dateView = new app.DateView({model: app.dateModel});

	},
	render: function() {

	},

	addFood: function( food ) {
		var newView = new app.FoodView({ model: food});
		this.$list.append( newView.render().el);
		console.log('ADDED')

	},
	addAllFood: function() {
		this.$list.html('');
		console.log('sup gurl');
		app.foodList.each(this.addFood, this);
	},
	toggleOpen: function() {
		console.log("I'm open");
		$('#wrapper').toggleClass('toggled');
	},
	changeDate: function() {
		//How do we check if a list exists?
		//How do we access the data? a new collection?.. yeah a new collection
		//TODO better separation of views; it's getting sloppy
	},
	updateListeners:function() {
		//console.log(delete app.foodList)
		delete app.foodList
		//console.log(app.foodList.url)
		//console.log(delete app.foodList)

		app.foodList = new FoodList();

		console.log("UPDATED")
		this.listenTo(app.foodList, 'add', this.addFood);
		this.listenTo(app.foodList, 'new', this.addAllFood);

		app.currentTotals.updateListeners();
	}


//TODO ADD LOGIC FOR GOING BETWEEN DIFFERENT COLLECTIONS
//It will probably use fetch
})



