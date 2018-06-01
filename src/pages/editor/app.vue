<template>
<div>
<headers style="z-index: 999"></headers>
<side-bar @openWindow="openWindow"></side-bar>
  <div class="editor-container" ref="editorContainer">
    <colorPicker :pickerisShow="isWindowOpen" @closepicker="closepicker" :initialPosition="initposition" :target="targetElement"/>
    <div class="zoom-container">
        <div class="editor-box" ref="editorBox"
          :style="{width: canvasData.width + 'px', 
          height: canvasData.height + 'px', 
          zoom: (canvasData.zoom / 100),
          '-moz-transform': 'scale(' + (canvasData.zoom / 100) +')',
          backgroundColor:canvasData.bgColor,}">
        <div class="canvas-wrap">
            <layer @scaling="layerScaling" :layers="layers"></layer>
        </div>
      </div>
    </div>
  </div>
  <modal></modal>
  <!-- Ruler Lines -->
  <div class="h-lrl1" ref="hhl1"
    :style="{width: (canvasData.width + 400) + 'px', height: '2px'}">
  </div>
  <div class="h-lrl2" ref="hhl2"
    :style="{width: (canvasData.width + 400) + 'px', height: '2px'}">
  </div>
  <div class="v-lrl1" ref="vlrl1"
    :style="{width: '2px', height: (canvasData.height + 100) + 'px'}">
  </div>
  <div class="v-lrl2" ref="vlrl2"
    :style="{width: '2px', height: (canvasData.height + 100) + 'px'}">
  </div>
  <!-- Ruler Lines -->

  <!-- Grid Lines -->
   <!-- Grid Lines -->
</div>
</template>
<script>
import colorpicker from '../../components/editor/color-picker'
import imageModal from '../../components/layer-modal/image-modal'
import {mapGetters} from 'vuex'
import Header from '../template/header'
import Siderbar from '../template/sidebar'
import selectionBox from './layer'
import gridlineHelper from '../../helpers/ruler-guidelines.js'
import layerCloner from '../../helpers/layer-cloner.js'
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
  mounted() {
    //gridlineHelper.createGridLines(this.canvasData, this.$refs.editorBox);
  },
  methods: {
    openWindow (val) {
        this.targetElement = val
        console.log('openWindow:',val)
        setTimeout(()=>{
        this.isWindowOpen = val[0]
        },100)
        // this.$emit('isOpen',true)
    },
    closepicker(value) {
      this.isWindowOpen = value
    },
    layerScaling(layerData) {
      if (this.canvasData.zoom !== 100) return;

      var bounds1 = this.$refs.editorContainer.getBoundingClientRect();
      var bounds2 = this.$refs.editorBox.getBoundingClientRect();
      setTimeout(() => {
        // console.log(layerData, bounds);
        if (layerData) {
          // horizontal lines
          // upper
          this.$refs.hhl1.style.display="block";
          this.$refs.hhl1.style.left = (bounds2.left - 200) + 'px';
          this.$refs.hhl1.style.top = (layerData.y + bounds1.top + 23) + 'px';
          // lower
          this.$refs.hhl2.style.display="block";
          this.$refs.hhl2.style.left = (bounds2.left - 200) + 'px';
          this.$refs.hhl2.style.top = (layerData.y + bounds1.top + 21 + layerData.height) + 'px';

          // vertical lines
          // left
          this.$refs.vlrl1.style.display="block";
          this.$refs.vlrl1.style.left = ((layerData.x + bounds2.left) + 1) + 'px';
          this.$refs.vlrl1.style.top = (bounds2.top - 50) + 'px';
          // right
          this.$refs.vlrl2.style.display="block";
          this.$refs.vlrl2.style.left = ((layerData.x + bounds2.left + layerData.width) - 1) + 'px';
          this.$refs.vlrl2.style.top = (bounds2.top - 50) + 'px';

          layerCloner.cloneElement(layerData.id);
        } else {
          this.$refs.hhl1.style.display="none";
          this.$refs.hhl2.style.display="none";
          this.$refs.vlrl1.style.display="none";
          this.$refs.vlrl2.style.display="none";

          layerCloner.removeElement();
        }
      }, 50);
    }
  },
  watch: {
    "canvasData.gridLines": {
      handler(val) {
        //gridlineHelper.showGridLines(val)
      },
      deep: true
    }
  },
}
</script>
<style scoped>
.h-lrl1, .v-lrl1, .h-lrl2, .v-lrl2 {
  position: absolute;
  /* z-index: 0; */
  display: none;
}
.h-lrl1 {
 border-top: thin dashed violet; 
 top: 300px;
 left: 100px;
}
.h-lrl2 {
 border-top: thin dashed violet; 
 top: 600px;
 left: 100px;
}
.v-lrl1 {
  border-left: thin dashed violet; 
  top: 100px;
  left: 300px;
}
.v-lrl2 {
  border-left: thin dashed violet; 
  top: 100px;
  left: 600px;
}
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
   /* background-color: white; */
    position: absolute;
    height: 100%;
    width: 100%;
    /* outline: rgb(102, 102, 102) solid 1px; */
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

