
import _ from 'lodash';

export default function group(parent, data) {

  console.info('groups', parent);

  const HEIGHT = 150;
  const WIDTH = 200;

  const groupInner = parent.selectAll('.group')
    .data(data.groups);

  // enter
  groupInner.enter().append('g')
    .attr('class', 'group')
    .attr('transform', function(d, i) {
      // console.log('groupInner', d);
      const yOffset = i * (HEIGHT + 20);
      return 'translate(' + 0 + ',' + yOffset  + ')';
    });

  groupInner.append('rect')
      .attr('class', 'group__background')
      .attr('width', WIDTH)
      .attr('height', HEIGHT);

  groupInner.call(barComponent);
}


function barComponent(parent) {

  const barGroup = parent.append('g')
    .attr('class', 'barGroup');

  const bar = barGroup.selectAll('.group__bar')
    .data( d => {
      let xOffset = 0;

      _.each(d.behaviours.alcohol, (segment) => {
        const prevOffset = xOffset;
        xOffset = xOffset + segment.level * 20;
        segment.offset = prevOffset;
        console.log('segment', segment);
      });
      return d.behaviours.alcohol;
    });

  // enter
  bar.enter().append('rect')
    .attr('class', 'group__bar');

  // update
  bar.attr('x', d => d.offset)
    .attr('y', 0)
    .attr('width', d => d.level * 20)
    .attr('height', 30)
    .style('fill', 'red');
}

function makeBars(data) {
  console.log('makeBars', data);
}

export function toggleAod() {
  console.log('toggleAod');
}
