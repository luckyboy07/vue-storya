<template>
  <div>

  </div>
</template>
<script>
export default {
  name: 'c-shape',
  props: ['data'],
  methods: {
    getSquareStyle() {
      var att = this.data.attributes;
      return {
        width: '100%',
        height: '100%',
        background: att.color,
      }
    },
    getCircleStyle() {

    }
  }
}
</script>
<style scoped>

</style>
