<template>
  <div class="tl-container" contenteditable="true" spellcheck="false" 
    :style="getStyle()">
    {{layerData.content}}
  </div>
</template>
<script>
export default {
  name: "text-layer",
  props: ['layerData', 'dragging_id'],
  data() {
    return {
      style: null,
    }
  },
  methods: {
    getStyle() {
      var layerData = this.layerData.attributes;
      return {
        fontFamily: layerData.fontFamily,
        fontSize: layerData.fontSize && layerData.fontSize.indexOf('px') !== -1 ? layerData.fontSize : layerData.fontSize + 'px',
        fontWeight: layerData.fontWeight,
        fontStyle: layerData.fontStyle,
        textDecoration: layerData.textDecoration,
        textAlign: layerData.textAlign,
        lineHeight: layerData.lineHeight,
        color: layerData.color,
        backgroundColor: layerData.backgroundColor,
        borderWidth: layerData.borderSize,
        borderStyle: layerData.borderStyle,
        borderColor: layerData.borderColor,
        textShadow: layerData.shadowColor + " " + layerData.shadowSize + " " + layerData.shadowSize 
      }
    },
  }
}
</script>
<style scoped>
.tl-container {
  width: 100%;
  height: 100%;
}
.no-user-select {
  user-select: none!important;
  -moz-user-select: none!important;
  -webkit-user-select: none!important;
  -ms-user-select: none!important;
}

[contenteditable]:focus {
    outline: 0px solid transparent;
}
</style>

