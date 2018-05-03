import Vue from 'vue'
import Vuex from 'vuex'
// import * as _ from 'lodash'
// import modules from './modules'

import * as _enumerable from 'linq'
Vue.use(_enumerable)

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
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
      {
        id: null,
        title: 'Shape',
        icon: 'landscape',
        order: 0,
        visible: true,
        animation: null,
        selected: false,
        type: 'shape',
        attributes: [
          {
            id: 1,
            name: 'shape',
            display: 'Shape',
            content_type: 'option',
            value: 'Circle Filled',
            items: ['Square Filled', 'Square Unfilled', 'Triangle Filled', 'Triangle Unfilled', 'Circle Filled', 'Circle Unfilled']
          },
          {id: 2, name: 'border-color', display: 'Border Color', content_type: 'color', value: 'black', value_type: 'css'},
          {id: 3, name: 'fill', display: 'Fill Color', content_type: 'color', value: 'red', value_type: 'css'},
          {id: 32, name: 'opacity', display: 'Opacity', content_type: 'opacity', value: 0},
          // {id: 4, name: 'stroke-width', display: 'Stroke Width', content_type: 'number', value: '2', value_type: 'css', unit: ''},
          {id: 5, display: 'Gradient Background', content_type: 'heading'},
          {id: 6, name: 'gradient-slider', display: 'slider gradient', content_type: 'gradient', value: [0, 100], colors: ['', '']},
          {id: 30, name: 'gradient color', display: 'Selected colour', content_type: 'gradient colour', value: ''},
          {id: 7, name: 'gradient position', display: 'Selected position', content_type: 'position', value: '2'},
          {id: 8, name: 'gradient rotate', display: 'Rotate', content_type: 'rotate', value: 0},
          {id: 9, display: 'Border', content_type: 'heading'},
          {id: 10,
            name: 'border style',
            display: 'Style',
            content_type: 'style',
            value: null,
            items: ['none', 'dotted', 'dashed', 'solid']
          },
          // {id: 11, name: 'size', display: 'Size', content_type: 'size', value: 0},
          {id: 4, name: 'stroke-width', display: 'Stroke Width', content_type: 'number', value: 2, value_type: 'css', unit: ''},
          {id: 12, name: 'colour', display: 'Colour', content_type: 'colour', value: null},
          {id: 13, display: 'Shadow', content_type: 'heading'},
          {id: 14, name: 'shadow-size', display: 'Size', content_type: 'shadow size', value: 0},
          {id: 15, name: 'shadow-colour', display: 'Colour', content_type: 'shadow colour', value: 0},
          {id: 16, display: 'Background Image', content_type: 'heading'},
          {id: 17, name: 'background image', display: 'background-url', content_type: 'background-url', request_load: true, value: 'http://via.placeholder.com/140x100', value_type: 'attribute'},
          {id: 18,
            name: 'backgrond repeat',
            display: 'background-repeat',
            content_type: 'background-repeat',
            item: [{
              name: 'Repeat',
              value: 'repeat'
            }, {
              name: 'No repeat',
              value: 'no-repeat'
            }],
            value: 'no-repeat'},
          {id: 19,
            name: 'backgrond position',
            display: 'background-position',
            content_type: 'background-position',
            item: [{
              name: 'Top',
              value: 'top'
            }, {
              name: 'Bottom',
              value: 'bottom'
            }, {
              name: 'Left',
              value: 'left'
            }, {
              name: 'Right',
              value: 'right'
            }, {
              name: 'Center',
              value: 'center'
            }],
            value: null},
          {id: 20,
            name: 'background attachment',
            display: 'background-attachment',
            content_type: 'background-attachment',
            item: ['auto', 'scroll', 'fixed'],
            value: null
          },
          {id: 21,
            name: 'backgrond size',
            display: 'background-size',
            content_type: 'background-size',
            item: ['auto', 'cover', 'contain'],
            value: null
          }
          // {id: 3, name: 'area', display: 'Size', content_type: 'area', value: 0, width: null, height: null, unit: 'px', value_type: 'css'},
          // {id: 4, name: 'border_radius', display: 'Border-radius', content_type: 'number', value: 0, unit: 'px', value_type: 'css'},
          // {id: 5, name: 'gradient', display: 'Gradient', content_type: 'text', value: null},
          // {id: 6, name: 'gradient_angle', display: 'Gradient Angle', content_type: 'number', value: 0, unit: '°' },
          // {
          //   id: 7,
          //   name: 'animation',
          //   display: 'Animation',
          //   content_type: 'option',
          //   value: null,
          //   items: ['Mawala-mobalik', 'M0balik-mawala', 'Dagan pawala', 'Dagan patuo', 'Kapoi dagan ahahaha']
          // }
        ]

      },
      {
        id: null,
        title: 'Image',
        icon: 'image',
        order: 0,
        visible: true,
        animation: null,
        selected: false,
        type: 'image',
        width: 100,
        height: 100,
        attributes: [
          {id: 1, name: 'src', display: 'URL', content_type: 'uri', request_load: true, value: 'http://via.placeholder.com/140x100', value_type: 'attribute'},
          {id: 2, name: 'area', display: 'Size', content_type: 'area', value: 0, width: null, height: null, unit: 'px'},
          {id: 3, name: 'file', display: 'Upload', content_type: 'file', value: null},
          {id: 4,
            name: 'animation',
            display: 'Animation',
            content_type: 'option',
            value: null,
            items: [
              {header: 'Fade'},
              {name: 'Fade Out', value: 'fadeOut', group: 'Fade'},
              {name: 'Fade Out Left', value: 'fadeOutLeft', group: 'Fade'},
              {name: 'Fade Out Right', value: 'fadeOutRight', group: 'Fade'},
              {name: 'Fade Out Up', value: 'fadeOutUp', group: 'Fade'},
              {name: 'Fade Out Down', value: 'fadeOutDown', group: 'Fade'},
              {header: 'Slide'},
              {name: 'Slide Out Right', value: 'slideOutRight', group: 'Slide'},
              {name: 'Slide Out Left', value: 'slideOutLeft', group: 'Slide'},
              {name: 'Slide Out Up', value: 'slideOutUp', group: 'Slide'},
              {name: 'Slide Out Down', value: 'slideOutDown', group: 'Slide'}
            ]},
          {id: 4, display: 'Dynamic', content_type: 'switch', value: null},
          {id: 5, name: 'opacity', display: 'Opacity', content_type: 'slider', value: 1, width: null, height: null, unit: '%'}
        ]
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
        attributes: [
          {id: 1, name: 'text', display: 'Text', content_type: 'text', value: 'Text Layer', value_type: 'content'},
          {id: 2, name: 'color', display: 'Color', content_type: 'color', value: null, value_type: 'css'},
          {id: 3, name: 'font-size', display: 'Font-size', content_type: 'number', value: 13, unit: 'px', value_type: 'css'},
          {
            id: 4,
            name: 'font-family',
            display: 'Font-family',
            content_type: 'option',
            value: null,
            items: [{
              name: 'Arial'
            },
            {
              name: 'Arial 2'
            }],
            value_type: 'css'
          },
          {
            id: 5,
            name: 'font-weight',
            display: 'Font-weight',
            content_type: 'option',
            value: null,
            items: ['Normal', 'Bold', 'Bolder'],
            value_type: 'css'
          },
          {
            id: 6,
            name: 'font-style',
            display: 'Font-style',
            content_type: 'option',
            value: null,
            items: ['Normal', 'Italic'],
            value_type: 'css'
          },
          {
            id: 7,
            name: 'text-align',
            display: 'Text Align',
            content_type: 'option',
            value: 'center',
            items: ['center', 'left', 'right', 'justify'],
            value_type: 'css'
          }
        ]
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
        attributes: [
          {id: 1, name: 'uri', display: 'URL', content_type: 'uri', request_load: true, value: null},
          {id: 2, name: 'area', display: 'Size', content_type: 'area', value: 0, width: null, height: null, unit: 'px'},
          {id: 3, display: 'Upload', content_type: 'file', value: null},
          {
            id: 4,
            name: 'animation',
            display: 'Animation',
            content_type: 'option',
            value: null,
            items: [
              {header: 'Fade'},
              {name: 'Fade Out', value: 'fadeOut', group: 'Fade'},
              {name: 'Fade Out Left', value: 'fadeOutLeft', group: 'Fade'},
              {name: 'Fade Out Right', value: 'fadeOutRight', group: 'Fade'},
              {name: 'Fade Out Up', value: 'fadeOutUp', group: 'Fade'},
              {name: 'Fade Out Down', value: 'fadeOutDown', group: 'Fade'},
              {header: 'Slide'},
              {name: 'Slide Out Right', value: 'slideOutRight', group: 'Slide'},
              {name: 'Slide Out Left', value: 'slideOutLeft', group: 'Slide'},
              {name: 'Slide Out Up', value: 'slideOutUp', group: 'Slide'},
              {name: 'Slide Out Down', value: 'slideOutDown', group: 'Slide'}
            ]
          },
          {id: 3, name: 'dynamic', display: 'Dynamic', content_type: 'switch', value: null}
        ]
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
        attributes: [
          {id: 1, name: 'uri', display: 'URL', content_type: 'uri', request_load: true, value: null},
          {id: 2, name: 'area', display: 'Size', content_type: 'area', value: 0, width: null, height: null, unit: 'px'},
          {id: 3, name: 'file', display: 'Upload', content_type: 'file', value: null},
          {
            id: 4,
            name: 'animation',
            display: 'Animation',
            content_type: 'option',
            value: null,
            items: [
              {header: 'Fade'},
              {name: 'Fade Out', value: 'fadeOut', group: 'Fade'},
              {name: 'Fade Out Left', value: 'fadeOutLeft', group: 'Fade'},
              {name: 'Fade Out Right', value: 'fadeOutRight', group: 'Fade'},
              {name: 'Fade Out Up', value: 'fadeOutUp', group: 'Fade'},
              {name: 'Fade Out Down', value: 'fadeOutDown', group: 'Fade'},
              {header: 'Slide'},
              {name: 'Slide Out Right', value: 'slideOutRight', group: 'Slide'},
              {name: 'Slide Out Left', value: 'slideOutLeft', group: 'Slide'},
              {name: 'Slide Out Up', value: 'slideOutUp', group: 'Slide'},
              {name: 'Slide Out Down', value: 'slideOutDown', group: 'Slide'}
            ]
          }
        ]
      }
    ]
  },
  mutations: {
    addLayer: (state, payload) => {
      let layers = state.layers

      payload.x = 148
      payload.y = 153
      payload.width = 200
      payload.height = 150
      layers.push(payload)
      Vue.set(state, 'layers', layers)
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
      console.log('updateLayers')
      state.layers = newLayers
    },
    removeGlobalLayer: (state, _layerId) => {
      Vue.set(state, 'removableId', _layerId)
    },
    setLastUpdateTime: (state) => {
      var timeStampInMs = window.performance && window.performance.now && window.performance.timing && window.performance.timing.navigationStart ? window.performance.now() + window.performance.timing.navigationStart : Date.now()
      let timeChanged = (timeStampInMs, Date.now())
      Vue.set(state, 'lastUpdateTime', timeChanged)
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
    }
  },
  actions: {
    addLayer: ({commit}, payload) => {
      commit('addLayer', payload)
    },
    editLayer: ({commit}, payload) => {
      commit('editLayer', payload)
    }
  }
//   strict: process.env.NODE_ENV !== 'production'
})
