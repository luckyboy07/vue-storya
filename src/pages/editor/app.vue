<template>
<div>
   <mu-popup position="top" :overlay="false" popupClass="demo-popup-top" :open="topPopup">
    Save
  </mu-popup>
<headers style="z-index: 999" @popupSave="popupSave"></headers>
<side-bar @openWindow="openWindow" ></side-bar>
  <div class="editor-container" ref="editorContainer">
    <colorPicker :pickerisShow="isWindowOpen" @closepicker="closepicker" :initialPosition="initposition" :target="targetElement"/>
    <div class="zoom-container" tabindex="0">
        <!-- zoom: (canvasData.zoom / 100),
          '-moz-transform': 'scale(' + (canvasData.zoom / 100) +')', -->
        <div class="editor-box" id="parent1" ref="editorBox" @contextmenu="openContextMenu"
          :style="{width: canvasData.isResponsive ? canvasData.activeSize.width + 'px': canvasData.width + 'px', 
          height: canvasData.isResponsive ? canvasData.activeSize.height + 'px':canvasData.height + 'px', 
        
          backgroundColor:canvasData.backgroundcolor,}">
        <div class="canvas-wrap">
            <layer 
            :layers="filterLayer(layers)"
            @scaling="layerScaling" 
            @onShowXGridLine="onShowXGridLine"
            @onShowYGridLine="onShowYGridLine"
            @onItemOutOfTheBox="onItemOutOfTheBox"></layer>
        </div>
      </div>
    </div>
  </div>
  <modal></modal>
  <responsive-modal></responsive-modal>
  <preview-modal></preview-modal>
  <!-- Ruler Lines -->
  <div class="h-lrl1 g-lines" ref="hhl1"
    :style="{width: (parseInt(!canvasData.isResponsive ? canvasData.width : canvasData.activeSize.width) + parseInt(400)) + 'px', height: '0.5px'}">
  </div>
  <div class="h-lrl2 g-lines" ref="hhl2"
    :style="{width: (parseInt(!canvasData.isResponsive ? canvasData.width : canvasData.activeSize.width) + parseInt(400)) + 'px', height: '0.5px'}">
  </div>
  <div class="v-lrl1 g-lines" ref="vlrl1"
    :style="{width: '0.5px', height: (parseInt(!canvasData.isResponsive ? canvasData.height : canvasData.activeSize.height) + parseInt(100)) + 'px'}">
  </div>
  <div class="v-lrl2 g-lines" ref="vlrl2"
    :style="{width: '0.5px', height: (parseInt(!canvasData.isResponsive ? canvasData.height : canvasData.activeSize.height) + parseInt(100)) + 'px'}">
  </div>
  <!-- <div class="offset-line" ref="vlrl3"
    :style="{width: '2px', height: (parseInt(canvasData.height) + parseInt(100)) + 'px'}">
  </div> -->
  <!-- Ruler Lines -->

  <!-- Grid Lines -->
  <!-- Grid Lines -->
  <div tabindex="0" class="context-menu" @blur.native="showContextMenu = false" ref="contextMenu" v-show="showContextMenu" >
    <mu-paper class="context-menu-overr">
        <mu-menu>
          <mu-menu-item @click="executeMenuCommand('copy')" title="Copy" :class="{'disabled': !selectedLayer}"/>
          <!-- <mu-menu-item @click="executeMenuCommand('lock')" :title="selectedLayer && selectedLayer.islocked ? 'Unlock' : 'Lock'" :class="{'disabled': !selectedLayer}"/> -->
          <mu-menu-item @click="executeMenuCommand('delete')" title="Delete" :class="{'disabled': !selectedLayer || selectedLayer && selectedLayer.islocked}"/>
        </mu-menu>
      </mu-paper>
  </div>
</div>
</template>
<script>
import colorpicker from '../../components/editor/color-picker'
import imageModal from '../../components/layer-modal/image-modal'
import responsiveModal from '../../components/modal-responsive/modal'
import {mapGetters, mapMutations} from 'vuex'
import previewModal from '../../components/layer-modal/preview-modal'
import Header from '../template/header'
import Siderbar from '../template/sidebar'
import selectionBox from './layer'
import gridlineHelper from '../../helpers/ruler-guidelines.js'
import layerCloner from '../../helpers/layer-cloner.js'
import editorCanvasHelper  from '../../helpers/editor-canvas.helper.js'
import snackbar from '../../helpers/snackbar';
import appHelper from '../../helpers/app.helper';
import * as $ from 'linq'
import colorHelper from '../../helpers/color-helper';
export default {
  name: 'Editor',
  data (){
    return {
      isWindowOpen: false,
      initposition: '360 / -80',
      targetElement: null,
      showContextMenu: false,
      selectedLayer: null,
      topPopup: false,
    }
  },
  components: {
    headers: Header,
    sideBar: Siderbar,
    layer: selectionBox,
    modal: imageModal,
    responsiveModal,
    colorPicker: colorpicker,
    previewModal
  },
  computed: {
    ...mapGetters({
      layers: 'getLayers', 
      canvasData: 'getCanvasData'
    })
  },
  mounted() {
    document.addEventListener('keydown', this.keydownEventHandler);
    document.addEventListener('mousedown', this.handleMousedown);
  },
  methods: {
    ...mapMutations(['addLayer', 'setSelectedLayerId', 'broadCastStatus']), 
    ...mapGetters(['getSelectedLayerId', 'getCanvasData']),
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
      this.showContextMenu = false;
      // if (this.canvasData.zoom !== 100) return;

      var bounds1 = this.$refs.editorContainer.getBoundingClientRect();
      var bounds2 = this.$refs.editorBox.getBoundingClientRect();
      // this.$refs.vlrl3.style.left = bounds2.left - 1 + 'px';
      // this.$refs.vlrl3.style.top = bounds2.top - 51 + 'px';
      // this.$refs.vlrl3.style.display = 'block';
      setTimeout(() => {
        // console.log(layerData, bounds);
        if (layerData) {
          // the actual width and height
          // var actualBounds = document.getElementById(layerData.id).getBoundingClientRect();
          // // horizontal lines
          // // upper
          // // this.$refs.hhl1.style.display="block";
          // this.$refs.hhl1.style.left = (bounds2.left - 200) + 'px';
          // this.$refs.hhl1.style.top = (actualBounds.y + 1) + 'px';
          // // lower
          // // this.$refs.hhl2.style.display="block";
          // this.$refs.hhl2.style.left = (bounds2.left - 200) + 'px';
          // this.$refs.hhl2.style.top = (actualBounds.y + actualBounds.height - 1) + 'px';

          // // vertical lines
          // // left
          // // this.$refs.vlrl1.style.display="block";
          // this.$refs.vlrl1.style.left = (actualBounds.x + 1) + 'px';
          // this.$refs.vlrl1.style.top = (bounds2.top - 50) + 'px';
          // // right
          // // this.$refs.vlrl2.style.display="block";
          // this.$refs.vlrl2.style.left = ((actualBounds.x + actualBounds.width) - 1) + 'px';
          // this.$refs.vlrl2.style.top = (bounds2.top - 50) + 'px';

          layerCloner.cloneElement(layerData);

          // show the offset limit border
          // this.$refs.vlrl3.style.visi
        } else {
          // this.$refs.hhl1.style.display="none";
          // this.$refs.hhl2.style.display="none";
          // this.$refs.vlrl1.style.display="none";
          // this.$refs.vlrl2.style.display="none";

          //  this.$refs.vlrl3.style.display = 'none';

          layerCloner.removeElement();
        }
      }, 5);
    },
    filterLayer (layers){
      let canvas = this.canvasData
      if(!this.canvasData.isResponsive){
        return layers
      }else {
        if(canvas.ratios.length > 0) {
          var index = canvas.ratios.findIndex((e)=>{return canvas.selectedRatio === e.name})
          layers = canvas.ratios[index].layers
          console.log('layers:',layers)
          return layers
        } else{
          return layers
        }
      }
    },
    keydownEventHandler(evt){
      if(evt.key === 'Escape' && this.isWindowOpen) {
        this.isWindowOpen = false
      }
    },
    executeMenuCommand(val) {
      if (!this.selectedLayer) return;

      this.showContextMenu = false;

      if (val === 'copy') {
        var copiedLayer = appHelper.createLayer(this.selectedLayer);
        copiedLayer.order = $.from(this.layers).max(l => l.order) + 1;
        copiedLayer.x += 30;
        copiedLayer.y += 10;
        copiedLayer.fromUndoRedo = true; // hack lol; this should be like this
        this.addLayer(copiedLayer);
        for (var i = 0; i < this.layers.length; i++) {
           this.layers[i].selected = false;
        }
        copiedLayer.selected = true;
        this.setSelectedLayerId(copiedLayer.id)
      }
      else if (val === 'lock') {
        this.selectedLayer.islocked = !this.selectedLayer.islocked;
      } else if (val === 'delete') {
        if (this.selectedLayer.islocked) {
          snackbar.show('Layer is locked');
            this.broadCastStatus({action: 'notify', layerId: this.selectedLayer.id});
          return;
        }

        for (var i = 0; i < this.layers.length; i++) {
          if (this.layers[i].id === this.selectedLayer.id) {
            this.layers.splice(i, 1);
            break;
          }
        }
      }
    },
    handleMousedown(evt) {
      if (this.$refs.contextMenu && !this.$refs.contextMenu.contains(evt.target))  this.showContextMenu = false;
    },  
    openContextMenu(evt) {
      evt.preventDefault();
      var selected = this.getSelectedLayerId();
      this.selectedLayer = selected && selected.sourceLayer && selected.sourceLayer.selected ?
        selected.sourceLayer : null;

      this.$refs.contextMenu.style.left = evt.clientX + 'px';
      this.$refs.contextMenu.style.top = evt.clientY + 'px';
      this.showContextMenu = true;
    },
    popupSave(val){
      console.log('popupSave',val)
      this.topPopup = val
      setTimeout(()=>{
      this.topPopup = false
      },2000)
    },
    onShowXGridLine(layerData, show, val, precise) {
      if (show) {
        var actualBounds = document.getElementById(layerData.id).getBoundingClientRect();
        var bounds2 = this.$refs.editorBox.getBoundingClientRect();
        this.$refs.vlrl1.style.display="block";
        this.$refs.vlrl1.style.left = (precise ? actualBounds.x - 1 + val : (actualBounds.x + 1 + actualBounds.width / 2)) + 'px';
        this.$refs.vlrl1.style.top = (bounds2.top - 50) + 'px';
      } else {
        this.$refs.vlrl1.style.display="none";
      }
    },
    onShowYGridLine(layerData, show, val, precise) {
      if (show) {
        var actualBounds = document.getElementById(layerData.id).getBoundingClientRect();
        var bounds2 = this.$refs.editorBox.getBoundingClientRect();
        this.$refs.hhl1.style.display="block";
        this.$refs.hhl1.style.left = (bounds2.left - 200) + 'px';
        this.$refs.hhl1.style.top = (precise ? actualBounds.y + val  : (actualBounds.y + 1 + actualBounds.height / 2)) + 'px';
      } else {
          this.$refs.hhl1.style.display="none";
      }
    },
    onItemOutOfTheBox(show) {
      if (show) {
        this.$refs.editorBox.classList.add('notif-elem-drag');
      } else {
        //  this.$refs.editorBox.style.border = null;
        this.$refs.editorBox.classList.remove('notif-elem-drag');
      }
    },
  },
}
</script>
<style >
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
 border-bottom: thin dashed white; 
 top: 300px;
 left: 100px;
}
.h-lrl2 {
 border-top: thin dashed violet; 
 border-bottom: thin dashed white; 
 top: 600px;
 left: 100px;
}
.v-lrl1 {
  border-left: thin dashed violet; 
  border-right: thin dashed white; 
  top: 100px;
  left: 300px;
}
.v-lrl2 {
  border-left: thin dashed violet; 
  border-right: thin dashed white; 
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
@media screen and (max-heght: 728px) {
  body {
    background: red
  }
}

/* fixed scrollbar on smaller screen size */
@media(min-height:600px) {
  .zoom-container {
    height: 70vh;
  }
 }
 .context-menu {
  width: 100px;
  overflow: hidden;
  position: absolute;
  z-index: 9999;
  top: 100px;
  left: 100px;
  box-shadow: 0 1px 6px #c9c5c5, 0 1px 4px #c9c5c5;
  border-radius: 2px;
}
.context-menu-overr {
  background-color: #009D70;
}
.demo-popup-top {
  width: 100%;
  opacity: .8;
  height: 48px;
  line-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 375px;
}
@-webkit-keyframes borderBlink {    
    from, to {    
      border: 3px solid #009d70;   
    }    
    50% {    
        
          border: none;     
    }    
}    
@keyframes borderBlink {    
    from, to {   
       border: 3px solid #009d70;  
        
    }    
    50% {    
      border: none;    
    }    
}
.notif-elem-drag {
  -webkit-animation: borderBlink 1s step-end infinite;    
    animation: borderBlink 1s step-end infinite;    
}    
</style>

