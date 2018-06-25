<template>
  <div style="width: 100%; height: 100%;position: absolute;">
    <img ref="img" class="img-sel" :src="layerData.image.url ? layerData.image.url : require('../../assets/img_default.jpeg')"  :style="getStyle()"/>
    <div class="img-layer-cover">
      <loading-progress v-show="!layerData.loaded && layerData.width > 60 && layerData.height > 30"
        style="position: absolute;margin: auto;left: 0;right: 0;top: 0;bottom: 0;"
        :progress="100"
        :indeterminate="true"
        :counter-clockwise="false"
        :hide-background="false"
        :size="getSize()"
        rotate
        fillDuration="2"
        rotationDuration="1"
      />
    </div>
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
    // this.$refs.img.onload = () => {
    //   this.layerData.loaded = true;
    // }
    //  this.$el.querySelector('.img-sel').addEventListener('load', () => {
    //    console.log('loaded', this.layerData.id)
    //  });
  },
  methods: {
      getStyle () {
          let layerData = this.layerData.attributes
          let shadows = layerData.shadowSize > 0 ? '1px 12px '+layerData.shadowSize+'px '+layerData.shadowColor : ''
          return {
              borderColor: layerData.borderColor,
              borderWidth: layerData.borderWidth+'px',
              borderStyle: layerData.borderStyle.toLowerCase(),
              objectFit: layerData.objectFit.toLowerCase(),
              opacity: this.layerData.loaded ? layerData.opacity : 0.5,
              rotation: layerData.rotation,
              shadowColor: layerData.shadowColor,
              sizeOption: layerData.sizeOption,
              boxShadow: layerData.shadowColor ? shadows : '',
              width: '100%',
              height: '100%',
              "-webkit-filter": "blur(" + layerData.filterBlur + "px)",
              filter: "blur(" + layerData.filterBlur + "px)",
          }
        //   return this.layer
        //   return this.layerData 
      },
      bindLoadedEvent(data) {
        var img = this.$el.querySelector('.img-sel');
        img.addEventListener('load', () => {
          console.log('img loaded', this.layerData.id)
           this.layerData.loaded = true;
        });
        // this.$nextTick(() => {
        //   var img = this.$el.querySelector('.img-sel');
        //   console.log(img, this.layerData.id);
        //   this.layerData.loaded = true;
        // });
      },
      getSize() {
        var min = Math.min(this.layerData.width, this.layerData.height);
        return min / 2;
      },
  },
  computed: {
    ...mapGetters({
        addTime: 'getLastLayerAddTime',
        redoUndoTime: 'getUndoRedoLastAction',
    }),
  },
  watch: {
    addTime: {
      handler(val) {
        this.addToUndoRedo = false;
      },
      deep: true
    },
    redoUndoTime: {
      handler(val) {
        this.addToUndoRedo = false;
      },
      deep: true
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
    "layerData.image.url": function(e) {
      this.bindLoadedEvent(this.layerData)
    },
    "layerData.loaded": function(val) {
      console.log('layerData.loaded', val)
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


