
import _ from 'lodash';

const HEIGHT = 150;
const WIDTH = 200;

export default function group(parent, data) {

  console.info('groups', parent);

  data.groups.forEach(group => {
    group.pdoc = data.client.pdoc
  })

  var drag = d3.behavior.drag()
    .origin(d => d)
    .on('drag', function(d) {
      d.x = d3.event.x
      d.y = d3.event.y
      d3.select(this).attr('transform', 'translate(' + d.x + ',' + d.y + ')')
    })

  const groupInner = parent.selectAll('.group')
    .data(data.groups);

  // enter
  let addedGroups = 
    groupInner
      .enter()
      .append('g')
      .attr('class', 'group')
      .attr('transform', function(d, i) {
        // console.log('groupInner', d);
        const yOffset = i * (HEIGHT + 20);
        d.x = 0;
        d.y = yOffset;
        return 'translate(' + d.x + ',' + d.y  + ')';
      })
      .call(drag)

  addedGroups
    .append('rect')
    .attr('class', 'group__background')
    .attr('width', WIDTH)
    .attr('height', HEIGHT);

  addedGroups
    .append('text')
    .attr('x', WIDTH / 2)
    .attr('y', 30)
    .attr('width', WIDTH)
    .attr('class', 'group__name')
    .text(d => d.name);


  groupInner.call(barComponent);
}


function barComponent(parent) {
  var barGroup = parent.select('.group__bars');

  if(barGroup.empty()) {
    barGroup = parent.append('g')
      .attr('class', 'group__bars')
      .attr('transform', `translate(${0}, ${HEIGHT - 50})`)
  }

  const bar = barGroup.selectAll('.group__bar')
    .data( d => {
      let xOffset = 0;

      const behaviours = d.behaviours[d.pdoc]

      const total = _.sum(behaviours, group => group.level);

      _.each(behaviours, (segment) => {
        const prevOffset = xOffset;
        xOffset = xOffset + (segment.level / total) * WIDTH;
        segment.offset = prevOffset;
        segment.width = (segment.level / total) * WIDTH;
      });
      return behaviours;
    });

  // enter
  bar
    .enter()
    .append('rect')

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
    .attr('width', d => d.width)
}

export function toggleAod(update_function, data) {
  return function() {
    if(data.client.pdoc == 'alcohol') {
      data.client.pdoc = 'other'
    } else {
      data.client.pdoc = 'alcohol'
    }

    update_function()
  }
}
