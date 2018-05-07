<template>
<div>
    <rotatable-resizer
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
    >
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
import shape from './shapes/shape.vue'
import {mapActions, mapGetters} from 'vuex'
export default {
  name: 'selectionBox',
  props:['layers'],
  components: {
      shape
  },
  data () {
      return {

      }
  },
  computed: {
       ...mapGetters(['getItems'])
  }
}
</script>

