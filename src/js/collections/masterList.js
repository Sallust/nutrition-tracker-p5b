//js/collections/masterList.js

//this will house some of the back of house data? like favorites and maybe some other stuff
var app = app || {};

console.log("MASTER MASTER");

var MasterList = Backbone.Collection.extend({

	model: app.Food,

	//something with local storage ?

	favorited: function() {
		return this.filter( function ( food ) {
			return food.get('favorited');
		})
	}


});

app.masterList = new MasterList();