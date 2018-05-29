<template>
  <div :class="{'noselect':isDragging}" ref="editable" class="tl-container" contenteditable="true" spellcheck="false" 
    :style="getStyle()" @keydown="_p" @keyup="_sc()">
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import appHelper from '../../helpers/app.helper.js'
import undoRedo from '../../helpers/undo-redo.js'
export default {
  name: "text-layer",

  props: ['data', 'dragging'],
  data() {
    return {
      style: null,
      addToUndoRedo: true,
      oldLayerData: null,
      currentListType: '',
    }
  },
  mounted() {
    this.currentListType = this.data.attributes.listStyle;
    this.oldLayerData = appHelper.cloneLayer(this.data);
    this.$nextTick(() => this.formatContent(this.data.content))
  },
  beforeUpdate() {
  },
  methods: {
    _p(e) {
      // stop the event from bubling
      // to prevent tihs layer be deleted
      e.stopPropagation();
    },
    _sc() {
      this.data.content = this.$refs.editable.innerHTML;
      if (this.$refs.editable.innerHTML.toString().replace(/<br>/g, '').replace(/<div>/g, '').replace(/<\/div>/g, '').length <= 0) {
        this.data.attributes.listStyle = 'block'
      }
    },
    formatContent(val) {
      if (this.data.attributes.listStyle === 'block') {
        if (val) {
          this.$refs.editable.innerHTML = this.data.content;
          return;
        }
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
            if (this.data.attributes.listStyle === 'ol') {
              return;
            }
            text = text.replace('ol', 'ul');
          } else {
            if (this.data.attributes.listStyle === 'ul') {
              return;
            }
            text = text.replace('ul', 'ol');
          }
          this.$refs.editable.innerHTML =  text;
        } else {
          text = text.replace(/<div>/g, '\n');
          text = text.trim().replace(/<\/div>/g, '');
          var c = text.split('\n')
          var list = '<' + this.data.attributes.listStyle + '>';
          for (var i = 0; i < c.length; i++) {
            list += '<li>' + c[i] + '</li>'
          }
          this.$refs.editable.innerHTML =  list +'</' + this.data.attributes.listStyle + '>';
        }
      }
    },
    getStyle() {
      var layerData = this.data.attributes;
      return {
        // position: 'absolute',
        opacity: layerData.opacity,
        fontFamily: layerData.fontFamily,
        fontSize: layerData.fontSize + 'px',
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
      if (this.data.attributes.listStyle === 'ul') {
        html= html.replace(/<ul>/g, '');
        html = html.replace(/<\/ul>/g, '');
      } else if (this.data.attributes.listStyle === 'ol') {
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
      redoUndoTime: 'getUndoRedoLastAction',
    }),
    isDragging: function() {
      return this.dragging
    }
  },
  watch: {
    addTime: function(val) {
      this.addToUndoRedo = false;
    },
    redoUndoTime: function(val) {
       this.addToUndoRedo = false;
    },
    "data.attributes.listStyle": {
      handler() {
         // list style
        this.formatContent();
        this.currentListType = this.data.attributes.listStyle;
      },
      deep: true
    },
    "data.attributes.rotation": {
      handler() {
        // do not add to undo redo if rotation 
        this.addToUndoRedo = false;
      },
      deep: true
    },
    "data.attributes": {
      handler(val) {
        // undo/redo
        if (!this.addToUndoRedo) {
           this.addToUndoRedo = true;
           return;
        }
        undoRedo.add(appHelper.cloneLayer(this.oldLayerData), 'scale');
        undoRedo.add(appHelper.cloneLayer(this.data), 'scale');
        this.oldLayerData = this.data;
      },
      deep: true
    },
    "data.content": {
      handler(val) {
        undoRedo.add(appHelper.cloneLayer(this.data), 'scale');
      },
      deep: true
    },
  }
}
</script>
<style scoped>
.tl-container {
  width: 100%;
  cursor: auto;
  word-wrap: break-word;
}
.noselect {
  -webkit-user-select: none;  
  -moz-user-select: none;    
  -ms-user-select: none;      
  user-select: none;
}

[contenteditable]:focus {
    outline: 0px solid transparent;
}

</style>

