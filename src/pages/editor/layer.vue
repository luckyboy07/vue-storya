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

    <!-- shape layer :shape="[elem.attributes[0].value.split(' ')[0].toLowerCase(),elem.attributes]" -->
    <shape id="shape"  v-if="elem.type ==='shape'" :data="elem">
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
import shape from "../../components/editor/shape.vue";
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
    ...mapMutations(['setLayerValue', 'setSelectedLayerId']),
    // handling the click event
    handleCanvasClicks(evt) {
      if (this.selectedLayer) {
        // deselect the previous layer
        this.selectedLayer.selected = false;
        this.selectedLayer = null;
      } else {
        // reset all layers
        for (var i = 0; i < this.layers.length; i++) {
          this.layers[i].selected = false;
        }
      }
    },
    activated(elem) {
      console.log('%c ' + elem.id, 'background-color: red; color: white');
      //  check if there is a previously assigned layer
      // and if the new layer is not equal to the current selected layer
      if (this.selectedLayer && this.selectedLayer.id !== elem.id) {
        // deselect the previous layer
        this.selectedLayer.selected = false;
        this.setSelectedLayerId(null);
        this.selectedLayer = null;
      }
      this.selectedLayer = elem;
      this.selectedLayer.selected = true;

      // tell other modules that there is a new layer selected
      if (this.getSelectedLayerId !== this.selectedLayer.id) {
        this.setSelectedLayerId(this.selectedLayer.id)
      }
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
    },
    $_updateSelectedLayer(newSelectedLayerId) {
      // TODO: change the value of selectedLayer 
      // related to the specified id
      var selectLayer = (id) => {
        for (var i = 0; i < this.layers.length; i++) {
          if (id === this.layers[i].id) {
            this.selectedLayer = this.layers[i];
            this.selectedLayer.selected = true;
          }
          else {
            this.layers[i].selected = false;
          }
        }
      };
      // check if this.selectedLayer is null or 
      // the newSelectedLayerId and selectedLayer are the same
      // if so, just ignore it
      if (!this.selectedLayer || (this.selectedLayer && this.selectedLayer.id !== newSelectedLayerId)) {
        selectLayer(newSelectedLayerId);
      }
      // etc.
    },
  },
  computed: {
    ...mapGetters(["getItems", "getSelectedLayerId"])
  },
  watch: {
    getSelectedLayerId: function(val) {
      this.$_updateSelectedLayer(val ? val.id : '');
    }
  },
};
</script>

