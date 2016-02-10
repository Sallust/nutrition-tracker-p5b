//js/view/summaryView.js
 var app = app || {};
/**
* @description  Controls View of main summary section
* @constructor View
* @param {model}  app.currentTotals - gets passed the model with current totals
*/
 app.SummaryView = Backbone.View.extend({

 	el:'#summary',

 	template: _.template($('#summary-template').html() ),

 	events: {
 		'click .addFood': 'toggleOpen'
 	},

 	initialize: function() {
 		this.listenTo(this.model, 'change', this.render);
 		this.render();
 	},
 	/**
	* @description  Calculates summary figures and conditionally formats display
	*/
 	render: function() {
 		var DRIcal = app.userInfo.get('DRIcal');
 		var consumed = this.model.get('cal');
 		var left = Math.abs(DRIcal - this.model.get('cal')); //Calories remaining --> Calories Over
 		var isOver = consumed >= DRIcal ? true : false;

 		this.$el.html(this.template({
 			consumed: consumed,
 			left: left,
 			budget: DRIcal,
 			isOver: isOver
 		}));

 		if (!isOver) {
 			makeDonut( left, consumed ,'#donut', [ "#afafaf","#FF8F00" ]); //normally constructed graph
 		} else {
 			makeDonut( consumed , left,'#donut', ["#FF8F00" , "#B0514E"]); //reversed colors and change text when over DRI
 			$('.graph-consumed').text('OVER!!!');
 			$('.graph-left').text(''); //remove 'left' text from view
 		}

		if ( consumed < 10) { // hide graph title text when there isn't data yet, or when it's about to be covered
			$('.graph-consumed').hide();
		} else if ( left < 50) {
		 	$('.graph-left').hide();
		} else {
		 	$('.graph-consumed').show();
		 	$('.graph-left').show();
		}
 	},
 	toggleOpen: function() {
 		$('#wrapper').toggleClass('toggled');
 	}
 });
