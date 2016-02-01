//js/views/todos.js

//Here's where the individual view for each item lives. It's in charge o
//    *individual records, making sure view updates
//		* we'll add listeners for events on the specific todo's HTML

var app = app || {};

console.log("Hello from the individual todo view");

app.TodoView = Backbone.View.extend({
	//...is a list tag
	tagName: 'li',

	//cache the template function for a single item
	template:_.template( $('#item-template').html() ),

	//DOM events particular to this item
	events: {
		'click .toggle': 'togglecompleted',
		'dblclick label': 'edit',
		'click .destroy': 'clear',
		'keypress .edit': 'updateOnEnter',
		'blur .edit': 'close'
	},

	//this listens to changes to its model, re-rendering
	//There's a one to one correspondence btw a Todo and a TodoView in this app
	//so we set a direct reference on the model for convenience
	initialize: function() {
		this.listenTo(this.model, 'change', this.render); //remember the callback always has the first param as context
		this.listenTo(this.model, 'destroy', this.remove);
		this.listenTo(this.model, 'visible', this.toggleVisible);
	},

	//Re-renders the titles of the todo item
	render: function() {
		this.$el.html( this.template( this.model.attributes) ) //the html of this element is the template which is passed the attibutes to change placeholders

		this.$el.toggleClass( 'completed', this.model.get('completed') );
		this.toggleVisible();

		this.$input = this.$('.edit');
		return this;
	},

	toggleVisible: function() {
		this.$el.toggleClass( 'hidden', this.isHidden() );
	},

	//Determines if item should be hidden
	isHidden: function() {
		var isCompleted = this.model.get('completed');
		return ( //hidden cases only
			(!isCompleted && app.TodoFilter === 'completed')
			|| (isCompleted && app.TodoFilter === 'active')
		);

	},

	togglecompleted: function() {
		this.model.toggle();
	},

	//Switch the view in "editing mode" which displays the input field.
	edit: function() {
		this.$el.addClass('editing');
		this.$input.focus(); //makes input in focus( setting up for blur)
	},

	//Close "editing" mode, save changes to the todo model
	close: function() {
		var value = this.$input.val().trim();
		if ( value ) { //if value exists
			this.model.save({title: value}); //save it
		}
		this.$el.removeClass('editing');
	},

	updateOnEnter: function ( e ) {
		if (e.which === ENTER_KEY) {
			this.close();
		}
	},

	clear: function() {
		this.model.destroy();
	}
});