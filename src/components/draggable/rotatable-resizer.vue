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
      height: state.height + 'px'
     }">
    <div class="rr-bar rr-ord-n" key="bar-n"></div>
    <div class="rr-bar rr-ord-s" key="bar-s"></div>
    <div class="rr-bar rr-ord-e" key="bar-e"></div>
    <div class="rr-bar rr-ord-w" key="bar-w"></div>
    <div class="rr-rotate-handle" v-if="rotatable" ref="rotateHandle"></div>
    <div class="rr-handle rr-ord-n" v-if="hasHandle('n')" key="ord-n"></div>
    <div class="rr-handle rr-ord-s" v-if="hasHandle('s')" key="ord-s"></div>
    <div class="rr-handle rr-ord-e" v-if="hasHandle('e')" key="ord-e"></div>
    <div class="rr-handle rr-ord-w" v-if="hasHandle('w')" key="ord-w"></div>
    <div class="rr-handle rr-ord-nw" v-if="hasHandle('nw')" key="ord-nw"></div>
    <div class="rr-handle rr-ord-ne" v-if="hasHandle('ne')" key="ord-ne"></div>
    <div class="rr-handle rr-ord-se" v-if="hasHandle('se')" key="ord-se"></div>
    <div class="rr-handle rr-ord-sw" v-if="hasHandle('sw')" key="ord-sw"></div>
    <div class="p-d-g">
        <div id="hGLine" class="h-l-g" style="display: none"></div>
    </div>
    <div class="rr-content">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss">
@import './resizer.scss';

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
  // border: 0px dashed #808080;
  border: none;
}
// .rr-resizer:hover {
//    border: 1px dashed #808080;
// }
// .rr-resizer:after {
//    border: 0px dashed #808080;
// }
</style>

<script>
import ResizerVM from './Resizer.vm.ts';
export default ResizerVM;
</script>
