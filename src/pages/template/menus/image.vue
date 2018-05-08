<template>
<div class="yawaa activeTool">
    <mu-list-item title="Image Layer" :open="panelopen" @click.stop="open">
          <mu-icon slot="left" value="image" style="color: #fff"/>
          <mu-icon-button icon="remove_red_eye" slot="right" @click.stop="hideLayer"/>
          <mu-icon-button :icon="expandIcon" class="expand-btn" slot="right" @click.stop="open"/>
        <mu-list-item  slot="nested"  class="paddingZero minHytZero">
             <mu-flexbox>
                  <mu-flexbox-item class="flex-container"> 
                      + Drag and Drop
                  </mu-flexbox-item>
             </mu-flexbox>
        </mu-list-item>
        <mu-list-item  slot="nested"  class="paddingZero">
          <div class="gridlist-demo-container">
            <mu-grid-list class="gridlist-demo left">Size Option</mu-grid-list>
            <mu-grid-list class="right">
            <multiselect v-model="value" :options="options" :searchable="false" :close-on-select="true" placeholder="Pick a value"></multiselect>
            </mu-grid-list>
          </div>
        </mu-list-item>
        <mu-list-item  slot="nested" class="paddingZero">
          <div class="gridlist-demo-container" style="margin-top: -7px;">
            <mu-grid-list class="gridlist-demo left">Size</mu-grid-list>
            <mu-grid-list class="right">
              <div class="input-container">
                    <span class="labelSpyker">W:</span>
                    <input spellcheck="false" class="inputSpyker">
                    <mu-icon slot="left" value="link" class="iconSpyker"/>
                    <span class="labelSpyker">H:</span>
                    <input spellcheck="false" class="inputSpyker">
              </div>
            </mu-grid-list>
          </div>
        </mu-list-item>
        <mu-list-item  slot="nested" class="paddingZero">
          <div class="gridlist-demo-container">
            <mu-grid-list class="gridlist-demo left">Opacity</mu-grid-list>
            <mu-grid-list class="right">
            <mu-slider v-model="value1" class="mmslider"/>
            <input spellcheck="false" class="input-size sliderInput">
            </mu-grid-list>
          </div>
        </mu-list-item>
        <mu-list-item  slot="nested" class="paddingZero">
          <div class="gridlist-demo-container">
            <mu-grid-list class="gridlist-demo left">Rotate</mu-grid-list>
            <mu-grid-list class="right">
            <mu-slider v-model="value2" class="mmslider" />
            <input spellcheck="false" class="input-size sliderInput">
            </mu-grid-list>
          </div>
        </mu-list-item>
        <mu-sub-header slot="nested">Border</mu-sub-header>
        <mu-list-item  slot="nested" class="paddingZero demiBlackbg">
          <div class="gridlist-demo-container">
            <mu-grid-list class="gridlist-demo left">Size</mu-grid-list>
            <mu-grid-list class="right">
            <mu-slider v-model="value3" class="mmslider" />
            <input spellcheck="false" class="input-size sliderInput">
            </mu-grid-list>
          </div>
        </mu-list-item>
        <mu-list-item  slot="nested"  class="paddingZero demiBlackbg">
          <div class="gridlist-demo-container">
            <mu-grid-list class="gridlist-demo left">Style</mu-grid-list>
            <mu-grid-list class="right">
            <multiselect v-model="value" :options="options" :searchable="false" :close-on-select="true" placeholder="Pick a value"></multiselect>
            </mu-grid-list>
          </div>
        </mu-list-item>
         <mu-list-item  slot="nested" class="paddingZero demiBlackbg">
          <div class="gridlist-demo-container" style="margin-top: -6px;">
            <mu-grid-list class="gridlist-demo left">Colour</mu-grid-list>
            <mu-grid-list class="right">
            <input spellcheck="false" class="input-size colorPicka">
            <input spellcheck="false" class="input-size sliderInput">
            </mu-grid-list>
          </div>
        </mu-list-item>
        <mu-sub-header slot="nested">Shadow</mu-sub-header>
         <mu-list-item  slot="nested" class="paddingZero demiBlackbg">
          <div class="gridlist-demo-container">
            <mu-grid-list class="gridlist-demo left">Size</mu-grid-list>
            <mu-grid-list class="right">
            <mu-slider v-model="value3" class="mmslider" />
            <input spellcheck="false" class="input-size sliderInput">
            </mu-grid-list>
          </div>
        </mu-list-item>
         <mu-list-item  slot="nested" class="paddingZero demiBlackbg">
          <div class="gridlist-demo-container" style="margin-top: -6px;">
            <mu-grid-list class="gridlist-demo left">Colour</mu-grid-list>
            <mu-grid-list class="right">
            <input spellcheck="false" class="input-size colorPicka">
            <input spellcheck="false" class="input-size sliderInput">
            </mu-grid-list>
          </div>
        </mu-list-item>
        <mu-list-item  slot="nested"  class="paddingZero">
          <div class="gridlist-demo-container">
            <mu-grid-list class="gridlist-demo left">Object-Fit</mu-grid-list>
            <mu-grid-list class="right">
            <multiselect v-model="value" :options="options" :searchable="false" :close-on-select="true" placeholder="Pick a value"></multiselect>
            </mu-grid-list>
          </div>
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
        list: ['阴阳师', '影之刃', '天下HD', '穿越火线', '英雄联盟', '王者荣耀'],
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

