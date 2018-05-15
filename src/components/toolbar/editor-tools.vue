<template>
<div>
  <mu-appbar class="header-tools editor-tools">
    <mu-flat-button id="btn" class="save-menu-btn" labelPosition="before" 
      label="Save Project" slot="left" icon="keyboard_arrow_down"
      @click="saveButtonClicked"/>
    <!-- start: Project Name -->
    <div class="tool-item tool-item-group" slot="left">
      <div class="tool-item-group-content label-item">File Name</div> 
      <input @change="filenameChanged" ref="filename" v-model="getCanvasData().filename" spellcheck="false" style="width: 248px" class="tool-item-group-content default-inp">
    </div>
    <!-- end: Project Name -->
    <div class="tool-item tool-item-group" slot="left">
       <div class="label-item">Selected Canvas Size</div>
       <div class="tool-item-group-content" style="width: 260px; display: flex">
         <div class="tool-item-group-content" style="width: 106px; display: flex">
            <div class="label-item p-r">W:</div> 
            <input v-model="getCanvasData().width" @change="filenameChanged" ref="width" style="width: 100%; text-align: right" class="default-inp"  spellcheck="false" v-digitsonly v-append-unit="'px'" type="text"/>
           </div>
           <div class="tool-item-group-content">
            <div class="label-item">
              <i class="si-link"></i>
            </div>
           </div>
           <div class="tool-item-group-content" style="width: 106px; display: flex;">
            <div class="label-item p-r">H:</div> 
            <input v-model="getCanvasData().height" @change="filenameChanged" ref="height" style="width: 100%; text-align: right" class="default-inp" spellcheck="false" v-digitsonly v-append-unit="'px'" type="text"/>
           </div>
       </div>
     </div>
    <div class="tool-item tool-item-group" slot="left">
       <div class="label-item">Zoom</div>
       <div class="tool-item-group-content" style="width: 168px; display: flex">
         <mu-flat-button  class="s-editor-btn-zoom-ctrl" @click="zoom('out')">
            <i class="si-zoomout" style="height: 90%"></i>
          </mu-flat-button>
          <div class="tool-item-group-content">
            <input  v-model="getCanvasData().zoom" style="width: 100%; text-align: center" class="default-inp" spellcheck="false" v-digitsonly v-append-unit="'%'" type="text"/>
          </div>
          <mu-flat-button class="s-editor-btn-zoom-ctrl" @click="zoom('in')">
            <i class="si-zoomin" style="height: 90%"></i>
          </mu-flat-button>
       </div>
     </div>
    <!-- <mu-flat-button labelPosition="before" icon="add" style="text-transform: none; background-color: #222222; margin-right: 20px; height: 70%" slot="right" label="Add Canvas" class="demo-flat-button"/> -->
  </mu-appbar>
  <mu-icon-menu icon="" @change="handleChange" :anchorOrigin="rightTop"
      :targetOrigin="rightTop"
      :open="menuOpen" @open="menuOpen = true" @close="menuOpen = false">
      <mu-menu-item value="1" title="Save As" />
      <mu-divider inset class="temp-action-item-divider"/>
      <mu-menu-item value="1" title="Save As Template" />
        <mu-divider inset class="temp-action-item-divider"/>
      <mu-menu-item value="1" title="Export As" />
    </mu-icon-menu>
</div>
</template>
<script>
/*
* @component: editor-tools
  @events:
    onSaveTriggered:
      - occurs when saving the project
      params: 
        saveType: could be unpecifiedSave (save as), template (save as template), unpecifiedExport (export as)
    filenameChanged:
      - occurs when modifying the filename textbox
      params:
        newName: the new filename of the project
    onResize:
      - occurs when resizing the content using the input boxes
      params:
        resizeVal: the new dimension of the canvas
    onZoom:
      - occurs when zooming (in, out)
      params:
        zoomVal: zoom value
    onAdd:
      - occurs when the 'Add Canvas' button was clicked
*/
import customMenu from '../menus/custom-menu'
import {mapGetters} from 'vuex'
export default {
  name: 'editor-tools',
  components: {
    'custom-menu':customMenu
  },
  data() {
    return {
      value: '3',
      saveMenu: null,
      menuOpen: false,
      rightTop: {horizontal: 'left', vertical: 'top'},
    }
  },
  methods: {
    ...mapGetters(['getCanvasData']),
    handleChange(val) {
      this.value = val;
    },
    saveButtonClicked() {
      this.menuOpen = !this.menuOpen;
      if (this.menuOpen) {
        // force override ;(
        // pandamai najud
        // last resort
        setTimeout(() => {
          var elem = document.getElementsByClassName('mu-popover')[0];
          if (elem) {
            elem.setAttribute('style', `
              left: 10px!important; z-index: 4; background-color: #009d70!important;`);
            elem = document.getElementsByClassName('mu-menu')[0]; 
               elem.setAttribute('style', `width: 200px!important;`);
            // get the seconds child
            elem = document.getElementsByClassName('mu-menu-list')[0]; 
               elem.setAttribute('style', `width: auto!important;`);
          }
        }, 50)
      }
    },
    filenameChanged() {
      this.$emit('filenameChanged' , this.$refs.filename.value)
    },
    onResize() {
      this.$emit('onResize', {with:  this.$refs.width.value, height:  this.$refs.height.value});
    },
    zoom(zoomType) {
      if (zoomType === 'in') {
        this.getCanvasData().zoom = (parseInt(this.getCanvasData().zoom.replace('%', '')) + 25).toString() + "%";
      } else {
        if ((parseInt(this.getCanvasData().zoom.replace('%', '')) - 25) > 0) {
          this.getCanvasData().zoom = (parseInt(this.getCanvasData().zoom.replace('%', '')) - 25).toString() + "%";
        }
      }
    }
  }
}
</script>
<style scoped>
.s-editor-btn-zoom-ctrl {
  padding: 3px 3px;
  
}
.temp-action-item-divider {
  background-color: #77c589;
}
.editor-tools {
  font-size: 14px;
}
.tool-item {
  padding: 0 20px;
}
.projeect-name-container {
  background-color: #333333;
}
.save-menu-btn {
  width: 138px;
  height: 70%;
  background-color: #009d70;
  text-align: center;
}
.header-tools {
  height: 45px !important;
  background-color: #191919;
}
.mu-flat-button {
  border-radius: 0;
}
.save-menu {
  z-index: 4;
  left: 100px;
  width: 100px!important;
  background-color: red;
}

.mu-menu {
  padding: 0!important;
  width:10px!important;
}
.mu-menu-list {
  padding: 0!important;
  width:10px!important;
}
.tool-item-group {
  display: flex;
  height: 70%;
  text-align: center;
}

.tool-item-group-content {
  padding-left: 10px;
  padding-right: 10px;
  vertical-align: middle;
}
.default-inp {
  width: auto;
  height: 100%;
  margin-top: 0;
}
.label-item {
  margin-top: 5px;
}
.p-r {
  padding-right: 5px;
}
.mu-icon-button {
  width: auto;
  height: auto;
}
.mu-popover {
background-color: red!important;
}
</style>

