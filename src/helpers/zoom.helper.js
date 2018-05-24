/*
  Helper for Zooming XD
*/
export default {
    deltaAllowance: 0,
    // Zooming-in to a a specific value
    zoomIn(type, canvas, layers, val, zoomIncrease) {
        var delta = val + this.deltaAllowance;
        if (type === 'in') {
            // delta = val > 100 ? delta : delta - this.deltaAllowance;
            delta = val > 100 ? delta : ((delta - this.deltaAllowance) - zoomIncrease * 2) - zoomIncrease;
            delta /= 2;
            console.log('delta', delta)
            canvas.width = canvas.width + delta;
            canvas.height = canvas.height + delta;
            // layers
            for (var i = 0; i < layers.length; i++) {
                // dimensions
                // console.log(layers[i].id, layers[i].width, layers[i].height)
                layers[i].width = layers[i].width + delta;
                layers[i].height = layers[i].height + delta;
                // position
                // layers[i].x = layers[i].x + (val - zoomIncrease);

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
            console.log(val, zoomIncrease)
            console.log('d bfore', delta + zoomIncrease)
            delta = val + zoomIncrease > 100 ? delta + zoomIncrease : delta - this.deltaAllowance - zoomIncrease * 2;
            delta /= 2;
            console.log('delta', delta)
            canvas.width = canvas.width - delta;
            canvas.height = canvas.height - delta;
            for (var i = 0; i < layers.length; i++) {
                layers[i].width = layers[i].width - delta;
                layers[i].height = layers[i].height - delta;
                // layers[i].x = layers[i].x - (val);

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
    adjustCanvasDimension(canvasData) {
        if (!canvasData) {
            throw new Error("Invalid Data");
        }
        if (canvasData.zoom === 100) {
            return;
        }
        var delta = canvasData.zoom + this.deltaAllowance;
        // increase and decrease dimension
        if (canvasData.zoom > 100) {
            canvasData
        } else {

        }
    },
    // use this whenn creating layer
    adjustLayerDimension(zoomLevel, increaseValue, layer) {
        console.log(zoomLevel, increaseValue, layer)
        if (!layer) {
            throw new Error("Invalid Layer");
        }
        if (zoomLevel === 100) {
            return;
        }
        var delta = zoomLevel + this.deltaAllowance;
        // increase and decrease dimension base on zoomLevel
        if (zoomLevel > 100) {
            layer.width = layer.width + delta;
            layer.height = layer.height + delta;
        } else {
            delta += increaseValue;
            layer.width = layer.width - delta;
            layer.height = layer.height - delta;
        }
    },
}