<template>
<div class="header-with-tools">
  <mu-appbar title="">
      <mu-flat-button class="s-header-btn-back" slot="left">
        <i class="si-keyboard-arrow-left"></i>
      </mu-flat-button>
      <img slot="left" class="appBarIcon" src="@/assets/storya.png" alt="App Logo" style="margin-left: 10px"/>
      <mu-flat-button label="Create" slot="left" class="btn-file h-60-p" style="margin-left: 10px"/>
      <mu-flat-button label="Help" slot="left" class="btn-file h-60-p"/>
      <div v-if="currentPage === 'editor'" slot="left" class="s-header-prj-name s-f-14" style="margin-left: 10px">Project Name:</div>
      <input v-if="currentPage === 'editor'" spellcheck="false" slot="left" class="default-inp" style="margin-left: 10px"/>
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
  },
  created() {
    this.currentPage = this.$route.path.replace('/', '')
  },
  data() {
    return {
      currentPage: '',
    }
  }
}
</script>
<style scoped>
.default-inp {
  color: #7D7D7D;
}
.s-header-prj-name {
  width: 60%;
  color: #7D7D7D;
}
.s-f-14 {
  font-size: 14px;
}
.s-header-btn-back {
  width: 40px;
  background-color: #2a2a2a;
  border-radius: 0;
  margin: 5px 5px;
   height: 80%;
}
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
  margin:2px;
  font-size: 25px;
}
.img-logo{
  width: 7%;
}
.h-60-p {
  height: 60%;
}
/* .mu-appbar .mu-flat-button {
  height: 60%;
} */
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
