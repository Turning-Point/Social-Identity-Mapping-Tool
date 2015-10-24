
import d3 from 'd3';
import _ from 'lodash';

import groupComponent from './group';

d3.json('./data/data.json', function (data) {

  console.log('data', data);

  const body = document.querySelector('body');

  const margin = { top: 0, right: 25, bottom: 25, left: 0 };
  const padding = 25;
  const height = body.clientHeight - margin.top - margin.bottom;
  const width = body.clientWidth - margin.left - margin.right;

	const svg = d3.select('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom);

  svg.append('rect')
      .attr('class', 'background')
      .attr('width', width)
      .attr('height', height)
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


  const groups = svg.append('g')
    .attr('class', 'groups');

  const group = groups.selectAll('.group')
    .data(data.groups)
    .call(groupComponent);

});
