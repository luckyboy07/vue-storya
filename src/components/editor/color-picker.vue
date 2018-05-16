<template>
   <hsc-window-style-metal> 
       <!-- 350 / -80 -->
        <hsc-window id="colorPicker" initialPosition="initialPosition" style="z-index:999;" :resizable="true" :initialWidth="225" :initialHeight="240"
        :closeButton="true" :isOpen="pickerisShow" @closebuttonclick="close" >
          <color-picker v-model="colors" @input="updateValue"></color-picker>
        </hsc-window>
      </hsc-window-style-metal>
</template>
<script>
import {Photoshop, Chrome} from 'vue-color'
export default {
  name:'Colorpicker',
  props:['pickerisShow','initialPosition'],
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
  components:{
    'photoshop-picker': Photoshop,
    'color-picker': Chrome
  },
  methods: {
    updateValue (value) {
        console.log('value:',value)
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
    },
    close() {
        this.$emit('closepicker',false)
    }
  },
}
</script>

