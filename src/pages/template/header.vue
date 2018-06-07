<template>
<div class="header-with-tools">
  <mu-appbar title="">
      <mu-flat-button class="s-header-btn-back" slot="left" @click="backButtonClicked">
        <i class="si-keyboard-arrow-left"></i>
      </mu-flat-button>
      <img slot="left" class="appBarIcon" src="@/assets/storya.png" alt="App Logo" style="margin-left: 10px;width: inherit;"/>
      <mu-flat-button @click="createButtonClicked()" label="Create" slot="left" class="btn-file h-60-p" style="margin-left: 10px"/>
      <mu-flat-button v-if="currentPage === 'editor'" @click="closeButtonClicked()" label="Close" slot="left" class="btn-file h-60-p"/>
      <mu-flat-button label="Help" slot="left" class="btn-file h-60-p"/>
      <div v-if="currentPage === 'editor'" slot="left" class="s-header-prj-name s-f-14" style="margin-left: 10px; width: 320px;">Project Name:</div>
      <input v-if="currentPage === 'editor'" v-model="getCanvasData.project_name" spellcheck="false" slot="left" class="default-inp" style="margin-left: 10px; min-width: 200px;"/>
      <div slot="left" class="s-unsave-info" :class="[autoData === '1' || autoData === '2' ? 'info-shown' : 'info-hidden']">{{getInfo()}}</div>
      <div slot="right" class="s-header-acct-sett-container">
        <div class="s-header-acct-owner"><div>Hi Storjak</div></div>
        <div class="acct-settings">
          <div class="acct-avatar">
            <div class="acct-avatar-wrapper">
              <div>SS</div>
            </div>
          </div>
        </div>
      </div>
  </mu-appbar>
  <mu-divider/>
  <editor-tools v-if="!hideSecondHeader" :selectedtemplate="getCanvasData"></editor-tools>
  <!-- alert modal -->
  <mu-dialog :open="confirmOpen" :title="popupTitle">
    <div style="font-family: Lato; font-size: 17px; color: #fff">{{popupMsg}}</div> 
    <mu-flat-button label="Yes" slot="actions" primary @click="confirm(1)"/>
    <mu-flat-button label="No" slot="actions" primary @click="confirm(2)"/>
  </mu-dialog>
</div>
</template>
<script>
/*
* @component: Header
  @properties:
    hideSecondHeader: show or hide the toolbar/editing tools
*/
import editorTools from '../../components/toolbar/editor-tools'
import {mapGetters} from 'vuex'
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
      confirmOpen: false,
      confirmAction: '',
      popupTitle: '',
      popupMsg: '',
    }
  },
  computed: {
    ...mapGetters(['getCanvasData']),
    ...mapGetters({
      autoData: 'getAutosaveStatusData'
    }),
  },
  methods: {
    backButtonClicked() {
     if (this.$route.path.replace('/', '')  === 'editor') {
       this.confirmAction = 'back';
        this.popupTitle = 'Leave Page?';
        //Are you sure you want to leave this page?
        this.popupMsg = 'Really Nigguh?';
       this.confirmOpen = true;
     } else {
      this.$router.go(-1);
     }
    },
    createButtonClicked() {
      this.popupTitle = 'Save Workplace?';
      this.popupMsg = 'Really Nigguh?';
      this.confirmAction = 'create';
      this.confirmOpen = true;
    },
    closeButtonClicked() {
      this.popupTitle = 'Save Workplace?';
      this.popupMsg = 'Really Nigguh?';
      this.confirmAction = 'close';
      this.confirmOpen = true;
    },
    confirm(status) {
      this.confirmOpen = false;
      switch (this.confirmAction) {
        case 'back':
          this.$router.go(-1);
        break;
        case 'create':
          if (status === 1) {
            // save
          }
          this.$router.push({name: 'New Storya'})
        break;
        case 'close':
          alert('Okay nigguh')
        break;
        default:
        break;
      }
    },
    getInfo() {
      if (this.autoData === '0') {
        return '';
      } else if (this.autoData === '1') {
        return 'Unsaved Changes';
      } else {
        return 'All Changes Saved'
      }
    },
  }
}
</script>
<style scoped>
.s-unsave-info {
  color: #7D7D7D;
  font-style: italic;
  margin-left: 20px;
  width: 100%;
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s, opacity 0.5s linear;
}
.info-hidden {
  visibility: hidden;
  opacity: 0;
}
.info-shown {
  visibility: visible;
  opacity: 1;
}
.s-header-acct-owner {
  height: 100%;
  font-weight: bold;
  color: #fff;
  font-size: 16px;
  margin-right: 15px;
  display: table;
}
.s-header-acct-owner>:first-child {
  display: table-cell;
  vertical-align: middle
}
.default-inp {
  color: #7D7D7D;
}
.s-header-prj-name {
  width: 100%;
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
.s-header-acct-sett-container {
  height: 65%;
  display: flex;
}
.acct-settings {
  height: 100%;
  width: 45px;
  text-align: center;
}
.acct-avatar {
  border-radius: 50%;
  background-color:#009d70;
  height: 100%;
}
.acct-avatar-wrapper {
   height: 100%;
   width: 100%;
  display: table;
}
.acct-avatar-wrapper>:first-child {
  display: table-cell;
  vertical-align: middle;
  font-size: 20px;
}
.mu-popover {
  display: none!important;
}
</style>
