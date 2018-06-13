<template>
<div class="yawaa" :class="data.selected ? 'activeTool': ''">
    <mu-list-item title="Image Layer" :open="data.selected && !data.islocked" @click.stop="open">
          <mu-icon slot="left" value="image" style="color: #fff"/>
          <mu-icon-button :class="{'s-cannot-delete':statuses && statuses.layerId === data.id}" :icon="data.islocked ? 'lock' : 'lock_open'" slot="right" @click="lockLayer($event)"/>
          <mu-icon-button :class="{'disabled': data.islocked}" :icon="data.visible ? 'visibility' : 'visibility_off'" slot="right" @click.stop="toggleLayer()"/>
        <mu-icon-button :class="{'disabled': data.islocked}" :icon="data.selected && !data.islocked ? 'expand_less' : 'expand_more'" class="expand-btn" slot="right" @click.stop="open"/>
        <mu-list-item  slot="nested"  class="paddingZero minHytZero"   @click="openModalimage">
             <mu-flexbox>
                  <mu-flexbox-item class="flex-container" > 
                      + Drag and Drop
                  </mu-flexbox-item>
             </mu-flexbox>
        </mu-list-item>
         <!-- <mu-list-item  slot="nested"  class="paddingZero" v-no-ripple>
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
            <mu-grid-list class="right">
              <div class="input-container">
                    <span class="labelSpyker">W:</span>
                    <input spellcheck="false" class="inputSpyker" v-model="data.width">
                    <mu-icon slot="left" value="link" class="iconSpyker"/>
                    <span class="labelSpyker">H:</span>
                    <input spellcheck="false" class="inputSpyker"  v-model="data.height">
              </div>
            </mu-grid-list>
          </div>
        </mu-list-item>
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
            <input type="number" v-digitsonly spellcheck="false" class="input-size sliderInput" v-model="data.attributes.rotation">
            </mu-grid-list>
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
        <mu-sub-header slot="nested">Border</mu-sub-header>
        <mu-list-item  slot="nested" class="paddingZero demiBlackbg" v-no-ripple>
          <div class="gridlist-demo-container">
            <mu-grid-list class="gridlist-demo left">Size</mu-grid-list>
            <mu-grid-list class="right">
            <mu-slider v-model="data.attributes.borderWidth" class="mmslider" :step="1"/>
            <input spellcheck="false" class="input-size sliderInput" v-model="data.attributes.borderWidth">
            </mu-grid-list>
          </div>
        </mu-list-item>
        <mu-list-item  slot="nested"  class="paddingZero demiBlackbg" v-no-ripple>
          <div class="gridlist-demo-container">
            <mu-grid-list class="gridlist-demo left">Style</mu-grid-list>
            <mu-grid-list class="right">
            <multiselect v-model="data.attributes.borderStyle" :open-direction="'bottom'" :show-labels="false" :options="borderSizes" :searchable="false" :close-on-select="true"></multiselect>
            </mu-grid-list>
          </div>
        </mu-list-item>
         <mu-list-item  slot="nested" class="paddingZero demiBlackbg" v-no-ripple>
          <div class="gridlist-demo-container" style="margin-top: -6px;">
            <mu-grid-list class="gridlist-demo left">Colour</mu-grid-list>
            <mu-grid-list class="right">
            <input spellcheck="false" class="input-size colorPicka" id="bordercolour" v-model="data.attributes.borderColor">
            <input spellcheck="false" class="input-size sliderInput" style="background-color:white" @click="showPicker($event,'border')">
            </mu-grid-list>
          </div>
        </mu-list-item>
        <mu-sub-header slot="nested">Shadow</mu-sub-header>
         <mu-list-item  slot="nested" class="paddingZero demiBlackbg" v-no-ripple>
          <div class="gridlist-demo-container">
            <mu-grid-list class="gridlist-demo left">Size</mu-grid-list>
            <mu-grid-list class="right">
            <mu-slider v-model="data.attributes.shadowSize" class="mmslider" :step="1"/>
            <input spellcheck="false" class="input-size sliderInput" v-model="data.attributes.shadowSize">
            </mu-grid-list >
          </div>
        </mu-list-item>
         <mu-list-item  slot="nested" class="paddingZero demiBlackbg" v-no-ripple>
          <div class="gridlist-demo-container" style="margin-top: -6px;">
            <mu-grid-list class="gridlist-demo left">Colour</mu-grid-list>
            <mu-grid-list class="right">
            <input spellcheck="false" class="input-size colorPicka" v-model="data.attributes.shadowColor">
            <input spellcheck="false" class="input-size sliderInput" style="background-color:white" @click="showPicker($event,'shadow')">
            </mu-grid-list>
          </div>
        </mu-list-item>
        <mu-list-item  slot="nested"  class="paddingZero" v-no-ripple>
          <div class="gridlist-demo-container">
            <mu-grid-list class="gridlist-demo left">Object-Fit</mu-grid-list>
            <mu-grid-list class="right">
            <multiselect v-model="data.attributes.objectFit" :options="objFit" :searchable="false" :close-on-select="true" placeholder="Pick a value"></multiselect>
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
                   <div style="float:left;margin-right:3px;text-align:center">
                       <label for="name" style="font-size:10px;">Elapsed</label>
                      <input  v-model="data.attributes.animation.animationFlow.e" v-digitsonly spellcheck="false" class="input-size sliderInput" style="text-align: center;">
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
                  <multiselect v-model="anim.animation" open-direction="bottom" style=" margin-right: 100px; width: 165px!important;" :options="['Fade','Rotate', 'Size', 'Slide Left/Right', 'Slide Top/Bottom']" :show-labels="false" :searchable="false" :close-on-select="true" ></multiselect>
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
                <input style="width: 57px!important;" :value="anim.start" v-digitsonly  spellcheck="false" class="input-size sliderInput">
                </mu-grid-list>
              </div>
            </mu-list-item>
            <mu-list-item v-if="anim.animation === 'Rotate'" slot="nested" class="paddingZero demiBlackbg" v-no-ripple>
              <div class="gridlist-demo-container">
                <mu-grid-list class="gridlist-demo left">Rotate End</mu-grid-list>
                <mu-grid-list class="right">
                <mu-slider v-model="anim.end" :max="360" class="mmslider" :step="1"/>
                <input style="width: 57px!important;" :value="anim.end" v-digitsonly  spellcheck="false" class="input-size sliderInput">
                </mu-grid-list>
              </div>
            </mu-list-item>
            <!-- ---------------------------------------------- -->
            <!-- SLIDE -->
            <mu-list-item v-if="anim.animation && anim.animation.indexOf('Slide') !== -1" slot="nested" class="paddingZero demiBlackbg" v-no-ripple>
              <div class="gridlist-demo-container">
                <mu-grid-list class="gridlist-demo left">Start Position</mu-grid-list>
                <mu-grid-list class="right">
                  <input v-digitsonly v-model="anim.start" spellcheck="false" class="input-size colorPicka">
                  <input :value="data.attributes.animation.animationFlow.fxs" disabled spellcheck="false" class="input-size sliderInput" style="border: 1px solid #CC785A; text-align: center;width:35px !important;">
                  </mu-grid-list>
              </div>
            </mu-list-item>
            <mu-list-item v-if="anim.animation && anim.animation.indexOf('Slide') !== -1" slot="nested" class="paddingZero demiBlackbg" v-no-ripple>
              <div class="gridlist-demo-container">
                <mu-grid-list class="gridlist-demo left">End Position</mu-grid-list>
                <mu-grid-list class="right">
                  <input v-append-unit="'px'" v-digitsonly v-model="anim.end" spellcheck="false" class="input-size colorPicka">
                  <input :value="data.attributes.animation.animationFlow.fxe" disabled spellcheck="false" class="input-size sliderInput" style="border: 1px solid #44C5B5; text-align: center;width:35px !important;">
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
import { mapGetters, mapMutations} from 'vuex'
import animationHelper from '../../../helpers/animation'
export default {
  name: 'ImageLayer',
  props:['openpanel','data'],
  components:{
  },
  data (){
      return {
        expandIcon: 'expand_more',
        value: '',
        value1:0,
        value2: null,
        value3: null,
        options: ['Select option', 'options', 'selected', 'mulitple', 'label', 'searchable', 'clearOnSelect', 'hideSelected', 'maxHeight', 'allowEmpty', 'showLabels', 'onChange', 'touched'],
        borderSizes: [
          'None',
          'Dashed',
          'Solid',
          'Dotted'
        ],
        objFit:[
          'None',
          'Fill',
          'Contain',
          'Cover',
          'Scale-Down',
        ],
        dialog: '',
        detail: {}
      }
  },
  mounted (){
     // for the context menu to show only on the title part
    this.$el.querySelector(".mu-item-wrapper").addEventListener('contextmenu', this.showMenu)
  },
   computed: {
    ...mapGetters(['getLayers']),
    ...mapGetters({
        statuses: 'getBroadcastedStatuses'
      }),
  },
  methods: {
    ...mapMutations(['setSelectedLayerId', 'broadCastStatus']),
    open (event) {
       if (this.data.islocked) {
         this.broadCastStatus({action: 'notify', layerId: this.data.id});
         return; 
         }
      // this.panelopen = !this.panelopen
      // this.$emit('openpanel',this.panelopen)
      for(let i = 0; i < this.getLayers.length;i++){
        if (this.getLayers[i].id === this.data.id) {
          this.data.selected = !this.data.selected;
          this.setSelectedLayerId(this.data.id)
        }else {
            this.getLayers[i].selected = false
        }
      }
      // if(this.data.selected){
      //   this.expandIcon = 'expand_less'
      // } else{
      //   this.expandIcon = 'expand_more'
      // }
      // this.data.open = this.panelopen
      // this.$emit('isOpen',this.data)
    },
    openModalimage () {
      this.$emit('selected',this.data)
      this.$modal.show('image-modal',{data:this.data})
    },
    toggleLayer() {
      if (this.data.islocked) { 
        this.broadCastStatus({action: 'notify', layerId: this.data.id});
        return; 
      }
      this.data.selected = this.data.visible = !this.data.visible;
    },
    showPicker (event,name) {
       let inputelement = document.getElementById('bordercolour')
       this.$emit('isOpen',[true,event.target,this.data,name])
      // this.colorType = item.name
      // this.currentSelectedIndex = layerIndex
      // this.setSelectedLayer(this.layers[layerIndex], layerIndex)
      // this.currentSelectedAttributes = item
      // this.pickerisShow = !this.pickerisShow
      //   // this.colorPickerOwner = item.value
      // this.colorPickerOwner = this.pickerisShow ? event.srcElement : null
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
  },
}
</script>
<style scoped>
@import './menu.css';
</style>

