<template>
 <!--  @focus="resetContent()" @blur="formatContent()" @blur="formatContent()" @keydown="setContent($event)"  @keyup="setContent($event)"-->
  <div ref="editable" class="tl-container" contenteditable="true" spellcheck="false" 
    :style="getStyle()">{{layerData.content}}
    <!-- {{layerData.content}}  v-show="layerData.attributes.listStyle === 'block'" -->
    <!-- <div v-for="(text, i) in layerData.content.split(/[\r\n]+/)" :key="i">{{i}}. {{text}}</div> -->
    <!-- <ol v-show="layerData.attributes.listStyle === 'ol'">
      <li v-for="(text, i) in layerData.content.split(/[\r\n]+/)" :key="i">{{text}}</li>
    </ol>
    <ul v-show="layerData.attributes.listStyle === 'ul'" >
      <li v-for="(text, i) in layerData.content.split(/[\r\n]+/)" :key="i">{{text}}</li>
    </ul> -->
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import appHelper from '../../helpers/app.helper.js'
import undoRedo from '../../helpers/undo-redo.js'
export default {
  name: "text-layer",
  props: ['layerData', 'dragging_id'],
  data() {
    return {
      style: null,
      addToUndoRedo: true,
      oldLayerData: null,
    }
  },
  mounted() {
    // this.$refs.editable.textContent = this.layerData.content;
    this.oldLayerData = appHelper.cloneLayer(this.layerData);
  },
  methods: {
    setContent(evt) {
      var text = this.$refs.editable.innerHTML.toString().replace(/<div>/g, '\n');
      text = text.replace(/<\/div>/g, '');
      // text = text.replace(/<br>/g, '');
      // var c = text.split('\n')
      console.log(c)

    },
    resetContent() {

    },
    formatContent() {
      console.log("formatContent", this.$refs.editable.textContent)
      var text = this.$refs.editable.innerHTML.toString().replace(/<div>/g, '\n');
      text = text.replace(/<\/div>/g, '');
      // text = text.replace(/<br>/g, '');
      var c = text.split('\n')
      console.log(c)

      if (this.layerData.attributes.listStyle === 'block') {
        // return this.layerData.content;
        // this.$refs.editable.innerText = 
      } else {
        var list = '<' + this.layerData.attributes.listStyle + '>';
        // var tc = this.layerData.content.split(/[\r\n]+/);
        for (var i = 0; i < c.length; i++) {
          list += '<li>' + c[i] + '</li>'
        }
        this.$refs.editable.innerHTML =  list +'</' + this.layerData.attributes.listStyle + '>';
      }

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
    ...mapGetters({
      addTime: 'getLastLayerAddTime',
      redoUndoTime: 'getUndoRedoLastAction'
    }),
  },
  watch: {
    addTime: function(val) {
      this.addToUndoRedo = false;
    },
    redoUndoTime: function(val) {
      // console.log('undo redo action')
       this.addToUndoRedo = false;
    },
    "layerData.attributes": {
      handler(val) {
        if (!this.addToUndoRedo) {
           this.addToUndoRedo = true;
           return;
        }
        // console.log(this.oldLayerData, this.layerData)
        undoRedo.add(appHelper.cloneLayer(this.oldLayerData), 'scale');
        // console.log('layerData.attributes', this.layerData.id);
        undoRedo.add(appHelper.cloneLayer(this.layerData), 'scale');
        this.oldLayerData = this.layerData;
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

