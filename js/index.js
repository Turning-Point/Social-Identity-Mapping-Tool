
import d3 from 'd3';
import _ from 'lodash';

import { groupComponent, toggleAod } from './group';

d3.json('./data/data.json', function (data) {

  console.info('data', data);

  const body = document.querySelector('body');
  const height = body.clientHeight;
  const width = body.clientWidth;

	const svg = d3.select('svg')
    .attr('width', width)
    .attr('height', height);

  svg.append('rect')
      .attr('class', 'background')
      .attr('width', width)
      .attr('height', height);

  const groups = svg.append('g')
    .attr('class', 'groups')
    .attr('transform', 'translate(' + 20 + ',' + 20 + ')');

  groups.call(groupComponent, data);

  d3.select('.toggle-aod').on('click', toggleAod);
});
