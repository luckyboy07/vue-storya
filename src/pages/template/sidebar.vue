<template>
<div>
  <mu-drawer left :open="true" @close="toggle()" :zDepth="0" class="custom-drawer">
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
            <span class="pop-title" >Add New Layer</span>
            <mu-divider style="margin-left: 10px;width: 315px;" />
              <mu-menu value="" title="">
            <div class="pop-content">
              <div v-for="(item, i) in getItems"  :key="i" class="content-btn" @click.stop="addLayer(item);toggle($event)">
              <mu-raised-button  ref="iconbtn"  class="raised-btn"  :icon="item.icon" @hover="shapeSelected = i === 0"/>
               <br>
               <span>{{item.title}}</span> 
              </div>
            </div>
              </mu-menu>
            <mu-divider v-show="shapeSelected"/>
            <mu-menu menuClass="menu-add-layer" v-show="shapeSelected" class="pop-content">
              <div class="">
                <!-- <mu-icon-button tooltip="top-center" tooltipPosition="top-center"  icon="stop"/> -->
                <mu-icon-button icon="stop" @click="addShape('Rectangle Filled')"/>
                <mu-icon-button icon="crop_square" @click="addShape('Rectangle')"/>
                <mu-icon-button icon="network_cell" @click="addShape('Triangle Filled')"/>
                <mu-icon-button icon="signal_cellular_null" @click="addShape('Triangle')"/>
                <mu-icon-button icon="lens" @click="addShape('Circle Filled')"/>
                <mu-icon-button icon="panorama_fish_eye" @click="addShape('Circle')"/>
              </div>
            </mu-menu>
        </mu-icon-menu>
      </mu-appbar>
    <mu-list>
    <component v-for="(layer,i) in getLayers" :key="i" :is="layer.component"  
      :openpanel="layer.selected" :data="layer" @isOpen="isOpen"></component>
     <!-- <image-layer/> -->
     <!-- <shape-layer/> -->
     <!-- <shape-svg-layer/> -->
     <!-- <text-layer/> -->
      <!-- <ul class="expansion-panel">
        <li class="ep-container">

        </li>
      </ul>
      <router-link to="" aria-expanded="show" @click.native="show = !show">
        <span class="icon is-small"><i class="fa fa-bar-chart-o"></i></span>
        Charts
        <span class="icon is-small is-angle"><i class="fa fa-angle-down"></i></span>
      </router-link>
      <expanding>
        <ul v-show="show">
          <li>
              ChartJs
          </li>
          <li>
          Chartist
          </li>
          <li>
        Peity
          </li>
          <li>
            Plotly
          </li>
        </ul>
      </expanding>
      <router-link to=""  aria-expanded="show1" @click.native="show1 = !show1">
        <span class="icon is-small"><i class="fa fa-bar-chart-o"></i></span>
        asdasdasdasd
        <span class="icon is-small is-angle"><i class="fa fa-angle-down"></i></span>
      </router-link>
      <expanding>
        <ul v-show="show1">
          <li>
          ChartJs
          </li>
          <li>
            Chartist
          </li>
          <li>
              Peity
          </li>
          <li>
            Plotly
          </li>
        </ul>
      </expanding> -->
    </mu-list>
  </mu-drawer>
</div>
</template>
<script>
import {mapActions, mapGetters, mapMutations} from 'vuex'
import Expanding from '../../components/Expanding'
import templateSelection from '../../components/template/select-template'
import appHelper from '../../helpers/app.helper.js'
import undoRedo from '../../helpers/undo-redo.js'
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
      horizontalPosition: 'center'
    }
  },
  components: {
    Expanding,
    'select-template': templateSelection
  },
  computed: {
    ...mapGetters(['getItems','getLayers'])
  },
  mounted () {
    this.trigger = this.$refs.iconbtn
    
    // console.log('trigger:', this.$refs)
    // let targetelem = document.getElementsByClassName('mu-item-wrapper')
    // console.log('targetelem',targetelem[0])
    // // NEED FOUR LOOP
    // targetelem[0].style.backgroundColor = 'rgba(115, 111, 111, 0.37)'
    // targetelem[0].style.borderTop = '1px solid hsla(0,0%,100%,.12)'
    // targetelem[1].style.backgroundColor = 'rgba(115, 111, 111, 0.37)'
    // targetelem[1].style.borderTop = '1px solid hsla(0,0%,100%,.12)'
    // targetelem[2].style.backgroundColor = 'rgba(115, 111, 111, 0.37)'
    // targetelem[2].style.borderTop = '1px solid hsla(0,0%,100%,.12)'
    // targetelem[3].style.backgroundColor = 'rgba(115, 111, 111, 0.37)'
    // targetelem[3].style.borderTop = '1px solid hsla(0,0%,100%,.12)'
  },
  methods: {
    ...mapMutations(['updateLayers', 'removeSelectedLayer',]),
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
      this.$emit('openWindow',val)
      //this.setLayerValue(val)
    },
    addShape(shape) {
      var _sl = this.getShapeLayer();
      if (shape.indexOf('Filled') !== -1) {
         _sl.attributes.color = '#333';
      } else {
        _sl.attributes.color = 'transparent';
      }
       _sl.attributes.borderSize = 5;
      _sl.attributes.shape = shape.indexOf(' ') !== -1 ? shape.split(' ')[0].trim()
        : shape.trim();
      
      // console.log('getShapeLayer', _sl)
      this.addLayer(_sl);
      this.showhover = this.shapeSelected = false;
    },
    removeLayer() {
      var selectedLayer = this.getSelectedLayerId();
      if (selectedLayer) {
        undoRedo.add(appHelper.cloneLayer(selectedLayer.sourceLayer), "delete");
        this.removeSelectedLayer(selectedLayer.id);
      }
    },
    moveDown () {
        let currentLayer = this.getLayers.find((e)=> e.selected)
        console.log('currentLayer;',currentLayer)
        let nextItem = this.getLayers.find((e)=> e.order === currentLayer.order - 1)
          if(nextItem){
          nextItem.order = currentLayer.order
          currentLayer.order = currentLayer.order -1 
          // let newLayer = this.getLayers.sort((a, b) => b.order - a.order)
          this.sortLayer()
        }
      //   if (currentLayer.order < this.getLayers.length) {
      //   let nextItem = this.getLayers.find((e)=> e.order === currentLayer.order + 1)
      //   nextItem.order = currentLayer.order
      //   currentLayer.order = currentLayer.order + 1
      //   this.getLayers = this.getLayers.sort((a, b) => b.order - a.order)
      // }
    },
    moveUp () {
        let currentLayer = this.getLayers.find((e)=> e.selected)
          let prevItem = this.getLayers.find((e)=> e.order === currentLayer.order + 1)
        if(prevItem){
          prevItem.order = currentLayer.order
          currentLayer.order = currentLayer.order + 1
          this.sortLayer()
        }
        //  for(let i = 0; i < this.getLayers.length; i++) {
        //   let last = (i +this.getLayers.length) % this.getLayers.length
        //   this.getLayers[i].zindex = this.getLayers[last].order
        // }
    } 
  }
}
</script>
<style  lang="scss">
@import '../../css/tooltip.scss';
@import '../../css/menu2.scss';
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
    margin-left: 10px;
    font-size: 15px;
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
  left: 345px!important;
  top: 115px!important;
  background-color: #171616;
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

</style>
