<template>
  <div class="yawaa">
   <mu-list-item title="Text Layer" :open="openpanel">
        <mu-icon slot="left" value="text_fields" style="color: #fff"/>
        <mu-icon-button icon="remove_red_eye" slot="right" />
        <mu-icon-button :icon="expandIcon" class="expand-btn" slot="right" @click.native="open"/>
        <mu-list-item  slot="nested"  class="paddingZero">
                <div class="gridlist-demo-container">
                <mu-grid-list class="gridlist-demo left">Font</mu-grid-list>
                <mu-grid-list class="right">
                <multiselect v-model="value" :options="options" :searchable="false" open-direction="bottom" :close-on-select="true" placeholder="Pick a value"></multiselect>
                </mu-grid-list>
                </div>
        </mu-list-item>
        <mu-list-item  slot="nested"  class="paddingZero">
                <div class="gridlist-demo-container">
                <mu-grid-list class="gridlist-demo left"></mu-grid-list>
                <mu-grid-list class="right">
                <div class="input-container">
                    <input class="input-size optionInput">
                    <mu-flat-button class="demo-flat-button csFlatBtn" icon="format_bold" slot="right"/>
                    <mu-flat-button class="demo-flat-button csFlatBtn" icon="format_italic" slot="right"/>
                    <mu-flat-button class="demo-flat-button csFlatBtn" icon="format_underlined" slot="right"/>
               </div>
                </mu-grid-list>
                </div>
        </mu-list-item>
         <mu-list-item  slot="nested" class="paddingZero nestedBtnGroup">
             <div class="input-container limitGroupBtn">
                <mu-flat-button slot="left" class="demo-flat-button csFlatBtn" icon="format_align_left"/>
                <mu-flat-button slot="left" class="demo-flat-button csFlatBtn" icon="format_align_center"/>
                <mu-flat-button slot="left" class="demo-flat-button csFlatBtn" icon="format_align_right"/>
                <mu-flat-button slot="left" class="demo-flat-button csFlatBtn" icon="format_align_justify"/>
                <span class="groupBtnR">
                <mu-flat-button class="demo-flat-button csFlatBtn" icon="format_list_numbered" slot="right"/>
                <mu-flat-button class="demo-flat-button csFlatBtn" icon="format_list_bulleted" slot="right"/>
              </span>
            </div>
         </mu-list-item>
        <mu-list-item  slot="nested"  class="paddingZero">
                <div class="gridlist-demo-container">
                <mu-grid-list class="gridlist-demo left">Line Height</mu-grid-list>
                <mu-grid-list class="right">
                <multiselect v-model="value" :options="options" :searchable="false" open-direction="bottom" :close-on-select="true" placeholder="Pick a value"></multiselect>
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
        <mu-list-item  slot="nested" class="paddingZero">
              <div class="gridlist-demo-container" style="margin-top: -6px;">
                <mu-grid-list class="gridlist-demo left">Background</mu-grid-list>
                <mu-grid-list class="right">
                <input spellcheck="false" class="input-size colorPicka">
                <input spellcheck="false" class="input-size sliderInput" style="background-color:white">
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
            <mu-sub-header slot="nested">Text Shadow</mu-sub-header>
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
   </mu-list-item>
 </div>
</template>
<script>
export default {
  name: 'TextLayer',
  data () {
      return {
        openpanel: false,
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
.mu-item{
    background-color: rgba(197, 194, 194, 0.09) !important;
}
</style>


