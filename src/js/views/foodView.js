//js/views foodView
//Here is where I will put the logic for deleting the item,
//favoriting the item,
//deleting the item
//if I want to be fancy, maybe an edit mode

var app = app || {};

console.log('Hi from the individual food view');

app.FoodView = Backbone.View.extend({
	//the kind of div or tag you want
	tagName: 'li',

	//this is just saving the template we made for reference
	template:_.template( $('#food-template').html() ),

	events: {
		'click .destroy': 'clear',
		'click .star:not(.favorited)': 'makeFavorite', //only non-favorited items can be made favorite
		'click .favorited': 'removeFavorite'
		//click delete
		//click save?
	},

	initialize: function() {
		//what should the view of the individual food listen to?
		this.listenTo(this.model, 'destroy', this.remove);
		this.listenTo(this.model, 'change:favorited', this.render);
	},

	render: function() {
		this.$el.html( this.template( {
			foodName: this.model.get('foodName'),
			calories: this.model.get('calories'),
			url: this.model.get('imageUrl'),
			favorited: this.model.get('favorited'),
			protein: this.model.get('prot'),
			carb: this.model.get('carb'),
			fat: this.model.get('fat'),
			sug: this.model.get('sug'),
			chol: this.model.get('chol'),
			fiber: this.model.get('fib')



			} ) ); //the html of this element is the template which is passed the attibutes to change placeholders

		return this;
	},
	makeFavorite: function() {
		this.model.save('favorited', true);
		app.masterList.add( this.model );
	},
	removeFavorite:function () {
		this.model.save('favorited', false);
		app.masterList.remove( this.model );
	},
	clear: function() {
		this.model.destroy();
	}


})