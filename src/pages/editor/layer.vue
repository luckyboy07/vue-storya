<template>
<div>
    <!-- :handles="'nw,ne,se,sw'" -->
    <rotatable-resizer 
      :id="elem.id"
      :islocked="elem.isBackground ? false :elem.islocked"
      :disabled="!elem.selected" 
      :rotatable="!elem.islocked"
      :draggable="!elem.islocked"
      :rotation="elem.isBackground ? '0' : elem.attributes.rotation.toString()"
      :fixedProportion="false"
      :left="$_isShape(elem) ? elem.attributes.sizeOption === 'Manual' ? elem.x : -7 : elem.x"
      :top="$_isShape(elem) ? elem.attributes.sizeOption === 'Manual' ? elem.y : -7 : elem.y"
      :width="$_isShape(elem) ? elem.attributes.sizeOption === 'Manual' ? elem.width : parentW : elem.width"
      :height="$_isShape(elem) ? elem.attributes.sizeOption === 'Manual' ? elem.height : parentH : elem.height"
      v-for="(elem, i) in layers" :key="i"
      v-show="elem.visible"
      :z="elem.isBackground ? 1:elem.order"
      :zoom="zoom"
      @focused="focused"
      @activated="activated(elem)"
      @rotateStarted="rotateStarted" @rotated="rotated" @rotateEnded="rotateEnded"
      @dragStarted="dragStarted" @dragging="dragging" @dragEnded="dragEnded"
      @resizeStarted="resizeStarted" @resizing="resizing" @resizeEnded="resizeEnded"
      @showXGridLine="onShowXGridLine" @showYGridLine="onShowYGridLine">

      <!-- shape layer :shape="[elem.attributes[0].value.split(' ')[0].toLowerCase(),elem.attributes]" -->
      <!-- <shape id="shape"  v-if="elem.type ==='shape'" :data="elem">
      </shape> -->
      <c-shape id="shape"  v-if="elem.type ==='shape'" :data="elem"></c-shape>
      <!-- shape layer -->

      <!-- image layer -->
      <!-- <img src="http://via.placeholder.com/140x100" style="width: 100%; height: 100%; pointer-events: none;" /> -->
      <image-layer v-if="elem.type ==='image'" id="image"  :layerData="elem" :imgstyle="'width: 100%; height: 100%; pointer-events: none;'"></image-layer>
      <!-- <img v-if="elem.type ==='image'"  id="image"  :layerData="elem" src="http://via.placeholder.com/140x100" style="width: 100%; height: 100%; pointer-events: none;"/> -->
      <!-- image layer -->
      
      <!-- text layer -->
      <text-layer v-if="elem.type ==='text'" id="text" :data="elem" v-model="elem.id" :dragging="isDragging"></text-layer>
      <background-layer v-if="elem.type ==='background'" id="background" :layerData="elem" v-model="elem.id" ></background-layer>
      <!-- text layer -->
      
    </rotatable-resizer>

</div>
</template>
<script>
import appHelper from '../../helpers/app.helper.js'
import undoRedo from '../../helpers/undo-redo.js'
import snackBar from '../../helpers/snackbar.js'
import textLayer from '../../components/editor/text-layer'
import shape from "../../components/editor/shape.vue"
import cssShape from '../../components/editor/css-shape.vue'
import backgroundLayer from '../../components/editor/background'
import { mapActions, mapGetters, mapMutations } from "vuex"
import image from "../../components/editor/image"
export default {
  name: "selectionBox",
  props: ["layers"],
  components: {
    shape,
    imageLayer: image,
    'text-layer': textLayer,
    'c-shape': cssShape,
    backgroundLayer
  },
  data() {
    return {
      focusTimeout: null, // the timer to when the layer gets back its zIndex
      scaleTimeout: null, // the timer to when the layer is reset after arrow keys functions are executed
      shiftKeyOn: false,

      selectedLayer: null,
      previousElem: null,
      
      parentW: 0,
      parentH: 0,
      isDragging: false,
    };
  },
  beforeDestroy() {
    if (this.$el.parentElement.parentElement.parentElement) {
      this.$el.parentElement.parentElement.parentElement.removeEventListener('mousedown', this.handleCanvasClicks)
      this.$el.parentElement.parentElement.parentElement.removeEventListener('keydown', this.handleCanvasKeydown)
      this.$el.parentElement.parentElement.parentElement.removeEventListener('keyup', this.handleCanvasKeyup)
    }
  },
  mounted() {
    // get the parent's dimension
    // var elem1 = document.getElementsByClassName('rr-resizer')
    // console.log('elem1,',elem1)
    // setTimeout(()=>{
    // console.log('elem:',elem)
    // },500)
    var _d = this.getCanvasData();
    this.parentH = _d.height// parseInt(_d.height.replace('px', '')) + 14;
    this.parentW = _d.width;//parseInt(_d.width.replace('px', '')) + 14;
    // handling layer desselection
    if (this.$el.parentElement.parentElement.parentElement) {
      this.$el.parentElement.parentElement.parentElement.addEventListener('mousedown', this.handleCanvasClicks)
      this.$el.parentElement.parentElement.parentElement.addEventListener('keydown', this.handleCanvasKeydown)
      this.$el.parentElement.parentElement.parentElement.addEventListener('keyup', this.handleCanvasKeyup)
    }
  },
  methods: {
    ...mapMutations(['setLayerValue', 'setSelectedLayerId', 'broadCastStatus']),
    ...mapGetters(['getCanvasData']),
    // handling the click event
    handleCanvasClicks(evt) {
      // handle click and shiftkey
      // if clicking/selecting, remove the clone layer by throwing the caling having null params
      this.shiftKeyOn = false;
      this.$emit('scaling', null)

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
      
      this.resetFocus();
    },
    handleCanvasKeydown(evt) {
      if (!this.selectedLayer) {
        if (this.getSelectedLayerId && this.getSelectedLayerId.sourceLayer) {
          this.selectedLayer = this.getSelectedLayerId.sourceLayer;
           this.selectedLayer.selected = true;
        }
      }

      var val = evt.shiftKey ? 10 : 1;
      this.shiftKeyOn = evt.shiftKey;
      if (evt.key === 'ArrowUp') {
        this.$_pevEvent(evt);
        this.$_decreaseLayerY(val);
        this.$_executeAfterArrowKey();
      } else if (evt.key === 'ArrowDown') {
         this.$_pevEvent(evt);
        this.$_increaseLayerY(val);
        this.$_executeAfterArrowKey();
      } else if (evt.key === 'ArrowRight') {
         this.$_pevEvent(evt);
        this.$_increaseLayerX(val);
        this.$_executeAfterArrowKey();
      } else if (evt.key === 'ArrowLeft') {
         this.$_pevEvent(evt);
        this.$_decreaseLayerX(val);
        this.$_executeAfterArrowKey();
      } else if (evt.shiftKey) {
         this.$emit('scaling', this.selectedLayer)
      }
    },
    handleCanvasKeyup(evt) {
      if (evt.key === 'Shift') {
        this.shiftKeyOn = false;
        this.$emit('scaling', null);
      }
    },
    resetFocus() {
       if (this.previousElem) {
        this.previousElem.elem.style.zIndex = this.previousElem.z;
        this.previousElem = null;
       }
    },
    // focusing on item neglecting its order
    focused(elem, data) {
      if (!this.selectedLayer || data.islocked) {
        // snackBar.show("Layer is locked", 800);
        this.broadCastStatus({action: 'notify', layerId: data.id});
        // return;
      }

      if (this.previousElem) {
        this.previousElem.elem.style.zIndex = this.previousElem.z;
        this.previousElem = null;
      }
      elem.style.zIndex = '999';
      this.previousElem = {elem: elem, z: this.selectedLayer.order};

      // deleting previous timeout
      if (this.focusTimeout) {
        window.clearTimeout(this.focusTimeout);
        this.focusTimeout = null;
      }
      // starting a timer to switch between z-indexes
      this.focusTimeout = window.setTimeout(() => {
        this.resetFocus();
      }, 1000);
    },
    activated(elem) {
      // handle click and shiftkey
      // if clicking/selecting, remove the clone layer by throwing the caling having null params
      this.shiftKeyOn = false;
      this.$emit('scaling', null)

      // if (elem.islocked) return;

      console.log('%c Selected: ' + elem.id, 'background-color: red; color: white');
      //  check if there is a previously assigned layer
      // and if the new layer is not equal to the current selected layer
      if (this.selectedLayer && this.selectedLayer.id !== elem.id) {
        // console.log('DIRI')
        // deselect the previous layer
        this.selectedLayer.selected = false
        this.setSelectedLayerId(null)
        this.selectedLayer = null
      }
      this.selectedLayer = elem
      this.selectedLayer.selected = true
        //global layers deselect previous layer
        for (var i = 0; i < this.layers.length; i++) {
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
       this.$_recordEvent();
    },
    rotated(deg) {
      this.selectedLayer.attributes.rotation = deg;
    },
    rotateEnded() {
       this.$_recordEvent();
    },
    dragStarted() {
      this.isDragging = true;
      this.$_recordEvent();
    },
    dragging(left,  top) {
      this.selectedLayer.x = left;
      this.selectedLayer.y = top;

      // to be able to show a ruler guideline
      this.$emit('scaling', this.selectedLayer)
    },
    dragEnded() {
      this.isDragging = false;
      // record for undoo redo event
      // this.$localStorage.set('layers',JSON.stringify(this.layers))
      this.$_recordEvent();
      this.$emit('scaling', null)
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
    onShowXGridLine(show, x) {
      this.$emit('onShowXGridLine', this.selectedLayer, show, x);
    },
    onShowYGridLine(show, y) {
       this.$emit('onShowYGridLine', this.selectedLayer, show, y);
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
         this.resetFocus();
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
    $_increaseLayerX(val) {
       this.selectedLayer.x += val;
       this.$emit('scaling', this.selectedLayer)
    },
    $_decreaseLayerX(val) {
       this.selectedLayer.x -= val;
       this.$emit('scaling', this.selectedLayer)
    },
    $_increaseLayerY(val) {
      this.selectedLayer.y += val;
      this.$emit('scaling', this.selectedLayer)
    },
    $_decreaseLayerY(val) {
      this.selectedLayer.y -= val;
      this.$emit('scaling', this.selectedLayer)
    },
    $_executeAfterArrowKey() {
      // do not throw the scaling (null) event if shiftKey is still active
      if (this.shiftKeyOn) return;

      if ( this.scaleTimeout) {
        // do not stack timeouts
        window.clearTimeout(this.scaleTimeout);
        this.scaleTimeout = null;
      }
      this.scaleTimeout = window.setTimeout(() => {
        this.$emit('scaling', null);
      }, 50);
    },
    $_pevEvent(evt) {
      evt.preventDefault();
      evt.stopPropagation();
    },
  },
  computed: {
    ...mapGetters(["getItems", "getSelectedLayerId"]),
    zoom: function() {
      return this.getCanvasData().zoom;
    }
  },
  watch: {
    getSelectedLayerId: function(val) {
      this.$_updateSelectedLayer(val ? val.id : '');
    },
  },
};
</script>


