<template>
<div>
<headers style="z-index: 999"></headers>
<side-bar @openWindow="openWindow"></side-bar>
  <div class="editor-container" ref="editorContainer">
    <colorPicker :pickerisShow="isWindowOpen" @closepicker="closepicker" :initialPosition="initposition" :target="targetElement"/>
    <div class="zoom-container" tabindex="0">
        <!-- zoom: (canvasData.zoom / 100),
          '-moz-transform': 'scale(' + (canvasData.zoom / 100) +')', -->
        <div class="editor-box" ref="editorBox"
          :style="{width: canvasData.isResponsive ? canvasData.activeSize.width + 'px': canvasData.width + 'px', 
          height: canvasData.isResponsive ? canvasData.activeSize.height + 'px':canvasData.height + 'px', 
        
          backgroundColor:canvasData.bgColor,}">
        <div class="canvas-wrap">
            <layer @scaling="layerScaling" :layers="filterLayer(layers)"></layer>
        </div>
      </div>
    </div>
  </div>
  <modal></modal>
  <responsive-modal></responsive-modal>
  <!-- Ruler Lines -->
  <div class="h-lrl1 g-lines" ref="hhl1"
    :style="{width: (parseInt(canvasData.width) + parseInt(400)) + 'px', height: '2px'}">
  </div>
  <div class="h-lrl2 g-lines" ref="hhl2"
    :style="{width: (parseInt(canvasData.width) + parseInt(400)) + 'px', height: '2px'}">
  </div>
  <div class="v-lrl1 g-lines" ref="vlrl1"
    :style="{width: '2px', height: (parseInt(canvasData.height) + parseInt(100)) + 'px'}">
  </div>
  <div class="v-lrl2 g-lines" ref="vlrl2"
    :style="{width: '2px', height: (parseInt(canvasData.height) + (100)) + 'px'}">
  </div>
  <!-- <div class="offset-line" ref="vlrl3"
    :style="{width: '2px', height: (parseInt(canvasData.height) + parseInt(100)) + 'px'}">
  </div> -->
  <!-- Ruler Lines -->

  <!-- Grid Lines -->
   <!-- Grid Lines -->
</div>
</template>
<script>
import colorpicker from '../../components/editor/color-picker'
import imageModal from '../../components/layer-modal/image-modal'
import responsiveModal from '../../components/modal-responsive/modal'
import {mapGetters} from 'vuex'
import Header from '../template/header'
import Siderbar from '../template/sidebar'
import selectionBox from './layer'
import gridlineHelper from '../../helpers/ruler-guidelines.js'
import layerCloner from '../../helpers/layer-cloner.js'
import editorCanvasHelper  from '../../helpers/editor-canvas.helper.js'
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
    responsiveModal,
    colorPicker: colorpicker
  },
  computed: {
    ...mapGetters({
      layers: 'getLayers', 
      canvasData: 'getCanvasData'
    })
  },
  mounted() {
    document.addEventListener('keydown', this.keydownEventHandler);
    //gridlineHelper.createGridLines(this.canvasData, this.$refs.editorBox);
  },
  methods: {
    openWindow (val) {
        this.targetElement = val
        setTimeout(()=>{
          this.isWindowOpen = val[0]
        },100)
        // this.$emit('isOpen',true)
    },
    closepicker(value) {
      this.isWindowOpen = value
    },
    layerScaling(layerData) {
      // if (this.canvasData.zoom !== 100) return;

      var bounds1 = this.$refs.editorContainer.getBoundingClientRect();
      var bounds2 = this.$refs.editorBox.getBoundingClientRect();
      // this.$refs.vlrl3.style.left = bounds2.left - 1 + 'px';
      // this.$refs.vlrl3.style.top = bounds2.top - 51 + 'px';
      // this.$refs.vlrl3.style.display = 'block';
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

          layerCloner.cloneElement(layerData);

          // show the offset limit border
          // this.$refs.vlrl3.style.visi
        } else {
          this.$refs.hhl1.style.display="none";
          this.$refs.hhl2.style.display="none";
          this.$refs.vlrl1.style.display="none";
          this.$refs.vlrl2.style.display="none";

          //  this.$refs.vlrl3.style.display = 'none';

          layerCloner.removeElement();
        }
      }, 30);
    },
    filterLayer (layers){
      let canvas = this.canvasData
      if(!this.canvasData.isResponsive){
        return layers
      }else {
        if(canvas.ratios.length > 0) {
          var index = canvas.ratios.findIndex((e)=>{return canvas.selectedRatio === e.name})
          layers = canvas.ratios[index].layers
          return layers
        }else{
          return layers
        }
        
      }
    },
    keydownEventHandler(evt){
      if(evt.key === 'Escape' && this.isWindowOpen) {
        this.isWindowOpen = false
      }
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
.offset-line {
  border-left: 2px dashed violet;
  position: absolute;
  height: 500px;
  width: 2px;
  left: 500px;
  top: 0px;
  z-index: 1;
}
.g-lines {
  z-index: 1;
}
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
    user-select: none;
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
    /* margin: 50px; */
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
    outline: none;
     user-select: none;
}
</style>

