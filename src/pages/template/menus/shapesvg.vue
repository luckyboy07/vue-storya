<template>
  <div>
      <mu-list-item title="Shape Layer (SVG)" :open="openpanel">
        <mu-icon slot="left" value="landscape" style="color: #fff"/>
        <mu-icon-button icon="remove_red_eye" slot="right" />
        <mu-icon-button :icon="expandIcon" class="expand-btn" slot="right" @click.native="open"/>
      </mu-list-item>
  </div>
</template>
<script>
export default {
  name: 'ShapeSvgLayer',
  data () {
      return {
          openpanel: false,
         expandIcon: 'expand_more',
         value: '',
         options:['Manual','Automatic','test','TEst 2']
      }
  },
  methods: {
      open (event) {
        this.openpanel = !this.openpanel
        if(this.openpanel){
            this.expandIcon = 'expand_less'
        }else{
            this.expandIcon = 'expand_more'
        }
    }
  }
}
</script>
<style scoped>
.mu-item.show-right {
    background-color: #424242;
    box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
}
.expand-btn{
  margin-right: 45px;
}
.mu-icon-button{
  color: #fff;
}
.panel-container{
    display: flex;
}
.input-container {
    display: flex;
    margin-right: 115px;
}
 input {
      background: #333;
    font-size: 11px;
    padding-left: 5px;
    padding-right: 7px;
    border-style: none;
    color: #ffff;
 }

.input-size{
    width: 59px;
    margin-right: 10px;
    height: 32px;
}

.mu-item-wrapper{
background: #424242 !important;
}
.mu-popover {
    left: 254px !important;
    top: 16px !important;
    background-color: #171616;
}
.secondary-input{
    /* width: 100px; */
    height: 32px;
    margin-left: 49px;

}

.square {
  height: 32px;
  width: 50px;
  background-color: #fff;
}
.flex-container{
    height: 32px;
  background-color: #333333;
  text-align: center;
  line-height: 32px;
  opacity: 0.5;
  border: 1px dashed;
}
</style>

