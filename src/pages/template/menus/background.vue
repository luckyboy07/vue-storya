<template>
<div class="yawaa" :class="data.selected ? 'activeTool': ''">
        <mu-list-item title="Canvas"  :open="data.selected" @click.stop="open">
            <mu-icon-button  :icon="data.selected ? 'expand_less' : 'expand_more'" slot="right"/>
            <mu-sub-header slot="nested">Background Image</mu-sub-header>
            <mu-list-item  slot="nested" class="paddingZero minHytZero">
                <file-upload
                extensions="gif,jpg,jpeg,png,webp"
                accept="image/png,image/gif,image/jpeg,image/webp"
                :size="1024 * 1024 * 10"
                @input-filter="inputFilter"
                @input-file="inputFile"
                :multiple="false"
                :drop="true"
                :drop-directory="true"
                v-model="files"
                ref="upload"
                >
                <!-- :post-action="'http://206.189.153.177:4000/media'" -->
                    <mu-flexbox class="flx">
                        <mu-flexbox-item class="flex-container" > 
                                    + Drag and Drop Images
                        </mu-flexbox-item>
                    </mu-flexbox>
                </file-upload>
            </mu-list-item>
            <mu-sub-header slot="nested">Attributes</mu-sub-header>
            <mu-list-item  slot="nested" class="paddingZero demiBlackbg" v-no-ripple>
                <div class="gridlist-demo-container" style="margin-top: -6px;">
                    <mu-grid-list class="gridlist-demo left">Colour</mu-grid-list>
                    <mu-grid-list class="right">
                    <input spellcheck="false" class="input-size colorPicka" id="bordercolour" v-model="data.attributes.color">
                    <input spellcheck="false" class="input-size sliderInput" style="background-color:white" @click="showPicker($event,'')">
                    </mu-grid-list>
                </div>
            </mu-list-item>
            <mu-sub-header slot="nested">Gradient Background <mu-checkbox v-model="data.attributes.isGradient" class="subheader-chckbox"/></mu-sub-header>
            <mu-list-item slot="nested" class="paddingZero demiBlackbg" v-no-ripple>
              <div class="gridlist-demo-container" style="margin-top: -6px;">
                <mu-grid-list class="gridlist-demo left" style="padding: 2px 8px !important;line-height: 15px;">Selected Position</mu-grid-list>
                <mu-grid-list class="right">
                  <vue-slider :disabled="!data.attributes.isGradient" ref="gradientSlider" v-model="data.attributes.gradientBackgroundData.value" @callback="handleDrag" @drag-start="setGradientColors($event)" v-bind="data.attributes.gradientBackgroundData" ></vue-slider>
                  <!-- <input spellcheck="false" class="input-size sliderInput"> -->
                </mu-grid-list>
              </div>
            </mu-list-item>
             <mu-list-item slot="nested" class="paddingZero demiBlackbg" v-no-ripple>
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
            <mu-list-item slot="nested" class="paddingZero demiBlackbg" v-no-ripple>
              <div class="gridlist-demo-container">
                <mu-grid-list class="gridlist-demo left">Rotate</mu-grid-list>
                <mu-grid-list class="right">
                <mu-slider :disabled="!data.attributes.isGradient" v-model="data.attributes.gradientBackgroundData.rotation" class="mmslider" :step="1" :max="360"/>
                <input :disabled="!data.attributes.isGradient" spellcheck="false" class="input-size sliderInput" v-model="data.attributes.gradientBackgroundData.rotation">
                </mu-grid-list>
              </div>
            </mu-list-item>
        </mu-list-item>
</div>      
</template>
<script>
import { mapGetters, mapMutations} from 'vuex'
import { Photoshop, Chrome } from "vue-color";
import vueSlider from 'vue-slider-component';
import FileUpload from 'vue-upload-component'
  const API_URL = 'http://206.189.153.177:4000/'
export default {
    name:'backgroundLayer',
    props:['openpanel','data'],
    components: {
    "photoshop-picker": Photoshop,
    "color-picker": Chrome,
    vueSlider,
    },
    data (){
      return {
        files: [],
        selectedGradientColor: 'red',
        expandIcon: 'expand_more',
        value: '',
        value1:0,
        value2: null,
        value3: null,
        selectedHandle: '0',
        dialog: '',
        detail: {},
        selectedPicker: '',
        colors: {
        hex: '#194d33',
        hsl: { h: 150, s: 0.5, l: 0.2, a: 1 },
        hsv: { h: 150, s: 0.66, v: 0.30, a: 1 },
        rgba: { r: 25, g: 77, b: 51, a: 1 },
        a: 1
      }
      }
  },
   computed: {
    ...mapGetters(['getLayers']),
  },
  methods: {
    ...mapMutations(['setSelectedLayerId']),
   open (event) {
      for(let i = 0; i < this.getLayers.length;i++){
        if (this.getLayers[i].id === this.data.id) {
          this.data.selected = !this.data.selected
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
    setGradientColors(evt) {
       this.selectedHandle = evt.currentSlider.toString();
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
      
      // etc...
    },
    handleDrag(evt) {
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
      this.selectedGradientColor = this.data.attributes.gradientBackgroundData.sliderStyle[this.selectedHandle].backgroundColor
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
     inputFilter(newFile, oldFile, prevent) {
        if (newFile && !oldFile) {
            if (!/\.(gif|jpg|jpeg|png|webp)$/i.test(newFile.name)) {
            this.alert('Your choice is not a picture')
            return prevent()
            }
        }
        if (newFile) {
            newFile.url = ''
            newFile.selected = false
            let URL = window.URL || window.webkitURL
                if (URL && URL.createObjectURL) {
                    // newFile.url = newFile.response.statusCode === 201 ? API_URL+newFile.response.response.data.media_path: URL.createObjectURL(newFile.file)
                    newFile.url = URL.createObjectURL(newFile.file)
                    let reader = new Image()
                    reader.src = newFile.url
                    reader.onload = function(){
                    newFile.originalWidth = reader.naturalWidth
                    newFile.originalHeight = reader.naturalHeight
                    }
                }
        }
      },
       inputFile(newFile, oldFile,prevent) {
         this.$refs.upload.active = true
        if (newFile && !oldFile) {
          // add
        }
        if (newFile && oldFile) {
          // update
        }
        if (!newFile && oldFile) {
          // remove
        }
        setTimeout(()=>{
          this.data.image = this.files[0]
        },1000)
      },
  }
}
</script>
<style scoped>
@import './menu.css';
 .flx {
   width: 308px;
 }
</style>


