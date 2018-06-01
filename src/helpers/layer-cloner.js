export default {
    clonedElement: null,
    cloneElement(id) {
        if (!document.getElementById('cloned-' + id)) {
            this.clonedElement = document.getElementById(id).cloneNode(true);
            this.clonedElement.id = 'cloned-' + id;
            this.clonedElement.style.zIndex = '999999';
            this.clonedElement.style.opacity = 0;
            // if text eelement, change color to white
            var textElement = this.clonedElement.querySelector('.tl-container');
            if (textElement) {
                textElement.style.color = '#fff';
            }
            document.body.appendChild(this.clonedElement);
        } else {
            var elem = document.getElementById(id);
            if (elem) {
                var bounds = elem.getBoundingClientRect();
                this.clonedElement.style.top = bounds.top + 'px';
                this.clonedElement.style.left = bounds.left + 'px';
                this.clonedElement.style.opacity = 1;
            }
        }
    },
    removeElement() {
        if (this.clonedElement) {
            document.body.removeChild(this.clonedElement);
        }
    }
}