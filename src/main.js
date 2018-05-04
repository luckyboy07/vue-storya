// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import './css/main.css'
import VTooltip from 'v-tooltip'
import Multiselect from 'vue-multiselect'
// import JustDigits from './directives/only-number-filter.js'
import * as VueWindow from '@hscmap/vue-window'
import LayerComponent from './pages/template/menus'
import RotatableResizer from './components/draggable/rotatable-resizer'
// import 'muse-components/styles/base.less'
Vue.use(MuseUI)
Vue.use(VueWindow)
Vue.config.productionTip = false
Vue.use(VTooltip)
Vue.use(LayerComponent)
Vue.component('multiselect', Multiselect)
Vue.component('rotatable-resizer', RotatableResizer)
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
