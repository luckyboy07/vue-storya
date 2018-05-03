<template>
<div class="mobile-tear-sheet">
  <div class="mobile-tear-sheet-container" :style="{'height': height}">
    <slot></slot>
  </div>
</div>
</template>

<script>
export default {
  props: {
    height: {
      type: String
    }
  }
}
</script>

<style scope>
.mobile-tear-sheet {
  /* margin-bottom: 24px;
  margin-right: 24px;
  max-width: 360px;
  width: 100%; */
  position: fixed;
  max-width: 250px;
  width: 100%;
}
.mobile-tear-sheet-container {
  border: 1px solid #d9d9d9;
  /* border-bottom: none; */
  overflow: hidden;
}
</style>
