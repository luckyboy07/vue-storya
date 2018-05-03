<template>
  <div id="app">
     <mu-appbar title="">
      <mu-icon-button icon="keyboard_arrow_left" slot="left" color="white" size="30"/>
      <img slot="left" class="appBarIcon" src="./assets/storya.png" alt="App Logo"/>
    </mu-appbar>
    <div class="content">
      <div class="body">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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