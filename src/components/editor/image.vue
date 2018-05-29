<template>
  <div style="width: 100%; height: 100%;position: absolute;">
    <img :src="layerData.image.url ? layerData.image.url : 'http://via.placeholder.com/140x100'"  :style="getStyle()"/>
    <div class="img-layer-cover"></div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import appHelper from '../../helpers/app.helper.js'
import undoRedo from '../../helpers/undo-redo.js'
export default {
  name: 'ImageLayer',
  props:['layerData','imgstyle'],
  data () {
      return {
        addToUndoRedo: true,
        oldLayerData: null,
      }
  },
  mounted () {
    this.oldLayerData = appHelper.cloneLayer(this.layerData);
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
  },
  computed: {
    ...mapGetters({
        addTime: 'getLastLayerAddTime',
        redoUndoTime: 'getUndoRedoLastAction',
    }),
  },
  watch: {
    addTime: function(val) {
      this.addToUndoRedo = false;
    },
    redoUndoTime: function(val) {
       this.addToUndoRedo = false;
    },
    "layerData.attributes.rotation": {
      handler() {
        // do not add to undo redo if rotation 
        this.addToUndoRedo = false;
      },
      deep: true
    },
    "layerData.attributes": {
      handler(val) {
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
  },
}
</script>
<style>
.img-layer-cover {
  width: 100%; 
  height: 100%; 
  position: absolute; 
  top: 0;
  user-select: none;
  -moz-user-select: none;
}
</style>


