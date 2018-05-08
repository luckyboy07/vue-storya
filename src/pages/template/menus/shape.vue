<template>
  <div>
        <mu-list-item title="Shape Layer" :open="openpanel">
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
            <mu-sub-header slot="nested">Gradient Background</mu-sub-header>
            <mu-list-item  slot="nested">
                <span>Selected Position</span>
                <div class="input-container" slot="right">
                    <input spellcheck="false" class="input-size">
                </div>
            </mu-list-item>
            <mu-list-item  slot="nested">
                <span>Selected Colour</span>
                <input spellcheck="false" class="secondary-input">
                <span class="square" slot="right"></span>
            </mu-list-item>
            <mu-list-item  slot="nested">
                <span>Rotate</span>
                <mu-slider v-model="value1" style="width: 53%;"/>
                <input spellcheck="false" slot="right" class="input-size">
            </mu-list-item>
            <mu-sub-header slot="nested">Border</mu-sub-header>
            <mu-list-item  slot="nested">
                <span>Size</span>
                <mu-slider v-model="value1" style="width: 53%;"/>
                <input spellcheck="false" slot="right" class="input-size">
            </mu-list-item>
            <mu-list-item  slot="nested">
                <span>Style</span>
                <multiselect v-model="value" :options="options" :searchable="false" :close-on-select="true" placeholder="Pick a value"></multiselect>
            </mu-list-item>
            <mu-list-item  slot="nested">
                <span>Colour</span>
                <input spellcheck="false" class="secondary-input">
                <span class="square" slot="right"></span>
            </mu-list-item>
            <mu-sub-header slot="nested">Shadow</mu-sub-header>
            <mu-list-item  slot="nested">
                <span>Size</span>
                <mu-slider v-model="value1" style="width: 53%;"/>
                <input spellcheck="false" slot="right" class="input-size">
            </mu-list-item>
            <mu-list-item  slot="nested">
                <span>Colour</span>
                <input spellcheck="false" class="secondary-input">
                <span class="square" slot="right"></span>
            </mu-list-item>
            <mu-sub-header slot="nested">Background Image</mu-sub-header>
            <mu-list-item  slot="nested">
                <mu-flexbox>
                    <mu-flexbox-item class="flex-container"> 
                        + Drag and Drop
                    </mu-flexbox-item>
                </mu-flexbox>
            </mu-list-item>
            <mu-list-item  slot="nested">
                <span>URL</span>
                <input spellcheck="false" class="secondary-input" style="width: 175px;">
            </mu-list-item>
            <mu-list-item  slot="nested">
                <span>Repeat</span>
                <multiselect v-model="value" :options="options" :searchable="false" :close-on-select="true" placeholder="Pick a value"></multiselect>
            </mu-list-item>
            <mu-list-item  slot="nested">
                <span>Position</span>
                <multiselect v-model="value" :options="options" :searchable="false" :close-on-select="true" placeholder="Pick a value"></multiselect>
            </mu-list-item>
            <mu-list-item  slot="nested">
                <span>Attachment</span>
                <multiselect v-model="value" :options="options" :searchable="false" :close-on-select="true" placeholder="Pick a value"></multiselect>
            </mu-list-item>
        </mu-list-item>
  </div>
</template>
<script>
export default {
  name: 'ShapeLayer',
  props:['openpanel'],
  data () {
      return {
         expandIcon: 'expand_more',
         value: '',
         value1: '',
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


