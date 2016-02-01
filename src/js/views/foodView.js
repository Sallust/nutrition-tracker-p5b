//js/views foodView
//Here is where I will put the logic for deleting the item,
//favoriting the item,
//deleting the item
//if I want to be fancy, maybe an edit mode

var app = app || {};

console.log('Hi from the individual food view');

app.foodView = Backbone.View.extend({
	//the kind of div or tag you want
	tagName: 'li',

	//this is just saving the template we made for reference
	template:_.template( $('#food-template').html() ),
})