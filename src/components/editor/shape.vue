<template>
<div>
    <div v-if="data.attributes.shape === 'Circle'" :style="getAttributes()" class="circle" ></div>
    <div v-if="data.attributes.shape === 'Rectangle'" :style="getAttributes()" class="square" ></div>
	<svg v-else class="shape-container" :style="{opacity: data.attributes.opacity}">
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
		<!-- <circle v-if="data.attributes.shape === 'Circle'" 
      :cx="(data.attributes.sizeOption === 'Manual' ? data.width : parentW) / 2" 
      :cy="(data.attributes.sizeOption === 'Manual' ? data.height: parentH) / 2" 
      :r="getRadius()" 
      :stroke-linecap="data.attributes.borderStyle" 
      :fill="!data.attributes.backgroundImageUri ? data.attributes.color : fill" 
      :stroke="data.attributes.borderColor" 
      :stroke-width="data.attributes.borderSize" 
      :stroke-dasharray="data.attributes.borderStyle !== 'Solid' ? (data.attributes.borderSize / 6) + ' ' + (data.attributes.borderSize * 2) : 0">
    </circle> -->
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
</div>
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
    this.parentH = _d.height; //parseInt(_d.height.replace('px', ''));
    this.parentW = _d.width; //parseInt(_d.width.replace('px', ''));
    console.log(this.data)
  },
  methods: {
    ...mapGetters(['getCanvasData']),
    getRadius() {
      var h = this.data.attributes.sizeOption === 'Manual' ? this.data.height : this.parentH;
      var w = this.data.attributes.sizeOption === 'Manual' ? this.data.width : this.parentW;
			var r = ((w + h) / 2 - w / 2 - 4) - (this.data.attributes.borderSize / 2)
			return r > 0 ? r : 0;
    },
    getPolygonPoints() {
      var h = this.data.attributes.sizeOption === 'Manual' ? this.data.height : this.parentH;
      var w = this.data.attributes.sizeOption === 'Manual' ? this.data.width : this.parentW;
       // rotation, margin-top, right side size, left height, right margin, right height
      return ((w / 2) - 2) + ', ' + (this.data.attributes.borderSize - 2) + ',' + (w - this.data.attributes.borderSize) + ', ' +
      (h - this.data.attributes.borderSize) + ', ' + this.data.attributes.borderSize + ', ' + (h - this.data.attributes.borderSize)
            // targetElemShape.setAttribute('points', points)
    },
    getAttributes () {
      let linearGrad = 'linear-gradient('+this.data.attributes.gradientBackgroundData.rotation+'deg,'+this.data.attributes.gradientBackgroundData.sliderStyle[0].backgroundColor+' '+this.data.attributes.gradientBackgroundData.value[0]+'%,'+this.data.attributes.gradientBackgroundData.sliderStyle[1].backgroundColor+' '+this.data.attributes.gradientBackgroundData.value[1]+'%)'
      if(this.data.attributes.backgroundImageUri.url) {
        if(this.data.attributes.isGradient) {
          return {
            'height': this.data.height+'px',
            'width': this.data.width+'px',
            'border-width': this.data.attributes.borderSize+'px',
            'border-style': this.data.attributes.borderStyle,
            'border-color':this.data.attributes.borderColor,
            'boxShadow': this.data.attributes.shadowColor ? '1px 12px '+this.data.attributes.shadowSize+'px '+this.data.attributes.shadowColor : '',
            'background':  linearGrad+', url('+this.data.attributes.backgroundImageUri.url+')',
            'background-size':'cover',
            'background-blend-mode': 'multiply',
            'opacity': this.data.attributes.opacity
          }
        }else {
          return {
            'height': this.data.height+'px',
            'width': this.data.width+'px',
            'border-width': this.data.attributes.borderSize+'px',
            'border-style': this.data.attributes.borderStyle,
            'border-color':this.data.attributes.borderColor,
            'boxShadow': this.data.attributes.shadowColor ? '1px 12px '+this.data.attributes.shadowSize+'px '+this.data.attributes.shadowColor : '',
            'background-image': 'url('+this.data.attributes.backgroundImageUri.url+')',
            'background-color': this.data.attributes.color,
            'background-blend-mode': 'multiply',
            'opacity': this.data.attributes.opacity
          }
        }
      }else {
        return {
          'height': this.data.height+'px',
          'width': this.data.width+'px',
          // 'background': 'linear-gradient('+ this.data.attributes.gradientBackgroundData.sliderStyle[0].backgroundColor+','+this.data.attributes.gradientBackgroundData.sliderStyle[1].backgroundColor+')'
          'background': this.data.attributes.isGradient ? linearGrad : this.data.attributes.color,
          // 'background': this.data.attributes.borderSize+'px',
          'border-width': this.data.attributes.borderSize+'px',
          'border-style': this.data.attributes.borderStyle,
          'border-color':this.data.attributes.borderColor,
          'boxShadow': this.data.attributes.shadowColor ? '1px 12px '+this.data.attributes.shadowSize+'px '+this.data.attributes.shadowColor : '',
            'opacity': this.data.attributes.opacity
        }
      }
      
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
.circle {
  /* width: 200px; */
  /* height: 200px; */
  line-height: 200px;
  border-radius: 50%; /* the magic */
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  text-align: center;
  color: white;
  font-size: 16px;
  text-transform: uppercase;
  font-weight: 700;
  margin: 0 auto 40px;
}
.square {

}
.blue {
  background-color: #3498db;  
}
</style>