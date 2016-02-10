//js/models/userInfo.js

/**
* @description Constructs model to house user info and individual user Daily Recommended Intake (DRI)
* @constructor
* @param none -  only one version of this model
* To extend this project in the future, these properties would be input by new users
* and saved to a Server; Also, refactoring the data organization would continue
*/

var app = app || {};

var UserInfo = Backbone.Model.extend({
	defaults: {
		age: 30,
		gender: 'M',
		height: 71,
		weight: 180,
		ratio: [0.4, 0.3, 0.3],       //Macronutrient Ratios Carb-Fat-Protein
		calPerLbs: 14,  //14 cal * lbs for maintain weight, would lower it if user selected weight loss goal
		DRIcal: 2800,
		DRIcarb: 1000,
		DRIprot: 1500,
		DRIfat: 1500,
		DRIsug: 38,
		DRIfib: 25, //for all adults
		DRIchol: 300, //for all adults
		DRI: [
			{DRI: 2800, name:'Calories', unit: 'cal'}, //started the process of refactoring Data so there's some definite duplication here
			{DRI: 150, name:'Fat', unit: 'g'},
			{DRI: 180, name:'Protein', unit: 'g'},
			{DRI: 190, name:'Carbs', unit: 'g' },
			{DRI: 38, name:'Sugar', unit: 'g'},
			{DRI: 300, name:'Cholesterol', unit: 'mg'},
			{DRI: 25, name:'Fiber', unit: 'g'}
		]
	},
	initialize: function() {
		var DRIcal = Math.round(this.get('weight') * this.get('calPerLbs'));
		var carb = DRIcal * this.get('ratio')[0] / 4;
		var prot = DRIcal * this.get('ratio')[1] / 4;
		var fat = DRIcal * this.get('ratio')[2] / 9;
		var sug = this.get('gender') === 'M' ? 38 : 25;//Men DRI = 38, Wom 25

		this.set({
			DRIcal: DRIcal,
			DRIcarb: carb,
			DRIprot: prot,
			DRIfat: fat,
			DRIsug: sug,
			DRI: [
				{DRI: DRIcal, name:'Calories', unit: 'cal'},
				{DRI: fat, name:'Fat', unit: 'g'},
				{DRI: prot, name:'Protein', unit: 'g'},
				{DRI: carb, name:'Carbs', unit: 'g' },
				{DRI: sug, name:'Sugar', unit: 'g'},
				{DRI: 300, name:'Cholesterol', unit: 'mg'},
				{DRI: 25, name:'Fiber', unit: 'g'}
			]
		});
	}
})

app.userInfo = new UserInfo();

