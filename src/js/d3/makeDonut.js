/**
* @description Creates donut bar chart representing percent of calories consumed
* @param {number} left - number of calories remaining
* @param {number} consumed - number of calories consumed
* @param {string} divID - where graph will be attached
* @param {array} colorArray- an array of 2 colors, allows for over 100% representation
*/

function makeDonut(left, consumed, divID, colorArray) {

	var myData =  {
		calories:[left, consumed]
	};
	var width = 200,    //set dimensions
	    height = 200,
	    radius = Math.min(width, height) / 2;

	var classes = ['graph-left', 'graph-consumed'];//for category titles

	var color = d3.scale.ordinal()
	    .range(colorArray); //grey, orange

	var arc = d3.svg.arc()
	    .outerRadius(radius - 10)
	    .innerRadius(radius - 30);

	var pie = d3.layout.pie()
	    .sort(null);

	var labels = [ "left","consumed"];

	var svg = d3.select(divID).append("svg")  //now appends chart to divID set in function
	    .attr("width", width)
	    .attr("height", height)
	 	.append("g")
	    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

	var g = svg.selectAll(".arc")
	    .data(pie(myData.calories))
	    .enter().append("g")
	    .attr("class", "arc");

	g.append("path")
	   	.attr("d", arc)
	    .style("fill", function(d,i) { return color(i); }); //returns color from color array

	g.append("text")
	    .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
		.attr("dy", ".35em")
		.style("text-anchor", "middle")
		.style('fill', '#37474F')
		.attr('class', function(d,i) { return classes[i]; }) //assign separate classes to text for easy css manipulation
		.text(function(d,i) { return labels[i]; });
}