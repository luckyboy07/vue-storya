<template>
<div>
<headers style="z-index: 999"></headers>
<side-bar @openWindow="openWindow"></side-bar>
    <div class="editor-container" >
      <colorPicker :pickerisShow="isWindowOpen" @closepicker="closepicker" :initialPosition="initposition" :target="targetElement"/>
      <div class="zoom-container">
         <div class="editor-box" :style="{width: canvasData.width + 'px', 
          height: canvasData.height + 'px'}">
          <div class="canvas-wrap">
              <layer :layers="layers"></layer>
          </div>
        </div>
      </div>
    </div>
     <modal></modal>
</div>
</template>
<script>
import colorpicker from '../../components/editor/color-picker'
import imageModal from '../../components/layer-modal/image-modal'
import {mapGetters} from 'vuex'
import Header from '../template/header'
import Siderbar from '../template/sidebar'
import selectionBox from './layer'
export default {
  name: 'Editor',
  data (){
    return {
      isWindowOpen: false,
      initposition: '360 / -80',
      targetElement: null
    }
  },
  components: {
    headers: Header,
    sideBar: Siderbar,
    layer: selectionBox,
    modal: imageModal,
    colorPicker: colorpicker
  },
  computed: {
    ...mapGetters({
      layers: 'getLayers', 
      canvasData: 'getCanvasData'
    })
  },
  methods: {
    openWindow (val) {
        this.targetElement = val
        console.log('openWindow:',val)
        // this.$emit('target',val)
        this.isWindowOpen = val[0]
    },
    closepicker(value) {
      console.log('value:',value)
      this.isWindowOpen = value
    }
  }
}
</script>
<style scoped>
.editor-container {
    padding-top: 22px;
    padding-left: 345px;
}
.editor-container .editor-box {
    width: 508px;
    height: 423px;
    top: 0px;
    margin-left: auto;
    margin-right: auto;
    left: 0px;
    right: 0px;
    transform: translateY(0px);
    border-width: 0px;
    border-style: solid;
    border-color: rgb(255, 255, 255);
    border-image: initial;
}
.canvas-wrap {
   background-color: white;
    position: absolute;
    height: 100%;
    width: 100%;
    outline: rgb(102, 102, 102) solid 1px;
    overflow: hidden;
}
.zoom-container {
    width: 100%;
    height: 80vh;
    overflow: auto;
    margin-bottom: 20px;
    /* background: red;
    border: 2px solid blue; */
}
</style>

