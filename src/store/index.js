import Vue from 'vue'
import Vuex from 'vuex'
// import * as _ from 'lodash'
// import modules from './modules'

import appHelper from '../helpers/app.helper'
import * as $ from 'linq'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        // for editor toolbar
        canvasData: {
            filename: 'New File 1',
            width: "508px",
            height: "423px",
            zoom: "100%"
        },
        // the timestamp to when an item occured
        lastItemAdd: null,
        lastUpdateTime: null,
        // the selected layer id set by operations such as undo and redo or sidebar item selection
        selectedLayerId: null,
        removableId: null,
        layers: [],
        selectedImage: {},
        setAnimation: {
            name: null,
            id: null
        },
        items: [{
                id: null,
                x: 0,
                y: 0,
                width: 100,
                height: 100,
                title: 'Shape',
                icon: 'landscape',
                order: 0,
                visible: true,
                animation: null,
                selected: false,
                open: false,
                type: 'shape',
                component: 'shape-layer',
                attributes: {
                    shape: 'Circle',
                    sizeOption: 'Manual',
                    opacity: 1,
                    rotation: 0,
                    color: '#333',
                    gradientBackgroundData: {
                        value: [0, 100],
                        width: '100%',
                        height: 2,
                        dotSize: 15,
                        min: 0,
                        max: 100,
                        realTime: true,
                        disabled: false,
                        clickable: true,
                        show: true,
                        realTime: true,
                        piecewise: false,
                        formatter: '{value}%',
                        useKeyboard: true,
                        tooltip: "hover",
                        tooltipDir: [
                            "bottom",
                            "top"
                        ],
                        style: {
                            width: '100%',
                            marginTop: '9px',
                            marginBottom: '0px'
                        },
                        bgStyle: {
                            backgroundColor: '#757575',
                            boxShadow: 'inset 0.5px 0.5px 3px 1px rgba(0,0,0,.36)'
                        },
                        sliderStyle: [{
                            backgroundColor: 'red'
                        }, {
                            backgroundColor: 'yellow'
                        }],
                        processStyle: {
                            background: '-webkit-linear-gradient(left, red, yellow)'
                        }
                    },
                    borderSize: 0,
                    borderStyle: 'Square',
                    borderColor: 'red',
                    shadowSize: '',
                    shadowColor: '',
                    backgroundImageUri: '',
                    backgroundImageRepeat: 'none',
                    backgroundImagePosition: 'Left',
                    backgroundImageAttachment: 'none'
                },
            },
            // image
            {
                id: null,
                x: 0,
                y: 0,
                width: 100,
                height: 100,
                title: 'Image',
                icon: 'image',
                order: 0,
                visible: true,
                animation: null,
                selected: false,
                type: 'image',
                component: 'image-layer',
                open: false,
                attributes: {
                    src: 'http://via.placeholder.com/140x100',
                    sizeOption: 'Auto',
                    opacity: '1',
                    rotation: 0,
                    borderSize: '0',
                    borderStyle: 'solid',
                    borderColor: '',
                    shadowSize: '0',
                    shadowColor: '',
                    objectFit: 'none'
                }
            },
            {
                id: null,
                x: 0,
                y: 0,
                width: 100,
                height: 100,
                title: 'Text',
                icon: 'text_fields',
                width: 200,
                height: 150,
                order: 0,
                visible: true,
                animation: null,
                selected: false,
                type: 'text',
                target_element: null,
                component: 'text-layer',
                open: false,
                content: 'Text Layer',
                attributes: {
                    rotation: 0,
                    fontFamily: "Lato",
                    fontSize: "20px",
                    fontWeight: "normal",
                    fontStyle: "normal",
                    textDecoration: "none", // underline or not
                    textAlign: "left",
                    listStyle: "block",
                    lineHeight: "20px",
                    color: "#000",
                    backgroundColor: "transparent",
                    borderSize: "0px",
                    borderStyle: "",
                    borderColor: "#000",
                    shadowSize: 0,
                    shadowColor: ""
                }
            },
            {
                id: null,
                title: 'Video',
                icon: 'play_arrow',
                order: 0,
                visible: true,
                animation: null,
                selected: false,
                type: 'video',
                attributes: {
                    width: '100',
                    height: '100',
                    src: ''
                }
            },
            {
                id: null,
                title: 'Audio',
                icon: 'volume_down',
                order: 0,
                visible: true,
                animation: null,
                selected: false,
                type: 'audio',
                attributes: {}
            }
        ]
    },
    mutations: {
        addLayer: (state, payload) => {
            // check if the item is from undo or redo
            // if not, assign a new id for this item
            // indicating that this item is created
            if (!payload.fromUndoRedo) {
                payload = appHelper.createLayer(payload);
            }
            let layers = state.layers
                //setting the last active layer to in-active
            for (var i = 0; i < layers.length; i++) {
                layers[i].selected = false;
            }
            payload.x = 100
            payload.y = 100
            payload.open = true
            payload.selected = true;
            // payload.width = 200
            // payload.height = 150
            layers.push(payload)
            Vue.set(state, 'layers', layers)

            // this is for the undo manager to
            // watch the changes of the layers
            // check if the source of the data
            // is not from redo/undo module
            if (!payload.fromUndoRedo) {
                Vue.set(state, 'lastItemAdd', appHelper.generateTimestamp())
            }
        },
        // to select the layer from other modules
        // watch this value as it changes
        setSelectedLayerId: (state, _newSelectedLayerId) => {
            // added
            // id is remain the same to avoid conflicts to other modules
            var srcLayer = $.from(state.layers).firstOrDefault(l => l.id === _newSelectedLayerId);
            state.selectedLayerId = {
                ts: appHelper.generateTimestamp(),
                id: _newSelectedLayerId,
                sourceLayer: srcLayer
            };
        },
        // updates the layer's data
        // by setting its value to the payload ('item')
        setLayerValue: (state, item) => {
            let layers = state.layers;
            for (var i = 0; i < layers.length; i++) {
                if (layers[i].id === item.id) {
                    layers[i].x = item.x;
                    layers[i].y = item.y;
                    layers[i].width = item.width;
                    layers[i].height = item.height;
                    // attributes
                    for (var key in layers[i].attributes) {
                        layers[i].attributes[key] = item.attributes[key];
                    }
                    break;
                }
            }
            Vue.set(state, 'layers', layers);
        },
        // updates the layer list
        updateLayers: (state, newLayers) => {
            Vue.set(state, 'layers', newLayers)
        },
        removeGlobalLayer: (state, _layerId) => {
            Vue.set(state, 'removableId', _layerId)
        },
        setLastUpdateTime: (state) => {
            Vue.set(state, 'lastUpdateTime', appHelper.generateTimestamp())
        },
        isAnimation: (state, item) => {
            Vue.set(state, 'setAnimation', item)
        },
        // removing a layer
        // sidebar remove 
        removeSelectedLayer: (state, layerId) => {
            if (!layerId) {
                return;
            }
            for (var i = 0; i < state.layers.length; i++) {
                if (state.layers[i].id === layerId) {
                    state.layers.splice(i, 1);
                    break;
                }
            }
        },
    },
    getters: {
        getItems: state => {
            return state.items
        },
        getLayers: state => {
            return state.layers
        },
        getRemoveId: state => {
            return state.removableId
        },
        // returns the current selected layer id
        getSelectedLayerId: state => {
            return state.selectedLayerId
        },
        // getLastEditTime: state => {
        //     return {
        //         'time': state.lastUpdateTime,
        //         'layer': $.from(state.layers).where(l => l.id === state.selectedLayerId)
        //             .firstOrDefault()
        //     }
        // },
        // returns the timestamp to when the last item is added
        getLastLayerAddTime: state => {
            return state.lastItemAdd
        },
        // canvas related data
        // this is the value of the editor's toolbar (zoom, height, width, etc.)
        getCanvasData: state => {
            return state.canvasData;
        },
        // returns the default shape layer
        getShapeLayer: state => {
            return appHelper.cloneLayer(state.items[0])
        },
    },
    actions: {
        addLayer: ({ commit }, payload) => {
            commit('addLayer', payload)
        },
        editLayer: ({ commit }, payload) => {
            commit('editLayer', payload)
        }
    }
    //   strict: process.env.NODE_ENV !== 'production'
})