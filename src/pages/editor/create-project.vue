<template>
  <div>
    <headers :hideSecondHeader="true"></headers>
    <div class="s-create-container">
      <div class="s-create-content">
        <div class="s-create-left-content s-create-f">
          <div class="s-create-t">CREATE</div>
          <mu-raised-button label="CREATE NEW" class="s-primary-btn"/>
          <mu-raised-button label="Close" class="s-default-btn"/>
          <div class="s-create-desc">
            Create a new project by selecting any of the templates here or you can start with a blank template.
          </div>
        </div>
        <div class="s-create-right-content">
          <input placeholder="Search" type="text" class="default-inp">
          <div class="s-create-tab-btns">
            <storya-tabs></storya-tabs>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from '../template/header'
// custom tab
import StoryaTab from '../../components/storya-create-project-tab/app'
export default {
  name: 'create-project',
  components: {
     headers: Header,
     'storya-tabs': StoryaTab
  }
}
</script>
<style scoped>
.s-create-container {
  width: 100%;
  min-width: 50%;
  height: 93vh;
  min-height: 500px;
  padding: 50px;
  overflow: hidden;
}
.s-create-content {
  border: 1px solid #333333;
  background-color:#111111;
  width: 100%;
  height: 100%;
  box-shadow: 0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647);
  display: flex;
  padding: 30px;
}
.s-create-left-content {
  width: 13%;
  padding: 15px 30px;
  text-align: center;
  line-height: 45px;
  overflow: hidden;
}
.s-create-right-content {
  width: 87%;
  padding: 15px 30px;
  line-height: 50px;
  overflow: hidden;
}
.s-create-t {
  font-family: Raleway;
  font-size: 30px;
  text-align: center;
  color: #aaaaaa;
}

/* overrides */
.mu-raised-button {
  border-radius: 0;
  width: 100%;
}

.s-create-f {
  font-family: Raleway;
}
.s-create-desc {
  font-size: 14px;
  color: #aaaaaa;
  line-height: 18px;
  text-align: left;
}
</style>
