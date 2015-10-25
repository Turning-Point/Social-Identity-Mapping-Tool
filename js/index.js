
import d3 from 'd3';
import _ from 'lodash';

import groupComponent, { toggleAod } from './group';
import filterDefs from './filters';

d3.json('./data/data.json', function (error, data) {
  if (error) throw error;

  console.info('data', data);

  const body = document.querySelector('body');
  const height = body.clientHeight;
  const width = body.clientWidth;
  const padding = 20;

	const svg = d3.select('svg')
    .attr('width', width)
    .attr('height', height);

  // add drop shadows
  svg.call(filterDefs);

  svg.append('rect')
      .attr('class', 'background')
      .attr('width', width)
      .attr('height', height);

  const groups = svg.append('g')
    .attr('class', 'groups')
    .attr('transform', `translate(${padding}, 80)`);

  var updateGroups = function() {
    groups.call(groupComponent, data);    
  }

  updateGroups()

  d3.select('.toggle-aod').on('click', toggleAod(updateGroups, data));
});
