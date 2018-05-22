<template>
<modal name="image-modal"  transition="pop-out" :width="900" :height="600" @before-open="beforeOpen">
  <div class="box">
   <mu-row gutter>
       <mu-col width="70" desktop="70" style="border-right: 1px rgba(255, 255, 255, 0.21) solid;">
         <div class="modal-title">
            <mu-icon value="image" /><span style="margin-left: 5px"> Upload Image - Layer 1</span>
        </div>
         <file-upload
                extensions="gif,jpg,jpeg,png,webp"
                accept="image/png,image/gif,image/jpeg,image/webp"
                :size="1024 * 1024 * 10"
                @input-filter="inputFilter"
                @input-file="inputFile"
                :multiple="true"
                :drop="true"
                :drop-directory="true"
                v-model="files"
                ref="upload">
            <mu-flexbox class="flx">
              <mu-flexbox-item class="flex-container" > 
                          + Drag and Drop Images
              </mu-flexbox-item>
          </mu-flexbox>
        </file-upload>
         <br>
          <div class="container-grid">
          <mu-grid-list class="gridlist">
            <mu-grid-tile v-for="(img,i) in files" :key="i">
               <img :src="img.url" @click.stop="selectImage(img)" class="img-grid" :class="`${img.selected? 'selected' : ''}`"/>
            </mu-grid-tile>
          </mu-grid-list>
        </div>
       </mu-col>
       <mu-col width="30"  desktop="30" style="margin-top: 10px;">
         <mu-grid-list>
             <mu-grid-tile class="overview-tile">
               <img :src="selectedImage.url"/>
             </mu-grid-tile>
              <div class="selected-title">
            {{selectedImage.name}}<br>
            <span class="sub-title">1080x1920, 287KB</span>
          </div>
         <div class="buttons">
            <mu-raised-button label="Cancel" fullWidth class="btn-buttons"/>
            <mu-raised-button label="Ok" fullWidth class="btn-buttons" @click="confirm"/>
         </div>
         </mu-grid-list>
         
       </mu-col>
   </mu-row>
  </div>
  <!-- <div class="box">
    <div class="modal-title">
    <mu-icon value="image" /><span style="margin-left: 5px"> Upload Image - Layer 1</span>
    </div>
     <mu-row gutter style="margin-top: 10px;">
       <mu-flexbox class="flx">
          <mu-flexbox-item class="flex-container" > 
                      + Drag and Drop Images
          </mu-flexbox-item>
       </mu-flexbox>
     </mu-row>
      <mu-row gutter >
        <div class="container-grid">
          <mu-grid-list class="gridlist">
            <mu-grid-tile v-for="(img,i) in images" :key="i">
               <img :src="img.image"/>
            </mu-grid-tile>
          </mu-grid-list>
        </div>
      </mu-row>
  </div> -->
</modal>
</template>
<script>
  import Vue from 'vue'
  import FileUpload from 'vue-upload-component'
  import {mapMutations} from 'vuex'
Vue.component('file-upload', FileUpload)
export default {
    name: 'imageModal',
    props: [ 'modal', 'dialog'],
    data () {
      return {
       files: [],
       selectedImage: {},
      selectedLayer: {},
       images:[{
         id: 1,
         image: 'https://marketplace.canva.com/MACPvCG4Ti4/1/0/thumbnail_large/canva-gray-and-blue-photo-fitness-facebook-post-MACPvCG4Ti4.jpg'
       },
       {
         id:2,
         image: 'https://marketplace.canva.com/MACPvCG4Ti4/1/0/thumbnail_large/canva-gray-and-blue-photo-fitness-facebook-post-MACPvCG4Ti4.jpg'
       },
        {
         id:3,
         image: 'https://marketplace.canva.com/MACPvCG4Ti4/1/0/thumbnail_large/canva-gray-and-blue-photo-fitness-facebook-post-MACPvCG4Ti4.jpg'
       },
        {
         id:4,
         image: 'https://marketplace.canva.com/MACPvCG4Ti4/1/0/thumbnail_large/canva-gray-and-blue-photo-fitness-facebook-post-MACPvCG4Ti4.jpg'
       }
       ]
      }
    },
    methods:{
      ...mapMutations(['addImage']),
        inputFilter(newFile, oldFile, prevent) {
            console.log("DIRI")
          if (newFile && !oldFile) {
          if (!/\.(gif|jpg|jpeg|png|webp)$/i.test(newFile.name)) {
            this.alert('Your choice is not a picture')
            return prevent()
          }
        }
        if (newFile && (!oldFile || newFile.file !== oldFile.file)) {
          newFile.url = ''
          newFile.selected = false
          let URL = window.URL || window.webkitURL
          console.log(URL)
          if (URL && URL.createObjectURL) {
            newFile.url = URL.createObjectURL(newFile.file)
            // img.onload = function(){
            //   console.log('width', img.naturalWidth)
            //   console.log('width', img.naturalHeight)
            // }
          }
        }
      },
      inputFile(newFile, oldFile,prevent) {
          console.log('add', newFile)
        if (newFile && !oldFile) {
          // add
        }
        if (newFile && oldFile) {
          // update
          console.log('update', newFile)
        }
        if (!newFile && oldFile) {
          // remove
          console.log('remove', oldFile)
        }
      },
      closeModal () {
        // console.log('files"',this.files)
          // this.$emit('')
      },
      selectImage (image) {
        console.log('image:', image)
        this.selectedImage = image
        this.files.forEach(row => {
            row.selected = row.id === image.id
        })
      },
      confirm () {
        console.log('this.layer:',this.selectedLayer)
        console.log('this.selectedImage:',this.selectedImage)
        if(this.selectedLayer.type === 'shape'){
          this.selectedLayer.attributes.backgroundImageUri = this.selectedImage
        }else{
          this.selectedLayer.image = this.selectedImage
        }
        this.$modal.hide('image-modal')
        // this.addImage(this.layer)
        // this.dialog = false
        // this.$emit('updated-dialog',false)
        // console.log('files:',this.selectedImage)
        // this.selectedImage = this.selectedImage
      },
    beforeOpen(event) {
      console.log('event:',event)
      this.selectedLayer = event.params.data
      }
  },
  // upated () {
  //   this.files()  {
  //     console.log ('update')
  //   }
  // }
}
</script>
<style scoped >
  .drop-active {
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    position: fixed;
    z-index: 9999;
    opacity: .6;
    text-align: center;
    background: #000;
  }
 .drop-active h3 {
  margin: -.5em 0 0;
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  font-size: 40px;
  color: #fff;
  padding: 0;
}
.img-active{
   border: 1px solid rgba(81, 203, 238, 1);
    box-shadow: 0 0 5px rgba(81, 203, 238, 1);
 }
 
 .box {
   background: #191919;
    overflow: hidden;
  width: 900px;
  height: 600px;
  box-shadow: 0 0 40px black;
  border: 1px rgb(103, 96, 96) solid;
 }
 .modal-title {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    /* -webkit-box-pack: justify; */
    /* -webkit-justify-content: space-between; */
    /* -ms-flex-pack: justify; */
    /* justify-content: space-between; */
    padding: 24px 24px 20px;
    margin: 0;
    font-size: 22px;
    font-weight: 400;
    line-height: 32px;
    color: #ffffff;
    width: 622px;
    border-bottom: 1px rgba(255, 255, 255, 0.21) solid;
    /* border-right: 1px rgba(255, 255, 255, 0.21) solid; */
    margin-bottom: 10px;
 }
 .flx {
   width: 623px;
 }
  .flex-container{
         width: 623px;
        height: 35px;
        background-color: #3333339c;
        text-align: center;
        line-height: 32px;
        border: 1px dashed;
        border-color: #5d5b5b;
}
.container-grid{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.gridlist{
  /* width: 625px;
  height: 486px;
  overflow-y: auto; */
  display: flex;
   width: 625px;
  height: 486px;
  overflow-y: auto;
   /* display: flex; */
  /* flex-wrap: nowrap;
  overflow-x: auto; */
}
.gridlist .img-grid {
  cursor: pointer;
}
.gridlist .img-grid.selected{
  border: 1px #009D70 solid;
}
.overview-tile {
  width: 90% !important;
  height: 198px !important;
}
.selected-title {
    /* position: absolute; */
    width: 232px;
    text-align: center;
    font-size: 15px;
}
.selected-title .sub-title {
  font-size: 12px;
  color: #fffefe8f;
}
.buttons{
    position: absolute;
    bottom: 0;
    width: 232px;
    height: 125px;
}
.buttons .btn-buttons {
  margin-bottom: 10px;
   border: 1px rgba(255, 255, 255, 0.13) solid;
    background-color: #1A1A1A;
}
.mu-raised-button.hover{
  background-color: #009D70;
}
</style>


