<template>
<div>
  <mu-appbar style="display: flex;">
    <mu-icon-button icon="keyboard_arrow_left" slot="left"/>
    <img src="@/assets/storya.png"  slot="left" class="img-logo"/>
    <mu-flat-button label="File" slot="left" class="btn-file"/>
    <mu-flat-button label="Help" slot="left" class="btn-file"/>
    <!-- <span slot="left" class="btn-file">File</span>
    <span slot="left" class="btn-file">Help</span> -->
  </mu-appbar>
   <mu-divider/>
  <mu-appbar  style="height: 45px !important;">
   <!-- <mu-list slot="nested" title="Buttons" >
          <mu-list-item slot="nested" value="#/flatButton" title="Flat Button"></mu-list-item>
          <mu-list-item slot="nested" value="#/raisedButton" title="Raised Button"></mu-list-item>
          <mu-list-item slot="nested" value="#/iconButton" title="Icon Button"></mu-list-item>
          <mu-list-item slot="nested" value="#/floatButton" title="Floating Action Button"></mu-list-item>
        </mu-list> -->
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
</style>
