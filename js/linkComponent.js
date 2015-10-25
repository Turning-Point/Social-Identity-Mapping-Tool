
const lineWidth = 10;

export default function drawLink(parent, data) {

  const linkContainers = parent.selectAll('.link')
    .data(data.links);

  const newLink = linkContainers
    .enter().append('g')
    .attr('class', 'link');

  newLink.each((d) => {
    link(linkContainers, d, data);
  });
}


function link(parent, d, data) {
  console.log('link: parent', parent, parent.node().__data__);

  // get the source location
  // get the target location
  const source = [ data.groups[d.source].x, data.groups[d.source].y ];
  const target = [ data.groups[d.target].x, data.groups[d.target].y ];

  console.log('source, target', source, target);
  var linkPath = "M" + source + "L" + target;
  // data.coordinates.slice(1).forEach(function(knot) {
  //   linkPath += " L" + knot;
  // });
  // console.log('drawSimpleEdge', linkPath);
  parent.append('path')
    .attr('d', linkPath);
}
