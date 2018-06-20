export default {
    clonedElement: null,
    cloneElement(layer) {
        if (!document.getElementById('cloned-' + layer.id)) {
            this.clonedElement = document.getElementById(layer.id).cloneNode(true);
            this.clonedElement.id = 'cloned-' + layer.id;
            // this.clonedElement.style.zIndex = '1';
            this.clonedElement.style.opacity = 0;
            this.clonedElement.style.border = 'thin white dashed';
            // if text eelement, change color to white
            // var textElement = this.clonedElement.querySelector('.tl-container');
            // if (textElement) {
            //     textElement.style.color = '#fff';
            // }
            // removing unnecessary elements
            // removing: layer info when dragging, resize or rotate
            var elems = this.clonedElement.querySelectorAll('.layer-action-info');
            for (var i = 0; i < elems.length; i++) {
                elems[i].style.display = 'none';
            }
            var handle = this.clonedElement.querySelector('.rr-rotate-handle');
            if (handle) {
                handle.parentElement.removeChild(handle);
            }

            this.clonedElement.style.zIndex = 0;
            document.getElementsByClassName('editor-container')[0].appendChild(this.clonedElement);
        } else {
            var elem = document.getElementById(layer.id);
            if (elem) {
                var bounds = elem.getBoundingClientRect();
                this.clonedElement.style.top = bounds.top + 'px';
                this.clonedElement.style.left = bounds.left + 'px';
                var cloneBounds = this.clonedElement.getBoundingClientRect();
                var oL = cloneBounds.left - bounds.left;
                var oT = cloneBounds.top - bounds.top;
                this.clonedElement.style.top = cloneBounds.top + -oT * 2 + 'px';
                this.clonedElement.style.left = cloneBounds.left - oL * 2 + 'px';
                this.clonedElement.style.opacity = 1;
            }
        }
    },
    removeElement() {
        if (this.clonedElement) {
            document.getElementsByClassName('editor-container')[0].removeChild(this.clonedElement);
            this.clonedElement = null;
        }
    },
    layerDrag() {

    },
}