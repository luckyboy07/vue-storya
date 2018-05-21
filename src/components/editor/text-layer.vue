<template>
 <!-- @blur="formatContent()" -->
  <div ref="editable" class="tl-container" contenteditable="true" spellcheck="false" 
    :style="getStyle()" @keydown="setContent($event)">
    <!-- {{layerData.content}} -->
    <div v-show="layerData.attributes.listStyle === 'block'">{{layerData.content}}</div>
    <ol v-show="layerData.attributes.listStyle === 'ol'">
      <li v-for="(text, i) in layerData.content.split(/[\r\n]+/)" :key="i">{{text}}</li>
    </ol>
    <ul v-show="layerData.attributes.listStyle === 'ul'" >
      <li v-for="(text, i) in layerData.content.split(/[\r\n]+/)" :key="i">{{text}}</li>
    </ul>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  name: "text-layer",
  props: ['layerData', 'dragging_id'],
  data() {
    return {
      style: null,
    }
  },
  mounted() {
    this.$refs.editable.textContent = this.layerData.content;
  },
  methods: {
    setContent(evt) {
      // this.layerData.content = this.$refs.editable.textContent;
    },
    formatContent() {
      console.log("formatContent", this.$refs.editable.textContent)
      // if (this.layerData.attributes.listStyle === 'block') {
      //   // return this.layerData.content;
      //   // this.$refs.editable.innerText = 
      // } else {
      //   var list = '<' + this.layerData.attributes.listStyle + '>';
      //   var tc = this.layerData.content.split(/[\r\n]+/);
      //   for (var i = 0; i < tc.length; i++) {
      //     list += '<li>' + tc[i] + '</li>'
      //   }
      //   this.$refs.editable.innerHTML =  list +'</' + this.layerData.attributes.listStyle + '>';
      // }

    },
    getStyle() {
      var layerData = this.layerData.attributes;
      return {
        fontFamily: layerData.fontFamily,
        fontSize: layerData.fontSize.indexOf('px') !== -1 ? layerData.fontSize : layerData.fontSize + 'px',
        fontWeight: layerData.fontWeight,
        fontStyle: layerData.fontStyle,
        textDecoration: layerData.textDecoration,
        textAlign: layerData.textAlign,
        lineHeight: layerData.lineHeight,
        color: layerData.color,
        backgroundColor: layerData.backgroundColor,
        border: layerData.borderSize + 'px ' + layerData.borderStyle + ' ' + layerData.borderColor,
        textShadow: '' + layerData.shadowSize + 'px' + ' ' + layerData.shadowSize + 'px ' + layerData.shadowSize + 'px ' + layerData.shadowColor + ',' + layerData.shadowSize + 'px ' + layerData.shadowSize + 'px ' + layerData.shadowSize + 'px ' + layerData.shadowColor
      }
    },
  },
  computed: {
    ...mapGetters(['getLastLayerAddTime']),
  },
  watch: {
    getLastLayerAddTime: function(val) {
      console.log('getLastLayerAddTime', val)
    },
    "layerData.attributes": {
      handler(val) {
        console.log('layerData.attributes', this.layerData.id);
      },
      deep: true
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

