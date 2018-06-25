import browserHelper from './browser'
export default {
    clonedElement: null,
    cloneElement(layer) {
        if (!document.getElementById('cloned-' + layer.id)) {
            this.clonedElement = document.getElementById(layer.id).cloneNode(true);
            this.clonedElement.id = 'cloned-' + layer.id;
            this.clonedElement.style.opacity = 0;
            if (browserHelper.isFirefox()) {
                this.clonedElement.style.border = 'thin white dashed';
            } else {
                this.clonedElement.style.outline = 'thin white dashed';
            }
            // if text eelement, change color to white
            // var textElement = this.clonedElement.querySelector('.tl-container');
            // if (textElement) {
            //     textElement.style.color = '#fff';
            // }
            // removing unnecessary elements
            var classes = ['.h-l-g', '.rr-content', '.rr-bar', '.layer-action-info', '.rr-rotate-handle', '.layer-action-info'];
            for (var i = 0; i < classes.length; i++) {
                var elems = this.clonedElement.querySelectorAll(classes[i]);
                for (var j = 0; j < elems.length; j++) {
                    elems[j].parentElement.removeChild(elems[j]);
                }
            }

            this.clonedElement.style.zIndex = -1;
            this.clonedElement.style.cursor = 'move';
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
                this.clonedElement.style.width = parseInt(elem.style.width) - 1 + 'px';
                this.clonedElement.style.height = parseInt(elem.style.height) - 1 + 'px';
                this.clonedElement.style.transform = elem.style.transform;
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