
import { saveAs } from './FileSaver.js';

export function saveFile(data) {
  const blob = new Blob(
    [window.JSON.stringify(data)],
    {
      type: 'text/plain;charset=utf-8'
    }
  );
  const date = new Date().toISOString().slice(0,10);
  saveAs(blob, `social-identity-map-${date}.json`);
}

export function loadFile() {
  document.getElementById('hidden-file-upload').click();
};

export function fileUpload() {
  if (window.File && window.FileReader && window.FileList && window.Blob) {
    const uploadFile = this.files[0];
    const filereader = new window.FileReader();

    filereader.onload = function() {
      const txtRes = filereader.result;
      // TODO better error handling
      try {
        const jsonObj = JSON.parse(txtRes);
        thisGraph.deleteGraph(true);
        thisGraph.nodes = jsonObj.nodes;
        thisGraph.setIdCt(jsonObj.nodes.length + 1);

        const newEdges = jsonObj.edges;
        newEdges.forEach(function(e, i) {
          newEdges[i] = {source: thisGraph.nodes.filter(function(n) {return n.id == e.source;})[0],
                      target: thisGraph.nodes.filter(function(n) {return n.id == e.target;})[0]};
        });
        thisGraph.edges = newEdges;
        thisGraph.updateGraph();
      }
      catch(err) {
        window.alert(
          `Error parsing uploaded file
          error message: ${err.message}`
        );
        return;
      }
    };
    filereader.readAsText(uploadFile);
  }
  else {
    alert('Your browser won\'t let you save this graph - try upgrading your browser to IE 10+ or Chrome or Firefox.');
  }
}

export function deleteMap() {
  console.log('todo: delete map');
}
