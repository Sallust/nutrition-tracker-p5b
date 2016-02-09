//js/models/userInfo.js

var app = app || {};



var UserInfo = Backbone.Model.extend({

	//url:'https://my-nutrition-tracker.firebaseio.com/user-info',

	defaults: {
		age: 30,
		gender: 'M',
		height: 71,
		weight: 180,
		ratio: [0.4, 0.3, 0.3],       //Macronutrient Ratios Carb-Fat-Protein
		calPerLbs: 14,  //15 cal * lbs for maintain weight, would lower it if user selected weight loss goal
		DRICal: 2800,
		DRICarb: 1000,
		DRIProt: 1500,
		DRIFat: 1500,
		DRISug: 38,
		DRIFib: 25,
		DRIChol: 300

	},
	initialize: function() {
		var DRICal = Math.round(this.get('weight') * this.get('calPerLbs'));
		var carb = DRICal * this.get('ratio')[0] / 4;
		var prot = DRICal * this.get('ratio')[1] / 4;
		var fat = DRICal * this.get('ratio')[2] / 9;
		var sug = this.get('gender') === 'M' ? 38 : 25;//Men DRI = 38, Wom 25

		this.set({
			DRICal: DRICal,
			DRICarb: carb,
			DRIProt: prot,
			DRIFat: fat,
			DRISug: sug
		});
	}
})

app.userInfo = new UserInfo();

