<template>
 <div>
 <mu-row gutter>
  <mu-col width="100" tablet="70" desktop="33" class="center">
      <img src="../assets/storya.png" alt="">
       <mu-text-field label="Email" type="email" icon=":iconfont icon-email" fullWidth v-model="email" />
        <mu-text-field label="Password"  type="password" icon=":iconfont icon-lock2" fullWidth v-model="password"  />
  </mu-col>
</mu-row>
 </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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

#main {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  text-align: center;
  padding: 20px;
  width: 100%;
}
</style>
