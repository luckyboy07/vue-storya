<template>
  <div>
      <mu-list-item title="Shape Layer (SVG)" :open="openpanel">
        <mu-icon slot="left" value="landscape" style="color: #fff"/>
        <mu-icon-button icon="remove_red_eye" slot="right" />
        <mu-icon-button :icon="expandIcon" class="expand-btn" slot="right" @click.native="open"/>
        <mu-list-item  slot="nested">
            <span>Size Option</span>
            <multiselect style="z-index:99999" v-model="value" open-direction="bottom" :options="options" :searchable="false" :close-on-select="true" placeholder="Pick a value"></multiselect>
        </mu-list-item>
        <mu-list-item  slot="nested">
            <span>Size</span>
            <div class="input-container" slot="right">
                <span style="color: #fff;margin-right: 10px;">W:</span>
                    <input spellcheck="false"  class="input-size">
                    <span style="color: #fff;margin-right: 10px;">H:</span>
                    <input spellcheck="false" class="input-size">
            </div>
        </mu-list-item>
        <mu-list-item  slot="nested">
            <span>Opacity</span>
            <mu-slider v-model="value1" style="width: 53%;"/>
            <input spellcheck="false" slot="right" class="input-size">
        </mu-list-item>
        <mu-list-item  slot="nested">
            <span>Rotate</span>
            <mu-slider v-model="value1" style="width: 53%;"/>
             <input spellcheck="false" slot="right" class="input-size">
        </mu-list-item>
        <mu-list-item  slot="nested">
            <span>Colour</span>
            <input spellcheck="false" class="secondary-input">
            <span class="square" slot="right"></span>
        </mu-list-item>      
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
         value1:'',
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
@import './menu.css';
</style>

