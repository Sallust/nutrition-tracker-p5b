//js/collections/masterList.js

//this will house some of the back of house data? like favorites and maybe some other stuff
var app = app || {};

console.log("MASTER MASTER");

var MasterList = Backbone.Firebase.Collection.extend({

	model: app.Food,

	url:'https://my-nutrition-tracker.firebaseio.com/masterList',


	//something with local storage ?

	favorited: function() {
		return this.filter( function ( food ) {
			return food.get('favorited');
		})
	}


});

app.masterList = new MasterList();