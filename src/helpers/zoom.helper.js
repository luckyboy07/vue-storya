/*
  Helper for Zooming XD
*/
export default {
    // Zooming-in to a a specific value
    zoomIn(type, canvas, layers, val, zoomIncrease) {
        var delta = val + 100;
        if (type === 'in') {
            canvas.width = canvas.width + delta;
            canvas.height = canvas.height + delta;
            // layers
            for (var i = 0; i < layers.length; i++) {
                // dimensions
                console.log(layers[i].id, layers[i].width, layers[i].height)
                layers[i].width = layers[i].width + delta;
                layers[i].height = layers[i].height + delta;
                // position
                // layers[i].x = layers[i].x + (val - zoomIncrease);

                switch (layers[i].type) {
                    case "shape":
                        // change border size of shape layer when zooming
                        // layers[i].attributes.borderWidth = layers[i].attributes.borderWidth + (delta / 100)
                        break;
                    case "image":
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
            delta += zoomIncrease;
            canvas.width = canvas.width - delta;
            canvas.height = canvas.height - delta;
            for (var i = 0; i < layers.length; i++) {
                layers[i].width = layers[i].width - delta;
                layers[i].height = layers[i].height - delta;
                // layers[i].x = layers[i].x - (val);

                switch (layers[i].type) {
                    case "shape":
                        // change border size of shape layer when zooming
                        // layers[i].attributes.borderWidth = layers[i].attributes.borderWidth - (delta / 100)
                        break;
                    case "image":
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
    }
}