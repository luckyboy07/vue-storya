<template>
<div>
  <mu-drawer left :open="true" @close="toggle()" :zDepth="0" class="custom-drawer">
      <mu-appbar title="Add New Layer">
        <mu-icon-button class="custom-icon-button" icon="keyboard_arrow_down" slot="left"/>
        <mu-icon-button class="custom-icon-button" icon="keyboard_arrow_up" slot="left"/>
        <mu-icon-button class="custom-icon-button" icon="delete" slot="left"/>
        <mu-icon-menu class="custom-icon-button" icon="add" slot="right" desktop :anchorOrigin="leftBot" :targetOrigin="leftBot" @close="closeLayer">
            <span class="pop-title" >Add New Layer</span>
            <mu-divider style="margin-left: 10px;" />
            <div class="pop-content">
              <div v-for="(item, i) in buttons"  :key="i" class="content-btn">
              <mu-raised-button  ref="iconbtn"  class="raised-btn"  :icon="item.icon" @hover="shapeSelected = i === 0" />
               <br>
               <span >{{item.name}}</span> 
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
     <image-layer/>
     <shape-layer/>
     <shape-svg-layer/>
     <text-layer/>
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
    Expanding
  },
  mounted () {
    this.trigger = this.$refs.iconbtn
    console.log('trigger:', this.$refs)
    let targetelem = document.getElementsByClassName('mu-item-wrapper')
    console.log('targetelem',targetelem[0])
    // NEED FOUR LOOP
    targetelem[0].style.backgroundColor = 'rgba(115, 111, 111, 0.37)'
    targetelem[0].style.borderTop = '1px solid hsla(0,0%,100%,.12)'
    targetelem[1].style.backgroundColor = 'rgba(115, 111, 111, 0.37)'
    targetelem[1].style.borderTop = '1px solid hsla(0,0%,100%,.12)'
    targetelem[2].style.backgroundColor = 'rgba(115, 111, 111, 0.37)'
    targetelem[2].style.borderTop = '1px solid hsla(0,0%,100%,.12)'
    targetelem[3].style.backgroundColor = 'rgba(115, 111, 111, 0.37)'
    targetelem[3].style.borderTop = '1px solid hsla(0,0%,100%,.12)'
  },
  methods: {
    hoverBtn () {
      this.showhover = true
    },
    closeLayer () {
      console.log('as')
      this.showhover = false
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

.mu-paper{
  background-color: #111111;
}

</style>
