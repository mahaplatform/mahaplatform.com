
          var countdown = 0;
          var counter = 0;
          var placeholder = null;

          dropzone.addEventListener('dragenter', function(e) {
            e.preventDefault();
            e.stopPropagation();
            countdown = 1;
            counter++;
            e.currentTarget.className = 'dropzone hover'
          }, false);

          dropzone.addEventListener("dragleave", function(e) {
            e.preventDefault();
            e.stopPropagation();
            counter--;
            if (counter === 0) {
              e.currentTarget.className = 'dropzone'
            }
          }, false);

          dropzone.addEventListener('dragover', function(e) {
            e.preventDefault();
            e.stopPropagation();
            countdown += 1;
            if(countdown % 30 !== 0) return;
            var el = e.target
            while ((el = el.parentElement) && !((el.matches || el.matchesSelector).call(el,'.block')));
            if(!el) return
            var rect = el.getBoundingClientRect()
            var middle = rect.y + (rect.height / 2)
            if(placeholder) placeholder.remove()
            placeholder = document.createElement("div");
            placeholder.innerHTML = '<table class="row"><tr><td class="large-12 first last columns">Drop Block Here</td><td class="expander"></td></tr></table>'
            placeholder.className = 'dropzone-target'
            if(e.clientY <= middle) {
              el.insertBefore(placeholder, el.childNodes[0])
            }
            if(e.clientY > middle) {
              insert
            }
          }, false)

          dropzone.addEventListener('drop', function(e) {
            e.preventDefault()
            e.stopPropagation()
            window.parent.postMessage({
              target: 'designer',
              action: 'add',
              data: {
                section: parseInt(e.currentTarget.dataset.section),
                type: e.dataTransfer.getData('type')
              }
            }, '*')
          }, false)
