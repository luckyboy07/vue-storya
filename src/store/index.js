import Vue from 'vue'
import Vuex from 'vuex'
// import * as _ from 'lodash'
// import modules from './modules'

import appHelper from '../helpers/app.helper'
import zoomHelper from '../helpers/zoom.helper'
import * as $ from 'linq'
Vue.use(Vuex)
export const store = new Vuex.Store({
    state: {
        // for editor toolbar
        canvasData: {
            file_name: 'New File 1',
            project_name: 'New File 1',
            width: 900,
            height: 500,
            zoom: 100,
            zoomIncrease: 20,
        },
        // auto save status
        // 0: no changes
        // 1: data changes
        // 2: changes handled
        autoSaveStatus: '0',
        // the timestamp to when an item occured
        lastItemAdd: null,
        lastUpdateTime: null,
        // the selected layer id set by operations such as undo and redo or sidebar item selection
        selectedLayerId: null,
        removableId: null,
        layers: [],
        // layers: JSON.parse(this.$localStorage.get('layers')) === null || undefined ? [] : JSON.parse(this.$localStorage.get('layers')),
        selectedTemplate: {},
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
                zindex: null,
                attributes: {
                    shape: 'Circle',
                    shape_type: '',
                    sizeOption: 'Manual',
                    opacity: 1,
                    rotation: 0,
                    color: '#333',
                    isGradient: false,
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
                        rotation: 0,
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
                    borderWidth: 0,
                    borderStyle: 'Solid',
                    borderColor: 'red',
                    shadowSize: '',
                    shadowColor: '',
                    backgroundImageUri: '',
                    backgroundImageRepeat: 'none',
                    backgroundImagePosition: 'Left',
                    backgroundImageAttachment: 'none'
                }
            },
            // image
            {
                id: null,
                x: 0,
                y: 0,
                width: 140,
                height: 100,
                title: 'Image',
                icon: 'image',
                order: 0,
                visible: true,
                animation: null,
                selected: false,
                type: 'image',
                component: 'image-layer',
                zindex: null,
                open: false,
                image: {},
                attributes: {
                    src: 'http://via.placeholder.com/140x100',
                    sizeOption: 'Auto',
                    opacity: 1,
                    rotation: 0,
                    borderWidth: 0,
                    borderStyle: 'None',
                    borderColor: '',
                    shadowSize: '1',
                    shadowColor: '',
                    objectFit: 'fill'
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
                zindex: null,
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
                    shadowColor: "",
                    opacity: 1,
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
                console.log('this.$autoStorage:',Vue.localStorage)
                // check if the item is from undo or redo
                // if not, assign a new id for this item
                // indicating that this item is created
            let layers = state.layers
            if (!payload.fromUndoRedo) {
                payload = appHelper.createLayer(payload);
                payload.order = layers.length > 0 ? $.from(layers).max(l => l.order) + 1 : 1;
                payload.x = 100;
                payload.y = 100;
                payload.open = true;
                payload.selected = true;
            }
            //setting the last active layer to in-active
            for (let i = 0; i < layers.length; i++) {
                layers[i].selected = false
            }
            layers.push(payload)
            Vue.localStorage.set('layers', JSON.stringify(layers))
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
            let layers = state.layers
            for (var i = 0; i < layers.length; i++) {
                if (layers[i].id === item.id) {
                    layers[i].x = item.x
                    layers[i].y = item.y
                    layers[i].width = item.width
                    layers[i].height = item.height
                        // attributes
                    for (var key in layers[i].attributes) {
                        layers[i].attributes[key] = item.attributes[key]
                    }
                    break;
                }
            }
            Vue.localStorage.set('layers', JSON.stringify(layers))
            Vue.set(state, 'layers', layers)
        },
        // updates the layer list
        updateLayers: (state) => {
            console.log('newLayers:')
                // Vue.set(state, 'layers', newLayers)
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
            console.log('state.layers:',state.layers)
            Vue.localStorage.set('layers',JSON.stringify(state.layers))
        },
        selectTemplate: (state, payload) => {
            console.log('payload', payload);
            let template = state.canvasData
            template = payload
            template.zoom = 100
            Vue.set(state, 'canvasData', template)
        },
        setAutosaveData: (state, data) => {
            if (data !== '0' && data !== '1' && data !== '2') {
                throw new Error("Invalid status data");
            }
            state.autoSaveStatus = data;
        },
        updateUndoRedoAction: state => {
            state.isActionCastedByUndoRedo = appHelper.generateTimestamp();
        },
        setLayer: state => {
            console.log('asdads:',Vue.localStorage)
            let storaged = JSON.parse(Vue.localStorage.get('layers'))
            Vue.set(state,'layers', storaged === null || undefined ? [] : storaged)
        }
    },
    getters: {
        getItems: state => {
            return state.items
        },
        getLayers: state => {
            // let saveLayer = Vue.localStorage.get('layers')
            // console.log('saveLayer:',saveLayer)
            let storaged = JSON.parse(Vue.localStorage.get('layers'))
            Vue.set(state,'layers', storaged === null || undefined ? [] : storaged)
            return state.layers
        },
        altGetlayer: state => () => state.layers,
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
        getUndoRedoLastAction: state => {
            return state.isActionCastedByUndoRedo;
        },
        getExportContent: state => {
            /*
                {

                }

            */
            var data = state.canvasData;
            data["layers"] = state.layers;
            return data;
        },
        // returns the auto save status data
        getAutosaveStatusData: state => {
            return state.autoSaveStatus;
        },
    },
    actions: {
        addLayer: ({ commit }, payload) => {
            commit('addLayer', payload)
        },
        editLayer: ({ commit }, payload) => {
            commit('editLayer', payload)
        },
        selectTemplate: ({ commit }, payload) => {
            commit('selectTemplate', payload)
        }
    }
    //   strict: process.env.NODE_ENV !== 'production'
})