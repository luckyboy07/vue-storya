<template>
  <div class="shape-container rot" id="sp1">
    <div v-if="data.attributes.shape === 'Rectangle'" class="shape" :style="getRectangleStyle()"></div>
    <div v-if="data.attributes.shape === 'Circle'" class="shape" :style="getCircleStyle()"></div>
    <div v-if="data.attributes.shape === 'Triangle'" class="shape" :style="getTriangleStyle()"></div>
    <div v-if="data.attributes.shape === 'Trapezoid'" :style="getTrapeziodStyle()"></div>
    <div v-if="data.attributes.shape === 'Parallelogram'" :style="getParallelogramStyle()"></div>
    <div v-if="data.attributes.shape === 'Diamond'" :style="getDiamondStyle()"></div>
  </div>
</template>
<script>
export default {
  name: 'c-shape',
  props: ['data'],
  methods: {
    getRectangleStyle() {
      var att = this.data.attributes;
      return {
        background: !att.isGradient ? att.color : 'linear-gradient('+att.gradientBackgroundData.rotation+'deg,'+att.gradientBackgroundData.sliderStyle[0].backgroundColor+' '+att.gradientBackgroundData.value[0]+'%,'+att.gradientBackgroundData.sliderStyle[1].backgroundColor+' '+att.gradientBackgroundData.value[1]+'%)' +', url('+this.data.attributes.backgroundImageUri.url+')',
        'background-blend-mode': 'multiply',
        'boxShadow': att.shadowColor ? '1px 12px '+att.shadowSize+'px '+att.shadowColor : '',
        'opacity': this.data.attributes.opacity,
         border: att.borderWidth + 'px ' + att.borderColor + ' ' + att.borderStyle,
      }
    },
    getCircleStyle() {
      var att = this.data.attributes;
      return {
        'border-radius': '50%',
        background: !att.isGradient ? att.color : 'linear-gradient('+att.gradientBackgroundData.rotation+'deg,'+att.gradientBackgroundData.sliderStyle[0].backgroundColor+' '+att.gradientBackgroundData.value[0]+'%,'+att.gradientBackgroundData.sliderStyle[1].backgroundColor+' '+att.gradientBackgroundData.value[1]+'%)' +', url('+this.data.attributes.backgroundImageUri.url+')',
        'background-blend-mode': 'multiply',
        'boxShadow': att.shadowColor ? '1px 12px '+att.shadowSize+'px '+att.shadowColor : '',
        'opacity': this.data.attributes.opacity,
        border: att.borderWidth + 'px ' + att.borderColor + ' ' + att.borderStyle,
      }
    },
    getTriangleStyle() {
      var att = this.data.attributes;
      var bg = !att.isGradient ? att.color : 'linear-gradient('+att.gradientBackgroundData.rotation+'deg,'+att.gradientBackgroundData.sliderStyle[0].backgroundColor+' '+att.gradientBackgroundData.value[0]+'%,'+att.gradientBackgroundData.sliderStyle[1].backgroundColor+' '+att.gradientBackgroundData.value[1]+'%)';
      return {
        width: 0,
	      height: 0,
        'border-left': (this.data.width / 2) - .5 + 'px solid transparent',
        'border-right': this.data.width / 2 + 'px solid transparent',
        'border-bottom': this.data.height - 1 + 'px solid ' + bg,
        'opacity': this.data.attributes.opacity,
      }
    },
    getTrapeziodStyle() {
      var att = this.data.attributes;
      var bg = !att.isGradient ? att.color : 'linear-gradient('+att.gradientBackgroundData.rotation+'deg,'+att.gradientBackgroundData.sliderStyle[0].backgroundColor+' '+att.gradientBackgroundData.value[0]+'%,'+att.gradientBackgroundData.sliderStyle[1].backgroundColor+' '+att.gradientBackgroundData.value[1]+'%)';
      return {
        'border-bottom': this.data.height - 1 + 'px solid ' + bg,
        'border-left': this.data.width / 3 + 'px solid transparent',
        'border-right': this.data.width / 3 + 'px solid transparent',
        'height': '0',
        'width': 'auto',
        'opacity': this.data.attributes.opacity,
      }
    },
    getParallelogramStyle() {
      var att = this.data.attributes;
      var bg = !att.isGradient ? att.color : 'linear-gradient('+att.gradientBackgroundData.rotation+'deg,'+att.gradientBackgroundData.sliderStyle[0].backgroundColor+' '+att.gradientBackgroundData.value[0]+'%,'+att.gradientBackgroundData.sliderStyle[1].backgroundColor+' '+att.gradientBackgroundData.value[1]+'%)';
      return {
        'width': this.data.width - 40 + 'px',
        'height': this.data.height - 1 + 'px',
        '-webkit-transform': 'skew(20deg)',
        '-moz-transform': 'skew(20deg)',
        '-o-transform': 'skew(20deg)',
        'background': bg,
        'margin-left': '20px',
        border: att.borderWidth + 'px ' + att.borderColor + ' ' + att.borderStyle,
      }
    },
    getDiamondStyle() {
      var att = this.data.attributes;
      var bg = !att.isGradient ? att.color : 'linear-gradient('+att.gradientBackgroundData.rotation+'deg,'+att.gradientBackgroundData.sliderStyle[0].backgroundColor+' '+att.gradientBackgroundData.value[0]+'%,'+att.gradientBackgroundData.sliderStyle[1].backgroundColor+' '+att.gradientBackgroundData.value[1]+'%)';
      return {
        width: Math.max(this.data.height, this.data.width)+ 'px',
        height: Math.max(this.data.height, this.data.width)  + 'px',
        'background-color':bg,
        'transform': 'rotateZ(45deg)',
        marginTop:  Math.max(this.data.height, this.data.width) / 2 + 'px',
        marginBottom:  Math.max(this.data.height, this.data.width) / 2 + 'px',
        // marginLeft: Math.min(this.data.height, this.data.width) / 2 + 'px',
      }
    },
  }
}
</script>
<style scoped>
  .shape-container, .shape {
    width: 100%;
    height: 100%;
  }
   /* @-webkit-keyframes rotate { 0% { -webkit-transform: translate(0px,0px) rotate(0deg) scale(1,1); } 20% { -webkit-transform: translate(0px,0px) rotate(0deg) scale(2,1); } 40% { -webkit-transform: translate(0px,0px) rotate(90deg) scale(1,1); } 60% { -webkit-transform: translate(0px,0px) rotate(180deg) scale(1,1); } 80% { -webkit-transform: translate(0px,0px) rotate(270deg) scale(1,1); } 100% { -webkit-transform: translate(0px,0px) rotate(360deg) scale(1,1); } }
.rotats { 
  animation-name: rotate;
  animation-duration: 4s;  
} */
</style>
