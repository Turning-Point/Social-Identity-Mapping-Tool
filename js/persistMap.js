
import { renderGroups, renderLinks, data } from './index';
import { saveAs } from './FileSaver';

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

export function fileUpload(input) {
  if (window.File && window.FileReader && window.FileList && window.Blob) {
    var file;

    const uploadFile = input.files[0];
    const filereader = new window.FileReader();

    filereader.onload = function() {
      const txtRes = filereader.result;
      // TODO better error handling
      console.log('txtRes', txtRes);

      try {
        window.data = JSON.parse(txtRes);
        console.log('data', window.data);

        renderGroups(window.data);
        renderLinks(window.data);
      }
      catch(err) {
        window.alert(
          `Error parsing uploaded file
          error message: ${err.message}`
        );
        return null;
      }
    };
    return filereader.readAsText(uploadFile);
  }
  else {
    alert(`Your browser won't let you save this graph - try upgrading your browser to IE 10+ or Chrome or Firefox.`);
  }
}

export function deleteMap(data) {
  const initialState = {
    "client": {
      "pdoc": null
    },
    "groups": [],
    "links": []
  };
  window.data = initialState;
  renderGroups();
  renderLinks();
}
