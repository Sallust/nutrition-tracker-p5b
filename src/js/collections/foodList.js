'use strict'

var app = app || {}

console.log('Hello from the food list')

//I will grow up to the the fancy array holding the list of foods

var FoodList = Backbone.Firebase.Collection.extend({

	//This will be list of food models
	model: app.Food,

	url:'',

	urlStr: 'https://my-nutrition-tracker.firebaseio.com/foodList/',

	initialize: function() {
		this.listenTo(app.dateModel, 'change:todayFileStr', this.getDifferentDay);

		//this.url =  new Firebase(this.urlStr + app.dateModel.get('todayFileStr'));
		this.url =  this.urlStr + app.dateModel.get('todayFileStr')

		//this.url = this.urlStr + '2016-02-03';
		//setTimeout(this.trigger('reset'), 10, this)
		var self = this;
		setTimeout( function(self) { //Just enough time to wait for listeners to be updated to new instance of Foodlist
			self.trigger('new')
		},10, self);
	},

	getDifferentDay: function(model, newStr) {
		//this.url = this.urlStr + newStr;
		console.log('DISASTER');
		console.log(this.url);


		//app.foodList = new FoodList();
		//this.fetch({reset: true});new Firebase
	},

/*
	date: function () {

		return now.toDateString();
	},


*/

	//eventually filter functions will be added

	//Logic regarding the order of the list would live here
	//such as

	//favorited:

	getTotalCalories: function() {
		var total = 0;
		this.each(function(food) {
			total += food.get('calories');
		})
		return total;
	}


});

app.foodList = new FoodList();