
d3.json('./data.json', function (data) {

  console.log('data', data);

  var body = document.querySelector('body');

  var margin = { top: 0, right: 25, bottom: 25, left: 0 };
  var padding = 25;
  var height = body.clientHeight - margin.top - margin.bottom;
  var width = body.clientWidth - margin.left - margin.right;

	var svg = d3.select('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom);

  svg.append('rect')
      .attr('class', 'background')
      .attr('width', width)
      .attr('height', height)
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  var groups = svg.append('g')
    .attr('class', 'groups');

  var group = groups.selectAll('.group')
    .data(data.groups);

  // enter
  var groupInner = group.enter().append('g')
    .attr('class', 'group')
    .attr('transform', function(d) {
      return 'translate(' + 100 + ',' + 100 + ')';
    })
    .append('rect')
      .attr('class', 'group__background')
      .attr('width', 200)
      .attr('height', 100);



});
