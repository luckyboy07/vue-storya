<template>
  <div ref="editable" class="tl-container" contenteditable="true" spellcheck="false" 
    :style="getStyle()" @keydown="setContent($event)">
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
      currentListType: '',
    }
  },
  mounted() {
    this.$refs.editable.innerHTML = this.layerData.content;
    this.currentListType = this.layerData.attributes.listStyle;
    this.oldLayerData = appHelper.cloneLayer(this.layerData);
    this.formatContent();
  },
  methods: {
    setContent(evt) {
      if (this.layerData.attributes.listStyle !== 'block' && (evt.key === 'Delete' || evt.key === 'Backspace')) {
        if (!this.canDelete()) {
          evt.preventDefault();
        }
      }
      if (this.$refs.editable.innerHTML.toString().replace(/<br>/g, '').replace(/<div>/g, '').replace(/<\/div>/g, '').length <= 0) {
        this.layerData.attributes.listStyle = 'block'
      }

      this.layerData.content = this.$refs.editable.innerHTML.toString();
    },
    formatContent() {
      if (this.layerData.attributes.listStyle === 'block') {
        var html = this.$refs.editable.innerHTML.toString().trim();
        html= html.replace(/<ul>/g, '');
        html = html.replace(/<\/ul>/g, '');
        html= html.replace(/<ol>/g, '');
        html = html.replace(/<\/ol>/g, '');
        html = html.replace(/<\/li>/g, '');
        var c = html.split(/<li>/g)
        var newHtml = "";
        for (var i = 0; i < c.length; i++) {
          if (!c[i]) {
            continue;
          }
          newHtml += '<div>' + c[i] + '</div>';
        }
         this.$refs.editable.innerHTML = newHtml;
      } else {
        var text = this.$refs.editable.innerHTML.toString();
        if (text && text.indexOf('ol') !== -1 || text.indexOf('ul') !== -1) {
          if (text && text.indexOf('ol') !== -1) {
            if (this.layerData.attributes.listStyle === 'ol') {
              return;
            }
            text = text.replace('ol', 'ul');
          } else {
            if (this.layerData.attributes.listStyle === 'ul') {
              return;
            }
            text = text.replace('ul', 'ol');
          }
          this.$refs.editable.innerHTML =  text;
        } else {
          text = text.replace(/<div>/g, '\n');
          text = text.trim().replace(/<\/div>/g, '');
          var c = text.split('\n')
          var list = '<' + this.layerData.attributes.listStyle + '>';
          for (var i = 0; i < c.length; i++) {
            list += '<li>' + c[i] + '</li>'
          }
          this.$refs.editable.innerHTML =  list +'</' + this.layerData.attributes.listStyle + '>';
        }
      }
    },
    getStyle() {
      var layerData = this.layerData.attributes;
      return {
        position: 'absolute',
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
    canDelete() {
      // check for list type
      var html = this.$refs.editable.innerHTML.toString();
      if (this.layerData.attributes.listStyle === 'ul') {
        html= html.replace(/<ul>/g, '');
        html = html.replace(/<\/ul>/g, '');
      } else if (this.layerData.attributes.listStyle === 'ol') {
        html= html.replace(/<ol>/g, '');
        html = html.replace(/<\/ol>/g, '');
      }
      // var items = html
      if ( (html.replace(/<li>/g, '').replace(/<\/li>/g, '').replace(/<br>/g, '')).length < 1 ) {
        return false;
      }
      return true;
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
       this.addToUndoRedo = false;
    },
    "layerData.attributes": {
      handler(val) {
        // list style
        this.formatContent();
        this.currentListType = this.layerData.attributes.listStyle;

        // undo/redo
        if (!this.addToUndoRedo) {
           this.addToUndoRedo = true;
           return;
        }
        undoRedo.add(appHelper.cloneLayer(this.oldLayerData), 'scale');
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

