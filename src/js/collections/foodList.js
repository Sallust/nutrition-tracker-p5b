var app = app || {}

console.log('Hello from the food list')

//I will grow up to the the fancy array holding the list of foods

var FoodList = Backbone.Firebase.Collection.extend({

	//This will be list of food models
	model: app.Food,

	url:'https://my-nutrition-tracker.firebaseio.com/foodList',

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


})

app.foodList = new FoodList();