import Vue from 'vue'
import Vuex from 'vuex'
// import * as _ from 'lodash'
// import modules from './modules'

import appHelper from '../helpers/app.helper'
import * as _enumerable from 'linq'
Vue.use(_enumerable)

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
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
        items: [
            // Shape layer
            {
                id: null,
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
                    width: "100",
                    height: "100",
                    shape: "Circle",
                    sizeOption: "Auto",
                    opacity: "1",
                    rotation: "0",
                    color: "",
                    gradientPosition: "",
                    gradientColor: "",
                    gradientRotation: "",
                    borderSize: "0",
                    borderStyle: "",
                    borderColor: "",
                    shadowSize: "",
                    shadowColor: "",
                    backgroundImageUri: "",
                    backgroundImageRepeat: "none",
                    backgroundImagePosition: "Left",
                    backgroundImageAttachment: "none"
                },
            },
            // image
            {
                id: null,
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
                    width: "100",
                    height: "100",
                    src: 'http://via.placeholder.com/140x100',
                    sizeOption: "Auto",
                    opacity: "1",
                    rotation: "0",
                    borderSize: "0",
                    borderStyle: "solid",
                    borderColor: "",
                    shadowSize: "0",
                    shadowColor: "",
                    objectFit: "Fit"
                },
            },
            {
                id: null,
                title: 'Text',
                icon: 'text_fields',
                order: 0,
                visible: true,
                animation: null,
                selected: false,
                type: 'text',
                target_element: null,
                component: 'text-layer',
                open: false,
                attributes: {
                    fontFamily: "",
                    fontSize: "16px",
                    fontWeight: "",
                    fontStyle: "",
                    textDecoration: "", // underline or not
                    textAlignment: "center",
                    listStyle: "ol",
                    lineHeight: "1em",
                    color: "#000",
                    backgroundColor: "#fff",
                    borderSize: "",
                    borderStyle: "solid",
                    borderColor: "",
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
                    width: "100",
                    height: "100",

                    src: ""
                },
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
            if (!payload.id) {
                payload.id = appHelper.generateGUID();
            }
            let layers = state.layers
            payload.x = 148
            payload.y = 153
            payload.width = 200
            payload.height = 150
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
        setLayerId: (state, _layerId) => {
            if (!_layerId) {
                return
            }
            Vue.set(state, 'selectedLayerId', _layerId)
        },
        editLayer: (state, item) => {
            let layer = _enumerable.from(state.layers).where(l => l.id === item.id)
                .firstOrDefault()

            var timeStampInMs = window.performance && window.performance.now && window.performance.timing && window.performance.timing.navigationStart ? window.performance.now() + window.performance.timing.navigationStart : Date.now()
            let timeChanged = (timeStampInMs, Date.now())

            Vue.set(state.layers, layer, item)
            Vue.set(state, 'selectedLayerId', item.id)
            Vue.set(state, 'lastUpdateTime', timeChanged)
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
        }
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
        getSelectedId: state => {
            return state.selectedLayerId
        },
        getLastEditTime: state => {
            return {
                'time': state.lastUpdateTime,
                'layer': _enumerable.from(state.layers).where(l => l.id === state.selectedLayerId)
                    .firstOrDefault()
            }
        },
        getLastLayerAddTime: state => {
            return state.lastItemAdd
        }
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