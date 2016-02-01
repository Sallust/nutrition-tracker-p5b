//js/routers/router.js

//The TodoRouter

var app = app || {};

var Workspace = Backbone.Router.extend({
	routes: {
		'*filter': 'setFilter' // the asterist is a splat
	},

	setFilter: function( param ) {
		//set the current filter
		if(param) {
			param = param.trim();
		}
		app.TodoFilter = param || '';

		//Trigger a collection filger event  causing hiding /unhiding of Todo
		//view items
		app.Todos.trigger('filter');
	}
});

app.TodoRouter = new Workspace();
Backbone.history.start();