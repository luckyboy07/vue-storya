<template>
<div>
   <mu-appbar title="">
    <mu-flat-button icon="keyboard_arrow_left" slot="left"/>
      <img slot="left" class="appBarIcon" src="@/assets/storya.png" alt="App Logo"/>
       <mu-flat-button label="File" slot="left" class="btn-file"/>
    <mu-flat-button label="Help" slot="left" class="btn-file"/>
    </mu-appbar>
   <mu-divider/>
  <mu-appbar  style="height: 45px !important;">
  </mu-appbar>
</div>
</template>
<script>
export default {
  name: 'Header'
}
</script>
<style scoped>
.mu-divider{
 background: white;
}
.btn-file{
margin: 12px;
    font-size: 25px;
}
.img-logo{
  width: 7%;
}
.mu-appbar .mu-flat-button {
    height: 60%;
}
.mu-flat-button.hover{
  background-color: #fff8f829;
}
  .appBarIcon {
    height: 100%;
    width: 60px;
  }
</style>
