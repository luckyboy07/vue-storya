<template>
  <div>
    <mu-icon-menu icon="" @change="handleChange" 
      :open="menuOpen" @open="menuOpen = true" @close="menuOpen = false" 
      :value="value" class="save-menu">
      <mu-menu-item value="1" title="Refresh" />
      <mu-menu-item value="2" title="Send feedback" />
      <mu-menu-item value="3" title="Settings" />
      <mu-menu-item value="4" title="Help" />
      <mu-menu-item value="5" title="Sign out" />
    </mu-icon-menu>
  </div>
</template>
<script>
export default {
  name: 'custom-menu',
  props: ['items', 'menuOpen'],
  mounted() {
    this.open = this.menuOpen;
  },
  data() {
    return {
      value: '3',
      saveMenu: null,
      open: false
    }
  },
  methods: {
    handleChange(val) {
      this.value = val;
    }
  }
}
</script>
<style scoped>
.save-menu {
  position: absolute;
  z-index: 5;
  top: 109px;
  width: 168px;
  left: 8px;
}
</style>
