var app = app || {}

console.log('Hello from the food list')

//I will grow up to the the fancy array holding the list of foods

var FoodList = Backbone.Collection.extend({

	//This will be list of food models
	model: app.food

	//eventually filter functions will be added

	//Logic regarding the order of the list would live here
	//such as

	//favorited:



})

app.foodList = new FoodList();