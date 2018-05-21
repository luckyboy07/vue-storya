<template>
<div class="yawaa " :class="data.selected ? 'activeTool': ''">
    <mu-list-item title="Image Layer" :open="data.selected" @click.stop="open">
          <mu-icon slot="left" value="image" style="color: #fff"/>
          <mu-icon-button :icon="data.visible ? 'visibility' : 'visibility_off'" slot="right" @click.stop="toggleLayer()"/>
        <mu-icon-button :icon="data.selected ? 'expand_less' : 'expand_more'" class="expand-btn" slot="right" @click.stop="open"/>
        <mu-list-item  slot="nested"  class="paddingZero minHytZero"   @click="openModalimage">
             <mu-flexbox>
                  <mu-flexbox-item class="flex-container" > 
                      + Drag and Drop
                  </mu-flexbox-item>
             </mu-flexbox>
        </mu-list-item>
        <!-- <mu-list-item  slot="nested"  class="paddingZero">
          <div class="gridlist-demo-container">
            <mu-grid-list class="gridlist-demo left">Size Option</mu-grid-list>
            <mu-grid-list class="right">
            <multiselect v-model="value" :open-direction="'bottom'" :show-labels="false" :options="options" :searchable="false" :close-on-select="true" placeholder="Pick a value"></multiselect>
            </mu-grid-list>
          </div>
        </mu-list-item> -->
        <mu-list-item  slot="nested" class="paddingZero">
          <div class="gridlist-demo-container" style="margin-top: -7px;">
            <mu-grid-list class="gridlist-demo left">Size</mu-grid-list>
            <mu-grid-list class="right">
              <div class="input-container">
                    <span class="labelSpyker">W:</span>
                    <input spellcheck="false" class="inputSpyker" v-model="data.width">
                    <mu-icon slot="left" value="link" class="iconSpyker"/>
                    <span class="labelSpyker">H:</span>
                    <input spellcheck="false" class="inputSpyker"  v-model="data.height">
              </div>
            </mu-grid-list>
          </div>
        </mu-list-item>
        <mu-list-item  slot="nested" class="paddingZero">
          <div class="gridlist-demo-container">
            <mu-grid-list class="gridlist-demo left">Opacity</mu-grid-list>
            <mu-grid-list class="right">
            <mu-slider v-model="data.attributes.opacity" class="mmslider" :max="1"/>
            <input spellcheck="false" class="input-size sliderInput" v-model="data.attributes.opacity">
            </mu-grid-list>
          </div>
        </mu-list-item>
        <mu-list-item  slot="nested" class="paddingZero">
          <div class="gridlist-demo-container">
            <mu-grid-list class="gridlist-demo left">Rotate</mu-grid-list>
            <mu-grid-list class="right">
            <mu-slider v-model="data.attributes.rotation" class="mmslider" :max="360"/>
            <input spellcheck="false" class="input-size sliderInput" v-model="data.attributes.rotation">
            </mu-grid-list>
          </div>
        </mu-list-item>
        <mu-sub-header slot="nested">Border</mu-sub-header>
        <mu-list-item  slot="nested" class="paddingZero demiBlackbg">
          <div class="gridlist-demo-container">
            <mu-grid-list class="gridlist-demo left">Size</mu-grid-list>
            <mu-grid-list class="right">
            <mu-slider v-model="data.attributes.borderWidth" class="mmslider" />
            <input spellcheck="false" class="input-size sliderInput" v-model="data.attributes.borderWidth">
            </mu-grid-list>
          </div>
        </mu-list-item>
        <mu-list-item  slot="nested"  class="paddingZero demiBlackbg">
          <div class="gridlist-demo-container">
            <mu-grid-list class="gridlist-demo left">Style</mu-grid-list>
            <mu-grid-list class="right">
            <multiselect v-model="data.attributes.borderStyle" :open-direction="'bottom'" :show-labels="false" :options="borderSizes" :searchable="false" :close-on-select="true"></multiselect>
            </mu-grid-list>
          </div>
        </mu-list-item>
         <mu-list-item  slot="nested" class="paddingZero demiBlackbg">
          <div class="gridlist-demo-container" style="margin-top: -6px;">
            <mu-grid-list class="gridlist-demo left">Colour</mu-grid-list>
            <mu-grid-list class="right">
            <input spellcheck="false" class="input-size colorPicka" id="bordercolour" v-model="data.attributes.borderColor">
            <input spellcheck="false" class="input-size sliderInput" style="background-color:white" @click="showPicker($event,'border')">
            </mu-grid-list>
          </div>
        </mu-list-item>
        <mu-sub-header slot="nested">Shadow</mu-sub-header>
         <mu-list-item  slot="nested" class="paddingZero demiBlackbg">
          <div class="gridlist-demo-container">
            <mu-grid-list class="gridlist-demo left">Size</mu-grid-list>
            <mu-grid-list class="right">
            <mu-slider v-model="data.attributes.shadowSize" class="mmslider" />
            <input spellcheck="false" class="input-size sliderInput" v-model="data.attributes.shadowSize">
            </mu-grid-list >
          </div>
        </mu-list-item>
         <mu-list-item  slot="nested" class="paddingZero demiBlackbg">
          <div class="gridlist-demo-container" style="margin-top: -6px;">
            <mu-grid-list class="gridlist-demo left">Colour</mu-grid-list>
            <mu-grid-list class="right">
            <input spellcheck="false" class="input-size colorPicka" v-model="data.attributes.shadowColor">
            <input spellcheck="false" class="input-size sliderInput" style="background-color:white" @click="showPicker($event,'shadow')">
            </mu-grid-list>
          </div>
        </mu-list-item>
        <mu-list-item  slot="nested"  class="paddingZero">
          <div class="gridlist-demo-container">
            <mu-grid-list class="gridlist-demo left">Object-Fit</mu-grid-list>
            <mu-grid-list class="right">
            <multiselect v-model="data.attributes.objectFit" :options="objFit" :searchable="false" :close-on-select="true" placeholder="Pick a value"></multiselect>
            </mu-grid-list>
          </div>
        </mu-list-item>
    </mu-list-item>
</div>
</template>
<script>
import { mapGetters} from 'vuex'
export default {
  name: 'ImageLayer',
  props:['openpanel','data'],
  components:{
  },
  data (){
      return {
        expandIcon: 'expand_more',
        value: '',
        value1:0,
        value2: null,
        value3: null,
        options: ['Select option', 'options', 'selected', 'mulitple', 'label', 'searchable', 'clearOnSelect', 'hideSelected', 'maxHeight', 'allowEmpty', 'showLabels', 'onChange', 'touched'],
        borderSizes: [
          'None',
          'Dashed',
          'Solid',
          'Dotted'
        ],
        objFit:[
          'None',
          'Fill',
          'Contain',
          'Cover',
        ],
        dialog: '',
        detail: {}
      }
  },
  mounted (){
    //    setTimeout(() => {
    // let targetelem = document.getElementsByClassName('mu-popover')
    //     targetelem[0].style.left = '307px'
    //     targetelem[0].style.top = '116px'
    //     targetelem[0].style.width = '350px'
    //     targetelem[0].style.backgroundColor = '#171616'
    //     targetelem[0].firstElementChild.children[0].style.overflow = 'hidden'
    //     targetelem[0].firstElementChild.children[0].style.width = '350px'
    // },50)
  },
  watch: {
    // detail: {
    //   handler(val){
    //   console.log('val:',val)
    //   },
    //   deep: true
    // }
  },
   computed: {
    ...mapGetters(['getLayers'])
  },
  methods: {
    open (event) {
      // this.panelopen = !this.panelopen
      // this.$emit('openpanel',this.panelopen)
      for(let i = 0; i < this.getLayers.length;i++){
        if (this.getLayers[i].id === this.data.id) {
          this.data.selected = !this.data.selected;
        }else {
            this.getLayers[i].selected = false
        }
      }
      // if(this.data.selected){
      //   this.expandIcon = 'expand_less'
      // } else{
      //   this.expandIcon = 'expand_more'
      // }
      // this.data.open = this.panelopen
      // this.$emit('isOpen',this.data)
    },
    openModalimage () {
         this.$emit('selected',this.data)
         this.$modal.show('image-modal',{data:this.data})
    },
    toggleLayer() {
      this.data.selected = this.data.visible = !this.data.visible;
    },
    showPicker (event,name) {
       let inputelement = document.getElementById('bordercolour')
       this.$emit('isOpen',[true,event.target,this.data,name])
      // this.colorType = item.name
      // this.currentSelectedIndex = layerIndex
      // this.setSelectedLayer(this.layers[layerIndex], layerIndex)
      // this.currentSelectedAttributes = item
      // this.pickerisShow = !this.pickerisShow
      //   // this.colorPickerOwner = item.value
      // this.colorPickerOwner = this.pickerisShow ? event.srcElement : null
    },
  },
  created () {
      // this.panelopen = this.openpanel
      // this.detail = this.data
  }
}
</script>
<style scoped>
@import './menu.css';
</style>

