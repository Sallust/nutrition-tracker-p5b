var app = app || {};


//I'm the food model, I'm the data surrounding one added food

console.log ('Hi from the food model');

app.Food = Backbone.Model.extend({
	//default food properties
	defaults: {
		foodName: 'Sample Food',
		calories: 200,
		protein: 4,
		fat: 2,
		added: false,
		favorited: false
	}

	//TODO What additional logic should live here?
	//Will user be changing data somehow?

})