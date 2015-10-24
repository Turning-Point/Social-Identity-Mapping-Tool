
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
      console.log(d.behaviours.alcohol);
      return d.behaviours.alcohol;
    })

    // parent.data().behaviours.alcohol.forEach(level => {
    //   console.log('level', level);
    //   level.values.forEach(function(item){
    //     totals[item.x] = (totals[item.x] || 0 ) + item.y
    //   });
    // });

  // enter
  bar.enter().append('rect')
    .attr('class', 'group__bar');
    // .call(makeBars);

  let xOffset = 0;

  // update
  bar.attr('x', (d, i) => {
    const prevOffset = xOffset;
    xOffset = xOffset + d.level * 20;
    return prevOffset;
  })
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
