<template>
  <div id="app">
    <div class="content">
      <div class="body">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: false
    }
  },
  name: 'App'
}
</script>

<style>
  html, body {
    font-family: Lato
  }
  .appBarIcon {
    height: 100%;
    width: 60px;
  }
  .content {
    /* margin-top: 64px; */
  }
</style>
