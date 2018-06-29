<template>
   <hsc-window-style-metal> 
       <!-- 350 / -80 -->
        <hsc-window id="colorPicker" initialPosition="initialPosition" style="z-index:999;" :resizable="true" :initialWidth="225" :initialHeight="240"
        :closeButton="true" :isOpen="pickerisShow" @closebuttonclick="close" >
          <color-picker v-model="colors"  @input="updateValue"></color-picker>
        </hsc-window>
      </hsc-window-style-metal>
</template>
<script>
import {Chrome} from 'vue-color'
export default {
  name:'Colorpicker',
  props:['pickerisShow','initialPosition','target'],
  data () {
      return {
        colors: {
          hex: '#194d33',
          hsl: {h: 150, s: 0.5, l: 0.2, a: 1},
          hsv: {h: 150, s: 0.66, v: 0.30, a: 1},
          rgba: {r: 25, g: 77, b: 51, a: 1},
          a: 1
      }
      }
  },
   beforeMount () {
    document.addEventListener('click', this.hidePicker)
  },
  mounted: function() {
    
     console.log('pickerisShow:',this.pickerisShow)
  },
  components:{
    'color-picker': Chrome,
  },
  methods: {
    updateValue (value) {
        this.target[1].style.backgroundColor = value.hex
        if(this.target[3] === 'border'){
          this.target[2].attributes.borderColor = value.hex
        } else if (this.target[3] === 'shadow') {
          this.target[2].attributes.shadowColor = value.hex
        } else if (this.target[3] === 'backgroundColor') {
          this.target[2].attributes.backgroundColor = value.hex
        } else if (this.target[3] === 'gradient') {
          if(this.target[4] === '0') {
            this.target[2].attributes.gradientBackgroundData.sliderStyle[0].backgroundColor = value.hex;
          }else if (this.target[4] === '1'){
            this.target[2].attributes.gradientBackgroundData.sliderStyle[1].backgroundColor = value.hex;
          }
        // this.target[2].attributes.shadowColor = value.hex
        }else{
          this.target[2].attributes.color = value.hex
        }
    //   this.pickColor = value.hex
        // let selected = this.currentSelectedLayer.attributes
      if (this.colorPickerOwner) {
        // this.colorPickerOwner.value = this.pickColor
        if(this.currentSelectedAttributes.name === 'colour'){
        //   this.applyProperty(this.currentSelectedIndex, this.colorType, 'rgba('+ value.rgba.r + ',' + value.rgba.g + ',' + value.rgba.b + ',' + value.rgba.a+')')
        }else{
        //   this.applyProperty(this.currentSelectedIndex, this.colorType, this.pickColor)
        }
      }
    },hidePicker(evt) {
        if(this.pickerisShow && !document.getElementById('colorPicker').contains(window.event.target)){
            this.close()
        }
    },
    close() {
        this.$emit('closepicker',false)
    }
  },
}
</script>

