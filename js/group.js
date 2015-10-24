
export default function group(selection) {

  // enter
  const groupInner = selection.enter().append('g')
    .attr('class', 'group')
    .attr('transform', function(d) {
      return 'translate(' + 100 + ',' + 100 + ')';
    })
    .append('rect')
      .attr('class', 'group__background')
      .attr('width', 200)
      .attr('height', 100);

}
