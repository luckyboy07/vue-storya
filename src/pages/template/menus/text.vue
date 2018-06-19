<template>
  <div class="yawaa" :class="data.selected ? 'activeTool': ''">
   <mu-list-item :title="getTextContent() || 'Text Layer'" 
    :open="data.selected && !data.islocked"
     @click.stop="open">
        <mu-icon slot="left" value="text_fields" style="color: #fff"/>
        <mu-icon-button :class="{'s-cannot-delete':statuses && statuses.layerId === data.id}" :icon="data.islocked ? 'lock' : 'lock_open'" slot="right" @click="lockLayer($event)"/>
        <mu-icon-button :class="{'disabled': data.islocked}" :icon="data.visible ? 'visibility' : 'visibility_off'" slot="right" @click.stop="toggleLayer()"/>
        <mu-icon-button :class="{'disabled': data.islocked}" :icon="data.selected && !data.islocked ? 'expand_less' : 'expand_more'" class="expand-btn" slot="right" @click.stop="open"/>
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
                    <div class="div-inp input-size sliderInput">{{data.attributes.lineHeight}}</div>
                </mu-grid-list>
                </div>
        </mu-list-item>
        <mu-list-item  slot="nested" class="paddingZero" v-no-ripple >
          <div class="gridlist-demo-container" style="margin-top: -6px;">
            <mu-grid-list class="gridlist-demo left">Colour</mu-grid-list>
            <mu-grid-list class="right">
            <div class="div-inp input-size colorPicka">{{data.attributes.color}}</div>
            <input spellcheck="false" class="input-size sliderInput" :style="{backgroundColor: data.attributes.color, border: 'thin ' + invertColor(data.attributes.color) + ' solid'}" @click="showPicker($event, '')">
            </mu-grid-list>
          </div>
          <!-- <div ref="foregroundColor" v-show="selectedPicker === 'foregroundColor'" class="item-color-picker">
            <color-picker v-model="colors" @input="colorSelected" 
              style="width: 100%; height: 100%; border: 1px solid #4A574B;"></color-picker>
          </div> -->
        </mu-list-item>  
        <mu-list-item  slot="nested" class="paddingZero" v-no-ripple>
          <div class="gridlist-demo-container" style="margin-top: -6px;">
            <mu-grid-list class="gridlist-demo left">Background</mu-grid-list>
            <mu-grid-list class="right">
            <div class="div-inp input-size colorPicka">{{data.attributes.backgroundColor}}</div>
            <input @click="showPicker($event,'backgroundColor')" spellcheck="false" class="input-size sliderInput" :style="{backgroundColor:data.attributes.backgroundColor, border: 'thin ' + invertColor(data.attributes.backgroundColor) + ' solid'}">
            </mu-grid-list>
          </div>
          <!-- <div ref="backgroundColor" v-show="selectedPicker === 'backgroundColor'" class="item-color-picker">
            <color-picker v-model="colors" @input="colorSelected" 
              style="width: 100%; height: 100%; border: 1px solid #4A574B;"></color-picker>
          </div> -->
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
        <mu-sub-header slot="nested">Border</mu-sub-header>
            <mu-list-item  slot="nested" class="paddingZero demiBlackbg" v-no-ripple>
              <div class="gridlist-demo-container">
                <mu-grid-list class="gridlist-demo left">Size</mu-grid-list>
                <mu-grid-list class="right">
                  <mu-slider v-model="data.attributes.borderSize" class="mmslider" />
                  <div class="div-inp input-size sliderInput">{{data.attributes.borderSize}}</div>
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
                <div class="div-inp input-size colorPicka">{{data.attributes.borderColor}}</div>
                <input spellcheck="false" class="input-size sliderInput" :style="{backgroundColor:data.attributes.borderColor, border: 'thin ' + invertColor(data.attributes.borderColor) + ' solid'}"  @click="showPicker($event,'border')">
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
                <div class="div-inp input-size sliderInput">{{data.attributes.shadowSize}}</div>
                </mu-grid-list>
              </div>
            </mu-list-item>
             <mu-list-item slot="nested" class="paddingZero demiBlackbg" v-no-ripple>
              <div class="gridlist-demo-container" style="margin-top: -6px;">
                <mu-grid-list class="gridlist-demo left">Colour</mu-grid-list>
                <mu-grid-list class="right">
                <div class="div-inp input-size colorPicka">{{data.attributes.shadowColor}}</div>
                <input spellcheck="false" class="input-size sliderInput" :style="{backgroundColor:data.attributes.shadowColor, border: 'thin ' + invertColor(data.attributes.shadowColor) + ' solid'}"  @click="showPicker($event,'shadow')">
                </mu-grid-list>
              </div>
              <div ref="shadowColor" v-show="selectedPicker === 'shadowColor'" class="item-color-picker">
                <color-picker v-model="colors" @input="colorSelected" 
                  style="width: 100%; height: 100%; border: 1px solid #4A574B;"></color-picker>
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
            <mu-list-item  slot="nested" class="paddingZero demiBlackbg">
              <!-- <mu-raised-button :disableRipple="true" v-no-ripple label="Animation Flow(seconds)" fullWidth style="text-transform: none;background-color: #000000;"/> -->
              <div style="margin-left: 10px; margin-right: 10px; text-align: center;height: 40px; text-transform: none;background-color: #000000;">
                <div style="padding-top: 10px;">Animation Flow(seconds)</div> 
              </div>
            </mu-list-item>
            <mu-list-item  slot="nested" class="paddingZero demiBlackbg" v-no-ripple  style="height: 70px;margin-left: 15px;">
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
                      <input v-model="data.attributes.animation.animationFlow.e" v-digitsonly spellcheck="false" class="input-size sliderInput" style="width: 100%!important;text-align: center;">
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
             <mu-list-item :disableRipple="true" v-if="anim.animation === 'Fade'" slot="nested" class="paddingZero demiBlackbg">
              <div class="gridlist-demo-container">
                  <mu-grid-list class="gridlist-demo" slot="right">Start</mu-grid-list>
                  <mu-grid-list class="right">
                  <multiselect v-model="anim.start" open-direction="bottom" :options="['In','Out']" :show-labels="false" :searchable="false" :close-on-select="true" style="max-width: 165px;"></multiselect>
                  <input disabled :value="data.attributes.animation.animationFlow.fxs" spellcheck="false" class="input-size sliderInput" style="border: 1px solid #CC785A; text-align: center;width:35px !important;">
                  </mu-grid-list>
              </div>
            </mu-list-item>
            <mu-list-item :disableRipple="true" v-if="anim.animation === 'Fade'" slot="nested" class="paddingZero demiBlackbg" style="margin-bottom: 50px;" >
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
                <mu-grid-list class="right" style="padding-top: 5px;">
                <mu-slider @mouseover.native="createPreview(anim, 'start')" @mouseout.native="removePreview()" @input="createPreview(anim, 'start')" v-model="anim.start" :max="360" class="mmslider" :step="1"/>
                <input disabled style="width: 57px!important;" :value="anim.start + '°'" v-digitsonly  spellcheck="false" class="input-size sliderInput">
                </mu-grid-list>
              </div>
            </mu-list-item>
            <mu-list-item v-if="anim.animation === 'Rotate'" slot="nested" class="paddingZero demiBlackbg" v-no-ripple>
              <div class="gridlist-demo-container">
                <mu-grid-list class="gridlist-demo left">Rotate End</mu-grid-list>
                <mu-grid-list class="right" style="padding-top: 5px;">
                <mu-slider @mouseover.native="createPreview(anim, 'end')" @mouseout.native="removePreview()" @input="createPreview(anim, 'end')" v-model="anim.end" :max="360" class="mmslider" :step="1"/>
                <input style="width: 57px!important;" :value="anim.end + '°'" v-digitsonly  spellcheck="false" class="input-size sliderInput">
                </mu-grid-list>
              </div>
            </mu-list-item>
            <!-- ---------------------------------------------- -->
            <!-- SLIDE -->
            <mu-list-item  tabindex="-1" v-if="anim.animation && anim.animation.indexOf('Slide') !== -1" slot="nested" class="paddingZero demiBlackbg" v-no-ripple>
              <div class="gridlist-demo-container">
                <mu-grid-list class="gridlist-demo left">Start Position(px)</mu-grid-list>
                <mu-grid-list class="right" style="padding-top: 5px">
                  <input @focus="createPreview(anim, 'start')" @blur="removePreview()" @keyup="createPreview(anim, 'start')" style="width: 155px!important;" v-digitsonly v-model="anim.start" spellcheck="false" class="input-size colorPicka">
                  <input :value="data.attributes.animation.animationFlow.fxs" disabled spellcheck="false" class="input-size sliderInput" style="border: 1px solid #CC785A; text-align: center;width:35px !important;">
                  </mu-grid-list>
              </div>
            </mu-list-item>
            <mu-list-item :disableRipple="true" v-tabindex-override="-1" v-if="anim.animation && anim.animation.indexOf('Slide') !== -1" slot="nested" class="paddingZero demiBlackbg" v-no-ripple>
              <div class="gridlist-demo-container">
                <mu-grid-list class="gridlist-demo left">End Position(px)</mu-grid-list>
                <mu-grid-list class="right" style="padding-top: 5px">
                  <input @focus="createPreview(anim, 'end')" @blur="removePreview()" @keyup="createPreview(anim, 'end')" style="width: 155px!important;" v-append-unit="'px'" v-digitsonly v-model="anim.end" spellcheck="false" class="input-size colorPicka">
                  <input :value="data.attributes.animation.animationFlow.fxe" disabled spellcheck="false" class="input-size sliderInput" style="border: 1px solid #44C5B5; text-align: center;width:35px !important;">
                  </mu-grid-list>
              </div>
            </mu-list-item>
            <!-- Scale -->
            <mu-list-item v-if="anim.animation === 'Size'" slot="nested" class="paddingZero demiBlackbg" v-no-ripple>
              <div class="gridlist-demo-container">
                <mu-grid-list class="gridlist-demo left">Start Scale</mu-grid-list>
                <mu-grid-list class="right">
                <mu-slider @mouseover.native="createPreview(anim, 'start')" @mouseout.native="removePreview()" @input="createPreview(anim, 'start')" v-model="anim.start" :max="1000" class="mmslider" :step="0.1"/>
                <input style="width: 57px!important;" :value="anim.start + '%'" v-digitsonly  spellcheck="false" class="input-size sliderInput">
                </mu-grid-list>
              </div>
            </mu-list-item>
            <mu-list-item v-if="anim.animation === 'Size'" slot="nested" class="paddingZero demiBlackbg" v-no-ripple>
              <div class="gridlist-demo-container">
                <mu-grid-list class="gridlist-demo left">End Scale</mu-grid-list>
                <mu-grid-list class="right">
                <mu-slider @mouseover.native="createPreview(anim, 'end')" @mouseout.native="removePreview()" @input="createPreview(anim, 'end')" v-model="anim.end" :max="1000" class="mmslider" :step="0.1"/>
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
   </mu-list-item>
 </div>
</template>
<script>
import fontHelper from '../../../helpers/fonts.helper.js'
import animationHelper from '../../../helpers/animation'
import { Photoshop, Chrome } from "vue-color";
import {mapMutations, mapGetters} from 'vuex'
import colorHelper from '../../../helpers/color-helper.js';
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
    ...mapGetters(['getLayers']),
    ...mapGetters({
        statuses: 'getBroadcastedStatuses'
      }),
  },
  methods: {
    ...mapMutations(['setLayerValue','setSelectedLayerId','broadCastStatus' ]),
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
      // console.log('picker,', picker)
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
      if (this.data.islocked) {
        this.broadCastStatus({action: 'notify', layerId: this.data.id});
       return;
      }
      this.data.selected = this.data.visible = !this.data.visible;
    },
    getTextContent() {
      var data = this.data.content.replace(/<(?:.|\n)*?>/gm, ' ').replace(/&(?:.|\n)*?;/gm, ' ').trim();
      if (data && data.length >= 15) {
        return data.slice(0, 15) + '...';
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
    createPreview(anim, changed) {
      if (this.data.attributes.animation.playing) {
        animationHelper.stopAnimation(this.data);
        this.data.attributes.animation.playing = false;
      }
      animationHelper.createShadow(this.data, anim, changed);
    },
    removePreview() {
      if (this.data.attributes.animation.playing) {
        animationHelper.stopAnimation(this.data);
        this.data.attributes.animation.playing = false;
      }
      animationHelper.removePreview(this.data);
    },
    invertColor(hex) {
      return colorHelper.invertColor(hex);
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


