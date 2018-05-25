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
    <div v-show="zoom > 60" class="rr-rotate-handle" v-if="rotatable" ref="rotateHandle">
      <div class="handle-tt" :style="{transform:'rotate(' + (state.rotation * -1) + 'deg)'}">Rotate</div>
    </div>
    <div class="rr-handle rr-ord-n" v-if="hasHandle('n')" key="ord-n">
      <div class="handle-tt" :style="{transform:'rotate(' + (state.rotation * -1) + 'deg)'}">Resize</div>
    </div>
    <div class="rr-handle rr-ord-s" v-if="hasHandle('s')" key="ord-s">
      <div class="handle-tt" :style="{transform:'rotate(' + (state.rotation * -1) + 'deg)'}">Resize</div>
    </div>
    <div class="rr-handle rr-ord-e" v-if="hasHandle('e')" key="ord-e">
      <div class="handle-tt" :style="{transform:'rotate(' + (state.rotation * -1) + 'deg)'}">Resize</div>
    </div>
    <div class="rr-handle rr-ord-w" v-if="hasHandle('w')" key="ord-w">
      <div class="handle-tt" :style="{transform:'rotate(' + (state.rotation * -1) + 'deg)'}">Resize</div>
    </div>
    <div class="rr-handle rr-ord-nw" v-if="hasHandle('nw')" key="ord-nw">
      <div class="handle-tt" :style="{transform:'rotate(' + (state.rotation * -1) + 'deg)'}">Resize</div>
    </div>
    <div class="rr-handle rr-ord-ne" v-if="hasHandle('ne')" key="ord-ne">
      <div class="handle-tt" :style="{transform:'rotate(' + (state.rotation * -1) + 'deg)'}">Resize</div>
    </div>
    <div class="rr-handle rr-ord-se" v-if="hasHandle('se')" key="ord-se">
      <div class="handle-tt" :style="{transform:'rotate(' + (state.rotation * -1) + 'deg)'}">Resize</div>
    </div>
    <div class="rr-handle rr-ord-sw" v-if="hasHandle('sw')" key="ord-sw">
      <div class="handle-tt" :style="{transform:'rotate(' + (state.rotation * -1) + 'deg)'}">Resize</div>
    </div>
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
  border: none;
}
.handle-tt {
  visibility: hidden;
  background-color: black;
  color: #fff;
  text-align: center;
  padding: 0 8px;
  color: #fff;
  border-radius: 2px;
  font-size: 10px;
  overflow: hidden;
  line-height: 22px;
  user-select: none;
  opacity: 0.7;
  /* Position the tooltip */
  position: absolute;
  z-index: 999;
  box-shadow: 0 1px 2px black, 0 1px 2px black;
}
.rr-ord-n:hover .handle-tt {
  visibility: visible;
}
.rr-ord-s:hover .handle-tt {
  visibility: visible;
}
.rr-ord-e:hover .handle-tt {
  visibility: visible;
}
.rr-ord-w:hover .handle-tt {
  visibility: visible;
}
.rr-ord-nw:hover .handle-tt {
  visibility: visible;
}
.rr-ord-ne:hover .handle-tt {
  visibility: visible;
}
.rr-ord-se:hover .handle-tt {
  visibility: visible;
}
.rr-ord-sw:hover .handle-tt {
  visibility: visible;
}
.rr-rotate-handle:hover .handle-tt {
   visibility: visible;
}
</style>

<script>
import ResizerVM from './Resizer.vm.ts';
export default ResizerVM;
</script>
