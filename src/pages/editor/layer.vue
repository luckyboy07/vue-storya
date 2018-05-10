<template>
<div>
    <rotatable-resizer 
    :id="elem.id"
    :parent="true"
    :active="true"
    :rotatable="true"
    :draggable="true"
    :handles="''"
    :rotation="0"
    :fixedProportion="false"
    :left="100"
    :top="100"
    :width="100"
    :height="100"
    v-for="(elem, i) in layers" :key="i"
    @activated="activated(elem)"
    @rotated="rotated" @rotateEnded="rotateEnded"
    @dragging="dragging" @dragEnded="dragEnded"
    @resizing="resizing" @resizeEnded="resizeEnded">
    <shape id="shape"  v-if="elem.type ==='shape'" :layerId="elem.id" 
    :shape="[elem.attributes[0].value.split(' ')[0].toLowerCase(),elem.attributes]">
    </shape>
    <img v-if="elem.type ==='image'" id="image" src="http://via.placeholder.com/140x100" style="width: 100%; height: 100%; pointer-events: none;"/>
    <div id="text" contenteditable="false" v-if="elem.type ==='text'" spellcheck="false">
    </div>
    </rotatable-resizer>
</div>
</template>
<script>
import shape from "./shapes/shape.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "selectionBox",
  props: ["layers"],
  components: {
    shape
  },
  data() {
    return {
    };
  },
  methods: {
    activated(elem) {
      console.log('activated');
    },
    rotated(deg) {
      console.log('rotated');
    },
    rotateEnded() {
      console.log('rotateEnded');
    },
    dragging(left,  top) {
      console.log('dragging');
    },
    dragEnded() {
      console.log('dragEnded');
    },
    resizing(left, top, width, height) {
      console.log('resizing');
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

