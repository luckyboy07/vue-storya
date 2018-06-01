export default {
    clonedElement: null,
    cloneElement(layer) {
        if (!document.getElementById('cloned-' + layer.id)) {
            this.clonedElement = document.getElementById(layer.id).cloneNode(true);
            this.clonedElement.id = 'cloned-' + layer.id;
            this.clonedElement.style.zIndex = '1';
            this.clonedElement.style.opacity = 0;
            // if text eelement, change color to white
            var textElement = this.clonedElement.querySelector('.tl-container');
            if (textElement) {
                textElement.style.color = '#fff';
            }
            document.body.appendChild(this.clonedElement);
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
            document.body.removeChild(this.clonedElement);
        }
    },
    $$$$$$$rotatedTopLeft(x, y, width, height, rotationAngle) {
        // get the center of the rectangle (==rotation point)
        var cx = x + width / 2;
        var cy = y + height / 2;

        // calc the angle of the unrotated TL corner vs the center point
        var dx = x - cx;
        var dy = y - cy;
        var originalTopLeftAngle = Math.atan2(dy, dx);
        console.log('originalTopLeftAngle', originalTopLeftAngle)

        // Add the unrotatedTL + rotationAngle to get total rotation
        var rotatedTopLeftAngle = originalTopLeftAngle + rotationAngle;

        // calc the radius of the rectangle (==diagonalLength/2)
        var radius = Math.sqrt(width * width + height * height) / 2;

        // calc the rotated top & left corner
        var rx = cx + radius * Math.cos(rotatedTopLeftAngle);
        var ry = cy + radius * Math.sin(rotatedTopLeftAngle);

        // return the results
        return ({ left: rx, top: ry });
    }
}