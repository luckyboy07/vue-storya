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
    <defs>
      <linearGradient id="fillGradient">
        <stop 
          :offset="data.attributes.gradientBackgroundData.value[0] + '%'" 
          :stop-color="data.attributes.gradientBackgroundData.sliderStyle[0].backgroundColor" />
        <stop 
          :offset="data.attributes.gradientBackgroundData.value[1] + '%'" 
          :stop-color="data.attributes.gradientBackgroundData.sliderStyle[1].backgroundColor"/>
      </linearGradient>
    </defs>
		<circle v-if="data.attributes.shape === 'Circle'" 
      :cx="(data.attributes.sizeOption === 'Manual' ? data.width : parentW) / 2" 
      :cy="(data.attributes.sizeOption === 'Manual' ? data.height: parentH) / 2" 
      :r="getRadius()" 
      :stroke-linecap="data.attributes.borderStyle" 
      :fill="!data.attributes.backgroundImageUri ? data.attributes.color : fill" 
      :stroke="data.attributes.borderColor" 
      :stroke-width="data.attributes.borderSize" 
      :stroke-dasharray="data.attributes.borderStyle !== 'Solid' ? (data.attributes.borderSize / 6) + ' ' + (data.attributes.borderSize * 2) : 0">
    </circle>
		 <!-- style="width: 100%; height: 100%; margin: 1px;"  -->
		<rect  v-if="data.attributes.shape === 'Rectangle'" width="100%" height="100%" 
      :stroke-linecap="data.attributes.borderStyle" 
      :fill="!data.attributes.backgroundImageUri ? data.attributes.color : fill" 
      :stroke="data.attributes.borderColor" 
      :stroke-width="data.attributes.borderSize" 
      :stroke-dasharray="data.attributes.borderStyle !== 'Solid' ? (data.attributes.borderSize / 6) + ' ' + (data.attributes.borderSize * 2) : 0"/>

		<polygon style="width: 100%; height: 100%" 
      :points="getPolygonPoints()" 
      :stroke-linecap="data.attributes.borderStyle" 
      :fill="!data.attributes.backgroundImageUri ? data.attributes.color : fill" 
      :stroke="data.attributes.borderColor" 
      :stroke-width="data.attributes.borderSize" 
      :stroke-dasharray="data.attributes.borderStyle !== 'Solid' ? (data.attributes.borderSize / 6) + ' ' + (data.attributes.borderSize * 2) : 0"
      v-if="data.attributes.shape === 'Triangle'" />
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
      fill: "url(#fillImage)",
      fillGradient: "url(#fillGradient)",
      parentH: 0,
      parentW: 0,
    };
  },
  mounted() {
    var _d = this.getCanvasData();
    this.parentH = parseInt(_d.height.replace('px', ''));
    this.parentW = parseInt(_d.width.replace('px', ''));
    console.log(this.data)
  },
  methods: {
    ...mapGetters(['getCanvasData']),
    getRadius() {
      var h = this.data.attributes.sizeOption === 'Manual' ? this.data.height : this.parentH;
      var w = this.data.attributes.sizeOption === 'Manual' ? this.data.width : this.parentW;
			var r = ((w + h) / 2 - w / 2 - 1) - (this.data.attributes.borderSize / 2)
			return r > 0 ? r : 0;
    },
    getPolygonPoints() {
      var h = this.data.attributes.sizeOption === 'Manual' ? this.data.height : this.parentH;
      var w = this.data.attributes.sizeOption === 'Manual' ? this.data.width : this.parentW;
       // rotation, margin-top, right side size, left height, right margin, right height
      return ((w / 2) - 2) + ', ' + (this.data.attributes.borderSize - 2) + ',' + (w - this.data.attributes.borderSize) + ', ' +
      (h - this.data.attributes.borderSize) + ', ' + this.data.attributes.borderSize + ', ' + (h - this.data.attributes.borderSize)
            // targetElemShape.setAttribute('points', points)
    }
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