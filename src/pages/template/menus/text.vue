<template>
   <mu-list-item title="Text Layer" :open="openpanel">
        <mu-icon slot="left" value="text_fields" style="color: #fff"/>
        <mu-icon-button icon="remove_red_eye" slot="right" />
        <mu-icon-button :icon="expandIcon" class="expand-btn" slot="right" @click.native="open"/>
        <mu-list-item  slot="nested">
            <span>Font</span>
            <multiselect style="z-index:99999" v-model="value" open-direction="bottom" :options="options" :searchable="false" :close-on-select="true" placeholder="Pick a value"></multiselect>
        </mu-list-item>
         <mu-list-item  slot="nested">
               <div class="input-container">
                    <input class="input-size">
                    <mu-icon-button icon="format_bold" slot="right"/>
                    <mu-icon-button icon="format_italic" slot="right"/>
                    <mu-icon-button icon="format_underlined" slot="right"/>
               </div>
         </mu-list-item>
         <mu-list-item  slot="nested" style="background-color: rgba(197, 194, 194, 0.09);">
             <div class="input-container">
                <mu-icon-button icon="format_align_left" slot="right"/>
                <mu-icon-button icon="format_align_center" slot="right"/>
                <mu-icon-button icon="format_align_justify" slot="right"/>
                <mu-icon-button icon="format_list_numbered" slot="right"/>
                <mu-icon-button icon="format_list_bulleted" slot="right"/>
            </div>
         </mu-list-item>
         <mu-list-item  slot="nested">
            <span>Line Height</span>
            <multiselect style="z-index:99999" v-model="value" open-direction="bottom" :options="options" :searchable="false" :close-on-select="true" placeholder="Pick a value"></multiselect>
        </mu-list-item>
        <mu-list-item  slot="nested">
            <span>Colour</span>
            <input spellcheck="false" class="secondary-input">
            <span class="square" slot="right"></span>
        </mu-list-item>  
        <mu-list-item  slot="nested">
            <span>Background</span>
            <input spellcheck="false" class="secondary-input">
            <span class="square" slot="right"></span>
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
        <mu-sub-header slot="nested">Text Shadow</mu-sub-header>
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
   </mu-list-item>
</template>
<script>
export default {
  name: 'TextLayer',
  data () {
      return {
        openpanel: false,
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
.mu-item{
    background-color: rgba(197, 194, 194, 0.09) !important;
}
</style>


