<template>
<div class="header-with-tools">
  <mu-appbar title="">
      <mu-icon-button class="header-back-button" icon="keyboard_arrow_left" slot="left"/>
      <img slot="left" class="appBarIcon" src="@/assets/storya.png" alt="App Logo"/>
      <mu-flat-button label="File" slot="left" class="btn-file"/>
      <mu-flat-button label="Help" slot="left" class="btn-file"/>
      <div class="acct-settings" slot="right">
        <div class="acct-avatar"></div>
      </div>
  </mu-appbar>
  <mu-divider/>
  <editor-tools v-if="!hideSecondHeader"></editor-tools>
</div>
</template>
<script>
/*
* @component: Header
  @properties:
    hideSecondHeader: show or hide the toolbar/editing tools
*/
import editorTools from '../../components/toolbar/editor-tools'
export default {
  name: 'Header',
  props: ['hideSecondHeader'],
  components: {
    'editor-tools':editorTools,
  }
}
</script>
<style scoped>
.header-back-button {
  height: 75%;
  background-color: #2a2a2a;
  border-radius: 0;
  margin: 5px 5px;
}
.header-with-tools {
  overflow: hidden;
}

.mu-divider{
 background: #808080;
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
.acct-settings {
   height: 65%;
   width: 45px;
   text-align: center;
}
.acct-avatar {
  border-radius: 50%;
  background-color:#009d70;
  height: 100%;
}
.mu-popover {
  display: none!important;
}
</style>
