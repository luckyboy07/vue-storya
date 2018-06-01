<template>
  <div class="yawaa" :class="data.selected ? 'activeTool': ''">
   <mu-list-item :title="getTextContent() || 'Text Layer'" 
    :open="data.selected"
     @click.stop="open">
        <mu-icon slot="left" value="text_fields" style="color: #fff"/>
        <mu-icon-button :icon="data.islocked ? 'lock' : 'lock_open'" slot="right" @click="lockLayer($event)"/>
        <mu-icon-button :icon="data.visible ? 'visibility' : 'visibility_off'" slot="right" @click.stop="toggleLayer()"/>
        <mu-icon-button :icon="data.selected ? 'expand_less' : 'expand_more'" class="expand-btn" slot="right" @click.stop="open"/>
        <mu-list-item  slot="nested" class="paddingZero" v-no-ripple>
          <div class="gridlist-demo-container">
            <mu-grid-list class="gridlist-demo left">Opacity</mu-grid-list>
            <mu-grid-list class="right">
            <mu-slider v-model="data.attributes.opacity" class="mmslider" :max="1"/>
            <input spellcheck="false" class="input-size sliderInput" v-model="data.attributes.opacity">
            </mu-grid-list>
          </div>
        </mu-list-item>
        <mu-list-item  slot="nested" class="paddingZero" v-no-ripple>
          <div class="gridlist-demo-container">
            <mu-grid-list class="gridlist-demo left">Rotate</mu-grid-list>
            <mu-grid-list class="right">
            <mu-slider v-model="data.attributes.rotation" class="mmslider" :max="360"/>
            <input spellcheck="false" class="input-size sliderInput" v-model="data.attributes.rotation" v-digitsonly>
            </mu-grid-list>
          </div>
        </mu-list-item>
        <mu-list-item  slot="nested"  class="paddingZero" v-no-ripple>
          <div class="gridlist-demo-container">
            <mu-grid-list class="gridlist-demo left">Font</mu-grid-list>
            <mu-grid-list class="right">
              <multiselect id="fontStyle" ref="fontsSelection" v-model="data.attributes.fontFamily" :options="availableFonts" :searchable="false" 
                open-direction="bottom" :close-on-select="true" :style="{fontFamily: data.attributes.fontFamily}"
                @blur.native="revertFont">
              </multiselect>
            </mu-grid-list>
          </div>
        </mu-list-item>
        <mu-list-item slot="nested" class="paddingZero" v-no-ripple>
                <div class="gridlist-demo-container">
                <mu-grid-list class="gridlist-demo left"></mu-grid-list>
                <mu-grid-list class="right">
                <div class="input-container">
                    <input class="input-size optionInput" v-digitsonly
                      v-model="data.attributes.fontSize">
                    <mu-flat-button class="csFlatBtn" icon="format_bold" 
                      slot="right" :class="[data.attributes.fontWeight === 'bold' ? 'ctrl-active' : '']"
                      @click.stop="handleFontWeight()"/>
                    <mu-flat-button class="csFlatBtn" icon="format_italic" 
                      slot="right" :class="[data.attributes.fontStyle === 'italic' ? 'ctrl-active' : '']"
                      @click.stop="handleFontStyle()"/>
                    <mu-flat-button class="csFlatBtn" icon="format_underlined" 
                      slot="right" :class="[data.attributes.textDecoration === 'underline' ? 'ctrl-active' : '']"
                      @click="handleTextDecoration()"/>
               </div>
                </mu-grid-list>
                </div>
        </mu-list-item>
         <mu-list-item  slot="nested" class="paddingZero nestedBtnGroup" v-no-ripple>
             <div class="input-container limitGroupBtn">
                <mu-flat-button slot="left" class="csFlatBtn" icon="format_align_left" 
                  :class="[this.data.attributes.textAlign === 'left' ? 'ctrl-active' : '']" @click="handleTextAlign('left')"/>
                <mu-flat-button slot="left" class="csFlatBtn" icon="format_align_center" 
                  :class="[this.data.attributes.textAlign === 'center' ? 'ctrl-active' : '']" @click="handleTextAlign('center')"/>
                <mu-flat-button slot="left" class="csFlatBtn" icon="format_align_right" 
                  :class="[this.data.attributes.textAlign === 'right' ? 'ctrl-active' : '']" @click="handleTextAlign('right')"/>
                <mu-flat-button slot="left" class="csFlatBtn" icon="format_align_justify" 
                  :class="[this.data.attributes.textAlign === 'justify' ? 'ctrl-active' : '']" @click="handleTextAlign('justify')"/>
                <span class="groupBtnR">
                <mu-flat-button class="csFlatBtn" icon="format_list_numbered" slot="right" 
                  :class="[this.data.attributes.listStyle === 'ol' ? 'ctrl-active' : '']" @click="data.attributes.listStyle = data.attributes.listStyle === 'ol' ? 'block' : 'ol'"/>
                <mu-flat-button class="csFlatBtn" icon="format_list_bulleted" slot="right" 
                :class="[this.data.attributes.listStyle === 'ul' ? 'ctrl-active' : '']" @click="data.attributes.listStyle = data.attributes.listStyle === 'ul' ? 'block' : 'ul'"/>
              </span>
            </div>
         </mu-list-item>
        <mu-list-item slot="nested" class="paddingZero" v-no-ripple>
                <div class="gridlist-demo-container">
                <mu-grid-list class="gridlist-demo left">Line Height</mu-grid-list>
                <mu-grid-list class="right">
                <!-- <multiselect v-model="value" :options="options" :searchable="false" open-direction="bottom" :close-on-select="true" placeholder="Pick a value"></multiselect> -->
                  <!-- <input spellcheck="false" class="default-inp inp-ctrl-digits" style="margin-top: 0" v-digitsonly
                    v-append-unit="'px'" v-model="data.attributes.lineHeight" @blur="handleLineHeight($event)" @keyup.enter="handleLineHeight($event)"> -->
                    <mu-slider :max="50" v-model="data.attributes.lineHeight" class="mmslider" />
                    <input disabled v-model="data.attributes.lineHeight" spellcheck="false" class="input-size sliderInput">
                </mu-grid-list>
                </div>
        </mu-list-item>
        <mu-list-item  slot="nested" class="paddingZero" v-no-ripple >
          <div class="gridlist-demo-container" style="margin-top: -6px;">
            <mu-grid-list class="gridlist-demo left">Colour</mu-grid-list>
            <mu-grid-list class="right">
            <input disabled spellcheck="false" :value="data.attributes.color" class="input-size colorPicka">
            <input  spellcheck="false" class="input-size sliderInput" :style="{backgroundColor: data.attributes.color}" @click="showPicker($event, '')">
            </mu-grid-list>
          </div>
          <!-- <div ref="foregroundColor" v-show="selectedPicker === 'foregroundColor'" class="item-color-picker">
            <color-picker v-model="colors" @input="colorSelected" 
              style="width: 100%; height: 100%; border: 1px solid #4A574B;"></color-picker>
          </div> -->
        </mu-list-item>  
        <mu-list-item  slot="nested" class="paddingZero" v-no-ripple @click="showPicker('backgroundColor')">
          <div class="gridlist-demo-container" style="margin-top: -6px;">
            <mu-grid-list class="gridlist-demo left">Background</mu-grid-list>
            <mu-grid-list class="right">
            <input disabled spellcheck="false" :value="data.attributes.backgroundColor" class="input-size colorPicka">
            <input disabled spellcheck="false" class="input-size sliderInput" :style="{backgroundColor:data.attributes.backgroundColor}">
            </mu-grid-list>
          </div>
          <div ref="backgroundColor" v-show="selectedPicker === 'backgroundColor'" class="item-color-picker">
            <color-picker v-model="colors" @input="colorSelected" 
              style="width: 100%; height: 100%; border: 1px solid #4A574B;"></color-picker>
          </div>
        </mu-list-item>  
        <mu-sub-header slot="nested">Border</mu-sub-header>
            <mu-list-item  slot="nested" class="paddingZero demiBlackbg" v-no-ripple>
              <div class="gridlist-demo-container">
                <mu-grid-list class="gridlist-demo left">Size</mu-grid-list>
                <mu-grid-list class="right">
                  <mu-slider v-model="data.attributes.borderSize" class="mmslider" />
                  <input disabled v-model="data.attributes.borderSize" spellcheck="false" class="input-size sliderInput">
                </mu-grid-list>
              </div>
            </mu-list-item>
            <mu-list-item  slot="nested"  class="paddingZero demiBlackbg" v-no-ripple>
              <div class="gridlist-demo-container">
                <mu-grid-list class="gridlist-demo left">Style</mu-grid-list>
                <mu-grid-list class="right">
                <multiselect v-model="data.attributes.borderStyle" :options="['Solid', 'Dotted', 'Dashed']" :searchable="false" :close-on-select="true" placeholder="Pick a value"></multiselect>
                </mu-grid-list>
              </div>
            </mu-list-item>
            <mu-list-item  slot="nested" class="paddingZero demiBlackbg" v-no-ripple>
              <div class="gridlist-demo-container" style="margin-top: -6px;">
                <mu-grid-list class="gridlist-demo left">Colour</mu-grid-list>
                <mu-grid-list class="right">
                <input disabled :value="data.attributes.borderColor" spellcheck="false" class="input-size colorPicka">
                <input  spellcheck="false" class="input-size sliderInput" :style="{backgroundColor:data.attributes.borderColor}"  @click="showPicker($event,'border')">
                </mu-grid-list>
              </div>
              <div ref="borderColor" v-show="selectedPicker === 'borderColor'" class="item-color-picker">
                <color-picker v-model="colors" @input="colorSelected" 
                  style="width: 100%; height: 100%; border: 1px solid #4A574B;"></color-picker>
              </div>
            </mu-list-item>
            <mu-sub-header slot="nested">Text Shadow</mu-sub-header>
            <mu-list-item  slot="nested" class="paddingZero demiBlackbg" v-no-ripple>
              <div class="gridlist-demo-container">
                <mu-grid-list class="gridlist-demo left">Size</mu-grid-list>
                <mu-grid-list class="right">
                <mu-slider v-model="data.attributes.shadowSize" :max="100" class="mmslider" />
                <input disabled :value="data.attributes.shadowSize" spellcheck="false" class="input-size sliderInput">
                </mu-grid-list>
              </div>
            </mu-list-item>
             <mu-list-item  slot="nested" class="paddingZero demiBlackbg" v-no-ripple>
              <div class="gridlist-demo-container" style="margin-top: -6px;">
                <mu-grid-list class="gridlist-demo left">Colour</mu-grid-list>
                <mu-grid-list class="right">
                <input disabled :value="data.attributes.shadowColor" spellcheck="false" class="input-size colorPicka">
                <input  spellcheck="false" class="input-size sliderInput" :style="{backgroundColor:data.attributes.shadowColor}"  @click="showPicker($event,'shadow')">
                </mu-grid-list>
              </div>
              <div ref="shadowColor" v-show="selectedPicker === 'shadowColor'" class="item-color-picker">
                <color-picker v-model="colors" @input="colorSelected" 
                  style="width: 100%; height: 100%; border: 1px solid #4A574B;"></color-picker>
              </div>
            </mu-list-item>
   </mu-list-item>
 </div>
</template>
<script>
import fontHelper from '../../../helpers/fonts.helper.js'
import { Photoshop, Chrome } from "vue-color";
import {mapMutations, mapGetters} from 'vuex'
export default {
  name: 'TextLayer',
  props: ['data', 'openpanel'],
  components: {
    "photoshop-picker": Photoshop,
    "color-picker": Chrome,
  },
  beforeMount() {
    this.attrs = this.data.attributes;
    this.availableFonts = fontHelper.getFonts();
    // for the color picker to hide
    document.addEventListener('mousedown', this.hidePicker);
  },
  beforeDestroy() {
    document.removeEventListener('mousedown', this.hidePicker);
    // destroying font styles hover event
    // var p = this.$el.querySelector('#fontStyle').parentElement.parentElement;
    //   for (var i = 0; i < p.children.length; i++) {
    //     if (p.children[i].className === 'multiselect__content-wrapper') {
    //       var ul = p.children[i].children[0];
    //       for (var j = 0; j < ul.children.length; j++) {
    //         // ul.children[j].removeEventListener('mouseover', this.previewFont);
    //         // ul.children[j].removeEventListener('click', this.setFontSelection);
    //       }
    //     }
    //   }
  },
  mounted() {
    this.originalFont = this.data.attributes.fontFamily;
    this.$_setFonts();

    // for the context menu to show only on the title part
    this.$el.querySelector(".mu-item-wrapper").addEventListener('contextmenu', this.showMenu)
  },
  updated() {
    this.$_setFonts()
  },
  data () {
      return {
        selectedPicker: '',
        originalFont: '',
        colors: {
          hex: '#194d33',
          hsl: { h: 150, s: 0.5, l: 0.2, a: 1 },
          hsv: { h: 150, s: 0.66, v: 0.30, a: 1 },
          rgba: { r: 25, g: 77, b: 51, a: 1 },
          a: 1
        },
        attrs: null,
        value: '',
        value1: '',
        value3: '',
        options:['Manual','Automatic','test','TEst 2']
      }
  },
  computed: {
    ...mapGetters(['getLayers'])
    
  },
  methods: {
    ...mapMutations(['setLayerValue','setSelectedLayerId']),
    open (event) {
      if (this.data.islocked)return;
       for(let i = 0; i < this.getLayers.length;i++){
          if (this.getLayers[i].id === this.data.id) {
            this.data.selected = !this.data.selected;
          this.setSelectedLayerId(this.data.id)
          }else {
              this.getLayers[i].selected = false
          }
       }
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
    handleListStyle(val) {

    },
     colorSelected(val) {
      if (this.selectedPicker === 'foregroundColor') {
        this.data.attributes.color = val.hex;
      } else if (this.selectedPicker === 'backgroundColor') {
        this.data.attributes.backgroundColor = val.hex;
      } else if (this.selectedPicker === 'borderColor') {
        this.data.attributes.borderColor = val.hex;
      } else if (this.selectedPicker === 'shadowColor') {
        this.data.attributes.shadowColor = val.hex;
      } 
    },
    showPicker(picker, name) {
      console.log('picker,', picker)
      console.log('this.data,', this.data)
       this.$emit('isOpen',[true,picker.target,this.data,name])
      // this.selectedPicker = picker;
    },
    hidePicker(evt) {
      if (!evt) {
        return;
      }
      if (this.selectedPicker === 'foregroundColor' && this.$refs.foregroundColor && !this.$refs.foregroundColor.contains(evt.target)) {
        this.selectedPicker = '';
      } else if (this.selectedPicker === 'backgroundColor' && this.$refs.backgroundColor && !this.$refs.backgroundColor.contains(evt.target)) {
        this.selectedPicker = '';
      } else if (this.selectedPicker === 'borderColor' && this.$refs.borderColor && !this.$refs.borderColor.contains(evt.target)) {
        this.selectedPicker = '';
      } else if (this.selectedPicker === 'shadowColor' && this.$refs.shadowColor && !this.$refs.shadowColor.contains(evt.target)) {
        this.selectedPicker = '';
      } 
    },
    $_setFonts() {
      // assigning fonts  
      if (!this.$el.querySelector('#fontStyle') ) {
        return;
      }
      var p = this.$el.querySelector('#fontStyle').parentElement.parentElement;
      for (var i = 0; i < p.children.length; i++) {
        if (p.children[i].className === 'multiselect__content-wrapper') {
          var ul = p.children[i].children[0];
          for (var j = 0; j < ul.children.length; j++) {
            // ul.children[j].addEventListener('mouseover', this.previewFont);
            // ul.children[j].addEventListener('mousedown', this.setFontSelection);
            ul.children[j].style.fontFamily = this.availableFonts[j];
          }
        }
      }
    },
    revertFont() {
      // if (this.originalFont !== this.data.attributes.fontFamily) {
      //    this.data.attributes.fontFamily = this.originalFont;
      // }
    },
    setFontSelection() {
      this.originalFont = this.data.attributes.fontFamily;
    },
    previewFont(evt) {
      this.data.attributes.fontFamily = evt.target.parentElement.style.fontFamily.replace(/"/g, '')
    },
    toggleLayer() {
      if (this.data.islocked)return;
      this.data.selected = this.data.visible = !this.data.visible;
    },
    getTextContent() {
      var data = this.data.content.replace(/<(?:.|\n)*?>/gm, ' ').replace(/&(?:.|\n)*?;/gm, ' ').trim();
      if (data && data.length >= 20) {
        return data.slice(0, 20) + '...';
      } 

      return data;
    },
    showMenu(e) {
      e.preventDefault();
      this.$emit("onRenameOrDelete", this.data, e)
    },
    lockLayer(e) {
      e.stopPropagation();
      if (this.data.selected) {
        this.data.selected = false;
      }
      this.data.islocked = ! this.data.islocked;
    },
  },
  watch: {
    "data.attributes.fontFamily": {
      handler() {
        this.$el.querySelector(".mu-item-title").style.fontFamily = this.data.attributes.fontFamily;
      },
      deep: true
    }
  },
}
</script>
<style scoped>
@import './menu.css';
.tl-title {
  text-overflow: ellipsis;
  max-width: 200px;
}
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
.item-color-picker {
  right: 15px;
  top: 0px;
  position: absolute;
  z-index: 1;
  box-shadow: 0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647);
}
</style>


