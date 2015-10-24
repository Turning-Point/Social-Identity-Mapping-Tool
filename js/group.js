
export default function group(selection) {

  console.info('groups', selection);

  // height will be keyed off identification
  const HEIGHT = 150;
  const WIDTH = 200;

  // enter
  const groupInner = selection.enter().append('g')
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
