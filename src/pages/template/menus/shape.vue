<template>
  <div>
     <div class="yawaa"  :class="data.selected ? 'activeTool': ''">
        <mu-list-item title="Shape Layer" :open="data.selected"  @click.stop="open">
            <mu-icon slot="left" value="landscape" style="color: #fff"/>
            <mu-icon-button :icon="data.visible ? 'visibility' : 'visibility_off'" slot="right" @click.stop="toggleLayer()"/>
            <mu-icon-button :icon="data.selected ? 'expand_less' : 'expand_more'" class="expand-btn" slot="right" @click.stop="open"/>
            <mu-list-item  slot="nested"  class="paddingZero">
                <div class="gridlist-demo-container">
                <mu-grid-list class="gridlist-demo left">Size Option</mu-grid-list>
                <mu-grid-list class="right">
                <multiselect v-model="data.attributes.sizeOption" :options="['Auto','Manual']" :searchable="false" open-direction="bottom" :close-on-select="true"></multiselect>
                </mu-grid-list>
                </div>
            </mu-list-item>
            <mu-list-item  slot="nested" class="paddingZero">
                <div class="gridlist-demo-container" style="margin-top: -7px;">
                <mu-grid-list class="gridlist-demo left">Size</mu-grid-list>
                <mu-grid-list class="right" style="margin-left: 2px;">
                  <div class="input-container">
                        <span class="labelSpyker">W:</span>
                        <input :class="[{'inp-edit-disabled':data.attributes.sizeOption === 'Auto'}]" 
                          :disabled="data.attributes.sizeOption === 'Auto'" spellcheck="false" class="inputSpyker"
                          v-digitsonly v-model="data.width">
                        <mu-icon slot="left" value="link" class="iconSpyker"/>
                        <span class="labelSpyker">H:</span>
                        <input :class="[{'inp-edit-disabled':data.attributes.sizeOption === 'Auto'}]" 
                          :disabled="data.attributes.sizeOption === 'Auto'" spellcheck="false" class="inputSpyker"
                          v-digitsonly v-model="data.height">
                  </div>
                </mu-grid-list>
                </div>
            </mu-list-item>
            <mu-list-item  slot="nested" class="paddingZero">
              <div class="gridlist-demo-container">
                <mu-grid-list class="gridlist-demo left">Opacity</mu-grid-list>
                <mu-grid-list class="right">
                <mu-slider :max="1" v-model="data.attributes.opacity" class="mmslider"/>
                <input v-model="data.attributes.opacity" disabled spellcheck="false" class="input-size sliderInput">
                </mu-grid-list>
              </div>
            </mu-list-item>
            <mu-list-item  slot="nested" class="paddingZero">
              <div class="gridlist-demo-container">
                <mu-grid-list class="gridlist-demo left">Rotate</mu-grid-list>
                <mu-grid-list class="right">
                <mu-slider :disabled="data.attributes.sizeOption === 'Auto'" :min="-90" :max="270" v-model="data.attributes.rotation" class="mmslider" />
                <input disabled v-digitsonly v-model="data.attributes.rotation" spellcheck="false" class="input-size sliderInput">
                </mu-grid-list>
              </div>
            </mu-list-item>
            <mu-list-item  slot="nested" class="paddingZero" @click="showPicker('colorPicker')">
              <div class="gridlist-demo-container" style="margin-top: -6px;">
                <mu-grid-list class="gridlist-demo left">Colour</mu-grid-list>
                <mu-grid-list class="right">
                  <input disabled spellcheck="false" class="input-size colorPicka" :value="this.data.attributes.color">
                  <input spellcheck="false" class="input-size sliderInput" :style="{backgroundColor:this.data.attributes.color}">
                </mu-grid-list>
                <div ref="colorPicker" v-show="selectedPicker === 'colorPicker'" class="item-color-picker">
                  <color-picker v-model="colors" @input="colorSelected" 
                    style="width: 100%; height: 100%; border: 1px solid #4A574B;"></color-picker>
                </div>
              </div>
            </mu-list-item>
            <mu-sub-header slot="nested">Gradient Background</mu-sub-header>
            <mu-list-item  slot="nested" class="paddingZero demiBlackbg">
              <div class="gridlist-demo-container" style="margin-top: -6px;">
                <mu-grid-list class="gridlist-demo left" style="padding: 2px 8px !important;line-height: 15px;">Selected Position</mu-grid-list>
                <mu-grid-list class="right">
                  <vue-slider ref="gradientSlider" @drag-start="setGradientColors($event)" v-bind="data.attributes.gradientBackgroundData" ></vue-slider>
                  <!-- <input spellcheck="false" class="input-size sliderInput"> -->
                </mu-grid-list>
              </div>
            </mu-list-item>
             <mu-list-item  slot="nested" class="paddingZero demiBlackbg" @click="showPicker('gradientPicker')">
              <div class="gridlist-demo-container" style="margin-top: -6px;">
                <mu-grid-list class="gridlist-demo left" style="padding: 2px 8px !important;line-height: 15px;">Selected Colour</mu-grid-list>
                <mu-grid-list class="right">
                <input disabled spellcheck="false" :value="selectedGradientColor" class="input-size colorPicka">
                <input style="cursor: pointer" disabled spellcheck="false" class="input-size sliderInput" :style="{backgroundColor:selectedGradientColor}">
                </mu-grid-list>
              </div>
              <div ref="gradientPicker" v-show="selectedPicker === 'gradientPicker'" class="item-color-picker">
                <color-picker v-model="colors" @input="colorSelected" 
                  style="width: 100%; height: 100%; border: 1px solid #4A574B;"></color-picker>
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
                <mu-slider v-model="data.attributes.borderSize" class="mmslider" />
                <input v-digitsonly v-model="data.attributes.borderSize" spellcheck="false" class="input-size sliderInput">
                </mu-grid-list>
              </div>
            </mu-list-item>
            <mu-list-item  slot="nested"  class="paddingZero demiBlackbg">
              <div class="gridlist-demo-container">
                <mu-grid-list class="gridlist-demo left">Style</mu-grid-list>
                <mu-grid-list class="right">
                <multiselect v-model="data.attributes.borderStyle" :options="['Solid', 'Square', 'Round']" :searchable="false" :close-on-select="true" placeholder="Pick a value"></multiselect>
                </mu-grid-list>
              </div>
            </mu-list-item>
             <mu-list-item  slot="nested" class="paddingZero demiBlackbg" @click="showPicker('borderColor')">
              <div class="gridlist-demo-container" style="margin-top: -6px;">
                <mu-grid-list class="gridlist-demo left">Colour</mu-grid-list>
                <mu-grid-list class="right">
                <input disabled spellcheck="false" class="input-size colorPicka" :value="this.data.attributes.borderColor">
                <input spellcheck="false" class="input-size sliderInput" :style="{backgroundColor:this.data.attributes.borderColor}">
                </mu-grid-list>
              </div>
              <div ref="borderColor" v-show="selectedPicker === 'borderColor'" class="item-color-picker">
                <color-picker v-model="colors" @input="colorSelected" 
                  style="width: 100%; height: 100%; border: 1px solid #4A574B;"></color-picker>
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
            <mu-list-item  slot="nested" class="paddingZero minHytZero" @click="$modal.show('image-modal')">
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
                <input v-model="data.attributes.backgroundImageUri" spellcheck="false" class="input-size colorPicka" style="width: 205px !important;
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
  </div>
</template>
<script>
import { Photoshop, Chrome } from "vue-color";
import vueSlider from 'vue-slider-component';
export default {
  name: "ShapeLayer",
  props: ["data", "openpanel"],
  components: {
    "photoshop-picker": Photoshop,
    "color-picker": Chrome,
    vueSlider,
  },
  beforeMount() {
    // for the color picker to hide
    document.addEventListener('mousedown', this.hidePicker);
  },
  beforeDestroy() {
    document.removeEventListener('mousedown', this.hidePicker);
  },
  data() {
    return {
      selectedGradientColor: 'red',
      selectedHandle: '',
      colors: {
        hex: '#194d33',
        hsl: { h: 150, s: 0.5, l: 0.2, a: 1 },
        hsv: { h: 150, s: 0.66, v: 0.30, a: 1 },
        rgba: { r: 25, g: 77, b: 51, a: 1 },
        a: 1
      },
      value: "",
      value1: "",
      value2: "",
      value3: "",
      options: ["Manual", "Automatic", "test", "TEst 2"],
      selectedPicker: '',
    };
  },
  methods: {
    setGradientColors(evt) {
      // console.log('naaaaaaaaaaa', evt)
      var p = evt.$el.children[0];
      var c1 = p.children[0];
      var c2 = p.children[1];
      if (evt.currentSlider === 0) {
        this.selectedGradientColor = c1.style.backgroundColor;
      }  if (evt.currentSlider === 1) {
        this.selectedGradientColor = c2.style.backgroundColor;
      }
       this.selectedHandle = evt.currentSlider.toString();
      // etc...
    },
    colorSelected(val) {
      if (this.selectedPicker === 'colorPicker') {
        this.data.attributes.color = val.hex;
      } else if (this.selectedPicker === 'borderColor') {
        this.data.attributes.borderColor =  val.hex;
      } else if (this.selectedPicker === 'gradientPicker') {
        this.selectedGradientColor = val.hex
        var p = this.$refs.gradientSlider.$el.children[0];
        if (this.selectedHandle === '0') {
          p.children[0].style.backgroundColor = val.hex;
          this.data.attributes.gradientBackgroundData.sliderStyle[0].backgroundColor = val.hex;
        } else if (this.selectedHandle === '1'){
          p.children[1].style.backgroundColor = val.hex;
          this.data.attributes.gradientBackgroundData.sliderStyle[1].backgroundColor = val.hex;
        }

        this.data.attributes.gradientBackgroundData.processStyle.background = 
          '-webkit-linear-gradient(left, ' +  p.children[0].style.backgroundColor + ', ' + p.children[1].style.backgroundColor + ')';
        // etc.....
      } 
    },
    showPicker(picker) {
      this.selectedPicker = picker;
    },
    hidePicker(evt) {
      if (!evt) {
        return;
      }
      if (this.selectedPicker === 'colorPicker' && !this.$refs.colorPicker.contains(evt.target)) {
        this.selectedPicker = '';
      } else if (this.selectedPicker === 'borderColor' && !this.$refs.borderColor.contains(evt.target)) {
        this.selectedPicker = '';
      } else if (this.selectedPicker === 'gradientPicker' && !this.$refs.gradientPicker.contains(evt.target)) {
        this.selectedPicker = '';
      }
    },
    open(event) {
      this.data.selected = !this.data.selected;
    },
    toggleLayer() {
      this.data.selected = this.data.visible = !this.data.visible;
    },
  },
};
</script>
<style scoped>
@import "./menu.css";
.inp-edit-disabled {
  cursor: not-allowed;
}
.item-color-picker {
  right: 15px;
  top: 0px;
  position: absolute;
  z-index: 1;
  box-shadow: 0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647);
}
</style>


