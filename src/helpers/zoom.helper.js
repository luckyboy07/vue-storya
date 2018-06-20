/*
  Helper for Zooming XD
*/
export default {
    deltaAllowance: 0,
    zoom: 0,
    scale: 1,
    /**
     * Zooms in/out the editor
     * @param {*} type 
     * @param {*} canvasData 
     * @param {*} layers 
     */
    execZoom(type, canvasData, layers) {
        this.scale = this.$_getScale(type);
        this.$_scale(canvasData, layers);
    },
    gotoZoom(canvasData, layers, from, to, type) {
        return new Promise((res, rej) => {
            var newTo = Math.min(from, to);
            var newFrom = Math.max(from, to);

            while (newFrom > newTo) {
                newFrom -= canvasData.zoomIncrease;
                this.scale = this.$_getScale(type);
                this.$_scale(canvasData, layers);
            }

            setTimeout(() => {
                res(true);
            }, 100);
        });
    },
    $_getScale(type) {
        var delta = type === 'in' ? -100 : 100;
        this.zoom = delta;
        this.zoom = Math.min(this.zoom, 30);
        this.zoom = Math.max(this.zoom, -30);
        return Math.pow(1.09, (this.zoom / 30));
    },
    $_scale(canvasData, layers) {
        if (!canvasData.isResponsive) {
            canvasData.width = Math.round(canvasData.width / this.scale);
            canvasData.height = Math.round(canvasData.height / this.scale);
        } else {
            canvasData.activeSize.width = Math.round(canvasData.activeSize.width / this.scale);
            canvasData.activeSize.height = Math.round(canvasData.activeSize.height / this.scale);
        }

        for (var i = 0; i < layers.length; i++) {
            // dimensions
            layers[i].width /= this.scale;
            layers[i].height /= this.scale;
            layers[i].x /= this.scale;
            layers[i].y /= this.scale

            // adjust shadow size to all layers
            // layers[i].attributes.shadowSize /= this.scale;
            if (layers[i].type === 'shape') {
                // only circle and rectangle is currenly supported with border
                if (layers[i].attributes.shape === 'Circle' || layers[i].attributes.shape === 'Reactangle' && layers[i].attributes.borderWidth > 0) {
                    layers[i].attributes.borderWidth /= this.scale;
                }
            } else if (layers[i].type === 'text') {
                // font size
                layers[i].attributes.fontSize /= this.scale
            }
        }
    },
}