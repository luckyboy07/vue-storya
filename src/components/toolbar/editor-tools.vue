<template>
<mu-appbar class="header-tools editor-tools">
    <mu-flat-button id="btn" class="save-menu-btn" labelPosition="before" 
      label="Save Project" slot="left" icon="keyboard_arrow_down"
      @click="menuOpen = !menuOpen"/>
    <mu-icon-menu icon="" @change="handleChange" 
      :open="menuOpen" @open="menuOpen = true" @close="menuOpen = false">
      <mu-menu-item value="1" title="Save As" />
      <mu-divider inset class="temp-action-item-divider"/>
      <mu-menu-item value="1" title="Save As Template" />
        <mu-divider inset class="temp-action-item-divider"/>
      <mu-menu-item value="1" title="Export As" />
    </mu-icon-menu>
    <!-- start: Project Name -->
    <div class="tool-item tool-item-group" slot="left">
      <div class="tool-item-group-content label-item">Project Name</div> 
      <input value="The Project Name" spellcheck="false" style="width: 248px" class="tool-item-group-content default-inp">
    </div>
    <!-- end: Project Name -->
    <div class="tool-item tool-item-group" slot="left">
       <div class="label-item">Selected Canvas Size</div>
       <div class="tool-item-group-content" style="width: 260px; display: flex">
         <div class="tool-item-group-content" style="width: 106px; display: flex">
            <div class="label-item p-r">W:</div> 
            <input style="width: 100%; text-align: right" class="default-inp"  spellcheck="false" v-digitsonly v-append-unit="'px'" type="text"/>
           </div>
           <div class="tool-item-group-content">
            <div class="label-item">
              <i class="si-link"></i>
            </div>
           </div>
           <div class="tool-item-group-content" style="width: 106px; display: flex;">
            <div class="label-item p-r">H:</div> 
            <input style="width: 100%; text-align: right" class="default-inp" spellcheck="false" v-digitsonly v-append-unit="'px'" type="text"/>
           </div>
       </div>
     </div>
    <div class="tool-item tool-item-group" slot="left">
       <div class="label-item">Zoom</div>
       <div class="tool-item-group-content" style="width: 168px; display: flex">
         <div style="height: 10%!important;">
             <mu-icon-button style="padding: 0">
                <i class="si-zoomout"></i>
              </mu-icon-button>
          </div>
          <div class="tool-item-group-content">
            <input style="width: 100%; text-align: center" class="default-inp" spellcheck="false" v-digitsonly v-append-unit="'%'" type="text"/>
          </div>
          <div class="" style="">
            <mu-icon-button style="padding: 0; height: 67%">
              <i class="si-zoomin"></i>
            </mu-icon-button>
          </div>
       </div>
     </div>
    <mu-flat-button labelPosition="before" icon="add" style="text-transform: none; background-color: #222222; margin-right: 20px; height: 70%" slot="right" label="Add Canvas" class="demo-flat-button"/>
  </mu-appbar>
</template>
<script>
import customMenu from '../menus/custom-menu'
export default {
  name: 'editor-tools',
  components: {
    'custom-menu':customMenu
  },
  data() {
    return {
      value: '3',
      saveMenu: null,
      menuOpen: false
    }
  },
  methods: {
    handleChange(val) {
      this.value = val;
    }
  }
}
</script>
<style scoped>
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
</style>

