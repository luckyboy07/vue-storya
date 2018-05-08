<template>
	<!-- <div v-bind:class="[shapeSelected]">
		polygoin
		pints: rotation, margin-top, right side size, left height, right margin, right height
	</div> -->
	<svg :id="'shape-parent-' + layerId">
	<circle :id="'shape-' + layerId" cx="100" cy="100" r="70"  fill="red" stroke-width="3" v-if="shapeSelected === 'circle'" />
		<rect  style="width: 100%; height: 100%; margin: 1px;" fill="red" stroke="black" stroke-width="3"  
			v-if="shapeSelected === 'square'"/>

		<polygon style="width: 100%; height: 100%" points="130, 0, 274, 197, 0, 197" fill="red" stroke="black" stroke-width="3"  
			v-if="shapeSelected === 'triangle'" />
	 	<!-- <defs>
              <linearGradient id="Gradient2" :gradientTransform="'rotate('+ findobject('rotate').value + ' .5 .5)'">
				  <stop v-for="(item, i) in findobject('gradient').value" :key="i" :offset="item +'%'" :stop-color="i === 0 ? 'red':'blue'"> </stop>
				<stop :offset="shape[1].content_type === 'gradient' ? shape[1].value[0] : 0 + 'px'" stop-color="red"/>
				<stop offset="90%" stop-color="blue"/>
          	</linearGradient>
          </defs> -->
	</svg> 
</template>

<script>
import {mapGetters} from 'vuex'
import * as $this from 'linq'
export default {
	  beforeMount () {
		  console.log('this.shape:',this.shape[1])
	    this.updateShapeType(this.shape[0])
	},
	 	name: 'shape',
    	props: ['shape', 'layerId'],
    	watch: {
    		shape_type: function (_shapeType) {
    			this.updateShapeType(_shapeType)
    		},
    	},
    	data () {
    		return {
    			shapeSelected: ''
    		}
    	},
    	methods: {
    		updateShapeType (_shapeType) {
    			console.log('updateShapeType', _shapeType)
    			this.shapeSelected = _shapeType
    		},
			findobject (name) {
				let obj = this.shape[1].find((e)=> {
					return e.content_type === name
				});
				return obj;
			}
    	}
	}
</script>

<style>
  @import './shapes.css';
   #shapeContainer {
    width:35%;
    height:100%;
    margin:auto;
    background-image:linear-gradient(to bottom,rgba(255,159,63,0.2),rgba(255,159,63,0.8)),
                     url(http://coothead.co.uk/images/amy.jpg);
    background-size:auto 100%;  
    background-position:center top;
 }
 #shapeContainer svg {
    display:block;
    width:100%; 
    height:100%;
 }
</style>