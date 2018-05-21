<template>
<div>
    <rotatable-resizer 
    :id="elem.id"
    :disabled="!elem.selected" 
    :rotatable="$_isShape(elem) ? elem.attributes.sizeOption === 'Manual' ? true : false : true"
    :draggable="$_isShape(elem) ? elem.attributes.sizeOption === 'Manual' ? true : false : true"
    :handles="'nw,ne,se,sw'"
    :rotation="$_isShape(elem) ? elem.attributes.sizeOption === 'Manual' ?  elem.attributes.rotation : 0 :  elem.attributes.rotation"
    :fixedProportion="false"
    :left="$_isShape(elem) ? elem.attributes.sizeOption === 'Manual' ? elem.x : -7 : elem.x"
    :top="$_isShape(elem) ? elem.attributes.sizeOption === 'Manual' ? elem.y : -7 : elem.y"
    :width="$_isShape(elem) ? elem.attributes.sizeOption === 'Manual' ? elem.width : parentW : elem.width"
    :height="$_isShape(elem) ? elem.attributes.sizeOption === 'Manual' ? elem.height : parentH : elem.height"
    v-for="(elem, i) in layers" :key="i"
    v-show="elem.visible"
    :z="elem.order"
    @activated="activated(elem)"
    @rotateStarted="rotateStarted" @rotated="rotated" @rotateEnded="rotateEnded"
    @dragStarted="dragStarted" @dragging="dragging" @dragEnded="dragEnded"
    @resizeStarted="resizeStarted" @resizing="resizing" @resizeEnded="resizeEnded">

    <!-- shape layer :shape="[elem.attributes[0].value.split(' ')[0].toLowerCase(),elem.attributes]" -->
    <shape id="shape"  v-if="elem.type ==='shape'" :data="elem">
    </shape>
    <!-- shape layer -->

    <!-- image layer -->
     <!-- <img src="http://via.placeholder.com/140x100" style="width: 100%; height: 100%; pointer-events: none;" /> -->
    <image-layer v-if="elem.type ==='image'" id="image"  :layerData="elem" :imgstyle="'width: 100%; height: 100%; pointer-events: none;'"></image-layer>
    <!-- <img v-if="elem.type ==='image'"  id="image"  :layerData="elem" src="http://via.placeholder.com/140x100" style="width: 100%; height: 100%; pointer-events: none;"/> -->
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
import shape from "../../components/editor/shape.vue"
import { mapActions, mapGetters, mapMutations } from "vuex"
import image from "../../components/editor/image"
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
      parentW: 0,
      parentH: 0,
    };
  },
  beforeDestroy() {
    this.$el.parentElement.removeEventListener('mousedown', this.handleCanvasClicks)
  },
  mounted() {
    // get the parent's dimension
    var _d = this.getCanvasData();
    this.parentH = parseInt(_d.height.replace('px', '')) + 14;
    this.parentW = parseInt(_d.width.replace('px', '')) + 14;
    // handling layer desselection
    this.$el.parentElement.addEventListener('mousedown', this.handleCanvasClicks)
  },
  methods: {
    ...mapMutations(['setLayerValue', 'setSelectedLayerId']),
    ...mapGetters(['getCanvasData']),
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
      console.log('asdasd')
      // console.log('%c ' + elem.id, 'background-color: red; color: white');
      //  check if there is a previously assigned layer
      // and if the new layer is not equal to the current selected layer
      if (this.selectedLayer && this.selectedLayer.id !== elem.id) {
        console.log('DIRI')
        // deselect the previous layer
        this.selectedLayer.selected = false
        this.setSelectedLayerId(null)
        this.selectedLayer = null
      }
      this.selectedLayer = elem
      this.selectedLayer.selected = true
        //global layers deselect previous layer
        for (var i = 0; i < this.layers.length; i++) {
          this.layers[i].selected = false;
          if(this.layers[i].id === elem.id){
              this.layers[i].selected = true
          }else {
             this.layers[i].selected = false
          }
        }
      // tell other modules that there is a new layer selected
      if (this.getSelectedLayerId !== this.selectedLayer.id) {
        this.setSelectedLayerId(this.selectedLayer.id)
      }
    },
    rotateStarted() {
      // starting point 
       this.$_recordEordEvent();
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
    $_isShape(layer) {
      return layer.type === 'shape'
    },
  },
  computed: {
    ...mapGetters(["getItems", "getSelectedLayerId"])
  },
  watch: {
    getSelectedLayerId: function(val) {
      this.$_updateSelectedLayer(val ? val.id : '');
    },
  },
};
</script>

