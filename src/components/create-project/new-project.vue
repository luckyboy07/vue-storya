<template>
  <div>
    <app-header :hideSecondHeader="true"></app-header>
    <div class="project-container">
      <mu-row gutter>
      <mu-col width="100" class="left-content">
        <mu-tabs :value="activeTab" @change="tabChanged">
            <mu-tab :titleClass="tabStyle" value="1" title="Templates"/>
            <mu-tab value="2" title="Custom"/>
            <mu-tab value="3" title="Facebook"/>
            <mu-tab value="4" title="Twitter"/>
            <mu-tab value="5" title="Web"/>
            <mu-tab value="6" title="Print"/>
            <mu-tab value="7" title="Video"/>
          </mu-tabs>
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
      </mu-col>
      <mu-col width="50" tablet="60" desktop="35" class="right-content">
        <div style="display: table">
          <div class="item inp">
            Project Name
            <div class="np-g-inp" ref="menuContainer">
              <input style="margin: 0;" class="default-inp" type="text" v-model="setupData.project_name"/>
              <mu-flat-button class="np-g-more-btn" @click="showMore">
                <i class="material-icons">
                  expand_more
                  </i>
              </mu-flat-button>
            </div>
            <div class="np-more-items" ref="menuMore" v-show="showMoreItems">
              <mu-list style="padding: 0">
                <mu-list-item v-for="(item, i) in prjs" :key="i" :title="item.name" 
                  class="tem-action-item" @click="handleItemClick(item)"/>
                <!-- <mu-divider inset class="temp-action-item-divider"/> -->
              </mu-list>
            </div>
          </div>
          <div class="item inp">
            File Name
            <input class="default-inp" type="text" v-model="setupData.file_name"/>
          </div>
          <div class="item inp" style="display: flex;">
            <div style="width: 50%; padding">
              Width
              <input class="default-inp" v-model="width" spellcheck="false" v-digitsonly type="text"/>
            </div>
            <div class="x">
              <span >x</span> 
            </div>
            <div style="width: 50%;">
              Height
              <input class="default-inp" v-model="height" spellcheck="false" v-digitsonly type="text"/>
            </div>
          </div>
          <div class="item">
          Orientation
          <div class="orient-container">
              <img id="h"
              class="orient-item" src="../../assets/tile_grey.png" 
              style="width: 53px; height: 77px" @click="orientSelected('horizontal', $event)"/> 
              <img id="v"
              class="orient-item" src="../../assets/tile_grey.png" 
              style="vertical-align: top; width:77px; height: 53px" @click="orientSelected('vertical', $event)"/> 
          </div>
          </div>
          <div class="item inp" style="position: relative">
            <!-- Color popup -->
            <div ref="colorPicker" class="color-container" v-show="pickerisShow">
              <color-picker v-model="colors" @input="colorSelected" 
                style="width: 100%; height: 100%; border: 1px solid #4A574B;"></color-picker>
            </div>
            Canvas Background Colour
            <div :style="{backgroundColor: setupData.canvasBackground, color: getInvertedColor(setupData.canvasBackground)}" 
              class="color-div" @click="showPicker">
              <span class="color-value">{{setupData.canvasBackground || '#FFFFFF'}}</span>
            </div>
          </div>
        </div>
        <div class="create-action-buttons">
          <mu-raised-button @click="onCancel" label="Cancel" class="demo-raised-button create-action-buttons-item"
            style="background-color: transparent; border: 1px solid #4B4B4B; text-transform: none"/>
          <br/>
          <mu-raised-button @click="onSubmit" label="Create" class="demo-raised-button create-action-buttons-item" 
          style="margin-top: 10px; background-color: #009D70; text-transform: none"/>
        </div>
      </mu-col>
    </mu-row>
    </div>
    <!-- Dialog -->
    <mu-dialog :open="confirmDialogOpen" title="Project Detail" class="si-p-ha">
      Show Project Detail here
      <br/>
      Continue? or no no?
      <mu-flat-button label="No no" slot="actions" primary @click="confirmDialogOpen = false"/>
       <mu-flat-button label="G" slot="actions" primary @click="onConfirm"/>
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
    this.$el.getElementsByClassName('mu-tab-link-highlight')[0].className = '';
    document.addEventListener('click', this.handleMouseDown);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleMouseDown);
  },
  data() {
    return {
      confirmDialogOpen: false,
      activeTab: '1',
      tabStyle: {'color': '#fff'},
      setupData: {},
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
      ]
    }
  },
  methods: {
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
      console.log('onCancel');
      this.$emit('onCancel');
      this.$router.go(-1)
    },
    onConfirm() {
      this.$router.push({name: 'EditorApp'})
    },
    onSubmit() {
      console.log('onSubmit', this.setupData);
      this.$emit('onSubmit', this.setupData);
      this.confirmDialogOpen = true;
    },
    orientSelected(val, evt) {
      this.setupData.orientation = val;
      if (val === 'horizontal') {
        evt.target.style.border = '2px solid #4A574B';
        document.getElementById('v').style.border = '';
      } else {
         evt.target.style.border = '2px solid #4A574B';
        document.getElementById('h').style.border = '';
      }
    },
    tabChanged(val) {
      this.activeTab = val;
    },
    onItemSelected(item) {
      this.width = item.w;
      this.height = item.h;
      this.$set(this.setupData, 'template', item);
    },
    colorSelected(val) {
      this.setupData.canvasBackground = val.hex;
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
            label: 'Puto Photo',
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
      this.setupData.project_name = item.name;
       this.showMoreItems = false;
    },
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
    margin-left: 20%;
    margin-right: 20%;
    margin-top: 5%;
    border: #323232 solid 1px;
    height: 70vh;
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
    background-color: #181818;
    height: 69.7vh;
  }
  .right-content {
    width: 30%;
    padding: 10px;
    background: #111111;
    height: 69.7vh;
    display: table;
  }
  .tab-item {
    margin-top: 25px;
    margin-left: 10px;
    margin-right: 10px;
  }
  .create-action-buttons {
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
</style>


