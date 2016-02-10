/**
* @description Create d3 line graph representing a total value over time
* @param {array} array -the totals-collection with simple JSON obj as elements
* @param {string} title
* @param {number} width
* @param {number} height
* @param {string} key - key property name from where y value is generated
* @param {string} IDtag - where this chart will be attached
* @param {number} target - DRI target to construct horizontal line on chart
*/

function makeLineChart(array, title, setwidth, setheight, key, IDtag, target) {
	var width = setwidth;
	var height = setheight;
	var margins = {
		top: 20,
		right: 20,
		bottom: 20,
		left: 50
	};

	var ymin = app.totals.min(function(model){ //using collection's min method to return smalled method, and calling get to retreive that value
			return model.get(key);
		}).get(key);

	var ymaxValue = app.totals.max(function(model){
			return model.get(key);
		}).get(key);

	var ymax = Math.max(ymaxValue, target * 1.25); //the largest y value is larger of the highest input value or slightly more than the daily max

	var graph = d3.select(IDtag);

	var xRange = d3.scale.linear().range([margins.left, width - margins.right]).domain([0,array.length]);
	var yRange = d3.scale.linear().range([height - margins.top, margins.bottom]).domain([ymin, ymax]);

	/*
	*@description Ternary operator checks if date value exists at that index
	*@description Returns shorter date label for shorter widths
	*@description Did not end up using this functionality but may in the future
	*@param {data} d - the d3 data value within the domain set above
	*/
	var xLabels = function(d) {
		return !array[d] ? '' : width < 600 ? array[d].date.slice(-2) : array[d].date.slice(-4); //shorter labels when width smaller
	}

	var xAxis = d3.svg.axis()
		.scale(xRange)
		.tickSize(2)
		.tickSubdivide(true)
		.tickFormat(xLabels); //pass labels created by above function

	var yAxis = d3.svg.axis()
		.scale(yRange)
		.ticks(8) //this sets rel number of ticks
		.tickSize(2) //this is how far the axis labels are from axis
		.orient('left')
		.tickSubdivide(true);

	graph.append('svg:g') //append the svg obj for x & yaxis
		.attr('class', 'x axis')
		.classed('x-axis', true)
		.attr('transform', 'translate(0,'+ (height - margins.bottom) + ')')
		.call(xAxis);

	graph.append('svg:g')
		.attr('class', 'y axis')
		.classed('y-axis', true)
		.attr('transform', 'translate('+ (margins.left) + ',0)')
		.call(yAxis);

	graph.append('text') //add title of graph
			.attr(('x'), (width/2))
			.attr(('y'), (margins.top))
			.attr('text-anchor', 'middle')
			.classed('graph-title', true) //assign class for easier manipulation in style.css
			.text(title);

	graph.append('line') //the horizontal line representing the DRI goal
		.style("stroke", "green")
		.attr("x1", 50)
    	.attr("y1", yRange(target)) //scales the target value to actual point on svg obj
    	.attr("x2", 550)
    	.attr("y2", yRange(target));


	var lineFunc = d3.svg.line() //defines what values get drawn based on data and scale
		.x(function(d, i){
			return xRange(i);
		})
		.y(function(d){
			return yRange(d[key]);
		})
		.interpolate('cardinal'); //versus linear

	graph.append('svg:path') //append the actual line representation of data
		.attr('d', lineFunc(array))
		.attr('stroke', '#FF8F00')
		.attr('stroke-width', 9)
		.attr('fill', 'none');
}
