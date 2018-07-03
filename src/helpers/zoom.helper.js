/*
  Helper for Zooming XD
*/
import $ from 'linq'
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
    gotoZoom(canvasData, layers, from, to, type, includeCanvas = true) {
        return new Promise((res, rej) => {
            var newTo = Math.min(from, to);
            var newFrom = Math.max(from, to);

            while (newFrom > newTo) {
                this.scale = this.$_getScale(type);
                this.$_scale(canvasData, layers, includeCanvas);
                newFrom -= canvasData.zoomIncrease;
            }

            setTimeout(() => {
                res(true);
            }, 100);
        });
    },
    $_getScale(type) {
        var delta = type === 'in' ? -1000 : 1000;
        this.zoom = delta;
        this.zoom = Math.min(this.zoom, 1000);
        this.zoom = Math.max(this.zoom, -1000);
        return Math.pow(1.19, (this.zoom / 1000));
    },
    $_scale(canvasData, layers, includeCanvas = true) {
        if (includeCanvas) {
            if (!canvasData.isResponsive) {
                canvasData.width = Math.round(canvasData.width / this.scale);
                canvasData.height = Math.round(canvasData.height / this.scale);
            } else {
                canvasData.activeSize.width = Math.round(canvasData.activeSize.width / this.scale);
                canvasData.activeSize.height = Math.round(canvasData.activeSize.height / this.scale);
            }
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
    resetAllZoom(canvasData, activeZoom, activeData) {
        console.log(canvasData, activeZoom, activeData)

        var $$reset = (layers, isResponsive, from) => {
            var newTo = Math.min(from, 100);
            var newFrom = Math.max(from, 100);
            var type = from < 100 ? 'in' : 'out';

            while (newFrom > newTo) {
                var scale = this.$_getScale(type);
                // executing
                if (isResponsive) {
                    canvasData.activeSize.width = Math.round(canvasData.activeSize.width / scale);
                    canvasData.activeSize.height = Math.round(canvasData.activeSize.height / scale);
                } else {
                    canvasData.width = Math.round(canvasData.width / scale);
                    canvasData.height = Math.round(canvasData.height / scale);
                }

                for (var i = 0; i < layers.length; i++) {
                    // dimensions
                    layers[i].width /= scale;
                    layers[i].height /= scale;
                    layers[i].x /= scale;
                    layers[i].y /= scale

                    // adjust shadow size to all layers
                    // layers[i].attributes.shadowSize /= scale;
                    if (layers[i].type === 'shape') {
                        // only circle and rectangle is currenly supported with border
                        if (layers[i].attributes.shape === 'Circle' || layers[i].attributes.shape === 'Reactangle' && layers[i].attributes.borderWidth > 0) {
                            layers[i].attributes.borderWidth /= scale;
                        }
                    } else if (layers[i].type === 'text') {
                        // font size
                        layers[i].attributes.fontSize /= scale
                    }
                }
                // ----
                newFrom -= canvasData.zoomIncrease;
            }
        };

        // resetting original layers
        if (canvasData.originalZoom !== 100) {
            console.log('canvasData.originalZoom', canvasData.originalZoom)
            $$reset(canvasData.originalLayers, false, canvasData.originalZoom);
            canvasData.originalZoom = 100;
        }
        // restting ratios 
        for (var i = 0; i < canvasData.ratios.length; i++) {
            if (canvasData.ratios[i].zoom === 100) continue;

            console.log(canvasData.ratios[i].name)
            var layers = canvasData.ratios[i].layers;
            console.log(layers)
            $$reset(layers, true, canvasData.ratios[i].zoom);
            canvasData.ratios[i].zoom = 100;
        }

        if (!canvasData.isResponsive) {
            canvasData.zoom = canvasData.originalZoom;
        } else {
            var ratio = $.from(canvasData.ratios).firstOrDefault(r => r.name === canvasData.selectedRatio);
            if (ratio) {
                canvasData.zoom = ratio.zoom;
            }
        }

        // await window.setTimeout(null, 100);

        // return true;
    },
}