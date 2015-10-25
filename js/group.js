
import _ from 'lodash';

const WIDTH = 400;
const HEIGHT = 300;

export default function group(parent, data) {

  console.info('groups', parent);


  const groupInner = parent.selectAll('.group')
    .data(data.groups);

  // enter
  groupInner.enter().append('g')
    .attr('class', 'group')
    .attr('transform', function(d, i) {
      // console.log('groupInner', d);
      const yOffset = i * (HEIGHT + 50);
      return 'translate(' + 0 + ',' + yOffset  + ')';
    });

  // Card BG
  groupInner.append('rect')
      .attr('class', 'group__background')
      .attr('width', WIDTH)
      .attr('height', HEIGHT);

  // User Icon
  groupInner.append('image')
      .attr('xlink:href', '/assets/gender-female.svg')
      .attr('x', WIDTH / 2 - 50)
      .attr('y', -20)
      .attr('width', 100)
      .attr('height', 100);

  // Conflict, Commonality Icons
  groupInner.append('image')
      .attr('xlink:href', d => {
        const degree = 'lots';
        return `/assets/icon-conflict-${degree}.svg`;
      })
      .attr('x', WIDTH / 2 - 100)
      .attr('y', 15)
      .attr('width', 30)
      .attr('height', 30);

  groupInner.append('image')
      .attr('xlink:href', d => {
        const degree = 'lots';
        return `/assets/icon-common-${degree}.svg`;
      })
      .attr('x', WIDTH / 2 + 100 - 30)
      .attr('y', 15)
      .attr('width', 30)
      .attr('height', 30);


  // Card Title
  groupInner.append('text')
    .attr('x', WIDTH / 2)
    .attr('y', 130)
    .attr('width', WIDTH)
    .attr('class', 'group__name')
    .text(d => d.name);

  // Card Tags
  groupInner.call(barComponent);
}


function barComponent(parent) {

  const barGroup = parent.append('g')
    .attr('class', 'barGroup')
    .attr('transform', `translate(${0}, ${HEIGHT - 40})`)

  const bar = barGroup.selectAll('.group__bar')
    .data( d => {
      let xOffset = 0;

      const total = _.sum(d.behaviours.alcohol, group => group.level);

      _.each(d.behaviours.alcohol, (segment) => {
        const prevOffset = xOffset;
        xOffset = xOffset + (segment.level / total) * WIDTH;
        segment.offset = prevOffset;
        segment.width = (segment.level / total) * WIDTH;
      });
      return d.behaviours.alcohol;
    });

  // enter
  bar.enter().append('rect')
    .attr('class', 'group__bar');

  // update
  bar.attr('x', d => d.offset)
    .attr('class', (d, i) => {
      return 'palette-' + (i + 1);
    })
    .attr('y', 0)
    .attr('width', d => d.width)
    .attr('height', 40)
}

function makeBars(data) {
  console.log('makeBars', data);
}

export function toggleAod() {
  console.log('toggleAod');
}
