<template>
	<svg class="shape-container" :style="{opacity: data.attributes.opacity}">
		<!-- v-if="shapeSelected === 'square'" -->
    <defs>
      <pattern id="fillImage" 
        patternUnits="userSpaceOnUse"  preserverAspectRatio="yes" :height="data.height" :width="data.width">
        <image preserverAspectRatio="none" :height="data.height" :width="data.width"
          :xlink:href="data.attributes.backgroundImageUri"></image>
      </pattern>
    </defs>
		<!-- <circle
      v-if="data.attributes.shape === 'Circle'" :cx="data.width / 2" :cy="data.height / 2" :r="getRadius()" 
      :stroke-linecap="data.attributes.borderStyle" 
      :fill="!data.attributes.backgroundImageUri ? data.attributes.color : fill" :stroke="data.attributes.borderColor" 
      :stroke-width="data.attributes.borderSize" :stroke-dasharray="data.attributes.borderStyle !== 'Solid' ? (data.attributes.borderSize / 6) + ' ' + (data.attributes.borderSize * 2) : 0">
    </circle> -->
		 <!-- style="width: 100%; height: 100%; margin: 1px;"  -->
		<rect  v-if="data.attributes.shape === 'Circle'" width="100%" height="100%" 
      :fill="!data.attributes.backgroundImageUri ? data.attributes.color : fill" 
      :stroke="data.attributes.borderColor" 
      :stroke-width="data.attributes.borderSize"/>

		<!-- <polygon style="width: 100%; height: 100%" points="130, 0, 274, 197, 0, 197" fill="red" stroke="black" stroke-width="3"  
			v-if="shapeSelected === 'triangle'" /> -->
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
import { mapGetters } from "vuex";
import * as $this from "linq";
export default {
  name: "shape",
  props: ["data"],
  data() {
    return {
      shapeSelected: "",
      fill: "url(#fillImage)"
    };
  },
  methods: {
    getRadius() {
			var r = ((this.data.width + this.data.height) / 2 - this.data.width / 2 - 1) - (this.data.attributes.borderSize / 2)
			return r > 0 ? r : 0;
    },
  },
};
</script>

<style>
@import "./shapes.css";
#shapeContainer {
  width: 35%;
  height: 100%;
  margin: auto;
  background-image: linear-gradient(
      to bottom,
      rgba(255, 159, 63, 0.2),
      rgba(255, 159, 63, 0.8)
    ),
    url(http://coothead.co.uk/images/amy.jpg);
  background-size: auto 100%;
  background-position: center top;
}
svg {
  display: block;
  width: 100%;
  height: 100%;
  overflow:visible;
}
</style>