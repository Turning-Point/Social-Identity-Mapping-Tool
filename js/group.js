
import barComponent from './groupBarComponent';
import { renderLinks } from './index';

export const config = {
  WIDTH: 300,
  HEIGHT: 200
}

export default function group(parent, data) {

  console.info('groups', parent);

  data.groups.forEach(group => {
    group.pdoc = data.client.pdoc
  });

  var drag = d3.behavior.drag()
    .origin(d => d)
    .on('drag', function(d) {
      d.x = d3.event.x
      d.y = d3.event.y
      d3.select(this).attr('transform', 'translate(' + d.x + ',' + d.y + ')')
      renderLinks();
    });

  const groupInner = parent.selectAll('.group')
    .data(data.groups);

  // enter
  let addedGroups =
    groupInner
      .enter()
      .append('g')
      .attr('class', 'group')
      .style('filter', "url(#drop-shadow)")
      .attr('transform', d => {
        return 'translate(' + [d.x, d.y] + ')';
      })
      .call(drag)

  // Card BG
  addedGroups
    .append('rect')
    .attr('class', 'group__background')
    .attr('width', config.WIDTH)
    .attr('height', config.HEIGHT);

  // Card Title
  addedGroups.append('text')
    .attr('x', config.WIDTH / 2)
    .attr('y', 130)
    .attr('width', config.WIDTH)
    .attr('class', 'group__name')
    .text(d => d.name);

  // User Icon
  addedGroups.append('image')
    .attr('xlink:href', 'assets/gender-female.svg')
    .attr('x', config.WIDTH / 2 - 50)
    .attr('y', -20)
    .attr('width', 100)
    .attr('height', 100);

  // Conflict Icon
  addedGroups.append('image')
    .attr('xlink:href', d => {
      const degree = iconScale(d.conflict);
      return `assets/icon-conflict-${degree}.svg`;
    })
    .attr('x', config.WIDTH / 2 - 100)
    .attr('y', 15)
    .attr('width', 30)
    .attr('height', 30);

  // Commonality Icon
  addedGroups.append('image')
    .attr('xlink:href', d => {
      const degree = iconScale(d.commonality);
      return `assets/icon-common-${degree}.svg`;
    })
    .attr('x', config.WIDTH / 2 + 100 - 30)
    .attr('y', 15)
    .attr('width', 30)
    .attr('height', 30);

  groupInner.call(barComponent, config);
}

export function setToggleTitle(updateFunction, data) {
  const label = document.getElementById('toggle-label');

  return function() {
    if(data.client.pdoc == 'alcohol') {
      label.innerHTML = 'Drug Use';
      data.client.pdoc = 'other';
    } else {
      label.innerHTML = 'Alcohol Use';
      data.client.pdoc = 'alcohol'
    }
    updateFunction();
  }();
}

function iconScale(data) {
  switch(data) {
  case 1:
    return 'lots';
  case 2:
    return 'some';
  default:
    return 'none';
  }
}
