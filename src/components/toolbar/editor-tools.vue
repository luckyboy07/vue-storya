<template>
<div>
  <mu-appbar class="header-tools editor-tools">
    <mu-flat-button style="width: 100px;" id="btn" class="save-menu-btn" labelPosition="before" 
      label="Save" slot="left" icon="keyboard_arrow_down"
      @click="saveButtonClicked"/>
    <!-- start: Project Name -->
    <div class="tool-item tool-item-group" slot="left">
      <div class="tool-item-group-content label-item">File Name</div> 
      <input @change="filenameChanged" ref="filename" v-model="editorData.canvas_name" spellcheck="false" style="width: 140px" class="tool-item-group-content default-inp">
    </div>
    <!-- end: Project Name -->
    <div class="tool-item tool-item-group" slot="left" >
       <div class="label-item" :class="{'disabled':editorData.isResponsive|| editorData.zoom !== 100}">Selected Canvas Size</div>
       <div class="tool-item-group-content" style="display: flex">
          <div :class="{'disabled':editorData.isResponsive|| editorData.zoom !== 100}" style="display: flex; width: 106px;">
             <div class="label-item p-r">W:</div> 
              <input v-model="editorData.width" :disabled="editorData.isResponsive || editorData.zoom !== 100" @change="filenameChanged" ref="width" style="width: 100%; text-align: right" class="default-inp"  spellcheck="false" v-digitsonly type="number"/>
          </div>
          <mu-flat-button id="secretDKoMagsaba" style="padding: 0  10px;" class="s-editor-btn-zoom-ctrl" :class="{'disabled':editorData.isResponsive || editorData.zoom !== 100}">
            <i class="si-link" style="height: 90%"></i>
          </mu-flat-button>
           <div :class="{'disabled':editorData.isResponsive || editorData.zoom !== 100}" style="display: flex; width: 106px;">
             <div class="label-item p-r">H:</div> 
              <input :disabled="editorData.isResponsive || editorData.zoom !== 100" v-model="editorData.height" @change="filenameChanged" ref="height" style="width: 100%; text-align: right" class="default-inp" spellcheck="false" v-digitsonly type="number"/>
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
            <input disabled ref="zoomInp" @blur="zoom()" @keydown.enter="zoom()" style="width: 100%; text-align: center; opacity: 1!important;" class="default-inp" spellcheck="false" :value="editorData.zoom + '%'"/>
          </div>
          <mu-flat-button class="s-editor-btn-zoom-ctrl" @click="zoom('in')">
            <i class="si-zoomin" style="height: 90%"></i>
          </mu-flat-button>
       </div>
     </div>
     <div slot="right" class="s-responsive-right">
       <div style="margin-right: 10px; user-select: none; margin-top: 5px;">Responsive</div> 
       <toggle-button  style="height: 100%; margin-right: 10px; margin-top: 5px;" @change="watchChanges" :value="editorData.isResponsive" :sync="true" :color="{checked: '#009d70',unchecked:'#333333'}"/>
        <!-- <mu-switch label="Responsive" labelLeft class="thumbs"/> -->
        <mu-raised-button style="font-size: 10px; height: 100%;" :disabled="!editorData.isResponsive" :label="editorData.selectedRatio !== '' ? editorData.selectedRatio : 'Original Size'" @click="openModal"/> 
     </div>
    <!-- <mu-flat-button 
      slot="right"
      style="padding: 0 5px; text-transform: none; background-color: #222222; margin-right: 20px; height: 70%" 
      @click="editorData.gridLines = !editorData.gridLines">
      <i class="material-icons">{{editorData.gridLines ? 'grid_on' :  'grid_off'}}</i>
    </mu-flat-button> -->
  </mu-appbar>
  <mu-icon-menu menuClass="save-menu" icon="" @change="handleChange" :anchorOrigin="rightTop"
      :targetOrigin="rightTop" :open="menuOpen" @open="menuOpen = true" @close="menuOpen = false">
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
import Vue from 'vue'
import customMenu from '../menus/custom-menu'
import {mapGetters,mapActions} from 'vuex'
import zoomHelper from '../../helpers/zoom.helper.js'
import exportHelper from '../../helpers/import-export.helper.js'
import ToggleButton from '../switchButton/button'
import appHelper from '../../helpers/app.helper';
import rest from '../../helpers/rest.helper'
import snackbar from '../../helpers/snackbar';
import browserHelper from '../../helpers/browser.js'
import apiService from '../../helpers/API.js'
import * as _ from 'lodash'
import * as async from 'async-es'
export default {
  name: 'editor-tools',
  props:['dataLayer'],
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
      count: 0
    }
  },
  // beforeMount() {
  //   zoomHelper.adjustCanvasAndLayerDimension(this.editorData);
  // },
  mounted() {
    // this.$refs.zoomInp.value = this.editorData.zoom + '%';
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
          if (elem && elem.children[0].className.indexOf('save-menu') !== -1) {
            elem.classList.add('save-menu-container');
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
      console.log('this.editorData:',this.editorData)
      this.savetoLocalstorage()
      this.$emit('filenameChanged' , this.$refs.filename.value)
    },
    onResize() {
      this.$emit('onResize', {with:  this.$refs.width.value, height:  this.$refs.height.value});
    },
    zoom(zoomType) {
      if (zoomType === 'out' && this.editorData.zoom <= 0 || zoomType === 'in' && this.editorData.zoom >= 500) return;

      // var value = !this.$refs.zoomInp.value ?  this.editorData.zoom :  parseInt(this.$refs.zoomInp.value.replace('%', ''));
      if (!zoomType) {
        // handle enter or unfocus (blur)
         this.editorData.zoom = value;
      } else {
        if (zoomType === 'in') {
          this.editorData.zoom = this.editorData.zoom + this.editorData.zoomIncrease;
        } else {
          if (this.editorData.zoom > 0) {
            this.editorData.zoom = this.editorData.zoom - this.editorData.zoomIncrease;
          }
        }
      }
      zoomHelper.execZoom(zoomType, this.editorData, this.layers);

      if (this.editorData.isResponsive) {
         for (var i = 0; i < this.editorData.ratios.length; i++) {
            if (this.editorData.selectedRatio === this.editorData.ratios[i].name) {
              this.editorData.ratios[i].zoom = this.editorData.zoom;
              break;
            }
          }
      } else {
        console.log('zoom')
        this.editorData.originalZoom = this.editorData.zoom;
      }
      
      // this.$refs.zoomInp.value = this.editorData.zoom + '%';
      this.savetoLocalstorage()
    },
    SaveContent() {
      // let ratios = this.editorData.ratios
        this.$store.state.broadcastSave = true 
        let projects = this.$store.state.projects.project_id === 0 ? JSON.parse(this.$localStorage.get('projects')) : this.$store.state.projects
        apiService.getCanvasProject(projects.project_id).then(res => {
          console.log('response:P',res)
          if(res.data.statusCode === 200) {
            let canvas = res.data.response.data.canvas
            console.log('canmvas:',canvas)
            if(canvas.length > 0 ) {
              this.$store.state.broadcastSave = true
              let canv = canvas.find((val)=> {return val.canvas_id === this.editorData.canvas_id})
              console.log('canvas:',canv)
              if (canv) {
                console.log('UPDATE')
                apiService.updateCanvas(canv.canvas_id,{
                   canvas_name: this.editorData.canvas_name,
                  description: this.editorData.description,
                  height: this.editorData.height,
                  width: this.editorData.width,
                  backgroundcolor: this.editorData.backgroundcolor,
                  // project_name: this.editorData.project_name,
                  is_responsive: this.editorData.isResponsive,
                  is_public: this.editorData.is_public,
                  zoom: this.editorData.zoom,
                  zoom_increase: this.editorData.zoomIncrease,
                  thumbnail: this.editorData.thumbnail,
                  ratio: 'string',
                }).then(resp =>{
                      console.log('resp:',resp)
                      if(resp.data.statusCode === 201) {
                      this.generateThumbnail(canv.canvas_id,this.editorData)
                        apiService.getCanvasLayers(canv.canvas_id).then((kapoya)=>{
                          console.log('kapoya:',kapoya)
                          console.log('this.dataLayer:',this.dataLayer)
                          if (kapoya.data.statusCode == 200) {
                          let layers = kapoya.data.response.data.layers
                          console.log('layers:',layers)
                            if (layers.length > 0 ) {
                              console.log('UPDATE')
                              async.waterfall([
                                (callback) => {
                                  this.count = 0
                                  _.each(layers, (row) => {
                                    this.count ++
                                    if(this.count !== layers.length) {
                                        apiService.deleteLayer(row.layer_id).then((res) => {
                                          console.log('count:',this.count)
                                      })
                                    }else if (this.count === layers.length) {
                                      console.log('WALA NA FINISH NA')
                                      callback();
                                    }
                                  })
                                }, (callback) =>{
                                  console.log('1')
                                  this.count = 0
                                  _.each(this.dataLayer, (row) => {
                                      this.count ++                                    
                                    if (this.count !== this.dataLayer.length) {
                                      let obj = {
                                        layer_name: row.content ? row.content : 'null',
                                        description: 'ss',
                                        canvas_id: canv.canvas_id,
                                        layer_type: row.type ? row.type : 'background',
                                        icon: row.icon ? row.icon : 'background',
                                        layer_order: row.order,
                                        visible: row.visible,
                                        animation: row.animation,
                                        selected: row.selected,
                                        open: row.open,
                                        component: row.component,
                                        x: row.x,
                                        y: row.y,
                                        z: row.order,
                                        width: row.width,
                                        height: row.height,
                                        target_element: 'string',
                                        angle: 0,
                                        layer_attributes: row.attributes,
                                        image: row.image,
                                        is_lock : row.islocked ? row.islocked : false,
                                        is_background : row.isBackground ? row.isBackground : false,
                                      }
                                      apiService.saveCanvalayer(obj).then((respo)=>{
                                        if(respo.data.response.statusCode === 201) {
                                          row.layer_id = respo.data.response.data.layer_id
                                        }
                                      })
                                    }else if (this.count === this.dataLayer.length) {
                                      console.log('FINISH')
                                      callback()
                                    }
                                  })
                                }, (callback) =>{
                                    this.updateLayers(this.dataLayer)
                                    this.$store.state.broadcastSave = false
                                    snackbar.show('Successfully Save!')
                                }
                              ])
                            }else {
                              console.log('SAVE')
                              async.waterfall([
                                (callback) => {
                                  this.count = 0
                                  _.each(this.dataLayer, (row) => {
                                    console.log('this.count:',this.count)
                                    console.log('this.dataLayer:',this.dataLayer.length)
                                    this.count++
                                    if (this.count !== this.dataLayer.length) {
                                        console.log('asd:')
                                      let obj = {
                                        layer_name: row.content ? row.content : 'null',
                                        description: 'ss',
                                        canvas_id: canv.canvas_id,
                                        layer_type: row.type ? row.type : 'background',
                                        icon: row.icon ? row.icon : 'background',
                                        layer_order: row.order,
                                        visible: row.visible,
                                        animation: row.animation,
                                        selected: row.selected,
                                        open: row.open,
                                        component: row.component,
                                        x: row.x,
                                        y: row.y,
                                        z: row.order,
                                        width: row.width,
                                        height: row.height,
                                        target_element: 'string',
                                        angle: 0,
                                        layer_attributes: row.attributes,
                                        image: row.image,
                                        is_lock : row.islocked ? row.islocked : false,
                                        is_background : row.isBackground ? row.isBackground : false,
                                      }
                                      apiService.saveCanvalayer(obj).then((respo)=>{
                                        console.log('respo:',respo)
                                        if(respo.data.response.statusCode === 201) {
                                          row.layer_id = respo.data.response.data.layer_id
                                        console.log('this.count:',this.count)
                                        }
                                      })
                                    }else if (this.count === this.dataLayer.length) {
                                        console.log('ASDASDt')
                                      callback()
                                    }
                                  })
                                }, (callback) => {
                                  this.updateLayers(this.dataLayer)
                                  this.$store.state.broadcastSave = false
                                  snackbar.show('Successfully Save!')
                                } 
                              ])
                            }
                          }
                        })
                      }
                })
              }else {
                console.log('SAVE')
                this.saveCanva(projects.project_id)
              this.generateThumbnail(this.editorData.canvas_id,this.editorData)
              }
              // canvas.forEach(row =>{
              //   if(row.canvas_id === this.editorData.canvas_id) {

              //   }
              // })
            }else {
              console.log("ASDASD")
              this.saveCanva(projects.project_id)
              this.generateThumbnail(this.editorData.canvas_id,this.editorData)
            }
          }
        })
     
      // if(this.editorData.isResponsive){
        // for(let i = 0;i < ratios.length;i++){
        //     if(this.editorData.selectedRatio === ratios[i].name) {
        //       // ratios[i].layers = JSON.parse(JSON.stringify(this.editorData.layers))
        //       this.updateLayers(ratios[i].layers)
        //     }
        // }
      // }
      //  this.$emit('openPopup',true)
      // this.savetoLocalstorage()
      // alert('Save As');
    },
    SaveTemplate() {
       alert('Save As Template');
    },
    exportContent() {
      var zoom = 100;
      var type = '';
      this.editorData.layers = JSON.parse(JSON.stringify(this.dataLayer))
      if (this.editorData.zoom !== 100) {
        zoom = this.editorData.zoom;
        type = zoom < 100 ? 'in' : 'out';
        zoomHelper.gotoZoom(this.editorData, this.layers, zoom, 100, type).then((resp) => {
          exportHelper.exportTemplate( this.editorData,this.editorData.originalLayers).then((val) => {
            console.log('Export finished', val)
            if (zoom !== 100) {
              zoomHelper.gotoZoom(this.editorData, this.layers, zoom, 100, type === 'in' ? 'out' : type === 'out' ? 'in' : '');
            }
          });
        });
      } else {
        exportHelper.exportTemplate(this.editorData, this.editorData.originalLayers);
      }
    },
    savetoLocalstorage () {
      this.$localStorage.set('canvas',JSON.stringify(this.editorData))
    },
    openModal () {
    console.log('laeyers:', this.dataLayer)
      this.$modal.show('responsive-modal',{data: this.editorData,layers:this.dataLayer},{
        'closed': this.beforeClose
      })
    },
    watchChanges(evt) {
      // console.log('watchChanges', this.editorData.zoom, this.editorData.originalZoom)
      this.editorData.isResponsive = evt.value
      let layers = this.dataLayer
      let ratios = this.editorData.ratios
      if (!this.editorData.isResponsive) {
        // console.log('if', this.editorData.originalZoom)
        this.editorData.zoom = this.editorData.originalZoom;
        this.updateLayers(this.editorData.originalLayers)
      } else if (this.editorData.isResponsive && this.editorData.selectedRatio) {
        //  console.log('else', this.editorData.originalZoom)
          for (let i = 0; i < ratios.length;i++) {
             if (this.editorData.selectedRatio === ratios[i].name){
               this.editorData.zoom = ratios[i].zoom;
                this.updateLayers(ratios[i].layers)
                break;
             }
          }
      }
    },
    beforeClose () {
      console.log('close')
    },
    ExportImage() {
       this.editorData.layers = JSON.parse(JSON.stringify(this.dataLayer))
      //  console.log('this.editorData:',this.editorData)
      this.isExporting = this.hasBackgroundProcess = true;
      var htmlStr = exportHelper.getHtmlString(this.editorData,this.editorData.originalLayers);
      console.log('htmlStr:',htmlStr)
      rest.post('canvas/'+ this.editorData.canvas_id+'/thumbnail', {
        width: this.editorData.width,
        height: this.editorData.height,
        html: htmlStr
      })
      .then((response) => {
        console.log('result', response)
        this.hasBackgroundProcess = false;
        // this.exportedImgData = {data: response.body.base64, url: response.body.url};
        this.exportedImgData = {url: response.data.response.data};
        this.download()
        console.log('result', response)
      })
      .catch((err) => {
         this.hasBackgroundProcess = false;
         this.isExporting = false;
        snackbar.show("An error occured during the redering process", null, 'error')
      });
    },
    download() {
      console.log('this.exportedImgData:',this.exportedImgData)
      var link = document.createElement("a"); // Or maybe get it from the current document
      link.href =  this.exportedImgData.url;
      // link.setAttribute('target','_blank');
      link.download = appHelper.generateGUID() + '.png';
      document.body.appendChild(link); // Or append it whereever you want
      link.click();
      //  window.open(this.exportedImgData.url, '_blank');
      this.isExporting = false;
    },
    close() {
       this.isExporting = false;
    },
    saveCanva (project_id) {
       apiService.saveCanvasProject(project_id,this.editorData.canvas_id,{
        canvas_name: this.editorData.canvas_name,
        description: this.editorData.description,
        height: this.editorData.height,
        width: this.editorData.width,
        backgroundcolor: this.editorData.backgroundcolor,
        // project_name: this.editorData.project_name,
        is_responsive: this.editorData.isResponsive,
        zoom: this.editorData.zoom,
        zoom_increase: this.editorData.zoomIncrease,
        thumbnail: this.editorData.thumbnail,
        ratio: 'string',
      }).then(response=>{
        console.log('this.editorData:',this.editorData)
        if(response.data.response.statusCode === 201) {
          let data = response.data.response.data
          if(this.dataLayer.length > 0) {
              this.dataLayer.forEach(row => {
                 let obj = {
                    layer_name: row.content ? row.content : 'null',
                    description: 'ss',
                    canvas_id: data.canvas_id,
                    layer_type: row.type ? row.type : 'background',
                    icon: row.icon ? row.icon : 'background',
                    layer_order: row.order,
                    visible: row.visible,
                    animation: row.animation,
                    selected: row.selected,
                    open: row.open,
                    component: row.component,
                    x: row.x,
                    y: row.y,
                    z: row.order,
                    width: row.width,
                    height: row.height,
                    target_element: 'string',
                    angle: 0,
                    layer_attributes: row.attributes,
                    image: row.image,
                    is_lock : row.islocked ? row.islocked : false,
                    is_background : row.isBackground ? row.isBackground : false,
                }
                apiService.saveCanvalayer(obj).then((respo)=>{
                  console.log('respo:',respo)
                  if(respo.data.response.statusCode === 201) {
                    row.layer_id = respo.data.response.data.layer_id
                  }
                })
              })
              console.log('this.dataLayer:',this.dataLayer)
              this.updateLayers(this.dataLayer)
              if(this.editorData.ratios.length > 0) {
                    this.editorData.ratios.forEach(val =>{
                      console.log('vaal:',val)
                      let obj = {
                        canvas_name: this.editorData.canvas_name,
                        width: val.width,
                        height: val.height,
                        backgroundcolor: this.editorData.backgroundcolor,
                        height: this.editorData.height,
                        is_responsive: this.editorData.isResponsive,
                        zoom: this.editorData.zoom,
                        zoom_increase: this.editorData.zoomIncrease,
                        ratio: val.name,
                      }
                      apiService.saveRatio(obj,data.canvas_id).then((data)=>{
                        if(data.data.response.statusCode === 201) {
                          val.layers.forEach((row) =>{
                            apiService.saveLayer({
                              layer_name: row.content ? row.content : 'null',
                              description: 'ss',
                              canvas_id: data.data.response.data.canvas_id,
                              layer_type: row.type ? row.type : 'background',
                              icon: row.icon ? row.icon : 'background',
                              layer_order: row.order,
                              visible: row.visible,
                              animation: row.animation,
                              selected: row.selected,
                              open: row.open,
                              component: row.component,
                              x: row.x,
                              y: row.y,
                              z: row.order,
                              width: row.width,
                              height: row.height,
                              target_element: 'string',
                              angle: 0,
                              layer_attributes: row.attributes,
                              image: row.image,
                              is_lock : row.islocked ? row.islocked : false,
                              is_background : row.isBackground ? row.isBackground : false,
                            }).then((resp) =>{
                              console.log('resp:',resp)
                              if(resp.data.response.statusCode === 201) {
                                row.layer_id = resp.data.response.data.layer_id
                              }
                            }).catch(err =>{
                              console.log('ee:',err)
                            })  
                          })
                        }
                      })
                    })
              } //end if condition
              this.$store.state.broadcastSave = false 
              snackbar.show("Successfully Save!");
          }
          
        }
      })
    },
    generateThumbnail (canvas_id,obj) {
      var htmlStr = exportHelper.getHtmlString(this.editor,this.editorData.originalLayers)
      apiService.generateThumbnail(this.editorData.canvas_id,{
        width: obj.width,
        height: obj.height,
        html: htmlStr
      }).then((response) => {
        console.log('response:',response)
        return response
      })
    } 
  },
  computed: {
    ...mapGetters({
      editorData: 'getCanvasData',
      layers: 'getLayers',
    }),
  },
  watch: {
    layers: {
      handler(val) {
        if (!this.editorData.isResponsive) {
          this.editorData.originalLayers = val;
        } else {
           for (var i = 0; i < this.editorData.ratios.length; i++) {
            if (this.editorData.selectedRatio === this.editorData.ratios[i].name) {
              this.editorData.ratios[i].layers = val;
              break;
            }
          }
        }
      },
      deep: true
    },
  }
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

