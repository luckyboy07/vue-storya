<template>
<div class="pad">
 <mu-row gutter>
  <mu-col width="100" tablet="70" desktop="33" class="center">
      <img src="../../assets/storya.png" alt="">
       <mu-text-field label="Email" type="email" icon=":iconfont icon-email" fullWidth v-model="email" />
        <mu-text-field label="Password"  type="password" icon=":iconfont icon-lock2" fullWidth v-model="password"  />
  </mu-col>
</mu-row>
  <mu-row gutter>
      <mu-col width="100" tablet="70" desktop="33" class="center">
        <mu-raised-button label="Login" primary class="btn"  @click.native="login" />
      </mu-col>
    </mu-row>
 </div>
</template>
<script>
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      this.$router.push({
        name: 'New Storya'
      })
    }
  }
}
</script>
<style scoped>
.center {
  margin: 0px auto;
  padding: 20px;
  text-align: center;
}
img {
  margin-bottom: 20px;
  padding-left: 10px;
  padding-top: 0px;
  width: 100%;
}
.btn {
  margin: 20px;
}
#main {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  text-align: center;
  padding: 20px;
  width: 100%;
}
.pad {
  margin-top: -65px;
}
</style>
