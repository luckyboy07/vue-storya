<template>
   <img src="http://via.placeholder.com/140x100" style="width: 100%; height: 100%; pointer-events: none;" :style="getStyle()"/>
</template>
<script>
export default {
  name: 'ImageLayer',
  props:['layerData'],
  data () {
      return {

      }
  },
  mounted () {
          console.log('layerDatasss:',this.layerData);
  },
  methods: {
      getStyle () {
          let layerData = this.layerData.attributes
          return {
              borderColor: layerData.borderColor,
              borderWidth: layerData.borderWidth+'px',
              borderStyle: layerData.borderStyle.toLowerCase(),
              objectFit: layerData.objectFit.toLowerCase(),
              opacity: layerData.opacity,
              rotation: layerData.rotation,
              shadowColor: layerData.shadowColor,
              sizeOption: layerData.sizeOption
          }
        //   return this.layer
        //   return this.layerData 
      },
      
  }
}
</script>

