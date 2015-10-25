
import _ from 'lodash';

export default function barComponent(parent, config) {
  console.log('barComponent', parent);
  var barGroup = parent.select('.group__bars');

  if(barGroup.empty()) {
    barGroup = parent.append('g')
      .attr('class', 'group__bars')
      .attr('transform', `translate(${0}, ${config.HEIGHT - 50})`);
  }

  const bar = barGroup.selectAll('.group__bar')
    .data( d => {
      let xOffset = 0;

      const behaviours = d.behaviours[d.pdoc];

      const total = _.sum(behaviours, group => group.level);

      _.each(behaviours, (segment) => {
        const prevOffset = xOffset;
        xOffset = xOffset + (segment.level / total) * config.WIDTH;
        segment.offset = prevOffset;
        segment.width = (segment.level / total) * config.WIDTH;
      });
      return behaviours;
    });

  // enter
  bar
    .enter()
    .append('rect');

  // update
  bar
    .attr('class', (d, i) => {
      return 'group__bar palette-' + (i + 1);
    })
    .attr('y', 0)
    .attr('height', 50)
    .transition()
    .duration(500)
    .attr('x', d => d.offset)
    .attr('width', d => d.width);

}
