<template>
  <div class="yawaa">
        <mu-list-item title="Shape Layer" :open="openpanel">
             <mu-icon slot="left" value="landscape" style="color: #fff"/>
             <mu-icon-button icon="remove_red_eye" slot="right" />
             <mu-icon-button :icon="expandIcon" class="expand-btn" slot="right" @click.native="open"/>
        
            <mu-list-item  slot="nested"  class="paddingZero">
                <div class="gridlist-demo-container">
                <mu-grid-list class="gridlist-demo left">Size Option</mu-grid-list>
                <mu-grid-list class="right">
                <multiselect v-model="value" :options="options" :searchable="false" open-direction="bottom" :close-on-select="true" placeholder="Pick a value"></multiselect>
                </mu-grid-list>
                </div>
            </mu-list-item>
            <mu-list-item  slot="nested" class="paddingZero">
                <div class="gridlist-demo-container" style="margin-top: -7px;">
                <mu-grid-list class="gridlist-demo left">Size</mu-grid-list>
                <mu-grid-list class="right" style="margin-left: 2px;">
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
            <mu-list-item  slot="nested" class="paddingZero">
              <div class="gridlist-demo-container" style="margin-top: -6px;">
                <mu-grid-list class="gridlist-demo left">Colour</mu-grid-list>
                <mu-grid-list class="right">
                <input spellcheck="false" class="input-size colorPicka">
                <input spellcheck="false" class="input-size sliderInput" style="background-color:white">
                </mu-grid-list>
              </div>
            </mu-list-item>
            <mu-sub-header slot="nested">Gradient Background</mu-sub-header>
            <mu-list-item  slot="nested" class="paddingZero demiBlackbg">
              <div class="gridlist-demo-container" style="margin-top: -6px;">
                <mu-grid-list class="gridlist-demo left" style="padding: 2px 8px !important;line-height: 15px;">Selected Position</mu-grid-list>
                <mu-grid-list class="right">
                <input spellcheck="false" class="input-size colorPicka" style="pointer-events: none;
                    background: transparent;">
                <input spellcheck="false" class="input-size sliderInput">
                </mu-grid-list>
              </div>
            </mu-list-item>
             <mu-list-item  slot="nested" class="paddingZero demiBlackbg">
              <div class="gridlist-demo-container" style="margin-top: -6px;">
                <mu-grid-list class="gridlist-demo left" style="padding: 2px 8px !important;line-height: 15px;">Selected Colour</mu-grid-list>
                <mu-grid-list class="right">
                <input spellcheck="false" class="input-size colorPicka">
                <input spellcheck="false" class="input-size sliderInput" style="background-color:white">
                </mu-grid-list>
              </div>
            </mu-list-item>
            <mu-list-item  slot="nested" class="paddingZero demiBlackbg">
              <div class="gridlist-demo-container">
                <mu-grid-list class="gridlist-demo left">Rotate</mu-grid-list>
                <mu-grid-list class="right">
                <mu-slider v-model="value3" class="mmslider" />
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
                <input spellcheck="false" class="input-size sliderInput" style="background-color:white">
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
                <input spellcheck="false" class="input-size sliderInput" style="background-color:white">
                </mu-grid-list>
              </div>
            </mu-list-item>
            <mu-sub-header slot="nested">Background Image</mu-sub-header>
            <mu-list-item  slot="nested"  class="paddingZero minHytZero">
             <mu-flexbox>
                  <mu-flexbox-item class="flex-container"> 
                      + Drag and Drop
                  </mu-flexbox-item>
             </mu-flexbox>
            </mu-list-item>
            <mu-list-item  slot="nested" class="paddingZero demiBlackbg">
              <div class="gridlist-demo-container" style="margin-top: -6px;">
                <mu-grid-list class="gridlist-demo left">URL</mu-grid-list>
                <mu-grid-list class="right">
                <input spellcheck="false" class="input-size colorPicka" style="width: 205px !important;
                    margin-right: 0 !important;">
                </mu-grid-list>
              </div>
            </mu-list-item>
           <mu-list-item  slot="nested"  class="paddingZero demiBlackbg">
              <div class="gridlist-demo-container">
                <mu-grid-list class="gridlist-demo left">Repeat</mu-grid-list>
                <mu-grid-list class="right">
                <multiselect v-model="value" :options="options" :searchable="false" :close-on-select="true" placeholder="Pick a value"></multiselect>
                </mu-grid-list>
              </div>
            </mu-list-item>
            <mu-list-item  slot="nested"  class="paddingZero demiBlackbg">
              <div class="gridlist-demo-container">
                <mu-grid-list class="gridlist-demo left">Position</mu-grid-list>
                <mu-grid-list class="right">
                <multiselect v-model="value" :options="options" :searchable="false" :close-on-select="true" placeholder="Pick a value"></multiselect>
                </mu-grid-list>
              </div>
            </mu-list-item>
            <mu-list-item  slot="nested"  class="paddingZero demiBlackbg">
              <div class="gridlist-demo-container">
                <mu-grid-list class="gridlist-demo left">Attachment</mu-grid-list>
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
  name: 'ShapeLayer',
  props:['openpanel'],
  data () {
      return {
         expandIcon: 'expand_more',
         value: '',
         value1: '',
         options:['Manual','Automatic','test','TEst 2']
      }
  },
  methods: {
      open (event) {
        this.openpanel = !this.openpanel
        if(this.openpanel){
            this.expandIcon = 'expand_less'
        }else{
            this.expandIcon = 'expand_more'
        }
    }
  }
}
</script>
<style scoped>
@import './menu.css';
</style>


