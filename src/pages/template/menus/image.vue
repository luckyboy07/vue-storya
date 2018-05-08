<template>
<div>
    <mu-list-item title="Image Layer" :open="panelopen" @click.stop="open">
          <mu-icon slot="left" value="image" style="color: #fff"/>
          <mu-icon-button icon="remove_red_eye" slot="right" @click.stop="hideLayer"/>
          <mu-icon-button :icon="expandIcon" class="expand-btn" slot="right" @click.stop="open"/>
        <mu-list-item  slot="nested">
             <mu-flexbox>
                  <mu-flexbox-item class="flex-container"> 
                      + Drag and Drop
                  </mu-flexbox-item>
             </mu-flexbox>
        </mu-list-item>
        <mu-list-item  slot="nested">
            <span>Size</span>
                <div class="input-container" slot="right">
                    <span style="color: #fff;margin-right: 10px;">W:</span>
                    <input spellcheck="false"  class="input-size">
                    <span style="color: #fff;margin-right: 10px;">H:</span>
                    <input spellcheck="false" class="input-size">
                </div>
        </mu-list-item>
        <mu-list-item  slot="nested">
            <span>Opacity</span>
            <mu-slider v-model="value1" style="width: 53%;"/>
            <input spellcheck="false" slot="right" class="input-size">
        </mu-list-item>
          <mu-list-item  slot="nested">
            <span>Rotate</span>
            <mu-slider v-model="value1" style="width: 53%;"/>
            <input spellcheck="false" slot="right" class="input-size">
        </mu-list-item>
        <mu-sub-header slot="nested">Border</mu-sub-header>
        <mu-list-item  slot="nested">
            <span>Size</span>
            <mu-slider v-model="value1" style="width: 53%;"/>
            <input spellcheck="false" slot="right" class="input-size">
        </mu-list-item>
        <mu-list-item  slot="nested">
            <span>Style</span>
            <multiselect v-model="value" :options="options" :searchable="false" :close-on-select="true" placeholder="Pick a value"></multiselect>
        </mu-list-item>
        <mu-list-item  slot="nested">
            <span>Colour</span>
             <input spellcheck="false" class="secondary-input">
             <span class="square" slot="right"></span>
        </mu-list-item>
        <mu-sub-header slot="nested">Shadow</mu-sub-header>
         <mu-list-item  slot="nested">
            <span>Size</span>
            <mu-slider v-model="value1" style="width: 53%;"/>
            <input spellcheck="false" slot="right" class="input-size">
        </mu-list-item>
         <mu-list-item  slot="nested">
            <span>Colour</span>
             <input spellcheck="false" class="secondary-input">
             <span class="square" slot="right"></span>
        </mu-list-item>
         <mu-list-item  slot="nested">
            <span>Object-fit</span>
            <multiselect v-model="value" :options="options" :searchable="false" :close-on-select="true" placeholder="Pick a value"></multiselect>
        </mu-list-item>
    </mu-list-item>
</div>
</template>
<script>
export default {
  name: 'ImageLayer',
  props:['openpanel'],
  data (){
      return {
        expandIcon: 'expand_more',
        value: '',
        value1:0,
        value2: null,
        options: ['Select option', 'options', 'selected', 'mulitple', 'label', 'searchable', 'clearOnSelect', 'hideSelected', 'maxHeight', 'allowEmpty', 'showLabels', 'onChange', 'touched']
      }
  },
  mounted (){
    //    setTimeout(() => {
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
      this.panelopen = !this.panelopen
      this.$emit('openpanel',this.panelopen)
      if(this.panelopen){
        this.expandIcon = 'expand_less'
      }else{
        this.expandIcon = 'expand_more'
      }
    },
    hideLayer (){
        console.log('HIDE')
    }
  },
  created () {
      this.panelopen = this.openpanel
  }
}
</script>
<style scoped>
@import './menu.css';
</style>

