<template>
  <div @click="onSelected">
    
  </div>
</template>
<script>
export default {
  name: 'tab-item',
  props: ['id', 'avatar', 'size', 'label'],
  methods: {
    onSelected() {
      console.log('selected', this.id);
      this.$emit('onSelected', {
        id: this.id,
        avatar: this.avatar,
        size: this.size,
        label: this.label
      });
    }
  }
}
</script>
<style scoped>

</style>


