/*
  Helper for Zooming XD
*/
export default {
    deltaAllowance: 0,
    // Zooming-in to a a specific value
    zoomIn(type, canvas, layers, val, zoomIncrease) {
        var delta = val + this.deltaAllowance;
        if (type === 'in') {
            delta = val > 100 ? delta : ((delta - this.deltaAllowance) - zoomIncrease * 2) - zoomIncrease;
            delta /= 2;
            canvas.width = canvas.width + delta;
            canvas.height = canvas.height + delta;
            // layers
            for (var i = 0; i < layers.length; i++) {
                // dimensions
                layers[i].width = layers[i].width + delta;
                layers[i].height = layers[i].height + delta;
                // position

                switch (layers[i].type) {
                    case "shape":
                        // change border size of shape layer when zooming
                        layers[i].attributes.borderWidth = layers[i].attributes.borderWidth + (delta / 100)
                        break;
                    case "image":
                        layers[i].attributes.borderWidth = layers[i].attributes.borderWidth + (delta / 100)
                        break;
                    case "text":
                        // change font size
                        layers[i].attributes.fontSize += (delta / 100) + 10;
                        break;
                    case "audio":
                        break;
                    case "video":
                        break;
                    default:
                        break;
                }
            }
        } else {
            delta = val + zoomIncrease > 100 ? delta + zoomIncrease : delta - this.deltaAllowance - zoomIncrease * 2;
            delta /= 2;
            canvas.width = canvas.width - delta;
            canvas.height = canvas.height - delta;
            for (var i = 0; i < layers.length; i++) {
                layers[i].width = layers[i].width - delta;
                layers[i].height = layers[i].height - delta;

                switch (layers[i].type) {
                    case "shape":
                        // change border size of shape layer when zooming
                        layers[i].attributes.borderWidth = layers[i].attributes.borderWidth - (delta / 100)
                        break;
                    case "image":
                        layers[i].attributes.borderWidth = layers[i].attributes.borderWidth - (delta / 100)
                        break;
                    case "text":
                        // change font size
                        layers[i].attributes.fontSize -= (delta / 100) + 10;
                        break;
                    case "audio":
                        break;
                    case "video":
                        break;
                    default:
                        break;
                }
            }
        }
    },
    // use this whenn creating layer
    adjustCanvasAndLayerDimension(canvasData, layer) {
        if (canvasData.zoom === 100) {
            return;
        }
        var delta = canvasData.zoom + this.deltaAllowance;
        // increase and decrease dimension base on canvasData.zoom
        if (canvasData.zoom > 100) {
            delta = canvasData.zoom > 100 ? delta : ((delta - this.deltaAllowance) - canvasData.zoomIncrease * 2) - canvasData.zoomIncrease;
            delta /= 2;
            canvasData.width = canvasData.width + delta;
            canvasData.height = canvasData.height + delta;

            if (layer) {
                layer.width = layer.width + delta;
                layer.height = layer.height + delta;
            }
        } else {
            delta = canvasData.zoom + canvasData.zoomIncrease > 100 ? delta + canvasData.zoomIncrease : delta - this.deltaAllowance - canvasData.zoomIncrease * 2;
            delta /= 2;
            canvasData.width = canvasData.width - delta;
            canvasData.height = canvasData.height - delta;

            if (layer) {
                layer.width = layer.width - delta;
                layer.height = layer.height - delta;
            }
        }
    },
}