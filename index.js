document.addEventListener("DOMContentLoaded", function() {
  // FOR DRAG-AND-DROP
  if (window.FileReader) {
    let drop;
    addEventHandler(window, 'load', function() {
      let status = document.getElementById('status');
      drop = document.getElementById('drop');
      let list = document.getElementById('list');

      function cancel(e) {
        if (e.preventDefault) {
          e.preventDefault();
        }
        return false;
      }

      addEventHandler(drop, 'dragover', cancel);
      addEventHandler(drop, 'dragenter', cancel);

      addEventHandler(drop, 'drop', function(e) {
        e = e || window.event;
        if (e.preventDefault) {
          e.preventDefault();
        }

        let dt = e.dataTransfer;
        let files = dt.files;
        for (let i = 0; i < files.length; i++) {
          let file = files[i];
          let reader = new FileReader();

          reader.readAsDataURL(file);
          addEventHandler(reader, 'loadend', function(e, file) {
            let bin = this.result;
            let newFile = document.createElement('div');
            newFile.innerHTML = 'Loaded : ' + file.name + ' size ' + file.size + ' B';
            list.appendChild(newFile);
            let fileNumber = list.getElementsByTagName('div').length;
            status.innerHTML = fileNumber < files.length ?
              'Loaded 100% of file ' + fileNumber + ' of ' + files.length + '...' :
              'Done loading. processed ' + fileNumber + ' files.';

            let img = document.createElement("img");
            img.file = file;
            img.src = bin;
            list.appendChild(img);
          }.bindToEventHandler(file));
        }
        return false;
      });
      Function.prototype.bindToEventHandler = function bindToEventHandler() {
        let handler = this;
        let boundParameters = Array.prototype.slice.call(arguments);
        console.log(boundParameters);

        return function(e) {
          e = e || window.event;
          boundParameters.unshift(e);
          handler.apply(this, boundParameters);
        }
      };
    });
  } else {
    document.getElementById('status').innerHTML = 'Your browser does not support the HTML5 FileReader.';
  }


  function addEventHandler(obj, evt, handler) {
    if (obj.addEventListener) {
      obj.addEventListener(evt, handler, false);
    } else if (obj.attachEvent) {
      obj.attachEvent('on' + evt, handler);
    } else {
      obj['on' + evt] = handler;
    }
  }

  // FOR PROVIDING LINK
  function readURL(input) {
    const myImg = document.getElementById('blah');
    myImg.src = input;
  }

  const imgInp = document.getElementById('imgInp');

  $("#my-form").submit(function(e) {
    e.preventDefault();
    readURL(imgInp.value);
    e.target.reset();
  });

})
