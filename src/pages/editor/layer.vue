<template>
<div>
    <rotatable-resizer 
    :id="elem.id"
    :active="true"
    :disabled="!elem.open" 
    :rotatable="true"
    :draggable="true"
    :handles="''"
    :rotation="0"
    :fixedProportion="false"
    :left="elem.x"
    :top="elem.y"
    :width="elem.width"
    :height="elem.height"
    v-for="(elem, i) in layers" :key="i"
    @activated="activated(elem)"
    @rotated="rotated" @rotateEnded="rotateEnded"
    @dragStarted="dragStarted" @dragging="dragging" @dragEnded="dragEnded"
    @resizing="resizing" @resizeEnded="resizeEnded">

    <!-- shape layer -->
    <shape id="shape"  v-if="elem.type ==='shape'" :layerId="elem.id" 
      :shape="[elem.attributes[0].value.split(' ')[0].toLowerCase(),elem.attributes]">
    </shape>
    <!-- shape layer -->

    <!-- image layer -->
    <img v-if="elem.type ==='image'"  id="image"  src="http://via.placeholder.com/140x100" style="width: 100%; height: 100%; pointer-events: none;"/>
    <!-- image layer -->
    
    <!-- text layer -->
    <text-layer v-if="elem.type ==='text'" :layerData="elem" :dragging_id="selectedLayer ? selectedLayer.id : ''"></text-layer>
    <!-- text layer -->

    </rotatable-resizer>
</div>
</template>
<script>
import appHelper from '../../helpers/app.helper.js'
import undoRedo from '../../helpers/undo-redo.js'
import textLayer from '../../components/editor/text-layer'
import shape from "./shapes/shape.vue";
import { mapActions, mapGetters, mapMutations } from "vuex";
import image from "../../components/editor/image";
export default {
  name: "selectionBox",
  props: ["layers"],
  components: {
    shape,
    imageLayer: image,
    'text-layer': textLayer,
  },
  data() {
    return {
      selectedLayer: null,
      tempLayer: null, // for undo/redo storage before the actual layer changes
    };
  },
  methods: {
    ...mapMutations(['setLayerValue']),
    activated(elem) {
      console.log('activated');
      //  check if there is a previously assigned layer
      // and if the new layer is not equal to the current selected layer
      if (this.selectedLayer && this.selectedLayer.id !== elem.id) {
        // disselect the previous layer
        this.selectedLayer.selected = false;
        this.selectedLayer = null;
      }
      this.selectedLayer = elem;
      this.selectedLayer.selected = true;
    },
    rotated(deg) {
      console.log('rotated');
    },
    rotateEnded() {
      console.log('rotateEnded');
    },
    dragStarted() {
      console.log("drag started");
      // this.tempLayer = appHelper.cloneLayer(this.selectedLayer);
      undoRedo.add(appHelper.cloneLayer(this.selectedLayer), 'modify');
    },
    dragging(left,  top) {
      console.log('dragging');
      this.selectedLayer.x = left;
      this.selectedLayer.y = top;
    },
    dragEnded() {
      console.log('dragEnded');
      // record for undoo redo event
      console.log(this.tempLayer);
      // undoRedo.add(this.tempLayer, 'modify');
      undoRedo.add(appHelper.cloneLayer(this.selectedLayer), 'modify');
    },
    resizing(left, top, width, height) {
      this.selectedLayer.width = width
      this.selectedLayer.height = height
      // this.selectedLayer
    },
    resizeEnded(left, top, width, height) {
      console.log('resizeEnded');
    }
  },
  computed: {
    ...mapGetters(["getItems"])
  }
};
</script>

