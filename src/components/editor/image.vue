<template>
   <img src="http://via.placeholder.com/140x100" style="width: 100%; height: 100%; pointer-events: none;"/>
</template>
<script>
export default {
  name: 'ImageLayer',
  props:['layerData'],
  data () {
      return {

      }
  },
  methods: {
      getStyle () {
          console.log('layerDatasss:',this.layerData);
        //   return this.layer
        //   return this.layerData 
      }
  }
}
</script>

