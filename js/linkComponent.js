
const lineWidth = 10;
import { config } from './group';

export default function drawLink(parent, data) {

  const linkContainers = parent.selectAll('.link')
    .data(data.links);

  // enter
  linkContainers.enter()
    .append('g')
    .attr('class', 'link')
    .append('path');

  // update
  linkContainers.each((d) => {
    setLinkPath(linkContainers, d, data);
  });

  // exit
  linkContainers.exit().remove();
}


function setLinkPath(parent, d, data) {
  // console.log('link: parent', parent, parent.node().__data__);

  // get the source location
  // get the target location
  let source = {};
  source.x = data.groups[d.source].x;
  source.y = data.groups[d.source].y;

  let target = {};
  target.x = data.groups[d.target].x;
  target.y = data.groups[d.target].y;

  let sourceOffset = {};
  let targetOffset = {};

  if (source.x < target.x) {
    sourceOffset.x = source.x + config.WIDTH;
    targetOffset.x = target.x;

    if (source.y < target.y) {
      sourceOffset.y = source.y + 100;
      targetOffset.y = target.y + 100;
    }
    else {
      sourceOffset.y = source.y + 100;
      targetOffset.y = target.y + 100;
    }

  }
  else {
    sourceOffset.x = source.x + config.WIDTH / 2;
    targetOffset.x = target.x + config.WIDTH / 2;

    if (source.y < target.y) {
      sourceOffset.y = source.y + config.HEIGHT;
      targetOffset.y = target.y - 10; //cos of avatar
    }
    else {
      sourceOffset.y = source.y;
      targetOffset.y = target.y;
    }

  }

  // console.log('source, target', source, target);
  var linkPath =
    "M" + [sourceOffset.x, sourceOffset.y] +
    "L" + [targetOffset.x, targetOffset.y];

  parent.each(function(el) {
    // console.log('el', el);
    d3.select(this).select('path').attr('d', linkPath);
  });
}
