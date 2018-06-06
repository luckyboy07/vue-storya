<template>
  <div class="rr-resizer"
    :class="[{
      'rr-resizer--active': !disabled && active,
      'rr-drag-border': dragMode === 'border'
    },'octant' + state.octant, {'dl-inactive': !active}]"
    :style="{
      transform: 'rotateZ(' + state.rotation + 'deg)',
      left: state.left + 'px',
      top: state.top + 'px',
      width: state.width + 'px',
      height: state.height + 'px',
      zIndex: state.z
     }">
    <div class="rr-bar rr-ord-n" key="bar-n">
    </div>
    <div class="rr-bar rr-ord-s" key="bar-s"></div>
    <div class="rr-bar rr-ord-e" key="bar-e"></div>
    <div class="rr-bar rr-ord-w" key="bar-w"></div>
    <div class="rr-rotate-handle" v-if="rotatable" ref="rotateHandle">
      <div v-show="!isRotating" class="handle-tt" :style="{transform:'rotate(' + (state.rotation * -1) + 'deg)'}">Rotate</div>
    </div>
    <div class="rr-handle rr-ord-n" v-if="hasHandle('n')" key="ord-n">
      <div v-show="!isResizing" class="handle-tt" :style="{transform:'rotate(' + (state.rotation * -1) + 'deg)'}">Resize</div>
    </div>
    <div class="rr-handle rr-ord-s" v-if="hasHandle('s')" key="ord-s">
      <div v-show="!isResizing" class="handle-tt" :style="{transform:'rotate(' + (state.rotation * -1) + 'deg)'}">Resize</div>
    </div>
    <div class="rr-handle rr-ord-e" v-if="hasHandle('e')" key="ord-e">
      <div v-show="!isResizing" class="handle-tt" :style="{transform:'rotate(' + (state.rotation * -1) + 'deg)'}">Resize</div>
    </div>
    <div class="rr-handle rr-ord-w" v-if="hasHandle('w')" key="ord-w">
      <div v-show="!isResizing" class="handle-tt" :style="{transform:'rotate(' + (state.rotation * -1) + 'deg)'}">Resize</div>
    </div>
    <div class="rr-handle rr-ord-nw" v-if="hasHandle('nw')" key="ord-nw">
      <div v-show="!isResizing" class="handle-tt" :style="{transform:'rotate(' + (state.rotation * -1) + 'deg)'}">Resize</div>
    </div>
    <div class="rr-handle rr-ord-ne" v-if="hasHandle('ne')" key="ord-ne">
      <div v-show="!isResizing" class="handle-tt" :style="{transform:'rotate(' + (state.rotation * -1) + 'deg)'}">Resize</div>
    </div>
    <div class="rr-handle rr-ord-se" v-if="hasHandle('se')" key="ord-se">
      <div v-show="!isResizing" class="handle-tt" :style="{transform:'rotate(' + (state.rotation * -1) + 'deg)'}">Resize</div>
    </div>
    <div class="rr-handle rr-ord-sw" v-if="hasHandle('sw')" key="ord-sw">
      <div v-show="!isResizing" class="handle-tt" :style="{transform:'rotate(' + (state.rotation * -1) + 'deg)'}">Resize</div>
    </div>
    <div class="p-d-g">
      <div id="hGLine" class="h-l-g" style="display: none"></div>
    </div>
     <div v-show="isRotating" class="layer-action-info info-top" :style="{transform: 'rotateZ(' + (this.rotation * -1) + 'deg)'}">
        {{parseInt(this.rotation)}}°
      </div>
    <div v-show="isResizing" class="layer-action-info info-top" :style="{top: '-65px', transform: 'rotateZ(' + (this.rotation * -1) + 'deg)',}">
        {{parseInt(this.width) + ' x ' + parseInt(this.height)}}
      </div>
    <div v-show="isDragging" class="layer-action-info info-top" :style="{transform: 'rotateZ(' + (this.rotation * -1) + 'deg)',}">
      {{parseInt(this.left) + ', ' + parseInt(this.top)}}
    </div>
    <div class="rr-content">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss">
@import './resizer.scss';
.layer-action-info {
  font-size: 10px;
  color:#7F7F7F;
  position: absolute;
  z-index: 999;
  overflow:hidden;
  // text-shadow: 1px 0px #7F7F7F;
  user-select: none;
  -moz-user-select: none;
  min-width: 10px;
}
.info-top {
  top: -60px;
  left: 0;
  right: 0;
  margin: 0 auto;
  text-align: center;
}
.h-l-g {
  height:100%;
  width: 1px;
  border-left: black 1px dashed;
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  z-index: 9999;
}
.p-d-g {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  top: 0;
}
.dl-inactive {
  border: none;
}
.handle-tt {
  visibility: hidden;
  background-color: white;
  color: #fff;
  text-align: center;
  padding: 0 8px;
  color: black;
  border-radius: 2px;
  font-size: 10px;
  overflow: hidden;
  line-height: 22px;
  user-select: none;
  position: absolute;
  z-index: 999;
  box-shadow: 0 1px 2px black, 0 1px 2px black;
  width: 44px;
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    visibility: visible;
    opacity: 1;
  }
}
.rr-ord-n:hover .handle-tt {
  visibility: visible;
  animation: 1s fadeIn;
  top: 20px;
}
.rr-ord-s:hover .handle-tt {
  visibility: visible;
  animation: 0.5s fadeIn;
  top: 20px;
}
.rr-ord-e:hover .handle-tt {
  visibility: visible;
  animation: 1s fadeIn;
  left: 20px;
}
.rr-ord-w:hover .handle-tt {
  visibility: visible;
  animation: 1s fadeIn;
  right: 20px;
}
.rr-ord-nw:hover .handle-tt {
  visibility: visible;
  animation: 1s fadeIn;
  top: 20px;
}
.rr-ord-ne:hover .handle-tt {
  visibility: visible;
  animation: 1s fadeIn;
  top: 20px;
}
.rr-ord-se:hover .handle-tt {
  visibility: visible;
  animation: 1s fadeIn;
  top: 20px;
}
.rr-ord-sw:hover .handle-tt {
  visibility: visible;
  animation: 1s fadeIn;
  top: 20px;
}
.rr-rotate-handle:hover .handle-tt {
   visibility: visible;
   animation: 1s fadeIn;
   left: 20px;
}
</style>

<script>
import ResizerVM from './Resizer.vm.ts';
export default ResizerVM;
</script>
