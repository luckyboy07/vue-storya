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
        lastItemAdd: null, // the timestamp to when an item occured
        lastUpdateTime: null,
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
                    sizeOption: 'Auto',
                    opacity: 1,
                    rotation: 0,
                    color: '',
                    gradientPosition: '',
                    gradientColor: '',
                    gradientRotation: '',
                    borderWidth: '0',
                    borderStyle: 'none',
                    borderColor: '',
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
                image: {},
                attributes: {
                    src: 'http://via.placeholder.com/140x100',
                    sizeOption: 'Auto',
                    opacity: 1,
                    rotation: 0,
                    borderWidth: '0',
                    borderStyle: 'solid',
                    borderColor: '',
                    shadowSize: '1',
                    shadowColor: '',
                    objectFit: 'cover'
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
                    listStyle: "ol",
                    lineHeight: "20px",
                    color: "#000",
                    backgroundColor: "#fff",
                    borderWidth: "0px",
                    borderStyle: "",
                    borderColor: "#000",
                    shadowSize: "",
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
            payload = appHelper.createLayer(payload)
            let layers = state.layers
                //setting the last active layer to in-active
            for (var i = 0; i < layers.length; i++) {
                layers[i].selected = false
                layers[i].order += 1
            }
            payload.x = 100
            payload.y = 100
            payload.open = true
            payload.selected = true
            // payload.width = 200
            // payload.height = 150
            layers.push(payload)
            layers.sort((a, b) => a.order > b.order)
            Vue.set(state, 'layers', layers)

            // this is for the undo manager to
            // watch the changes of the layers
            // check if the source of the data
            // is not from redo/undo module
            if (!payload.fromUndoRedo) {
                Vue.set(state, 'lastItemAdd', appHelper.generateTimestamp())
            }
        },
        // setLayerId: (state, _layerId) => {
        //     if (!_layerId) {
        //         return
        //     }
        //     Vue.set(state, 'selectedLayerId', _layerId)
        // },
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
            Vue.set(state, 'layers', layers)
        },
        updateLayers: (state, newLayers) => {
            state.layers = newLayers
            console.log('updateLayers', state.layers)
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
        // when exp
    },
    getters: {
        getItems: state => {
            return state.items
        },
        getLayers: state => {
            return state.layers
        },
        getLayer: (state, id) => {
            return
        },
        getRemoveId: state => {
            return state.removableId
        },
        getSelectedId: state => {
            return state.selectedLayerId
        },
        getLastEditTime: state => {
            return {
                'time': state.lastUpdateTime,
                'layer': $.from(state.layers).where(l => l.id === state.selectedLayerId)
                    .firstOrDefault()
            }
        },
        getLastLayerAddTime: state => {
            return state.lastItemAdd
        },
        // canvas related data
        getCanvasData: state => {
            console.log(state.canvasData);
            return state.canvasData;
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