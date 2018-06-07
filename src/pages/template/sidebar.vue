<template>
<div>
  <mu-drawer id="sidenavpropertydrawer" left :open="true" @close="toggle()" :zDepth="0" class="custom-drawer">
      <mu-list style="padding-top: 0;">
        <mu-list-item afterText="(None)" title="Template Selected" :open="false" :toggleNested="true">
          <mu-list-item slot="nested" :disableRipple="true">
            <select-template :items="[{'id': '1', 'name': 'ej'}, {'id': '2', 'name': 'ej'}]"></select-template>
          </mu-list-item>
        </mu-list-item>
      </mu-list>
      <mu-appbar title="Add New Layer">
        <mu-icon-button class="custom-icon-button" icon="keyboard_arrow_down" slot="left" @click="moveDown"/>
        <mu-icon-button class="custom-icon-button" icon="keyboard_arrow_up" slot="left" @click="moveUp"/>
        <mu-icon-button class="custom-icon-button" icon="delete" slot="left" @click="removeLayer()"/>
        <mu-icon-menu class="custom-icon-button" icon="add"  slot="right" :open="showhover" @open="hoverBtn" @close="closeLayer" desktop :anchorOrigin="leftBot" :targetOrigin="leftBot">
            <span class="pop-title" slot="right">Add New Layer</span>
            <mu-divider style="margin-left: 10px;width: 315px;" />
            <mu-menu value="" title="">
              <div class="pop-content">
                <div v-for="(item, i) in items"  :key="i" class="content-btn" @click.stop="addLayer(item);toggle($event)">
                <mu-raised-button  ref="iconbtn"  class="raised-btn"  :icon="item.icon" @hover="hoverLayer(i)"/>
                <br>
                <span>{{item.title}}</span> 
                </div>
              </div>
            </mu-menu>
            <mu-divider v-show="shapeSelected"/>
            <mu-menu menuClass="menu-add-layer" v-show="shapeSelected" class="pop-content">
              <div class="">
                <!-- <mu-flat-button v-for="(item, i) in shapeTypes"  :key="i" 
                  @click="addShape(item.name)" 
                  @hover="hoverShape(item)">
                  <i class="material-icons">{{item.icon}}</i>
                </mu-flat-button> -->
                <mu-icon-button 
                  v-for="(item, i) in shapeTypes" 
                  :key="i" :class="{'activeIcon':item.selected}"
                  @click="addShape(item.name)" 
                  @hover="hoverShape(item)">
                  <div>
                   <mu-tooltip style="z-index: 999; top: -20px; color: white; " :label="item.name" :show="item.selected" :verticalPosition="'bottom'" :horizontalPosition="'vertical position'"/>
                   <i :class="item.class"></i>
                  </div>
                </mu-icon-button>
              </div>
            </mu-menu>
        </mu-icon-menu>
      </mu-appbar>
    <mu-list>
      <component 
        v-for="(layer,i) in layers" 
        :key="i" :is="layer.component"  
        :openpanel="layer.selected" 
        :data="layer" 
        @isOpen="isOpen"
        @onRenameOrDelete="onRenameOrDelete"
        @mousedown.native="selectLayer(layer, $event)">
      </component>
    </mu-list>
  </mu-drawer>
  <div class="layer-menu" ref="layerMenu" v-show="menuVisible">
    <mu-list>
      <!-- <mu-list-item titleClass="command-item" title="Rename" @click="rename"
        v-show="menuLayerData ? menuLayerData.type === 'text' ? false : true : false"> 
        <mu-icon slot="left" value="border_color" style="color: white; font-size: 17px;"/>
      </mu-list-item> -->
      <mu-list-item :disabled="itemIsLocked" titleClass="command-item" :title="getTitle('visibility')" @click="toggleVisibility">
        <mu-icon slot="left" value="visibility" style="color: white; font-size: 17px;"/>
      </mu-list-item>
       <mu-list-item titleClass="command-item" :title="menuLayerData && menuLayerData.islocked ? 'Unlock' : 'Lock'" @click="toggleLock">
        <mu-icon slot="left" :value="menuLayerData && menuLayerData.islocked ? 'lock_open' : 'lock'" style="color: white; font-size: 17px;"/>
      </mu-list-item>
      <mu-list-item :disabled="itemIsLocked" titleClass="command-item" :title="getTitle('list')" @click="toggleList">
        <mu-icon slot="left" value="keyboard_arrow_right" style="color: white; font-size: 17px;"/>
      </mu-list-item>
      <mu-divider />
      <!-- <mu-list-item titleClass="command-item" title="Move Up" @click="moveUp">
        <mu-icon slot="left" value="keyboard_arrow_up" style="color: white; font-size: 17px;"/>
      </mu-list-item>
      <mu-list-item titleClass="command-item" title="Move Down" @click="moveDown">
        <mu-icon slot="left" value="keyboard_arrow_down" style="color: white; font-size: 17px;"/>
      </mu-list-item> -->
      <mu-divider />
      <mu-list-item :disabled="itemIsLocked" titleClass="command-item" title="Delete" @click="removeLayer">
        <mu-icon slot="left" value="delete" style="color: white; font-size: 17px;"/>
      </mu-list-item>
    </mu-list>
  </div>
  <div class="rename-inp" ref="renameInp" v-show="renaming">
    <input type="text" class="default-inp" @click="_prevEvt" @change="handleChanged" @blur="setpValue" @keydown.enter="setpValue">
  </div>

</div>
</template>
<script>
import {mapActions, mapGetters, mapMutations} from 'vuex'
import Expanding from '../../components/Expanding'
import templateSelection from '../../components/template/select-template'
import appHelper from '../../helpers/app.helper.js'
import undoRedo from '../../helpers/undo-redo.js'
import browserHelper from '../../helpers/browser.js'
import snackBar from '../../helpers/snackbar.js'
export default {
  name: 'Sidebar',
  data () {
    return {
      show: false,
      show1: false,
      leftBot: {horizontal: 'left', vertical: 'bottom'},
      iconsize: 'iconsize',
      showTooltip: false,
      trigger: null,
      showhover:false,
      shapeSelected: false,
      expandIcon: 'expand_more',
      elements: [
        {type:'image-layer'},
        {type: 'shape-layer'},
        {type: 'shape-svg-layer'},
        {type: 'text-layer'}
      ],
      buttons: [
        {name: 'Shape', icon: 'landscape'},
        {name: 'Image', icon: 'insert_photo'},
        {name: 'Text', icon: 'text_fields'},
        {name: 'Video', icon: 'video_library'},
        {name: 'Audio', icon: 'volume_up'}
      ],
      verticalPosition: 'top',
      horizontalPosition: 'center',
      shapeTypes: [
        {
          id: 1,
          name: 'Rectangle',
          shape: 'square',
          type: 'filled',
          class: 'storya-shape-rectangle',
          selected: false
        },
        {
          id: 2,
          name: 'Circle',
          shape: 'circle',
          type: 'filled',
          class: 'storya-shape-circle',
          selected: false
        },
        {
          id: 3,
          name: 'Triangle',
          shape: 'triangle ',
          type: 'filled',
          class: 'storya-shape-triangle',
          selected: false
        },
        {
          id: 4,
          name: 'Trapezoid',
          shape: 'trapezoid ',
          type: 'filled',
          class: 'storya-shape-trapeziod',
          selected: false
        },
        {
          id: 5,
          name: 'Parallelogram',
          shape: 'parallelogram ',
          type: 'filled',
          class: 'storya-shape-parallelogram',
          selected: false
        },
        // {
        //   id: 6,
        //   name: 'Diamond',
        //   shape: 'fiamond ',
        //   type: 'filled',
        //   class: 'storya-shape-diamond',
        //   selected: false
        // },
        // {
        //   id: 1,
        //   name: 'Rectangle Filled',
        //   shape: 'square',
        //   type: 'filled',
        //   icon: 'stop',
        //   selected: false
        // },
        //  {
        //   id: 2,
        //   name: 'Rectangle',
        //   shape: 'square',
        //   type: 'line',
        //   icon: 'crop_square',
        //   selected: false
        //  },
        //  {
        //   id: 3,
        //   name: 'Triangle Filled',
        //   shape: 'triangle',
        //   type: 'filled',
        //   icon: 'network_cell',
        //   selected: false
        //  },
        //  {
        //   id: 4,
        //   name: 'Triangle',
        //   shape: 'triangle',
        //   type: 'line',
        //   icon: 'signal_cellular_null',
        //   selected: false
        //  },
        //  {
        //   id: 5,
        //   name: 'Circle Filled',
        //   shape: 'circle',
        //   type: 'filled',
        //   icon: 'lens',
        //   selected: false
        //  },
        //  {
        //   id: 6,
        //   name: 'Circle',
        //   shape: 'circle',
        //   type: 'line',
        //   icon: 'panorama_fish_eye',
        //   selected: false
        //  }
      ],
      renaming: false,
      menuVisible: false,
      menuLayerData: null,
      menuElement: null,
      itemIsLocked: false,
    }
  },
  components: {
    Expanding,
    'select-template': templateSelection,
  },
  computed: {
    ...mapGetters( {
      items: 'getItems',
      layers: 'getLayers'
    })
  },
  mounted () {
    this.trigger = this.$refs.iconbtn
    // resizing sidenav if firefox
    if (browserHelper.isFirefox()) {
      document.head.innerHTML += '<style> .custom-drawer { width: 360px!important; } </style>';
    }
    // adding event listener 
    // hiding and layerMenu
    document.addEventListener('mousedown', this.handleMousedown);
  },
  methods: {
    ...mapMutations(['updateLayers', 'removeSelectedLayer', 'broadCastStatus']),
    ...mapActions(['addLayer']),
    ...mapGetters(['getShapeLayer', 'getSelectedLayerId','sortLayer']),
    hoverBtn () {
      this.showhover = true
    },
    closeLayer () {
      // console.log('as')
      this.showhover = !this.showhover
    },
    toggle (event) {
      this.showhover = !this.showhover
      event.stopPropagation()
    },
    isOpen (val){
      console.log('val;',val)
      this.$emit('openWindow',val)
      //this.setLayerValue(val)
    },
    addShape(shape) {
      var _sl = this.getShapeLayer();
      // if (shape.indexOf('Filled') !== -1) {
      //    _sl.attributes.color = '#333';
      //    _sl.attributes.borderSize = 0;
      //    _sl.attributes.shape_type = 'filled'
      // } else {
      //   _sl.attributes.color = 'transparent';
      //  _sl.attributes.borderSize = 5;
      //    _sl.attributes.shape_type = ' '
      // }
      _sl.attributes.color = 'red';
      _sl.attributes.shape_type = shape.shape
      _sl.attributes.shape = shape.indexOf(' ') !== -1 ? shape.split(' ')[0].trim() : shape.trim();
      _sl.attributes.borderStyle = 'solid'
      console.log('getShapeLayer', _sl)
      this.addLayer(_sl);
      this.showhover = this.shapeSelected = false;
    },
    removeLayer() {
      var selectedLayer = this.getSelectedLayerId();
      
      if (selectedLayer && selectedLayer.sourceLayer.islocked) {
        snackBar.show("Layer is locked");
        this.broadCastStatus({action: 'notify', layerId: selectedLayer.id});
        return;
      }
      if (selectedLayer) {
        undoRedo.add(appHelper.cloneLayer(selectedLayer.sourceLayer), "delete");
        this.removeSelectedLayer(selectedLayer.id);
      }
      this.menuVisible = false;
    },
    moveDown () {
        let currentLayer = this.layers.find((e)=> e.selected)
        if (!currentLayer) return;
        let nextItem = this.layers.find((e)=> e.order === currentLayer.order - 1)
          if(nextItem){
          nextItem.order = currentLayer.order
          currentLayer.order = currentLayer.order -1 
          // let newLayer = this.getLayers.sort((a, b) => b.order - a.order)
          
          this.sortLayer()
        }
       this.menuVisible = false;
    },
    sortLayer() {
      // this.layers.sort((a, b) => a.order - b.order)
      console.log('this.layers:',this.layers)
    },
    moveUp () {
        let currentLayer = this.layers.find((e)=> e.selected)
        if (!currentLayer) return;
        let prevItem = this.layers.find((e)=> e.order === currentLayer.order + 1)
        if(prevItem){
          prevItem.order = currentLayer.order
          currentLayer.order = currentLayer.order + 1
          for(let i = 0;i < this.layers.length; i++) {
            // this.layers[i].order = this.layers[i].id === prevItem.id ? prevItem.order : 1
            // this.layers[i].order = this.layers[i].id === currentLayer.id ? currentLayer.order : 1
            if(this.layers[i].id === prevItem.id) {
              this.layers[i].order = prevItem.order
            }else if (this.layers[i].id === currentLayer.id) {
              this.layers[i].order = currentLayer.order
            }
          }
          console.log('sad:',this.layers)
          setTimeout(()=>{
          this.sortLayer()
          },50)
        }
        this.menuVisible = false;
    },
    hoverShape (value) {
      for (let i =0;i<this.shapeTypes.length; i++) {
          if(this.shapeTypes[i].id === value.id) {
            this.shapeTypes[i].selected = true
          }else {
            this.shapeTypes[i].selected = false
          }
      } 
    },
    hoverLayer (index) {
        this.shapeSelected = index === 0
        if(this.shapeSelected){
            this.hoverShape(this.shapeTypes[1])
        }
    },
    // for renaming or deleting a layer using context menu (right click)
    onRenameOrDelete(layerData, e) {
      // console.log(e.target, 'mu-item-title', e.target.querySelector('.mu-item-title'))
      this.menuLayerData = layerData;
      this.menuElement = e.target;
      this.$refs.layerMenu.style.left = e.clientX + 'px';
      this.$refs.layerMenu.style.top = e.clientY + 'px';
      this.menuVisible = true;
      this.itemIsLocked = layerData.islocked;
    },
    handleMousedown(e) {
      if (this.$refs.layerMenu && !this.$refs.layerMenu.contains(e.target)) {
        this.menuVisible = false;
      }
    },
    rename() {
      // console.log(this.menuElement.getBoundingClientRect())
      // this.menuElement.innerHTML = "<input onclick='handleChanged' style='margin: 0; height: 30px; width: 70%; font-size: 13px;' class='default-inp' value='" + this.menuLayerData.content + "'>";
      // var bounds = this.menuElement.getBoundingClientRect();
      // this.$refs.renameInp.style.left = bounds.left + 'px'; 
      // this.$refs.renameInp.style.top = bounds.top + 'px'; 
      this.menuElement.innerHTML = '';
      this.menuElement.appendChild(this.$refs.renameInp);
      console.log('this.menuLayerData.content', this.$refs.renameInp.value)
      this.$refs.renameInp.value = this.menuLayerData.content;
      this.menuVisible = false;
      console.log(this.menuElement);
      this.renaming = true;
    },
    toggleLock() {
      this.menuLayerData.selected = false;
      this.menuLayerData.islocked = !this.menuLayerData.islocked;
      this.menuVisible = false;
    },
    toggleVisibility() {
      this.menuLayerData.visible = !this.menuLayerData.visible;
      this.menuVisible = false;
    },
    toggleList() {
      this.menuLayerData.selected = !this.menuLayerData.selected;
      this.menuVisible = false;
    },
    getTitle(t) {
      if (t === 'visibility') {
        return this.menuLayerData ? this.menuLayerData.visible ? 'Hide' : 'Show' : 'Hide';
      } else if (t === 'list') {
         return this.menuLayerData ? this.menuLayerData.selected ? 'Collapse' : 'Expand' : 'Collapse';
      }
      
      return '';
    },
    _prevEvt(e) {
      e.stopPropagation();
    },
    handleChanged(e) {
      console.log(e, 'handleddddddddd')
    },
    setpValue(e) {
      this.menuLayerData.content = e.target.value;
      // console.log("unfocused", this.menuElement.children[0]);
      // this.menuElement.removeChild( this.menuElement.children[0]);
       this.menuElement.innerHTML =  this.menuLayerData.content;
       this.renaming = false;
    },
    // selecting the layer when button 2 is clicked
    // right click XD
    selectLayer(layer, evt) {
      if (evt.button !== 2) return;
      for (var i = 0; i < this.layers.length; i++) {
        if (this.layers[i].id === layer.id) {
          if (!this.layers[i].islocked) {
            layer.selected = true;
          } 
        } else {
          this.layers[i].selected = false;
        }
      }
    },
  }
}
</script>
<style  lang="scss">
@import '../../css/tooltip.scss';
@import '../../css/menu2.scss';
.mu-item-wrapper.disabled {
  opacity: 0.21;
}
.rename-inp {
  position: absolute !important;
  top: -20px;
  width: 150px;
  z-index: 9999;
}
.command-item {
  font-size: 13px;
}
.layer-menu {
  position: absolute;
  top: 20px;
  background-color: #1da675;
  z-index: 999;
  user-select: none;
  // max-height: 150px;
  // overflow-y: auto
}
.custom-drawer{
  width: 306px;
  top: 115px;
}
.mu-appbar-title {
    font-size: 14px;
}
.custom-icon-button{
  width: 43px;
}
.pop-title{
    margin-left: 50px;
    font-size: 15px;
}
.mu-appbar-title {
  text-align: right;
}
.mu-divider{
  background-color: rgba(255, 245, 245, 0.21);
}

.pop-content{
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.raised-btn {
  min-width: 50px;
  height: 50px;
  margin: 7px;
  box-shadow: 0 3px 10px rgba(0,0,0,.156863), 0 3px 10px rgba(0,0,0,.227451);
}

.content-btn{
  width: 62px;
  text-align: center;
  margin-left: 4px;

}
.mu-popover {
  left: 345px !important;
  top: 115px !important;
  background-color: #171616 !important;
}
.mu-menu-list{
  width: 330px;
  overflow: hidden;
}

.menu-add-layer {
   left: 345px;
    top: 115px;
}

.mu-paper{
  background-color: #111111;
}
.mu-menu{
  width: 336px;
}
.mu-menu-list {
  overflow: initial;
}
.activeIcon {
    border: 1px solid #1da675 ;
}
</style>
