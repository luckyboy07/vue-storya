import UndoManager from 'undo-manager';
import appHelper from './app.helper.js'
import * as $ from 'linq'

export default {
    undoManager: new UndoManager(),
    layers: [],
    lastLayer: null,
    $_addLayer: function(id, layerDetail, lastAction) {
        this.layers.push({
            'id': id,
            'layer': layerDetail,
            'lastAction': lastAction
        });

        console.log('_addLayer', this.layers);
    },
    $_removeLayer: function(id) {
        for (var i = 0; i < this.layers.length; i++) {
            if (this.layers[i].id === id) {
                this.layers.splice(i, 1)
                break;
            }
        }
        console.log(this.layers.length);
    },
    /**
     * Creates a new layer to the undo manager memory
     * @param  {} layerDetail layerDetail the layer to be created on the memory
     * @param  {} lastAction
     */
    add(_layerDetail, lastAction) {
        // console.log(layerDetail, lastAction);
        var layerDetail = appHelper.cloneLayer(_layerDetail);
        let id = appHelper.generateGUID();
        this.$_addLayer(id, layerDetail, lastAction);
        var _removeItem = (_layerId) => {
            this.$_removeLayer(_layerId);
        };

        var _addItem = (_layerId, layerDetail, lastAction) => {
            this.$_addLayer(_layerId, layerDetail, lastAction);
        }

        this.undoManager.add({
            undo: function() {
                _removeItem(id);
            },
            redo: function() {
                _addItem(id, layerDetail, lastAction);
            }
        });
    },

    /**
     * Undo the last action
     */
    undo() {
        // appply the last item to the layer
        // specified by id
        if (this.layers.length > 0) {
            // get the last layer before the undo action
            let layer = this.layers[this.layers.length - 1];
            this.lastLayer = layer;
            this.undoManager.undo();
            return {
                layer: layer.layer,
                lastAction: layer.lastAction
            };
        }

        return null;
    },
    /**
     * Redo the last action
     */
    redo() {
        this.undoManager.redo();
        if (this.layers.length > 0) {
            let layer = this.layers[this.layers.length - 1].layer;
            // console.log('redo: last and curr not equal?', layer !== this.lastLayer);
            // check if redo reaches its limit
            // or redo action is the output from the last action
            if (!this.$_layerEqual(layer, this.lastLayer)) {
                this.lastLayer = layer;
                return {
                    layer: layer,
                    lastAction: this.layers[this.layers.length - 1].lastAction
                };
            }
        }

        return null;
    },
    $_layerEqual(a, b) {
        return JSON.stringify(a) === JSON.stringify(b)
    }
}