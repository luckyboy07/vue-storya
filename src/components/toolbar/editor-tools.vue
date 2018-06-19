<template>
<div>
  
  <mu-appbar class="header-tools editor-tools">
    <mu-flat-button style="width: 100px;" id="btn" class="save-menu-btn" labelPosition="before" 
      label="Save" slot="left" icon="keyboard_arrow_down"
      @click="saveButtonClicked"/>
    <!-- start: Project Name -->
    <div class="tool-item tool-item-group" slot="left">
      <div class="tool-item-group-content label-item">File Name</div> 
      <input @change="filenameChanged" ref="filename" v-model="selectedtemplate.file_name" spellcheck="false" style="width: 140px" class="tool-item-group-content default-inp">
    </div>
    <!-- end: Project Name -->
    <div class="tool-item tool-item-group" slot="left" >
       <div class="label-item" :class="{'disabled':editorData.isResponsive|| selectedtemplate.zoom !== 100}">Selected Canvas Size</div>
       <div class="tool-item-group-content" style="display: flex">
          <div :class="{'disabled':editorData.isResponsive|| selectedtemplate.zoom !== 100}" style="display: flex; width: 106px;">
             <div class="label-item p-r">W:</div> 
              <input v-model="selectedtemplate.width" :disabled="editorData.isResponsive || selectedtemplate.zoom !== 100" @change="filenameChanged" ref="width" style="width: 100%; text-align: right" class="default-inp"  spellcheck="false" v-digitsonly type="number"/>
          </div>
          <mu-flat-button id="secretDKoMagsaba" style="padding: 0  10px;" class="s-editor-btn-zoom-ctrl" :class="{'disabled':editorData.isResponsive || selectedtemplate.zoom !== 100}">
            <i class="si-link" style="height: 90%"></i>
          </mu-flat-button>
           <div :class="{'disabled':editorData.isResponsive || selectedtemplate.zoom !== 100}" style="display: flex; width: 106px;">
             <div class="label-item p-r">H:</div> 
              <input :disabled="editorData.isResponsive || selectedtemplate.zoom !== 100" v-model="selectedtemplate.height" @change="filenameChanged" ref="height" style="width: 100%; text-align: right" class="default-inp" spellcheck="false" v-digitsonly type="number"/>
          </div>
          <!-- <div class="tool-item-group-content">
            <input ref="zoomInp" @blur="zoom()" @keydown.enter="zoom()" style="width: 100%; text-align: center" class="default-inp" spellcheck="false" v-digitsonly v-append-unit="'%'"/>
          </div>
          <mu-flat-button class="s-editor-btn-zoom-ctrl" @click="zoom('in')">
            <i class="si-zoomin" style="height: 90%"></i>
          </mu-flat-button> -->
       </div>
     </div>
    <div class="tool-item tool-item-group" slot="left">
       <div class="label-item">Zoom</div>
       <div class="tool-item-group-content" style="width: 168px; display: flex">
         <mu-flat-button class="s-editor-btn-zoom-ctrl" @click="zoom('out')">
            <i class="si-zoomout" style="height: 90%"></i>
          </mu-flat-button>
          <div class="tool-item-group-content">
            <input disabled ref="zoomInp" @blur="zoom()" @keydown.enter="zoom()" style="width: 100%; text-align: center; opacity: 1!important;" class="default-inp" spellcheck="false" v-digitsonly v-append-unit="'%'"/>
          </div>
          <mu-flat-button class="s-editor-btn-zoom-ctrl" @click="zoom('in')">
            <i class="si-zoomin" style="height: 90%"></i>
          </mu-flat-button>
       </div>
     </div>
     <div slot="right" class="s-responsive-right">
       <div style="margin-right: 10px; user-select: none; margin-top: 5px;">Responsive</div> 
       <toggle-button  style="height: 100%; margin-right: 10px; margin-top: 5px;" @change="watchChanges" :value="selectedtemplate.isResponsive" :sync="true" :color="{checked: '#009d70',unchecked:'#333333'}"/>
        <!-- <mu-switch label="Responsive" labelLeft class="thumbs"/> -->
        <mu-raised-button style="font-size: 10px; height: 100%;" :disabled="!selectedtemplate.isResponsive" :label="selectedtemplate.selectedRatio !== '' ? selectedtemplate.selectedRatio : 'Original Size'" @click="openModal"/> 
     </div>
    <!-- <mu-flat-button 
      slot="right"
      style="padding: 0 5px; text-transform: none; background-color: #222222; margin-right: 20px; height: 70%" 
      @click="selectedtemplate.gridLines = !selectedtemplate.gridLines">
      <i class="material-icons">{{selectedtemplate.gridLines ? 'grid_on' :  'grid_off'}}</i>
    </mu-flat-button> -->
  </mu-appbar>
  <mu-icon-menu icon="" @change="handleChange" :anchorOrigin="rightTop"
      :targetOrigin="rightTop"
      :open="menuOpen" @open="menuOpen = true" @close="menuOpen = false">
    <mu-menu-item value="0" title="Save" @click="SaveContent()"/>
    <mu-divider inset class="temp-action-item-divider"/>
    <!-- <mu-menu-item value="2" title="Save Project" @click="SaveContent()"/>
    <mu-divider inset class="temp-action-item-divider"/> -->
    <mu-menu-item value="3" title="Save As Template" @click="SaveTemplate()"/>
    <mu-divider inset class="temp-action-item-divider"/>
    <mu-menu-item value="4" title="Export as HTML" @click="exportContent()"/>
    <mu-divider inset class="temp-action-item-divider"/>
    <mu-menu-item value="4" title="Export as Image" @click="ExportImage()"/>
  </mu-icon-menu>
   <mu-dialog :open="isExporting" title="Exporting Content">
    <div style="font-family: Lato; font-size: 17px; color: #fff">
      <div class="s-info-modal" v-show="hasBackgroundProcess">
        <div class="s-text-info-modal">Please wait while your content is being rendered... </div>
        <mu-linear-progress color="#009D70" style="width: 40%; margin-left: 60px; margin-top: 10px;"/>
      </div>
      <div v-show="!hasBackgroundProcess">
        <div class="s-info-modal">Image Rendering is finished</div>
        <img class="s-export-preview-img" :src="exportedImgData ? exportedImgData.url : ''" alt="img">
      </div>
      <!-- <div>
       Content Rendered
        <mu-linear-progress />
      </div> -->
    </div> 
    <mu-flat-button v-show="!hasBackgroundProcess" label="Close" slot="actions" secondary @click="close()"/>
    <mu-flat-button v-show="!hasBackgroundProcess" label="Download" slot="actions" secondary @click="download()"/>
  </mu-dialog>
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
import {mapGetters,mapActions} from 'vuex'
import zoomHelper from '../../helpers/zoom.helper.js'
import exportHelper from '../../helpers/import-export.helper.js'
import ToggleButton from '../switchButton/button'
import appHelper from '../../helpers/app.helper';
import rest from '../../helpers/rest.helper'
import snackbar from '../../helpers/snackbar';
import browserHelper from '../../helpers/browser.js'
export default {
  name: 'editor-tools',
  props:['selectedtemplate','dataLayer'],
  components: {
    'custom-menu':customMenu,
    ToggleButton
  },
  data() {
    return {
      value: '3',
      saveMenu: null,
      menuOpen: false,
      sam: false,
      rightTop: {horizontal: 'left', vertical: 'top'},
      isExporting: false,
      hasBackgroundProcess: true,
      exportedImgData: null,
    }
  },
  // beforeMount() {
  //   zoomHelper.adjustCanvasAndLayerDimension(this.selectedtemplate);
  // },
  mounted() {
    this.$refs.zoomInp.value = this.selectedtemplate.zoom + '%';
    if (browserHelper.isFirefox()) {
      this.$el.querySelector('#secretDKoMagsaba').style.marginLeft = '20px';
    }
  },
  methods: {
     ...mapGetters(['getExportContent', 'template']),
     ...mapActions(['updateLayers']),
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
               elem.setAttribute('style', `width: 150px!important;`);
            // get the seconds child
            elem = document.getElementsByClassName('mu-menu-list')[0]; 
               elem.setAttribute('style', `width: auto!important;`);
          }
        }, 50)
      }
    },
    filenameChanged() {
      console.log('this.selectedtemplate:',this.selectedtemplate)
      this.savetoLocalstorage()
      this.$emit('filenameChanged' , this.$refs.filename.value)
    },
    onResize() {
      this.$emit('onResize', {with:  this.$refs.width.value, height:  this.$refs.height.value});
    },
    zoom(zoomType) {
      if (zoomType === 'out' && this.selectedtemplate.zoom <= 0 || zoomType === 'in' && this.selectedtemplate.zoom >= 500) return;

      var value = !this.$refs.zoomInp.value ?  this.selectedtemplate.zoom :  parseInt(this.$refs.zoomInp.value.replace('%', ''));
      if (!zoomType) {
        // handle enter or unfocus (blur)
         this.selectedtemplate.zoom = value;
      } else {
        if (zoomType === 'in') {
          this.selectedtemplate.zoom = value + this.selectedtemplate.zoomIncrease;
        } else {
          if (this.selectedtemplate.zoom > 0) {
            this.selectedtemplate.zoom = value - this.selectedtemplate.zoomIncrease;
          }
        }
      }
      zoomHelper.execZoom(zoomType, this.editorData, this.layers);
      
      this.$refs.zoomInp.value = this.selectedtemplate.zoom + '%';
      this.savetoLocalstorage()
    },
    SaveContent() {
      let ratios = this.selectedtemplate.ratios
      if(this.selectedtemplate.isResponsive){
        for(let i = 0;i < ratios.length;i++){
            if(this.selectedtemplate.selectedRatio === ratios[i].name) {
              // ratios[i].layers = JSON.parse(JSON.stringify(this.selectedtemplate.layers))
              this.updateLayers(ratios[i].layers)
            }
        }
       
        console.log('selectedtemplate:',this.selectedtemplate)
      }
        console.log('ASDASD')
       this.$emit('openPopup',true)
      this.savetoLocalstorage()
      // alert('Save As');
    },
    SaveTemplate() {
       alert('Save As Template');
    },
    exportContent() {
      var zoom = 100;
      var type = '';
      if (this.editorData.zoom !== 100) {
        zoom = this.editorData.zoom;
        type = zoom < 100 ? 'in' : 'out';
        zoomHelper.gotoZoom(this.editorData, this.layers, zoom, 100, type).then((resp) => {
          exportHelper.exportTemplate(this.layers).then((val) => {
            console.log('Export finished', val)
            if (zoom !== 100) {
              zoomHelper.gotoZoom(this.editorData, this.layers, zoom, 100, type === 'in' ? 'out' : type === 'out' ? 'in' : '');
            }
          });
        });
      } else {
        exportHelper.exportTemplate(this.layers);
      }
    },
    savetoLocalstorage () {
      this.$localStorage.set('canvas',JSON.stringify(this.selectedtemplate))
    },
    openModal () {
    console.log('laeyers:', this.dataLayer)
      this.$modal.show('responsive-modal',{data: this.selectedtemplate,layers:this.dataLayer},{
        'closed': this.beforeClose
      })
    },
    watchChanges(evt) {
      this.selectedtemplate.isResponsive = evt.value
      let layers = this.dataLayer
      let ratios = this.selectedtemplate.ratios
      if (!this.selectedtemplate.isResponsive && this.selectedtemplate.selectedRatio) {
          // for (let i=0;i<this.selectedtemplate.originalLayers.length;i++) {
          //     this.selectedtemplate.originalLayers[i].x = 100
          //     this.selectedtemplate.originalLayers[i].y = 100
          // }
      this.updateLayers(this.selectedtemplate.originalLayers)
      }else if(this.selectedtemplate.isResponsive && this.selectedtemplate.selectedRatio) {
          for (let i=0;i<ratios.length;i++) {
             if(this.selectedtemplate.selectedRatio === ratios[i].name){
               console.log(';ASDASD',ratios[i].layers)
                // this.selectedtemplate.layers = JSON.parse(JSON.stringify(ratios[i].layers))
                this.updateLayers(ratios[i].layers)
             } 
          }
      }
      this.savetoLocalstorage()
    },
    beforeClose () {
      console.log('close')
    },
    ExportImage() {
      this.isExporting = this.hasBackgroundProcess = true;
      var htmlStr = exportHelper.getHtmlString();
      rest.post('renderimage', 
      {
        width: this.editorData.width,
        height: this.editorData.height,
        html: htmlStr
      })
      .then((response) => {
        console.log('result', response)
        this.hasBackgroundProcess = false;
        this.exportedImgData = {data: response.body.base64, url: response.body.url};
      })
      .catch((err) => {
         this.hasBackgroundProcess = false;
         this.isExporting = false;
        snackbar.show("An error occured during the redering process", null, 'error')
      });
    },
    download() {
      var link = document.createElement("a"); // Or maybe get it from the current document
      link.href =  this.exportedImgData.data;
      link.download = appHelper.generateGUID() + '.png';;
      document.body.appendChild(link); // Or append it whereever you want
      link.click();
      this.isExporting = false;
    },
    close() {
       this.isExporting = false;
    },
  },
  computed: {
    ...mapGetters({
      editorData: 'getCanvasData',
      layers: 'getLayers'
    }),
  },
}
</script>
<style scoped>

.s-text-info-modal {
  font-size: 15px;
}
.s-info-modal {
  display: flex;
}
.s-responsive-right {
  margin-right: 15px;
  height: 70%;
  display: flex;
}
.s-editor-btn-zoom-ctrl {
  padding: 0;
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
  position: relative;
  display: block;
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
  opacity: inherit;
}
.mu-icon-button {
  width: auto;
  height: auto;
}
.mu-popover {
background-color: red!important;
}
.mu-switch input[type="checkbox"]:checked+.mu-switch-wrapper .mu-switch-track {
  background-color: #009d70 !important;
}
.s-export-preview-img {
  width: 100px;
  height: 100px;
  margin-top: 20px;
}
</style>

