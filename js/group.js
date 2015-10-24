
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

}
