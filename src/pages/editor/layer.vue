<template>
<div>
    <rotatable-resizer 
    :id="elem.id"
    :active="elem.selected"
    :disabled="!elem.open" 
    :rotatable="true"
    :draggable="true"
    :handles="'nw,ne,se,sw'"
    :rotation="elem.attributes.rotation"
    :fixedProportion="false"
    :left="elem.x"
    :top="elem.y"
    :width="elem.width"
    :height="elem.height"
    v-for="(elem, i) in layers" :key="i"
    @activated="activated(elem)"
    @rotateStarted="rotateStarted" @rotated="rotated" @rotateEnded="rotateEnded"
    @dragStarted="dragStarted" @dragging="dragging" @dragEnded="dragEnded"
    @resizeStarted="resizeStarted" @resizing="resizing" @resizeEnded="resizeEnded">

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
    };
  },
  beforeDestroy() {
    this.$el.parentElement.removeListener('mousedown', this.handleCanvasClicks)
  },
  mounted() {
    // handling layer desselection
    this.$el.parentElement.addEventListener('mousedown', this.handleCanvasClicks)
  },
  methods: {
    ...mapMutations(['setLayerValue']),
    // handling the click event
    handleCanvasClicks(evt) {
      if (this.selectedLayer) {
        console.log(this.selectedLayer.type);
        // deselect the previous layer
        this.selectedLayer.selected = false;
        this.selectedLayer = null;

        console.log("layer deactivated");
      }
    },
    activated(elem) {
      console.log('%c ' + elem.id, 'background-color: red; color: white');
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
    rotateStarted() {
      // starting point 
       this.$_recordEvent();
    },
    rotated(deg) {
      this.selectedLayer.attributes.rotation = deg;
    },
    rotateEnded() {
       this.$_recordEvent();
    },
    dragStarted() {
      this.$_recordEvent();
    },
    dragging(left,  top) {
      this.selectedLayer.x = left;
      this.selectedLayer.y = top;
    },
    dragEnded() {
      // record for undoo redo event
      this.$_recordEvent();
    },
    resizeStarted() {
      this.$_recordEvent();
    },
    resizing(left, top, width, height) {
      this.selectedLayer.width = width;
      this.selectedLayer.height = height;
    },
    resizeEnded(left, top, width, height) {
      this.$_recordEvent();
    },
    // record event to undo/redo module
    $_recordEvent() {
      undoRedo.add(appHelper.cloneLayer(this.selectedLayer), 'scale');
    }
  },
  computed: {
    ...mapGetters(["getItems"])
  }
};
</script>

