<template>
   <img :src="layerData.image.url ? layerData.image.url : 'http://via.placeholder.com/140x100'"  :style="getStyle()"/>
</template>
<script>
export default {
  name: 'ImageLayer',
  props:['layerData','imgstyle'],
  data () {
      return {

      }
  },
  mounted () {
          console.log('layerDatasss:',this.layerData);
          console.log('imgstyle:',this.imgstyle);
        //   
  },
  methods: {
      getStyle () {
          let layerData = this.layerData.attributes
          let shadows = '1px 12px '+layerData.shadowSize+'px '+layerData.shadowColor
          return {
              borderColor: layerData.borderColor,
              borderWidth: layerData.borderWidth+'px',
              borderStyle: layerData.borderStyle.toLowerCase(),
              objectFit: layerData.objectFit.toLowerCase(),
              opacity: layerData.opacity,
              rotation: layerData.rotation,
              shadowColor: layerData.shadowColor,
              sizeOption: layerData.sizeOption,
              boxShadow: layerData.shadowColor ? shadows : '',
              width: '100%',
              height: '100%'
          }
        //   return this.layer
        //   return this.layerData 
      },
        
  }
}
</script>
<style>

</style>


