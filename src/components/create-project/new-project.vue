<template>
  <div>
    <app-header :hideSecondHeader="true"></app-header>
    <div class="project-container row-scroll">
      <mu-row gutter>
        <mu-col width="50" class="left-content">
          <mu-tabs :value="activeTab" @change="tabChanged">
            <mu-tab :titleClass="tabStyle" value="1" title="Templates"/>
            <mu-tab value="2" title="Custom"/>
            <mu-tab value="3" title="Facebook"/>
            <mu-tab value="4" title="Twitter"/>
            <mu-tab value="5" title="Web"/>
            <mu-tab value="6" title="Print"/>
            <mu-tab value="7" title="Video"/>
          </mu-tabs>
          <div style="position: relative;height: 499px;">
            <div v-if="activeTab === '1'" class="tab-item">
              <tab-detail :selectedTab="activeTab" :type="'templates'" @onItemSelected="onItemSelected"
                :items="$_setAppraiteAvatar($_getItemsFromType('templates'))"></tab-detail>
            </div>
            <div v-if="activeTab === '2'" class="tab-item">
              <tab-detail :selectedTab="activeTab" :type="'custom'" @onItemSelected="onItemSelected"
                :items="$_setAppraiteAvatar($_getItemsFromType('custom'))"></tab-detail>
            </div>
            <div v-if="activeTab === '3'" class="tab-item">
              <tab-detail :selectedTab="activeTab" :type="'facebook'" @onItemSelected="onItemSelected"
                :items="$_setAppraiteAvatar($_getItemsFromType('facebook'))"></tab-detail>
            </div>
            <div v-if="activeTab === '4'" class="tab-item">
              <tab-detail :selectedTab="activeTab" :type="'twitter'" @onItemSelected="onItemSelected"
                :items="$_setAppraiteAvatar($_getItemsFromType('twitter'))"></tab-detail>
            </div>
            <div v-if="activeTab === '5'" class="tab-item">
              <tab-detail :selectedTab="activeTab" :type="'web'" @onItemSelected="onItemSelected"
                :items="$_setAppraiteAvatar($_getItemsFromType('web'))"></tab-detail>
            </div>
            <div v-if="activeTab === '6'" class="tab-item">
              <tab-detail :selectedTab="activeTab" :type="'print'" @onItemSelected="onItemSelected"
                :items="$_setAppraiteAvatar($_getItemsFromType('web'))"></tab-detail>
            </div>
            <div v-if="activeTab === '7'" class="tab-item">
              <tab-detail :selectedTab="activeTab" :type="'video'" @onItemSelected="onItemSelected"
                :items="$_setAppraiteAvatar($_getItemsFromType('video'))"></tab-detail>
            </div>
           </div>
        </mu-col>
        <mu-col  class="right-content">
          <div style="display: table" id="info">
            <div class="item inp">
              Project Name <span class="error-msg" v-if="isProject">*Required</span>
              <div class="np-g-inp" ref="menuContainer">
                <input style="margin: 0;" class="default-inp" type="text" v-model="setupData.project_name" @input="handleInput"/>
                <mu-flat-button class="np-g-more-btn" @click="showMore">
                  <i class="material-icons">
                    expand_more
                    </i>
                </mu-flat-button>
              </div>
              <div class="np-more-items" ref="menuMore" v-show="showMoreItems">
                <mu-list style="padding: 0">
                  <mu-list-item v-for="item in filterList" :key="item.id" :title="item.project_name" 
                    class="tem-action-item" @click="handleItemClick(item)"/>
                  <!-- <mu-divider inset class="temp-action-item-divider"/> -->
                 <mu-infinite-scroll :scroller="scroller" @load="loadMore"/>
                </mu-list>
              </div>
            </div>
            <div class="item inp">
              File Name <span class="error-msg" v-if="isFile">*Required</span>
              <input class="default-inp" type="text" v-model="setupData.canvas_name"/>
            </div>
            <div class="item inp" style="display: flex;">
              <div style="width: 50%; padding">
                Width
                <input class="default-inp" v-model="setupData.width" spellcheck="false" v-digitsonly type="text"/>
              </div>
              <div class="x">
                <span >x</span> 
              </div>
              <div style="width: 50%;">
                Height
                <input class="default-inp" v-model="setupData.height" spellcheck="false" v-digitsonly type="text"/>
              </div>
            </div>
            <div class="item">
            Orientation
            <div class="orient-container">
              <img v-for="(item,i) in orientations" :key="i" class="orient-item" :class="[{'portrait-sze': item.name ==='horizontal','landscape-sze': item.name ==='vertical'},{'active-sze': item.selected}]"  src="../../assets/tile_grey.png" @click="orientSelected(item, i)">
                <!-- <img id="h"
                class="orient-item" src="../../assets/tile_grey.png" 
                style="width: 53px; height: 77px" @click="orientSelected('horizontal', $event)"/> 
                <img id="v"
                class="orient-item" src="../../assets/tile_grey.png" 
                style="vertical-align: top; width:77px; height: 53px" @click="orientSelected('vertical', $event)"/>  -->
            </div>
            </div>
            <div class="item inp" style="position: relative">
              <!-- Color popup -->
              <div ref="colorPicker" class="color-container" v-show="pickerisShow">
                <color-picker v-model="colors" @input="colorSelected" 
                  style="width: 100%; height: 100%; border: 1px solid #4A574B;"></color-picker>
              </div>
              Canvas Background Colour
              <div :style="{backgroundColor: setupData.backgroundcolor, color: getInvertedColor(setupData.backgroundcolor)}" 
                class="color-div" @click="showPicker">
                <span class="color-value">{{setupData.backgroundcolor || '#FFFFFF'}}</span>
              </div>
            </div>
          </div>
          <div class="create-action-buttons">
            <mu-raised-button @click="onConfirm" label="Create" class="demo-raised-button create-action-buttons-item" 
            style="margin-top: 1px; background-color: #009D70; text-transform: none;margin-bottom: 6px;"/>
            <br>
            <mu-raised-button @click="onCancel" label="Cancel" class="demo-raised-button create-action-buttons-item"
              style="background-color: transparent; border: 1px solid #4B4B4B; text-transform: none"/>
          </div>
        </mu-col>
      </mu-row>
    </div>
    <!-- Dialog -->
    <mu-dialog :open="confirmDialogOpen" title="Project Detail" class="si-p-ha">
     <div>
       <mu-grid-tile :cols="1">
        <div class="img-container">
          <img src="@/assets/tile_grey.png" class="avatar" 
            :style="{width: setupData.width + 'px!important', height: setupData.height + 'px!important'}"/>
        </div>
        <div class="td-d">
          <div class="td-d-item " style="color: #767676;">{{setupData.width}}x{{setupData.height}}</div>
          <div class="td-d-item " v-if="setupData.orientation">{{setupData.orientation.label}}</div>
        </div>
      </mu-grid-tile>
     </div>
      <br/>
      <!-- Continue -->
      <mu-raised-button label="CANCEL" slot="actions" primary @click="confirmDialogOpen = false"  style="background-color: transparent; border: 1px solid #4B4B4B; text-transform: none"/>
       <mu-raised-button label="OK" slot="actions" primary @click="onConfirm"  style="background-color: transparent; border: 1px solid #4B4B4B; text-transform: none"/>
    </mu-dialog>
  </div>
</template>
<script>
/*
* @component: new-project
  @events: 
    onCancel: occurs when the process is cancelled
    onFinished: occurs when the submit button is clicked
*/
import tabDetail from './tabs-content/tab-detail'
import { Photoshop, Chrome } from "vue-color";
import colorHelper from '../../helpers/color-helper'
import header from '../../pages/template/header'
import {mapActions} from 'vuex'
import apiService from '../../helpers/API.js'
// const service = new sampleService()
import * as $ from 'linq'
export default {
  name: "new-project",
  components: {
    tabDetail,
    "photoshop-picker": Photoshop,
    "color-picker": Chrome,
    'app-header': header
  },
  mounted() {
    // removing the
    this.scroller = document.getElementsByClassName('mu-list')[0]
    console.log('this.scroller:',this.scroller)
    this.$el.getElementsByClassName('mu-tab-link-highlight')[0].className = '';
    document.addEventListener('click', this.handleMouseDown);
    apiService.getProjects().then((response) =>{
      if (response.data.response.statusCode === 200) {
        let temps = response.data.response.data.projects
        for (let i =0;i<temps.length;i+=20) {
            this.chunk.push(temps.slice(i,i+20))
        }
        this.projects = {
          row: this.chunk[0],
          scroll: 0
        }
        this.rows = this.chunk[0]
      console.log('this.projects:',this.projects)
      }
    })
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleMouseDown);
  },
  data() {
    return {
      confirmDialogOpen: false,
      activeTab: '1',
      tabStyle: {'color': '#fff'},
      setupData: {
        height: '',
        width: '',
        project_name: '',
        canvas_name: '',
        backgroundcolor: ''
      },
      isProject: false,
      isFile: false, 
      pickerisShow: false,
      width: '',
      height: '',
      colors: {
        hex: '#194d33',
        hsl: { h: 150, s: 0.5, l: 0.2, a: 1 },
        hsv: { h: 150, s: 0.66, v: 0.30, a: 1 },
        rgba: { r: 25, g: 77, b: 51, a: 1 },
        a: 1
      },
      showMoreItems: false,
      userShow: false,
      prjs: [
        {name: 'test 1'},
        {name: 'test 2'},
        {name: 'test 3'},
        {name: 'test 4'},
        {name: 'test 5'},
      ],
      orientations: [
        {
          id: 1,
          name: 'horizontal',
          selected: false
        },
          {
          id: 2,
          name: 'vertical',
          selected: false
        }
      ],
      projects: {},
     rows: [],
      scroller: null,
      chunk: []
    }
  },
  methods: {
    ...mapActions(['selectTemplate','saveCanvas']),
    showPicker(evt) {
      this.pickerisShow = true
    },
    handleMouseDown(evt) {
      // for custom expand list at project name
      if ( this.showMoreItems) {
        if (this.userShow) {
          this.userShow = false;
          return;
        }
        if (!this.$refs.menuMore.contains(evt.target)) {
          this.showMoreItems = false;
        }
      }

      // for color picker div
      if (this.$refs.colorPicker.style.display !== 'none' && !this.$refs.colorPicker.contains(evt.target)) {
          this.pickerisShow = false;
        }
    },
    onCancel() {
      this.$emit('onCancel');
      this.$router.go(-1)
    },
    onConfirm() {
      var selected = {};
      // console.log('selected:',selected)
      // console.log('this.setupData:',this.setupData)
      console.log('this.setupData:',this.setupData)
      selected.width = parseInt(this.setupData.width)
      selected.height = parseInt(this.setupData.height)
      selected.templateSelected = this.setupData.templateSelected
      selected.zoom = 100;
      selected.zoomIncrease = 20;
      selected.canvas_name = this.setupData.canvas_name;
      selected.project_name = this.setupData.project_name;
      selected.backgroundcolor = this.setupData.backgroundcolor || '#fff';
      selected.project_id = this.setupData.project_id;
      console.log('selected:',selected)
      
      this.$router.push({name: 'EditorApp'})
      // if(this.setupData.canvas_name && this.setupData.project_name){
      //     this.isFile = false
      //     this.isProject = false
      //     // apiService.saveCanvas(this.setupData).then((response)=>{
      //     //   console.log('response:',response)
      //     // })
      //     this.$store.dispatch('selectTemplate',selected).then(response =>{
      //        if (response.data.response.statusCode === 201) {
      //         this.$router.push({name: 'EditorApp'})
      //       }
      //     })
      // }else {
      //   if(this.setupData.project_name === '' ){
      //     this.isProject = true
      //   }
      //   if (this.setupData.canvas_name === ''){
      //     this.isFile = true
      //   }
      //   this.handleviewScroll()
      // }
    },
    onSubmit() {
      this.$emit('onSubmit', this.setupData);
      this.confirmDialogOpen = true;
    },
    orientSelected(val, index) {
      if(val.name === 'vertical'){
          this.setupData.height = this.setupData.template.h
          this.setupData.width = this.setupData.template.w
      }else if (val.name === 'horizontal'){
        this.setupData.height = this.setupData.template.w
        this.setupData.width = this.setupData.template.h
      }
      this.setupData.templateSelected = val
      if(this.orientations.length - (index+1) === 0 ){
        this.orientations[index].selected = true
        this.orientations[index-1].selected = false
      }else {
        this.orientations[index].selected = true
        this.orientations[index+1].selected = false
      }
      // if (val === 'horizontal') {
      //   evt.target.style.border = '2px solid #4A574B';
      //   document.getElementById('v').style.border = '';
      // } else {
      //    evt.target.style.border = '2px solid #4A574B';
      //   document.getElementById('h').style.border = '';
      // }
    },
    tabChanged(val) {
      this.activeTab = val;
    },
    onItemSelected(item) {
      this.setupData.orientation = item
      this.setupData.width = item.w
      this.setupData.height = item.h
      this.width = item.w;
      this.height = item.h;
      this.$set(this.setupData, 'template', item);
       if(item.w <= 400){
        this.orientSelected(this.orientations[0],0)
      }else if (item.w > 400){
        this.orientSelected(this.orientations[1],1)
      }
    },
    colorSelected(val) {
      this.setupData.backgroundcolor = val.hex;
    },
    $_getItemsFromType(type) {
      if (!type) {
        return [];
      }

      switch (type) {
        case 'templates':
          return [
          {
            id: '1',
            label: 'Profile Image',
            w: '356',
            h: '360'
          },
          {
            id: '2',
            label: 'Cover Photo',
            w: '400',
            h: '300'
          },
          {
            id: '3',
            label: 'Multi Page Post Vertical',
            w: '237',
            h: '346'
          },
          {
            id: '4',
            label: 'Landscape Photo',
            w: '800',
            h: '400'
          },
          {
            id: '5',
            label: 'Cover Puto',
            w: '820',
            h: '312'
          },
        ];
        case 'custom':
        return [];
        case 'facebook':
        return [
          {
            id: '1',
            label: 'Profile Image',
            w: '356',
            h: '360'
          },
          {
            id: '2',
            label: 'Cover Photo',
            w: '400',
            h: '300'
          }
        ];
        case 'twitter':
        return [
          {
            id: '1',
            label: 'Profile Image',
            w: '356',
            h: '360'
          }
        ];
        default: break;
      }
    },
    $_setAppraiteAvatar(arrData) {
      if (!arrData) {
        return [];
      }
      for (var i = 0; i < arrData.length; i++) {
        var d = arrData[i];
        if (d.w < d.h) {
          if (d.w <= 300) {
            d.dw = 59;
            d.dh = 118;
          } 
          if (d.w > 300 && d.w <= 400) {
            d.dw = 118.13;
            d.dh = 118.13;
          }
        } else if (d.w === d.h) {
          d.dw = 112;
          d.dh = 11;
        } else {
          if (d.h <= 300) {
            d.dw = 192;
            d.dh = 94;
          }
          if (d.h > 300 && d.h <= 500) {
            d.dw = 183;
            d.dh = 82.19;
          }
        }
      }

      return arrData;
    },
    getInvertedColor(hex) {
      return colorHelper.invertColor(hex);
    },
    showMore() {
      
      this.userShow = true;
      this.showMoreItems = !this.showMoreItems;
      if (this.showMoreItems) {
        var m = this.$refs.menuMore;
        var mc = this.$refs.menuContainer.getBoundingClientRect();
        m.style.width = mc.width + 'px';
      }
    },
    handleItemClick(item) {
      this.setupData.project_name = item.project_name;
      this.setupData.project_id = item.project_id;
      this.showMoreItems = false;
    },
    handleviewScroll () {
      let view = document.getElementById('info')
      view.scrollIntoView()
    },
    loadMore() {
       this.projects.scroll += 1
      if(this.projects.scroll !== this.chunk.length) {
      this.rows.concat(this.chunk[1])
      this.rows = $.from(this.rows).union(this.chunk[this.projects.scroll]).toArray()
      }
    },
    handleInput(value) {
      if(this.setupData.project_name.length > 0) {
        this.showMoreItems = true
      }else {
        this.showMoreItems = false
      }
       this.setupData.project_id = undefined;
    }
  },
  computed: {
    filterList () {
        if(this.rows && this.rows.length > 0) {
         var list =  this.rows.filter(row => {
            return row.project_name.toLowerCase().includes(this.setupData.project_name.toLowerCase())
          })
          return list
        }
    }
  }
}
</script>
<style scoped>
  .color-container {
    box-shadow: 0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647);
    width: 100%;
    position: absolute;
    padding-right: 56px; 
    z-index: 1;
    top: -240px;
    border-radius: 2px;
  }
  .mu-dialog {
    width: auto!important;
  }
  .si-p-ha {
    width: auto;
  }
  .np-g-inp {
    display: flex;
    margin-top: 10px;
    background-color: #333333;
  }
  .np-g-more-btn {
    color: #989898;
    width: 50px;
    border-radius: 0;
    min-width: 0;
  }
  .np-more-items {
    position: absolute;
    width: auto;
    margin-top: 1px;
    max-height:300px;
    display: flex;
    box-shadow: 0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647);
  }
  .mu-text-field {
    width: 100%;
  }
  .mu-text-field-line {
    display: none!important;
  }
  .mu-text-field-focus-line {
     display: none!important;
  }
  .mu-text-field-focus-line, .mu-text-field-focus-line .focus {
    background-color: transparent!important;
  }
  .project-container {
    position: absolute;
    width: 80%;
    /* margin-left: 20%;
    margin-right: 20%;
    margin-top: 5%; */
    border: #323232 solid 1px;
    background: #111111;
    /* height: 70vh; */
    /* top: 20%; */
    bottom: 0;
    left: 10%;
  }
  .mu-tabs {
    background-color: #000000;
    border-bottom: #323232 solid 1px;
  }
  .mu-tab-active {
    color: #4C7155!important
  }
  .mu-tab-link-highlight {
    background-color: red;
    height: 0!important;
  }
  .mu-tab-link {
    color: #606060;
  }
  .left-content {
    width: 70%;
    border-right: 1px solid #323232;
    /* background-color: #181818; */
    /* height: 69.7vh; */
  }
  .project-container .right-content {
    width: 30% !important;
    padding: 10px !important;
    /* background: #111111 !important; */
    height: 69.7vh !important;
    display: table !important;
    /* overflow-y: scroll !important; */
    /* overflow-x: scroll !important; */
  }
  .tab-item {
    margin-top: 25px;
    margin-left: 10px;
    margin-right: 10px;
  }
  
  .right-content .create-action-buttons {
    vertical-align: bottom;
     display: table-footer-group;
  }
  .create-action-buttons-item {
    width: 100%;
  }
  .item {
    display: inline-block; 
    width: 100%;
    padding: 5px;
  }
  .inp {
    padding-right: 50px;
  }
  .color-div {
    width: 100%;
    height: 35px;
    background-color: #fff;
    margin-top: 10px;
    margin-bottom: 10px;
    cursor: pointer;
    display: table;
    padding: 5px;
  }
  .color-value {
    vertical-align: middle;
    display: table-cell;
    font-weight: bold;
  }
  .x {
    display: flex;
    align-items: flex-end;
    margin: 15px;
    margin-bottom: 20px
  }
  .orient-container {
    padding-top: 10px;
  }
  .orient-item {
    width: auto;
    margin: 5px;
  }
  .orient-item:hover {
    border: 2px solid #4A574B;
  }
  .orient-selected {
     border: 2px solid #4A574B;
  }
  .content {
    margin-top: 0;
    padding: 0px!important;
  }
  .vc-chrome {
    height: 100%;;
  }
  .tem-action-item {
    text-align: left;
    background-color: #333333;
    font-family: Lato;
  }
  .row-scroll{ 
   overflow-y: auto;
  }
  .portrait-sze {
    width: 53px;
     height: 77px;
  }
  .landscape-sze {
    vertical-align: top;
     width:77px;
     height: 53px;
  }
  .active-sze {
    border: 2px solid #4A574B;
  }
  .img-container {
  width: 100%;
  height: 60%;
  /* position: absolute; */
  /* text-align: center; */
}
.error-msg{
  color: #ff0a0a;
  font-size: 12px;
    /* position: relative; */
    /* top: -8px; */
    bottom: 5px;
}
</style>


