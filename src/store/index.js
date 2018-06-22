import Vue from 'vue'
import Vuex from 'vuex'
// import * as _ from 'lodash'
// import modules from './modules'

import appHelper from '../helpers/app.helper'
import zoomHelper from '../helpers/zoom.helper'
import * as $ from 'linq'
import axios from 'axios'
import apiService from '../helpers/API.js'
Vue.use(Vuex)
export const store = new Vuex.Store({
    state: {
        // for editor toolbar
        canvasData: {
            canvas_name: 'New File 1',
            project_name: 'New File 1',
            width: 900,
            height: 500,
            zoom: 100,
            zoomIncrease: 10,
            bgColor: '#fff',
            gridLines: true,
            isResponsive: false,
            selectedRatio: '',
            activeSize: {},
            ratios: [],
            originalLayers: [],
            templateSelected: {},
            tabSelected: ''
        },
        projects: {
            project_id: 0,
            project_name: '',
            is_public: false,
            orientation: ''
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
                islocked: false,
                animation: null,
                selected: false,
                open: false,
                type: 'shape',
                component: 'shape-layer',
                zindex: null,
                content: 'Shape Layer',
                isBackground: false,
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
                    shadowSize: 0,
                    shadowColor: '',
                    backgroundImageUri: '',
                    backgroundImageRepeat: 'none',
                    backgroundImagePosition: 'Left',
                    backgroundImageAttachment: 'none',
                    filterBlur: 0,
                    animation: {
                        loop: null,
                        animationFlow: {
                            ds: 0, // delay start
                            fxs: 0, // fx start
                            e: 0, // elapse
                            fxe: 0, // fx end
                            de: 0, // delay end
                        },
                        animations: [],
                        playing: false,
                    },
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
                islocked: false,
                animation: null,
                selected: false,
                type: 'image',
                component: 'image-layer',
                zindex: null,
                open: false,
                image: {},
                content: 'Image Layer',
                isBackground: false,
                loaded: true,
                attributes: {
                    src: 'http://via.placeholder.com/140x100',
                    sizeOption: 'Auto',
                    opacity: 1,
                    rotation: 0,
                    borderWidth: 0,
                    borderStyle: 'None',
                    borderColor: '',
                    shadowSize: 1,
                    shadowColor: '',
                    objectFit: 'Scale-Down',
                    filterBlur: 0,
                    animation: {
                        loop: null,
                        animationFlow: {
                            ds: 0, // delay start
                            fxs: 0, // fx start
                            e: 0, // elapse
                            fxe: 0, // fx end
                            de: 0, // delay end
                        },
                        animations: [],
                        playing: false,
                    },
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
                islocked: false,
                animation: null,
                selected: false,
                type: 'text',
                target_element: null,
                component: 'text-layer',
                zindex: null,
                open: false,
                content: 'Text Layer',
                isBackground: false,
                attributes: {
                    rotation: 0,
                    fontFamily: "Lato",
                    fontSize: 20,
                    fontWeight: "normal",
                    fontStyle: "normal",
                    textDecoration: "none", // underline or not
                    textAlign: "left",
                    listStyle: "block",
                    lineHeight: 1.5,
                    color: "#000",
                    backgroundColor: "transparent",
                    borderSize: "0px",
                    borderStyle: "",
                    borderColor: "#000",
                    shadowSize: 0,
                    shadowColor: "",
                    opacity: 1,
                    filterBlur: 0,
                    animation: {
                        loop: null,
                        animationFlow: {
                            ds: 0, // delay start
                            fxs: 0, // fx start
                            e: 0, // elapse
                            fxe: 0, // fx end
                            de: 0, // delay end
                        },
                        animations: [],
                        playing: false,
                    },
                }
            },
            {
                id: null,
                title: 'Video',
                icon: 'play_arrow',
                order: 0,
                visible: true,
                islocked: false,
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
                islocked: false,
                animation: null,
                selected: false,
                type: 'audio',
                attributes: {}
            }
        ],
        broadcastedStatuses: null,
    },
    mutations: {
        addLayer: (state, payload) => {
            // check if the item is from undo or redo
            // if not, assign a new id for this item
            // indicating that this item is created
            let layers = state.layers
            console.log(payload)
            if (!payload.fromUndoRedo) {
                payload = appHelper.createLayer(payload);
                payload.order = layers.length > 0 ? $.from(layers).max(l => l.order) + 1 : 1;
                payload.x = 100;
                payload.y = 100;
                payload.open = true;
            }
            //setting the last active layer to in-active
            for (let i = 0; i < layers.length; i++) {
                layers[i].selected = false
            }

            payload.selected = true;
            layers.push(payload)
            let sam = layers.sort((a, b) => {
                return b.order - a.order
            })
            console.log('state.canvasData.ratios:', state.canvasData)
            let ratios = state.canvasData.ratios
            if (ratios.length > 0) {
                for (let i = 0; i < ratios.length; i++) {
                    let ratiolayers = ratios[i].layers
                    console.log('ratiolayers:', ratiolayers)
                    if (state.canvasData.selectedRatio === ratios[i].name) {
                        // ratiolayers.push(payload)
                        // ratiolayers.sort((a, b) => {
                        //     return b.order - a.order
                        // })
                        ratios[i].layers = sam
                    } else {
                        ratios[i].layers.selected = false
                        ratios[i].layers.open = false
                        if (ratios[i].layers.length > 0) {
                            let les = JSON.parse(JSON.stringify(ratios[i].layers))
                            payload.x = 100;
                            payload.y = 100;
                            les.push(payload)
                            les.sort((a, b) => {
                                return b.order - a.order
                            })
                            ratios[i].layers = JSON.parse(JSON.stringify(les))
                        } else {
                            ratios[i].layers = JSON.parse(JSON.stringify(sam))
                        }
                    }
                }
            }
            if (!state.canvasData.isResponsive) {
                state.canvasData.originalLayers = JSON.parse(JSON.stringify(layers))
            } else {
                let orig = state.canvasData.originalLayers
                orig.push(payload)
                orig.sort((a, b) => {
                    return b.order - a.order
                })
                state.canvasData.originalLayers = JSON.parse(JSON.stringify(orig))
            }
            console.log('sam:', sam)
            Vue.localStorage.set('layers', JSON.stringify(sam))
            Vue.set(state, 'canvasData', state.canvasData)
            Vue.set(state, 'layers', sam)
                // this is for the undo manager to
                // watch the changes of the layers
                // check if the source of the data
                // is not from redo/undo module
            if (!payload.fromUndoRedo) {
                Vue.set(state, 'lastItemAdd', {
                    time: appHelper.generateTimestamp(),
                    layer: payload
                })
            }
        },
        // to select the layer from other modules
        // watch this value as it changes
        setSelectedLayerId: (state, _newSelectedLayerId) => {
            // console.log('_newSelectedLayerId:', _newSelectedLayerId)
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
        updateLayers: (state, layers) => {
            let newLayers = layers
            Vue.set(state, 'layers', layers)
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
            Vue.localStorage.set('layers', JSON.stringify(state.layers))
        },
        selectTemplate: (state, payload) => {
            // console.log('payload;', payload)
            // return new Promise((resolve, reject)=> {
            //     let template = state.canvasData
            //     template.backgroundcolor = payload.backgroundcolor
            //     template.canvas_name = payload.canvas_name
            //     template.project_name = payload.project_name
            //     template.height = payload.height
            //     template.width = payload.width
            //     template.templateSelected = payload.templateSelected
            //     template.description = 'asdasd'
            //     template.is_public = false
            //     let project= {
            //         project_name: template.project_name,
            //         is_public: template.is_public,
            //         orientation: 'asdasd',
            //     }
                
            //     store.dispatch('saveProject', project).then(response =>{
            //         if(response.data.response.statusCode === 201){
            //             console.log("ASDASDASD")
            //             Vue.localStorage.set('canvas', JSON.stringify(template))
            //             resolve(response)
            //         }
            //     }).catch(err=>{
            //         reject(err)
            //     })
            // })
                // return apiService.saveCavas(template).then(response =>{
                //     console.log('resop:',response)
                // })
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
            let storaged = JSON.parse(Vue.localStorage.get('layers'))
            Vue.set(state, 'layers', storaged === null || undefined ? [] : storaged)
        },
        applyTemplate: (state, payload) => {
            let layers = state.layers
            layers = payload.item
            Vue.set(state, 'layers', layers)
        },
        broadCastStatus: (state, status) => {
            if (!state) {
                throw new Error('Invalid status');
            }
            state.broadcastedStatuses = status;
            window.setTimeout(() => {
                state.broadcastedStatuses = null;
            }, 500);
        },
        setBackgroundImage: (state) => {
            console.log('sate:",', state.canvasData)
            let layers = state.layers
            let payload = {}
            if (!payload.fromUndoRedo) {
                payload = appHelper.createLayer(payload);
                payload.order = layers.length > 0 ? $.from(layers).max(l => l.order) + 1 : 1;
                payload.x = 0;
                payload.y = 0;
                payload.open = true;
                console.log('payload:', payload)
            }
            for (let i = 0; i < layers.length; i++) {
                layers[i].selected = false
            }

            payload.component = 'background-layer';
            payload.type = 'background';
            payload.visible = true;
            payload.animation = null;
            payload.selected = true;
            payload.isBackground = true;
            payload.image = {},
                payload.width = state.canvasData.width,
                payload.height = state.canvasData.height,
                payload.attributes = {
                    rotation: 0,
                    color: '#333',
                    isGradient: false,
                    gradientBackgroundData: state.items[0].attributes.gradientBackgroundData,
                    backgroundBlendMode: 'lighten',
                    backgroundSize: 'cover',
                    backgroundPosition: '50% 50%',
                    animation: state.items[0].attributes.animation,
                    animations: []
                }
            layers.push(payload)
            let sam = layers.sort((a, b) => {
                return b.order - a.order
            })
            Vue.localStorage.set('layers', JSON.stringify(sam))
            Vue.set(state, 'layers', sam)
                // this is for the undo manager to
                // watch the changes of the layers
                // check if the source of the data
                // is not from redo/undo module
            if (!payload.fromUndoRedo) {
                Vue.set(state, 'lastItemAdd', appHelper.generateTimestamp())
            }
        },
        updatecanvasData: (state,payload) => {
            let pay = payload
            Vue.set(state,'canvasData',pay)
        } 
    },
    getters: {
        getItems: state => {
            return state.items
        },
        getLayers: state => {
            // let saveLayer = Vue.localStorage.get('layers')
            // console.log('saveLayer:',saveLayer)
            let sam = state.layers.sort((a, b) => {
                return b.order - a.order
            })
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
            let storaged = JSON.parse(Vue.localStorage.get('canvas'))
            state.canvasData = storaged !== null ? storaged : state.canvasData
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
        getBroadcastedStatuses: state => {
            return state.broadcastedStatuses;
        },
    },
    actions: {
        addLayer: ({ commit }, payload) => {
            commit('addLayer', payload)
        },
        editLayer: ({ commit }, payload) => {
            commit('editLayer', payload)
            
        },
        selectTemplate: ({ commit,state }, payload) => {
            return new Promise((resolve, reject) => {
                let template = state.canvasData
                template.backgroundcolor = payload.backgroundcolor
                template.canvas_name = payload.canvas_name
                template.project_name = payload.project_name
                template.height = payload.height
                template.width = payload.width
                template.templateSelected = payload.templateSelected
                template.description = 'asdasd'
                template.is_public = false
                let project= {
                    project_name: template.project_name,
                    is_public: template.is_public,
                    orientation: 'asdasd',
                }
                
                store.dispatch('saveProject', project).then(response =>{
                    if(response.data.response.statusCode === 201){
                        let proj = response.data.response.data
                        let stateproj = state.projects
                        stateproj.project_id = proj.project_id
                        stateproj.project_name = proj.project_name
                        stateproj.is_public = proj.is_public
                        stateproj.orientation = proj.orientation
                        console.log(stateproj)
                        Vue.set(state, 'projects', stateproj)
                        Vue.localStorage.set('canvas', JSON.stringify(template))
                        resolve(response)
                    }
                }).catch(err=>{
                    reject(err)
                })
            })
            // commit('selectTemplate',payload)
            // return store.dispatch('selectTemplate',payload).then((response)=>{
               
            // })
          
        },
        updateLayers: ({ commit }, payload) => {
            commit('updateLayers', payload)
        },
        setBackgroundImage: ({ commit }, payload) => {
            commit('setBackgroundImage', payload)
        },
        saveProject: ({ commit }, payload) => {
            return apiService.saveProject(payload,
                data => {
                    commit(data)
                }, errors => {
                    commit(errors)
                })
        },
        updatecanvasData: ({commit}, payload) => {
            commit('updatecanvasData',payload)
        }
    }
    //   strict: process.env.NODE_ENV !== 'production'
})