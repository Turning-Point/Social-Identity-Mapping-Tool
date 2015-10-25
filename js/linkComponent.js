
const lineWidth = 10;

export default function drawLink(parent, data) {

  const linkContainers = parent.selectAll('.link')
    .data(data.links);

  const newLink = linkContainers
    .enter().append('g')
    .attr('class', 'link');

  linkContainers.call(link, data);
}


function link(parent, data) {
  console.log('link: parent', parent);

  // get the source location
  // get the target location
  // const source = data[parent]

  // var linkPath = "M" + data.coordinates[0];
  // data.coordinates.slice(1).forEach(function(knot) {
  //   linkPath += " L" + knot;
  // });
  // // console.log('drawSimpleEdge', linkPath);
  // return linkPath;
}
