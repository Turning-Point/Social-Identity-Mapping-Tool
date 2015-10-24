
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
    });

  // enter
  bar.enter().append('rect')
    .attr('class', 'group__bar');

  // update
  bar.attr('x', (d, i) => mapCumulativeBars )
    .attr('y', 0)
    .attr('width', 20)
    .attr('height', 30)
    .style('fill', 'red');
}

export function toggleAod() {
  console.log('toggleAod');
}

fucntion mapCumulativeBars(d, i) {
  console.log('d,i', d,i);
  return d[Object.keys(d)] * 20;
}
