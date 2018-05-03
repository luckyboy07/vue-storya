<template>
<div>
<headers></headers>
<side-bar></side-bar>
</div>
</template>
<script>
import Header from '../template/header'
import Siderbar from '../template/sidebar'
export default {
  name: 'Editor',
  components: {
    headers: Header,
    sideBar: Siderbar
  }
}
</script>
