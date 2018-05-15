<template>
  <div class="yawaa">
   <mu-list-item title="Text Layer" :open="panelopen" @click.stop="open">
        <mu-icon slot="left" value="text_fields" style="color: #fff"/>
        <mu-icon-button icon="remove_red_eye" slot="right" />
        <mu-icon-button :icon="expandIcon" class="expand-btn" slot="right" @click.stop="open"/>
        <mu-list-item  slot="nested"  class="paddingZero">
                <div class="gridlist-demo-container">
                <mu-grid-list class="gridlist-demo left">Font</mu-grid-list>
                <mu-grid-list class="right">
                <multiselect ref="fontsSelection" v-model="data.attributes.fontFamily" :options="availableFonts" :searchable="false" 
                  open-direction="bottom" :close-on-select="true" 
                  :style="{fontFamily: data.attributes.fontFamily}" @blur.native="updateFont">
                </multiselect>
                </mu-grid-list>
                </div>
        </mu-list-item>
        <mu-list-item  slot="nested"  class="paddingZero">
                <div class="gridlist-demo-container">
                <mu-grid-list class="gridlist-demo left"></mu-grid-list>
                <mu-grid-list class="right">
                <div class="input-container">
                    <input class="input-size optionInput" v-digitsonly v-append-unit="'px'"
                      v-model="data.attributes.fontSize" @keyup.enter="apply('fontSize', $event)" @blur="apply('fontSize', $event)">
                    <mu-flat-button class=" csFlatBtn" icon="format_bold" 
                      slot="right" :class="[data.attributes.fontWeight === 'bold' ? 'ctrl-active' : '']"
                      @click.stop="handleFontWeight()"/>
                    <mu-flat-button class=" csFlatBtn" icon="format_italic" 
                      slot="right" :class="[data.attributes.fontStyle === 'italic' ? 'ctrl-active' : '']"
                      @click.stop="handleFontStyle()"/>
                    <mu-flat-button class=" csFlatBtn" icon="format_underlined" 
                      slot="right" :class="[data.attributes.textDecoration === 'underline' ? 'ctrl-active' : '']"
                      @click="handleTextDecoration()"/>
               </div>
                </mu-grid-list>
                </div>
        </mu-list-item>
         <mu-list-item  slot="nested" class="paddingZero nestedBtnGroup">
             <div class="input-container limitGroupBtn">
                <mu-flat-button slot="left" class=" csFlatBtn" icon="format_align_left" 
                  :class="[this.data.attributes.textAlign === 'left' ? 'ctrl-active' : '']" @click="handleTextAlign('left')"/>
                <mu-flat-button slot="left" class=" csFlatBtn" icon="format_align_center" 
                  :class="[this.data.attributes.textAlign === 'center' ? 'ctrl-active' : '']" @click="handleTextAlign('center')"/>
                <mu-flat-button slot="left" class=" csFlatBtn" icon="format_align_right" 
                  :class="[this.data.attributes.textAlign === 'right' ? 'ctrl-active' : '']" @click="handleTextAlign('right')"/>
                <mu-flat-button slot="left" class=" csFlatBtn" icon="format_align_justify" 
                  :class="[this.data.attributes.textAlign === 'justify' ? 'ctrl-active' : '']" @click="handleTextAlign('justify')"/>
                <span class="groupBtnR">
                <mu-flat-button class=" csFlatBtn" icon="format_list_numbered" slot="right"/>
                <mu-flat-button class=" csFlatBtn" icon="format_list_bulleted" slot="right"/>
              </span>
            </div>
         </mu-list-item>
        <mu-list-item  slot="nested"  class="paddingZero">
                <div class="gridlist-demo-container">
                <mu-grid-list class="gridlist-demo left">Line Height</mu-grid-list>
                <mu-grid-list class="right">
                <!-- <multiselect v-model="value" :options="options" :searchable="false" open-direction="bottom" :close-on-select="true" placeholder="Pick a value"></multiselect> -->
                  <input spellcheck="false" class="default-inp inp-ctrl-digits" style="margin-top: 0" v-digitsonly
                    v-append-unit="'px'" :value="data.attributes.lineHeight" @blur="handleLineHeight($event)" @keyup.enter="handleLineHeight($event)">
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
                <mu-slider v-model="data.attributes.borderSize" class="mmslider" />
                <input disabled v-model="data.attributes.borderSize" spellcheck="false" class="input-size sliderInput">
                </mu-grid-list>
              </div>
            </mu-list-item>
            <mu-list-item  slot="nested"  class="paddingZero demiBlackbg">
              <div class="gridlist-demo-container">
                <mu-grid-list class="gridlist-demo left">Style</mu-grid-list>
                <mu-grid-list class="right">
                <multiselect v-model="data.attributes.borderStyle" :options="['Solid', 'Dotted', 'Dashed']" :searchable="false" :close-on-select="true" placeholder="Pick a value"></multiselect>
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
import fontHelper from '../../../helpers/fonts.helper.js'
import {mapMutations} from 'vuex'
export default {
  name: 'TextLayer',
  props: ['data', 'openpanel'],
  beforeMount() {
    this.attrs = this.data.attributes;
  },
  mounted() {
    // assigning fonts
    for (var i = 0; i < this.$refs.fontsSelection.$el.children.length; i++) {
      if (this.$refs.fontsSelection.$el.children[i].className === 'multiselect__content-wrapper') {
       var ul = this.$refs.fontsSelection.$el.children[i].children[0];
       for (var j = 0; j < ul.children.length; j++) {
         ul.children[j].style.fontFamily = this.availableFonts[j];
       }
      }
    }
  },
  data () {
      return {
        attrs: null,
        expandIcon: 'expand_more',
        value: '',
        value1: '',
        value3: '',
        options:['Manual','Automatic','test','TEst 2']
      }
  },
  methods: {
    ...mapMutations(['setLayerValue']),
    open (event) {
      this.panelopen = !this.panelopen
      this.$emit('openpanel',this.panelopen)
      if(this.panelopen) {
          this.expandIcon = 'expand_less'
      } else {
          this.expandIcon = 'expand_more'
      }
    },
    updateFont() {
      //console.log(this.data.attributes.fontFamily);
    },
    handleFontWeight() {
      this.data.attributes.fontWeight = this.data.attributes.fontWeight === "bold" ? "normal" : "bold";
    },
    handleFontStyle() {
      this.data.attributes.fontStyle = this.data.attributes.fontStyle === "italic" ? "normal" : "italic";
      console.log(this.data.attributes.fontWeight )
    },
    handleTextDecoration() {
       this.data.attributes.textDecoration = this.data.attributes.textDecoration === "underline" ? "none" : "underline";
    },
    handleTextAlign(val) {
      this.data.attributes.textAlign = val;
    },
    handleLineHeight(evt) {
      var val = evt.target.value;
      if (!val) {
        return;
      }
      val = val.indexOf('px') !== -1 ? val : val + 'px';
      this.data.attributes.lineHeight = val;
    },
  },
  created () {
    this.panelopen = true
    this.availableFonts = fontHelper.getFonts();
  }
}
</script>
<style scoped>
@import './menu.css';
.mu-item{
    background-color: rgba(197, 194, 194, 0.09) !important;
}
select {
  background-color: #333;
  color: white;
  width: 100%;
  margin: -2px;
  border: none;
}
.ctrl-active {
  background-color: #333;
}
.inp-ctrl-digits {
  text-align: right;
}
</style>


