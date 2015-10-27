
import d3 from 'd3';
import _ from 'lodash';

import groupComponent, { toggleAod, setToggleTitle } from './group';
import drawLinks from './linkComponent';
import filterDefs from './filters';
import { saveFile, loadFile, fileUpload, deleteMap} from './persistMap'

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

  updateGroups();

  const links = svg.append('g')
    .attr('class', 'links')
    .attr('transform', `translate(${padding}, 80)`);

  links.call(drawLinks, data);

  // d3.select('.toggle-aod').on('click', toggleAod(updateGroups, data));
  d3.select('.toggle-aod').on('change', function() {
    setToggleTitle(this, updateGroups, data);
  });

  // ============================================================
  // File Saving
  // ============================================================

  d3.select('#download-input').on('click', () => { saveFile(data); });
  d3.select('#upload-input').on('click', loadFile);
  d3.select('#hidden-file-upload').on('change', fileUpload);
  d3.select('#delete-graph').on('click', deleteMap);

  // warn the user when leaving
  // window.onbeforeunload = function() {
  //   return 'Ensure you save your map before closing or refreshing this page!';
  // };
});
