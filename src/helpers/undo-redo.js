import UndoManager from 'undo-manager';
import appHelper from './app.helper.js';
import { store } from '../store'

export default {
    undoManager: new UndoManager(),
    layers: [],
    lastLayer: null,
    $_addLayer: function(id, layerDetail, lastAction) {
        var screen = this.$_getScreen();
        this.layers.push({
            'id': id,
            'layer': layerDetail,
            'lastAction': lastAction,
            screen: screen,
        });

        // console.log("undo redo, _addLayer", this.layers.length)
    },
    $_removeLayer: function(id) {
        var screen = this.$_getScreen();
        for (var i = 0; i < this.layers.length; i++) {
            if (this.layers[i].id === id && this.layers[i].screen === screen) {
                this.layers.splice(i, 1)
                break;
            }
        }

        // console.log("layers", this.layers)
    },
    /**
     * Creates a new layer to the undo manager memory
     * @param  {} layerDetail layerDetail the layer to be created on the memory
     * @param  {} lastAction
     */
    add(layerDetail, lastAction, ownerScreen) {
        if (!this.$_canExecute()) return;

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
        if (!this.$_canExecute()) {
            return null;
        }
        if (this.undoManager.hasUndo()) {
            let layer = this.$_getLastLayerAtScreen();
            if (layer) {
                // console.log('undo', layer)
                this.undoManager.undo();
                return {
                    layer: layer.layer,
                    lastAction: layer.lastAction
                };
            }
        }

        return null;
    },
    /**
     * Redo the last action
     */
    redo() {
        if (!this.$_canExecute()) {
            return null;
        }
        if (this.undoManager.hasRedo()) {
            this.undoManager.redo();
            let layer = this.$_getLastLayerAtScreen();
            if (layer) {
                return {
                    layer: layer.layer,
                    lastAction: layer.lastAction
                };
            }
        }

        return null;
    },
    $_layerEqual(a, b) {
        return JSON.stringify(a) === JSON.stringify(b)
    },
    $_getScreen() {
        var canvasData = store.getters.getCanvasData;
        if (!canvasData.isResponsive) return 'default';

        return canvasData.selectedRatio || 'excludeMe';
    },
    $_canExecute() {
        var canvasData = store.getters.getCanvasData;
        if (canvasData.isResponsive && !canvasData.isResponsive) return false;

        return true;
    },
    $_getLastLayerAtScreen() {
        // console.log('_getLastLayerAtScreen')
        var screen = this.$_getScreen();
        // console.log('screen', screen)
        var _layers = [];
        for (var i = 0; i < this.layers.length; i++) {
            if (screen === this.layers[i].screen) {
                _layers.push(this.layers[i]);
            }
        }
        // console.log(' _layers', _layers)
        return _layers[_layers.length - 1]
    },
}