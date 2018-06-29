<template>
  <div class="gipang-awat">
     <!-- :left="getPos(layer).x" -->
      <!-- :top="getPos(layer).y" -->
    <rotatable-resizer 
      v-for="(elem, i) in layers" :key="i"
      :id="'outer-' + elem.id"
      :islocked="elem.isBackground ? false :elem.islocked"
      :active="elem.selected"
      :disabled="!elem.selected" 
      :rotatable="!elem.islocked"
      :draggable="!elem.islocked"
      :rotation="elem.isBackground ? '0' : elem.attributes.rotation.toString()"
      :fixedProportion="false"
      :left="elem.x"
      :top="elem.y"
      :width="elem.width"
      :height="elem.height"
      v-show="elem.visible"
      :z="elem.isBackground ? 1:elem.order"
      @rotated="rotated"
      @dragging="dragging"
      @resizing="resizing"
      :canExecute="false">
    </rotatable-resizer>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  name: 'layer-cloner',
  props: ['layers'],
  mounted() {
    var pB = document.getElementById('parent1').getBoundingClientRect();
    this.pW = pB.width;
    this.pH = pB.height;
  },
  data() {
    return {
      
    }
  },
  methods: {
    resizing(w, h, dx, dy) {
      console.log('resizing', w, h, dx, dy)
      this.selectedLayer.sourceLayer.width  = w;
      this.selectedLayer.sourceLayer.height = h;
    },
    dragging(x, y) {
      var layer = this.selectedLayer.sourceLayer;
      console.log('fuck',layer.x, layer.y)
      console.log('fuck',x, y)
      
    },
    rotated(deg) {
      // for (var i = 0; i < this.layers.length; i++) {
      //   if (this.layers[i].selected) {
      //     this.layers[i].attributes.rotation = deg;
      //   }
      // }
    },
    getPos(layer) {
      var elem = document.getElementById(layer.id);
      console.log(layer)
      if (elem) {
          var bounds = elem.getBoundingClientRect();
          this.clonedElement = document.getElementById('outer-' + layer.id)
          this.clonedElement.style.top = bounds.top + 'px';
          this.clonedElement.style.left = bounds.left + 'px';
          var cloneBounds = this.clonedElement.getBoundingClientRect();
          var oL = cloneBounds.left - bounds.left;
          var oT = cloneBounds.top - bounds.top;
          this.clonedElement.style.top = cloneBounds.top + -oT * 2 + 'px';
          this.clonedElement.style.left = cloneBounds.left - oL * 2 + 'px';
          this.clonedElement.style.width = parseInt(elem.style.width) + 'px';
          this.clonedElement.style.height = parseInt(elem.style.height) + 'px';
          this.clonedElement.style.transform = elem.style.transform;
          this.clonedElement.style.opacity = 1;
      }
    },
  },
  computed: {
    ...mapGetters({
      selectedLayer: 'getSelectedLayerId',
    })
  },
  watch: {
    "selectedLayer.sourceLayer": {
      handler(val) {
        this.getPos(val);
      },
      deep: true
    }
  }
}
</script>
<style scoped>

</style>

