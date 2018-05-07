<template>
<div>
  <mu-drawer left :open="true" @close="toggle()" :zDepth="0" class="custom-drawer">
      <mu-list style="padding-top: 0;">
        <mu-list-item afterText="(None)" title="Template Selected" :open="true" :toggleNested="true">
          <mu-list-item slot="nested" :disableRipple="true">
            <select-template :items="[{'id': '1', 'name': 'ej'}, {'id': '2', 'name': 'ej'}]"></select-template>
          </mu-list-item>
        </mu-list-item>
      </mu-list>
      <mu-appbar title="Add New Layer">
        <mu-icon-button class="custom-icon-button" icon="keyboard_arrow_down" slot="left" @click="open()"/>
        <mu-icon-button class="custom-icon-button" icon="keyboard_arrow_up" slot="left" @click="open()"/>
        <mu-icon-button class="custom-icon-button" icon="delete" slot="left"/>
        <mu-icon-menu class="custom-icon-button" icon="add" slot="right" desktop :anchorOrigin="leftBot" :targetOrigin="leftBot" @click.native="open" @close="closeLayer">
            <span class="pop-title" >Add New Layer</span>
            <mu-divider style="margin-left: 10px;" />
            <div class="pop-content">
              <div v-for="(item, i) in buttons"  :key="i" class="content-btn">
              <mu-raised-button  ref="iconbtn"  class="raised-btn"  :icon="item.icon" @hover="shapeSelected = i === 0" />
               <br/>
               <span>{{item.name}}</span> 
              </div>
            </div>
            <mu-divider v-show="shapeSelected"/>
            <mu-menu v-show="shapeSelected" class="pop-content">
              <div class="">
                <!-- <mu-icon-button tooltip="top-center" tooltipPosition="top-center"  icon="stop"/> -->
                <mu-icon-button icon="stop"/>
                <mu-icon-button icon="crop_square"/>
                <mu-icon-button icon="network_cell"/>
                <mu-icon-button icon="signal_cellular_null"/>
                <mu-icon-button icon="lens"/>
                <mu-icon-button icon="panorama_fish_eye"/>
              </div>
            </mu-menu>
        </mu-icon-menu>
      </mu-appbar>
    <mu-list>
      <mu-list-item title="Shape Layer" :open="openpanel">
        <mu-icon slot="left" value="landscape" />
          <mu-icon-button icon="remove_red_eye" slot="right" />
          <mu-icon-button :icon="expandIcon" class="expand-btn" slot="right" @click.native="open"/>
        <mu-list-item value="#/install" slot="nested" title="asdasd"/>
        <mu-list-item value="#/usage" slot="nested" title="asdasdasd"/>
        <mu-list-item value="#/faq" slot="nested" title="s"/>
        
      </mu-list-item>
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
// import {mapMutations, mapGetters, mapState} from 'vuex'
import Expanding from '../../components/Expanding'
import templateSelection from '../../components/template/select-template'
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
      openpanel: false,
      expandIcon: 'expand_more',
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
  mounted () {
    this.trigger = this.$refs.iconbtn
    console.log('trigger:', this.$refs)
    // setTimeout(() => {
    // let targetelem = document.getElementsByClassName('mu-popover')
    //     targetelem[0].style.left = '307px'
    //     targetelem[0].style.top = '116px'
    //     targetelem[0].style.width = '350px'
    //     targetelem[0].style.backgroundColor = '#171616'
    //     targetelem[0].firstElementChild.children[0].style.overflow = 'hidden'
    //     targetelem[0].firstElementChild.children[0].style.width = '350px'
    // },50)
  },
  methods: {
    open (event) {
      console.log('oepn')
      this.openpanel = !this.openpanel
      if(this.openpanel){
        this.expandIcon = 'expand_less'
      }else{
        this.expandIcon = 'expand_more'
      }
      // setTimeout(() => {
      //   let targetelem = document.getElementsByClassName('mu-popover')
      //   targetelem[0].style.left = '307px'
      //   targetelem[0].style.top = '116px'
      //   targetelem[0].style.width = '350px'
      //   targetelem[0].style.backgroundColor = '#171616'
      //   targetelem[0].firstElementChild.children[0].style.overflow = 'hidden'
      //   targetelem[0].firstElementChild.children[0].style.width = '350px'
      // }, 50)
    },
    hoverBtn () {
      console.log('asdasd')
      this.showhover = true;
    },
    closeLayer () {
      console.log('as')
      this.showhover = false;
    }
  }
}
</script>
<style  lang="scss">
@import '../../css/tooltip.scss';
.custom-drawer{
  width: 306px;
  top: 115px;
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
  min-width: 50px ;
  height: 50px ;
  margin: 7px;
  box-shadow: 0 3px 10px rgba(0,0,0,.156863), 0 3px 10px rgba(0,0,0,.227451);
}

.content-btn{
  width: 62px;
  text-align: center;
  margin-left: 4px;

}
.mu-popover {
  left: 307px !important;
    top: 116px !important;
  background-color: #171616;
}
.mu-menu-list{
  width: 350px;
  overflow: hidden;
}
.expansion-panel {
  display: flex;
  flex: wrap;
  justify-content: center;
  list-style-type: none;
  padding: 0;
  text-align: left;
  width: 100%;
  box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
}
.mu-item.show-right {
    background-color: #424242;
    box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
}
.expand-btn{
  margin-right: 45px;
}
.mu-icon-button{
  color: #fff;
}
.mu-paper{
  background-color: #111111;
}
</style>
