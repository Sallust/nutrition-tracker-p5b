//js/views/dateView.js

var app = app || {};

console.log('DATE PLEASE!');


//I will hold the logic and date surrounding creating and changing the date

app.DateView = Backbone.View.extend({

	el:'#date',

	template: _.template($('#date-template').html() ),

	events: {
		'click #left-btn': 'goToYesterday'
		//click left, click right
	},

	initialize: function() {
		//this.dateInFocus = new Date(Date.now());
	//	this.dayBefore = this.currentDate.setDate(this.currentDate.getDate() - 1);
	//	this.dayAfter = this.currentDate.setDate(this.currentDate.getDate() + 1);
		//I don't think it needs to listen to anybody
		//jk, probably needs to listen for when the app is started
	},

	render: function() {

		//var date = new Date(Date.now())
		//var yesterday = date.setDate(date.getDate() - 1);
		//var tmrw = date.setDate(date.getDate() + 1);


		//this.$el.html( this.template({
//
		//}))
		//hmm no , we need to keep track of what date we're looking at

	},
	goToYesterday: function() {
		console.log('everything I own in a box to the left');
		app.dateModel.setRelativeDay(-1);
		//app.foodList = new FoodList();
		//app.foodList.fetchDifferentDay( )
	},
	goToTmrw: function() {

	}

})