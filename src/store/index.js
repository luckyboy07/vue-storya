import Vue from 'vue'
import Vuex from 'vuex'
// import * as _ from 'lodash'
// import modules from './modules'

import appHelper from '../helpers/app.helper'
import * as $ from 'linq'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        lastItemAdd: null, // the timestamp to when an item occured
        lastUpdateTime: null,
        selectedLayerId: null,
        removableId: null,
        layers: [],
        selectedImage: {},
        setAnimation: 
        {
        name: null,
        id: null
        },
        items: [
            {
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
                    opacity: '1',
                    rotation: '0',
                    color: '',
                    gradientPosition: '',
                    gradientColor: '',
                    gradientRotation: '',
                    borderSize: '0',
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
                attributes: {
                    src: 'http://via.placeholder.com/140x100',
                    sizeOption: 'Auto',
                    opacity: '1',
                    rotation: '0',
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
                    fontFamily: 'Lato',
                    fontSize: '20px',
                    fontWeight: 'normal',
                    fontStyle: 'normal',
                    textDecoration: 'none', // underline or not
                    textAlign: 'left',
                    listStyle: 'ol',
                    lineHeight: '1em',
                    color: '#000',
                    backgroundColor: '#fff',
                    borderSize: '',
                    borderStyle: '',
                    borderColor: '#000',
                    shadowSize: '',
                    shadowColor: ''
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
            if (!payload.id) {
                payload.id = appHelper.generateGUID();
            }
            let layers = state.layers
            payload.x = 0
            payload.y = 0
            payload.width = 200
            payload.height = 150
            payload.open = true
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
        setLayerValue: (state, item) => {
            console.log('item:',item)
            let layers = state.layers
            // let layer = $.from(state.layers).where(l => l.id === item.id)
            //     .firstOrDefault()
            // layer.x = item.x;
            // layer.y = item.y;
            for (var i = 0; i < layers.length; i++) {
                if (layers[i].id === item.id) {
                    layers[i].x = item.x
                    layers[i].y = item.y
                    break
                }
            }
            // state.layers = layers;

            Vue.set(state, 'layers', layers);
            // state.layers = layers;
            console.log('layers new ', state.layers);
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