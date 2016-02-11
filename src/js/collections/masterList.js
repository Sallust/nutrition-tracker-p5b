//js/collections/masterList.js

/**
* @description Constructs  & syncs master list collection fetching from server
* @description Set up for future expansion, currently is just the favorites list
* @constructor
* @param none - only one instance
*/
var app = app || {};

var MasterList = Backbone.Firebase.Collection.extend({

	model: app.Food,

	url:'https://my-nutrition-tracker.firebaseio.com/masterList',

	favorited: function() {
		return this.filter( function ( food ) {
			return food.get('favorited');
		});
	},
	initialize: function() {
		var masterTimeout = setTimeout(function() {
			alert('Error getting your favorites. Try again later please!');
	    }, 5000);
	    this.on('sync', function() {
	    	clearTimeout(masterTimeout);
	    });
	}
});

app.masterList = new MasterList();