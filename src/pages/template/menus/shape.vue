<template>
  <div>
     <div class="yawaa"  :class="data.selected ? 'activeTool': ''">
       <!-- :title="data.attributes.shape === 'Triangle' ? 'Shape Layer (SVG)' : data.content" -->
        <mu-list-item :title="getTitle()" @click.stop="open" :open="data.selected && !data.islocked">
            <mu-icon slot="left" value="landscape" style="color: #fff"/>
            <mu-icon-button :class="{'s-cannot-delete':statuses && statuses.layerId === data.id}" :icon="data.islocked ? 'lock' : 'lock_open'" slot="right" @click="lockLayer($event)"/>
            <mu-icon-button :class="{'disabled': data.islocked}" :icon="data.visible ? 'visibility' : 'visibility_off'" slot="right" @click.stop="toggleLayer()"/>
            <mu-icon-button :class="{'disabled': data.islocked}" :icon="data.selected && !data.islocked ? 'expand_less' : 'expand_more'" class="expand-btn" slot="right" @click.stop="open"/>
            <!-- <mu-list-item  slot="nested"  class="paddingZero">
                <div class="gridlist-demo-container">
                <mu-grid-list class="gridlist-demo left">Size Option</mu-grid-list>
                <mu-grid-list class="right">
                <multiselect v-model="data.attributes.sizeOption" :options="['Auto','Manual']" :searchable="false" open-direction="bottom" :close-on-select="true"></multiselect>
                </mu-grid-list>
                </div>
            </mu-list-item> -->
            <mu-list-item  slot="nested" class="paddingZero" v-no-ripple>
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
            <mu-list-item  slot="nested" class="paddingZero" v-no-ripple>
              <div class="gridlist-demo-container">
                <mu-grid-list class="gridlist-demo left">Opacity</mu-grid-list>
                <mu-grid-list class="right">
                <mu-slider :max="1" v-model="data.attributes.opacity" class="mmslider"/>
                <div class="input-size sliderInput div-inp">{{data.attributes.opacity}}</div>
                </mu-grid-list>
              </div>
            </mu-list-item>
            <mu-list-item  slot="nested" class="paddingZero" v-no-ripple>
              <div class="gridlist-demo-container">
                <mu-grid-list class="gridlist-demo left">Rotate</mu-grid-list>
                <mu-grid-list class="right">
                <mu-slider :disabled="data.attributes.sizeOption === 'Auto'" :step="1" :min="-90" :max="270" v-model="data.attributes.rotation" class="mmslider" />
                <input  v-digitsonly v-model="data.attributes.rotation" spellcheck="false" class="input-size sliderInput">
                </mu-grid-list>
              </div>
            </mu-list-item>
            <mu-list-item  slot="nested" class="paddingZero" :disabled="data.attributes.shape_type === 'filled'">
              <div class="gridlist-demo-container" style="margin-top: -6px;">
                <mu-grid-list class="gridlist-demo left">Colour</mu-grid-list>
                <mu-grid-list class="right">
                  <div class="input-size colorPicka div-inp">{{data.attributes.color}}</div>
                  <input spellcheck="false" id="colour" class="input-size sliderInput" :style="{backgroundColor:data.attributes.color}"  @click="showPicker($event,'')">
                </mu-grid-list>
                <!-- <div ref="colorPicker" v-show="selectedPicker === 'colorPicker'" class="item-color-picker">
                  <color-picker v-model="colors" @input="colorSelected" 
                    style="width: 100%; height: 100%; border: 1px solid #4A574B;"></color-picker>
                </div> -->
              </div>
            </mu-list-item>
            <mu-list-item  slot="nested" class="paddingZero" v-no-ripple>
              <div class="gridlist-demo-container">
                <mu-grid-list class="gridlist-demo left">Blur Effect</mu-grid-list>
                <mu-grid-list class="right">
                <mu-slider v-model="data.attributes.filterBlur" class="mmslider" :max="100"/>
                <input spellcheck="false" class="input-size sliderInput" v-model="data.attributes.filterBlur">
                </mu-grid-list>
              </div>
            </mu-list-item>
            <!--  v-if="data.attributes.shape_type !== 'filled'" -->
            <mu-sub-header v-if="hasGradient()" slot="nested">Gradient Background <mu-checkbox v-model="data.attributes.isGradient" class="subheader-chckbox"/></mu-sub-header>
            <mu-list-item v-if="hasGradient()" slot="nested" class="paddingZero demiBlackbg" v-no-ripple>
              <div class="gridlist-demo-container" style="margin-top: -6px;">
                <mu-grid-list class="gridlist-demo left" style="padding: 2px 8px !important;line-height: 15px;">Selected Position</mu-grid-list>
                <mu-grid-list class="right">
                  <vue-slider :disabled="!data.attributes.isGradient" ref="gradientSlider" v-model="data.attributes.gradientBackgroundData.value" @callback="handleDrag" @drag-start="setGradientColors($event)" v-bind="data.attributes.gradientBackgroundData" ></vue-slider>
                  <!-- <input spellcheck="false" class="input-size sliderInput"> -->
                </mu-grid-list>
              </div>
            </mu-list-item>
             <mu-list-item v-if="hasGradient()" slot="nested" class="paddingZero demiBlackbg" v-no-ripple>
              <div class="gridlist-demo-container" style="margin-top: -6px;">
                <mu-grid-list class="gridlist-demo left" style="padding: 2px 8px !important;line-height: 15px;">Selected Colour</mu-grid-list>
                <mu-grid-list class="right">
                <div :class="{'disabled':!data.attributes.isGradient}" class="div-inp input-size colorPicka">{{data.attributes.gradientBackgroundData.sliderStyle[selectedHandle].backgroundColor}}</div>
                <input :disabled="!data.attributes.isGradient" style="cursor: pointer" id="gradcolour" @click="showPicker($event,'gradient')" spellcheck="false" class="input-size sliderInput" :style="{backgroundColor:selectedGradientColor}" >
                </mu-grid-list>
              </div>
              <div ref="gradientPicker" v-show="selectedPicker === 'gradientPicker'" class="item-color-picker">
                <color-picker v-model="colors" @input="colorSelected" 
                  style="width: 100%; height: 100%; border: 1px solid #4A574B;"></color-picker>
              </div>
            </mu-list-item>
            <mu-list-item v-if="hasGradient()" slot="nested" class="paddingZero demiBlackbg" v-no-ripple>
              <div class="gridlist-demo-container">
                <mu-grid-list class="gridlist-demo left">Rotate</mu-grid-list>
                <mu-grid-list class="right">
                <mu-slider :disabled="!data.attributes.isGradient" v-model="data.attributes.gradientBackgroundData.rotation" class="mmslider" :step="1" :max="360"/>
                <input :disabled="!data.attributes.isGradient" spellcheck="false" class="input-size sliderInput" v-model="data.attributes.gradientBackgroundData.rotation">
                </mu-grid-list>
              </div>
            </mu-list-item>
            <mu-sub-header :disabled="!hasBorder()" slot="nested">Border</mu-sub-header>
            <mu-sub-header> <mu-icon slot="right" value="image" style="color: #fff"/></mu-sub-header>
            <mu-list-item :disabled="!hasBorder()"  slot="nested" class="paddingZero demiBlackbg" v-no-ripple>
              <div class="gridlist-demo-container">
                <mu-grid-list class="gridlist-demo left">Size</mu-grid-list>
                <mu-grid-list class="right">
                <mu-slider :disabled="!hasBorder()" v-model="data.attributes.borderWidth" class="mmslider" :step="1"/>
                <input :disabled="!hasBorder()" v-digitsonly v-model="data.attributes.borderWidth" spellcheck="false" class="input-size sliderInput">
                </mu-grid-list>
              </div>
            </mu-list-item>
            <mu-list-item slot="nested" :disabled="!hasBorder()" class="paddingZero demiBlackbg" v-no-ripple>
              <div class="gridlist-demo-container">
                <mu-grid-list class="gridlist-demo left">Style</mu-grid-list>
                <mu-grid-list class="right">
                <multiselect  v-model="data.attributes.borderStyle" :options="['None','Dashed', 'Dotted', 'Solid']" :show-labels="false" :searchable="false" :close-on-select="true" ></multiselect>
                </mu-grid-list>
              </div>
            </mu-list-item>
            <mu-list-item :disabled="!hasBorder()" slot="nested" class="paddingZero demiBlackbg" v-no-ripple>
              <div class="gridlist-demo-container" style="margin-top: -6px;">
                <mu-grid-list class="gridlist-demo left">Colour</mu-grid-list>
                <mu-grid-list class="right">
                <div class="input-size colorPicka div-inp" :class="{'disabled':!hasBorder()}">{{data.attributes.borderColor}}</div>
                <input :disabled="!hasBorder()"  spellcheck="false" class="input-size sliderInput" :style="{backgroundColor:data.attributes.borderColor}" @click="showPicker($event,'border')">
                </mu-grid-list>
              </div>
              <div ref="borderColor" v-show="selectedPicker === 'borderColor'" class="item-color-picker">
                <color-picker v-model="colors" @input="colorSelected" 
                  style="width: 100%; height: 100%; border: 1px solid #4A574B;"></color-picker>
              </div>
            </mu-list-item>
            <mu-sub-header v-if="hasGradient()" slot="nested">Shadow</mu-sub-header>
            <mu-list-item v-if="hasGradient()" slot="nested" class="paddingZero demiBlackbg" v-no-ripple>
              <div class="gridlist-demo-container">
                <mu-grid-list class="gridlist-demo left">Size</mu-grid-list>
                <mu-grid-list class="right">
                <mu-slider v-model="data.attributes.shadowSize" class="mmslider" :step="1" />
                <input spellcheck="false" class="input-size sliderInput" v-model="data.attributes.shadowSize">
                </mu-grid-list>
              </div>
            </mu-list-item>
             <mu-list-item v-if="hasGradient()" slot="nested" class="paddingZero demiBlackbg" v-no-ripple>
              <div class="gridlist-demo-container" style="margin-top: -6px;">
                <mu-grid-list class="gridlist-demo left">Colour</mu-grid-list>
                <mu-grid-list class="right">
                <div class="div-inp input-size colorPicka">{{data.attributes.shadowColor}}</div>
                <input spellcheck="false" class="input-size sliderInput" style="background-color:white" @click="showPicker($event,'shadow')">
                </mu-grid-list>
              </div>
            </mu-list-item>
            <mu-sub-header slot="nested" v-if="data.attributes.shape_type !== ' ' && data.attributes.shape !== 'Triangle'">Background Image</mu-sub-header>
            <mu-list-item  slot="nested" class="paddingZero minHytZero"  @click="openModalimage" v-if="data.attributes.shape_type !== ' ' && data.attributes.shape !== 'Triangle'">
             <mu-flexbox>
                  <mu-flexbox-item class="flex-container"> 
                      + Drag and Drop
                  </mu-flexbox-item>
             </mu-flexbox>
            </mu-list-item>
            <mu-list-item v-no-ripple slot="nested" class="paddingZero demiBlackbg" v-if="data.attributes.shape_type !== ' ' && data.attributes.shape !== 'Triangle'">
              <div class="gridlist-demo-container" style="margin-top: -6px;">
                <mu-grid-list class="gridlist-demo left">URL</mu-grid-list>
                <mu-grid-list class="right">
                <input v-model="data.attributes.backgroundImageUri.url" spellcheck="false" class="input-size colorPicka" style="width: 205px !important;
                    margin-right: 0 !important;">
                </mu-grid-list>
              </div>
            </mu-list-item>
            <mu-sub-header slot="nested">
              Animations 
              <img v-show="data.attributes.animation.playing" src="../../../assets/animation_playing.gif" alt="playing" class="si-playing">
              <mu-icon-button @click="previewAnimation()" class="subheader-chckbox" :icon="!data.attributes.animation.playing ? 'play_arrow' : 'stop'" style="top: 0"/>
            </mu-sub-header>
            <mu-list-item  slot="nested" class="paddingZero demiBlackbg" v-no-ripple>
              <div class="gridlist-demo-container">
                  <mu-grid-list class="gridlist-demo left">Loop</mu-grid-list>
                  <mu-grid-list class="right">
                    <multiselect v-model="data.attributes.animation.loop" :options="['Once','Infinite', 'Custom']" :show-labels="false" :searchable="false" :close-on-select="true" :style="{'max-width': data.attributes.animation.loop === 'Custom' ? '165px' : '195px'}"></multiselect>
                    <input @keyup.enter="data.attributes.animation.custom = $event.target.value" @blur="data.attributes.animation.custom = $event.target.value" :value="data.attributes.animation.custom" v-show="data.attributes.animation.loop === 'Custom'" v-digitsonly spellcheck="false" class="input-size sliderInput" style="text-align: center; width:35px !important;">
                  </mu-grid-list>
                  <!-- <mu-grid-list class="right">
                  </mu-grid-list> -->
              </div>
            </mu-list-item>
            <mu-list-item  slot="nested" class="paddingZero demiBlackbg" v-no-ripple>
            <mu-raised-button  v-no-ripple label="Animation Flow(seconds)" fullWidth style="text-transform: none;background-color: #000000;"/>
            </mu-list-item>
            <mu-list-item  slot="nested" class="paddingZero diBlackbg" v-no-ripple  style="height: 70px;margin-left: 15px;">
                  <div style="float:left;margin-right:3px;text-align:center">
                       <label for="name" style="font-size:10px;">Delay Start</label>
                      <input v-model="data.attributes.animation.animationFlow.ds" v-digitsonly spellcheck="false" class="input-size sliderInput" style="text-align: center;">
                  </div>
                  <div style="float:left;margin-right:3px;text-align:center">
                       <label for="name" style="font-size:10px;">FX Start</label>
                      <input v-model="data.attributes.animation.animationFlow.fxs" v-digitsonly spellcheck="false" class="input-size sliderInput" style="border: 1px solid #CC785A; text-align: center; width:35px !important;">
                  </div>
                   <div style="float:left;margin-right:3px;text-align:center; width: 100px;">
                       <label for="name" style="font-size:10px;">Elapsed</label>
                      <input  v-model="data.attributes.animation.animationFlow.e" v-digitsonly spellcheck="false" class="input-size sliderInput" style="width: 100%!important;text-align: center;">
                  </div>
                   <div style="float:left;margin-right:3px;text-align:center">
                       <label for="name" style="font-size:10px;">FX End</label>
                      <input v-model="data.attributes.animation.animationFlow.fxe" v-digitsonly spellcheck="false" class="input-size sliderInput" style="border: 1px solid #44C5B5; text-align: center; width:35px !important;">
                  </div>
                   <div style="float:left;margin-right:3px;text-align:center">
                       <label for="name" style="font-size:10px;">Delay End</label>
                      <input v-model="data.attributes.animation.animationFlow.de" v-digitsonly spellcheck="false" class="input-size sliderInput" style="text-align: center;">
                  </div>
            </mu-list-item>
            <mu-list-item slot="nested" title="Animation"
             v-for="(anim, index) in data.attributes.animation.animations" :key="index">
              <mu-icon-button style="opacity: 0.5; margin-left: -10px; font-size: 5px;" slot="left" @click="removeAnimation(index)" icon="close" icon-class="ics"/>
               <mu-grid-list slot="right" :toggleNested="false" >
                  <multiselect @select="onSelect(anim)" v-model="anim.animation" open-direction="bottom" style=" margin-right: 100px; width: 165px!important;" :options="['Fade','Rotate', 'Size', 'Slide Left/Right', 'Slide Top/Bottom']" :show-labels="false" :searchable="false" :close-on-select="true" ></multiselect>
               </mu-grid-list>
                <!-- <mu-icon-button slot="right" icon="keyboard_arrow_down"/> -->
              <!-- FADE PROPERTY -->
             <mu-list-item v-if="anim.animation === 'Fade'" slot="nested" class="paddingZero demiBlackbg" v-no-ripple>
              <div class="gridlist-demo-container">
                  <mu-grid-list class="gridlist-demo" slot="right">Start</mu-grid-list>
                  <mu-grid-list class="right">
                  <multiselect v-model="anim.start" open-direction="bottom" :options="['In','Out']" :show-labels="false" :searchable="false" :close-on-select="true" style="max-width: 165px;"></multiselect>
                  <input disabled :value="data.attributes.animation.animationFlow.fxs" spellcheck="false" class="input-size sliderInput" style="border: 1px solid #CC785A; text-align: center;width:35px !important;">
                  </mu-grid-list>
              </div>
            </mu-list-item>
            <mu-list-item style="margin-bottom: 50px;" v-if="anim.animation === 'Fade'" slot="nested" class="paddingZero demiBlackbg" v-no-ripple>
              <div class="gridlist-demo-container">
                  <mu-grid-list class="gridlist-demo" slot="right">End</mu-grid-list>
                  <mu-grid-list class="right">
                  <multiselect v-model="anim.end" open-direction="bottom" :options="['In','Out']" :show-labels="false" :searchable="false" :close-on-select="true" style="max-width: 165px;"></multiselect>
                  <input disabled :value="data.attributes.animation.animationFlow.fxe" spellcheck="false" class="input-size sliderInput" style="border: 1px solid #44C5B5; text-align: center;width:35px !important;">
                  </mu-grid-list>
              </div>
            </mu-list-item>
             <!-- FADE PROPERTY -->
            <!-- ---------------------------------------------- -->
            <!-- ROTATION PROPERTY -->
            <mu-list-item v-if="anim.animation === 'Rotate'" slot="nested" class="paddingZero demiBlackbg" v-no-ripple>
              <div class="gridlist-demo-container">
                <mu-grid-list class="gridlist-demo left">Rotate Start</mu-grid-list>
                <mu-grid-list class="right">
                <mu-slider v-model="anim.start" :max="360" class="mmslider" :step="1"/>
                <input style="width: 57px!important;" :value="anim.start + '°'" v-digitsonly  spellcheck="false" class="input-size sliderInput">
                </mu-grid-list>
              </div>
            </mu-list-item>
            <mu-list-item v-if="anim.animation === 'Rotate'" slot="nested" class="paddingZero demiBlackbg" v-no-ripple>
              <div class="gridlist-demo-container">
                <mu-grid-list class="gridlist-demo left">Rotate End</mu-grid-list>
                <mu-grid-list class="right">
                <mu-slider v-model="anim.end" :max="360" class="mmslider" :step="1"/>
                <input style="width: 57px!important;" :value="anim.end + '°'" v-digitsonly  spellcheck="false" class="input-size sliderInput">
                </mu-grid-list>
              </div>
            </mu-list-item>
            <!-- ---------------------------------------------- -->
            <!-- SLIDE -->
            <mu-list-item v-if="anim.animation && anim.animation.indexOf('Slide') !== -1" slot="nested" class="paddingZero demiBlackbg" v-no-ripple>
              <div class="gridlist-demo-container">
                <mu-grid-list class="gridlist-demo left">Start Position</mu-grid-list>
                <mu-grid-list class="right">
                  <input style="width: 155px!important;" v-digitsonly v-model="anim.start" spellcheck="false" class="input-size colorPicka">
                  <input :value="data.attributes.animation.animationFlow.fxs" disabled spellcheck="false" class="input-size sliderInput" style="border: 1px solid #CC785A; text-align: center;width:35px !important;">
                  </mu-grid-list>
              </div>
            </mu-list-item>
            <mu-list-item v-if="anim.animation && anim.animation.indexOf('Slide') !== -1" slot="nested" class="paddingZero demiBlackbg" v-no-ripple>
              <div class="gridlist-demo-container">
                <mu-grid-list class="gridlist-demo left">End Position</mu-grid-list>
                <mu-grid-list class="right">
                  <input style="width: 155px!important;" v-append-unit="'px'" v-digitsonly v-model="anim.end" spellcheck="false" class="input-size colorPicka">
                  <input :value="data.attributes.animation.animationFlow.fxe" disabled spellcheck="false" class="input-size sliderInput" style="border: 1px solid #44C5B5; text-align: center;width:35px !important;">
                  </mu-grid-list>
              </div>
            </mu-list-item>
            <!-- Scale -->
            <mu-list-item v-if="anim.animation === 'Size'" slot="nested" class="paddingZero demiBlackbg" v-no-ripple>
              <div class="gridlist-demo-container">
                <mu-grid-list class="gridlist-demo left">Start Scale</mu-grid-list>
                <mu-grid-list class="right">
                <mu-slider v-model="anim.start" :max="1000" class="mmslider" :step="0.1"/>
                <input style="width: 57px!important;" :value="anim.start + '%'" v-digitsonly  spellcheck="false" class="input-size sliderInput">
                </mu-grid-list>
              </div>
            </mu-list-item>
            <mu-list-item v-if="anim.animation === 'Size'" slot="nested" class="paddingZero demiBlackbg" v-no-ripple>
              <div class="gridlist-demo-container">
                <mu-grid-list class="gridlist-demo left">End Scale</mu-grid-list>
                <mu-grid-list class="right">
                <mu-slider v-model="anim.end" :max="1000" class="mmslider" :step="0.1"/>
                <input style="width: 57px!important;" :value="anim.end + '%'" v-digitsonly  spellcheck="false" class="input-size sliderInput">
                </mu-grid-list>
              </div>
            </mu-list-item>
            </mu-list-item>
            <!-- <mu-list-item  slot="nested" class="paddingZero demiBlackbg" v-no-ripple>
              <div class="gridlist-demo-container">
                  <mu-grid-list  slot="left"><mu-icon-button icon="close" icon-class="ics"/></mu-grid-list> 
                  <mu-grid-list class="gridlist-demo" slot="right">Animation</mu-grid-list>
                  <mu-grid-list class="right">
                    <multiselect style="max-width: 160px;" :options="['Fade','Rotate', 'Size', 'Slide Top/Bottom', 'Slide Left/Right']" :show-labels="false" :searchable="false" :close-on-select="true" ></multiselect>
                  </mu-grid-list>
              </div>
            </mu-list-item> -->
            <!-- ---------------------------------------------- -->
            <mu-list-item  slot="nested" class="paddingZero minHytZero" @click="addAnimations">
             <mu-flexbox>
                  <mu-flexbox-item class="flex-container"> 
                      + Add Animation
                  </mu-flexbox-item>
             </mu-flexbox>
            </mu-list-item>
           <!-- <mu-list-item  slot="nested"  class="paddingZero demiBlackbg">
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
            </mu-list-item> -->
        </mu-list-item>
  </div>
  </div>
</template>
<script>
import {mapGetters,mapMutations} from 'vuex'
import { Photoshop, Chrome } from "vue-color";
import vueSlider from 'vue-slider-component';
import animationHelper from '../../../helpers/animation'
export default {
  name: "ShapeLayer",
  props: ["data", "openpanel"],
  components: {
    "photoshop-picker": Photoshop,
    "color-picker": Chrome,
    vueSlider,
  },
  beforeMount() {
    console.log('aSDASD')
    this.setGradientColors({currentSlider:0})
    // for the color picker to hide
    document.addEventListener('mousedown', this.hidePicker);
  },
  mounted() {
     // for the context menu to show only on the title part
    this.$el.querySelector(".mu-item-wrapper").addEventListener('contextmenu', this.showMenu)
    // this.buildAnimation('rotate', [
    //   [0,0,0,1.0,1.0],
    //   [0,0,0,2.0,1.0],
    //   [0,0,90,1.0,1.0],
    //   [0,0,180,1.0,1.0],
    //   [0,0,270,1.0,1.0],
    //   [0,0,360,1.0,1.0]
    // ])
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
      animations: []
    };
  },
   computed: {
    ...mapGetters(['getLayers',]),
    ...mapGetters({
        statuses: 'getBroadcastedStatuses'
      }),
  },
  methods: {
    ...mapMutations(['setSelectedLayerId', 'broadCastStatus']),
    setGradientColors(evt) {
      console.log('setGradientColors:',evt)
      // var p = evt.$el.children[0];
      // var c1 = p.children[0];
      // var c2 = p.children[1];     
      // console.log('c1', c1)
      // console.log('c2', c2)
      // this.selectedGradientColor = evt.currentSlider
      // if (evt.currentSlider === 0) {
      //   this.selectedGradientColor = c1.style.backgroundColor;
      // }  if (evt.currentSlider === 1) {
      //   this.selectedGradientColor = c2.style.backgroundColor;
      // }
       this.selectedHandle = evt.currentSlider.toString();

      // etc...
    },
    handleDrag(evt) {
      console.log("evt", evt)
      this.data.attributes.gradientBackgroundData.value[0] = evt[0];
      this.data.attributes.gradientBackgroundData.value[1] = evt[1];
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
    showPicker(picker,name) {
      // this.selectedPicker = picker;
      console.log('this.data.attributes:',this.selectedHandle)
      this.selectedGradientColor = this.data.attributes.gradientBackgroundData.sliderStyle[this.selectedHandle].backgroundColor
      console.log('selectedGradientColor:',this.selectedGradientColor)
       this.$emit('isOpen',[true,picker.target,this.data,name,this.selectedHandle])
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
    toggleLayer() {
      if (this.data.islocked) {
        this.broadCastStatus({action: 'notify', layerId: this.data.id});
        return;
      }

      this.data.selected = this.data.visible = !this.data.visible;
    },
    open (event) {
       if (this.data.islocked) {
         this.broadCastStatus({action: 'notify', layerId: this.data.id});
         return;
        }

        for(let i = 0; i < this.getLayers.length;i++){
          if (this.getLayers[i].id === this.data.id) {
            this.data.selected = !this.data.selected;
          this.setSelectedLayerId(this.data.id)
          }else {
              this.getLayers[i].selected = false
          }
        }
    },
    openModalimage() {
        this.$emit('selected',this.data)
         this.$modal.show('image-modal',{data:this.data})
    },
     showMenu(e) {
      e.preventDefault();
      this.$emit("onRenameOrDelete", this.data, e)
    },
    hasGradient() {
      if (this.data.attributes.shape === 'Circle' || this.data.attributes.shape === 'Rectangle') return true;

      return false;
    },
    lockLayer(e) {
      e.stopPropagation();
      if (this.data.selected) {
        this.data.selected = false;
      }
      this.data.islocked = ! this.data.islocked;
    },
    getTitle() {
      return this.data.attributes.shape.length <= 9 ? this.data.attributes.shape + ' - Shape' :
        this.data.attributes.shape.slice(0, 9) + '... - Shape';
    },
    hasBorder() {
      var borderLessShapes = ['Triangle', 'Trapezoid'];
      return !borderLessShapes.includes(this.data.attributes.shape);
    },
    buildAnimation (name,frames) {
      var frames1 = "";
      let len = frames.length
      console.log('len:',len)
      for (let i=0;i<len;i++){
        let kf = frames[i]
        let dt = (i/(len-1)) * 100
        frames1 += dt + "% { -webkit-transform: translate(" + kf[0] + "px," + kf[1] + "px) rotate(" + kf[2] + "deg) scale(" + kf[3] + "," + kf[4] + "); } "
      }
       var idx = document.styleSheets[5].cssRules.length;
        document.styleSheets[5].insertRule("@-webkit-keyframes " + name + " { " + frames1 + "}", idx);
        console.log(document.styleSheets)
      setTimeout(() => {
      let shaps = document.getElementById('shape')
      console.log(shaps)
      console.log(document.styleSheets[5])
        shaps.style.webkitAnimationIterationCount = 'infinite';
      // shaps.style.webkitAnimationTimingFunction = 'linear';
      shaps.style.webkitAnimationDuration = '2.0s';
      shaps.style.webkitAnimationName = 'rotate';
      }, (1000));
      
      // console.log('idx:',idx)
    },
    onSelect(data) {
      data.end = '';
      data.start = '';
    },
    addAnimations() {
     var animData = {
       animation: 'Fade',
       start: null,
       end: null,
     };

      console.log('cuur', this.data.attributes.animation.animations)
      this.data.attributes.animation.animations.push(animData);
    },
    removeAnimation(index) {
      for (var i = 0; i < this.data.attributes.animation.animations.length; i++) {
        if (i === index) {
          this.data.attributes.animation.animations.splice(i, 1)
          break;
        }
      }

      animationHelper.updateAnimations(this.data);
    },
    previewAnimation() {
      // console.log(this.data.attributes.animation)
     this.data.attributes.animation.playing = !this.data.attributes.animation.playing;
      if ( this.data.attributes.animation.playing) {
        animationHelper.applyAnimation(this.data);
      } else {
        animationHelper.stopAnimation(this.data);
      }
    },
  }
}
</script>
<style scoped  title="sad">
@import "./menu.css";
.inp-edit-disabled {
  cursor: not-allowed;
}
.item-color-picker {
  right: 15px;
  top: 0px;
  position: absolute;
  z-index: 2;
  box-shadow: 0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647);
}
</style>


