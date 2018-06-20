<template>
   <div :style="getStyle()">
    <!-- <img :src="layerData.image.url ? layerData.image.url : require('../../assets/img_default.jpeg')"  :style="getStyle()"/> -->
    <!-- <div class="img-layer-cover"></div> -->
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  name: 'backgroundLayer',
  props:['layerData','imgstyle'],
  data () {
      return {
        addToUndoRedo: true,
        oldLayerData: null,
      }
  },
  methods: {
      getStyle () {
          let att = this.layerData.attributes
          let url = 'url('+this.layerData.image.url +') 50% 50% / cover'
          console.log('att:',att)
          return {
              width: '100%',
              height: '100%',
              position: 'absolute',
              'background-blend-mode': att.backgroundBlendMode,
            //   background: 'url('+this.layerData.image.url !== null ? this.layerData.image.url+') 50% 50%' : '/static/img/img_default.fabb0a1.jpeg'+') 50% 50%' 
            //   background: 'url('+this.layerData.image.url +') 50% 50% / cover '+' '+ att.isGradient ? 'linear-gradient('+att.gradientBackgroundData.rotation+'deg,'+att.gradientBackgroundData.sliderStyle[0].backgroundColor+' '+att.gradientBackgroundData.value[0]+'%,'+att.gradientBackgroundData.sliderStyle[1].backgroundColor+' '+att.gradientBackgroundData.value[1]+'%)' : att.color,
                background: att.isGradient ? url+', '+'linear-gradient('+att.gradientBackgroundData.rotation+'deg,'+att.gradientBackgroundData.sliderStyle[0].backgroundColor+' '+att.gradientBackgroundData.value[0]+'%,'+att.gradientBackgroundData.sliderStyle[1].backgroundColor+' '+att.gradientBackgroundData.value[1]+'%)' : url + att.color,
              'background-size': att.backgroundSize,
              'background-position': att.backgroundPosition,
          }
        //   return this.layer
        //   return this.layerData 
      },
  }  
}
</script>
<style scoped>

</style>


