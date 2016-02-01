var app = app || {};

console.log("greetings from the mother view!")
//Here's the "application itself"

//the overall appview... the top -level piece of UI

app.AppView = Backbone.View.extend({

	//rather than make a new element, since this is the mother element
	//just bind this to the HTML already present
	el: '#todoapp',

	//the template for the line of stats at bottom of app
	statsTemplate: _.template( $('#stats-template').html() ), //.template(template html string)

	//Delegated events for creating new items & clearing complete ones
	events: {
		'keypress #new-todo': 'createOnEnter',
		'click #clear-completed': 'clearCompleted',
		'click #toggle-all': 'toggleAllComplete'
	},

	//At instantiation bind relevant events on the Todos collection
	//when items are added or changed
	initialize: function() {
		this.allCheckbox = this.$('#toggle-all')[0];
		this.$input = this.$('#new-todo'); //the main input bar
		this.$footer = this.$('#footer');
		this.$main = this.$('#main');

		this.listenTo(app.Todos, 'add', this.addOne);
		this.listenTo(app.Todos, 'reset', this.addAll);

		this.listenTo(app.Todos, 'change:completed', this.filterOne);
		this.listenTo(app.Todos, 'filter', this.filterAll);
		this.listenTo(app.Todos, 'all', this.render);

		app.Todos.fetch(); //merges model state with attributes from the server
	},

	//Re-rendering the app, just refreshes the statistics
	//rest of app does not change
	render: function() {
		var completed = app.Todos.completed().length; //calls the defined collection method
		var remaining = app.Todos.remaining().length;

		if ( app.Todos.length ) {
			this.$main.show(); //???
			this.$footer.show();

			this.$footer.html(this.statsTemplate({
				completed: completed, //defined at begining of function
				remaining: remaining  //template finds the holders and puts in values
			}));

			this.$('filters li a')  //The All, Completed, and Active Buttons get conditional styling
				.removeClass('selected')
				.filter('[href="#/' + (app.TodoFilter || '' ) + '"]')
				.addClass('selected');
		} else {
			this.$main.hide();
			this.$footer.hide();
		}

		this.allCheckbox.checked = !remaining;

	},


	//Add single todo item by instantiated new todo view
	//and finally appending it to the <ul> that we picked
	addOne: function ( todo ) {
		var view = new app.TodoView({ model: todo});
		$('#todo-list').append( view.render().el);
	},

	//Add all items at once (such as when we load todos from local storage)
	addAll: function() {
		this.$('#todo-list').html(''); //this resets the entire list
		app.Todos.each(this.addOne, this) //we can use this here because listenTo set the callback context
	},

	filterOne: function( todo ) {
		todo.trigger('visible');
	},

	filterAll: function () {
		app.Todos.each(this.filterOne, this); //??
	},

	//Generate the attributes for a new todo item
	newAttributes: function() {
		return {
			title: this.$input.val().trim(),
			order: app.Todos.nextOrder(), //order assigned by model
			completed: false
		};
	},

	//On hit Enter, create a new todo model
	//'persists' it to localStorage
	createOnEnter: function( event ) {
		if ( event.which !== ENTER_KEY || !this.$input.val().trim() ) {
			return;
		}

		app.Todos.create( this.newAttributes() ); //this is the view since we used the events hash
		this.$input.val(''); //resets it to blank
	},

	//Clear all completed todo items, and destroys their models...
	clearCompleted: function() {
		_.invoke(app.Todos.completed(), 'destroy'); //destroys the completed todos
		return false;
	},

	toggleAllComplete: function() {
		var completed = this.allCheckbox.checked; //hmm... we're storing something as a key of all checkbox?
		app.Todos.each(function( todo ) {
			todo.save({
				'completed': completed
			});
		});
	}
});