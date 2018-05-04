<template>
<div>
<headers style="z-index: 999"></headers>
<side-bar></side-bar>
    <div class="editor-container">
      <div class="editor-box">
        <div class="canvas-wrap">
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
        :height="100">
        Slot Content
      </rotatable-resizer>
        </div>
      </div>
    </div>
</div>
</template>
<script>
import Header from '../template/header'
import Siderbar from '../template/sidebar'
export default {
  name: 'Editor',
  components: {
    headers: Header,
    sideBar: Siderbar
  }
}
</script>
<style scoped>
.editor-container {
    padding-top: 22px;
    padding-left: 465px;
}
.editor-container .editor-box {
    width: 508px;
    height: 423px;
    top: 0px;
    margin-left: auto;
    margin-right: auto;
    left: 0px;
    right: 0px;
    transform: translateY(0px);
    border-width: 0px;
    border-style: solid;
    border-color: rgb(255, 255, 255);
    border-image: initial;
}
.canvas-wrap {
   background-color: white;
    position: absolute;
    height: 100%;
    width: 100%;
    outline: rgb(102, 102, 102) solid 1px;
    overflow: hidden;
}
</style>

