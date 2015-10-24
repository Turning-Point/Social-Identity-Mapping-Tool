
d3.json('./data.json', function (data) {

  console.log('data', data);

  var body = document.querySelector('body');

  var margin = { top: 0, right: 25, bottom: 25, left: 0 };
  var padding = 25;
  var height = body.clientHeight - margin.top - margin.bottom;
  var width = body.clientWidth - margin.left - margin.right;

	var svg = d3.select('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('rect')
      .attr('class', 'inner')
      .attr('width', width)
      .attr('height', height)
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

});
