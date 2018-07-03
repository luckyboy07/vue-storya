import restHelper from './rest.helper'
import snackbar from './snackbar'
export default {
    layers: null,
    promises: [],
    upload(id, file, url, layers) {
        this.layers = layers;
        if (file) {
            restHelper.post(url, file, 'multipart/form-data')
                .then((response) => {
                    this.finish(id, response.data);
                })
                .catch((err) => {
                    this.finish(id, { url: null });
                    snackbar.show('File is not acceptable.');
                    console.warn(err)
                });
        }
    },
    finish(id, val) {
        for (var i = 0; i < this.layers.length; i++) {
            if (id === this.layers[i].id) {
                this.layers[i].image = val;
                // this.layers[i].loaded = true;
                break;
            }
        }
    },
}