<template>
 <mu-dialog :open="dialog" title="ASDASDASDASD" icon="image" @close="closeModal">
     <div>
    <mu-icon slot="left" value="image"/>
     </div>
    <mu-flat-button slot="actions" @click="closeModal" primary label="取消"/>
    <mu-flat-button slot="actions" primary @click="closeModal" label="确定"/>
  </mu-dialog>
  <!-- <v-dialog
        v-model="dialog"
        max-width="1000px"
        scrollable
        :persistent="true"
        :overlay="true"
        :multiple="true"
      >
      <v-card tile>
       <v-toolbar card dark color="primary">
              <v-btn icon @click="closeModal" dark>
                <v-icon>close</v-icon>
              </v-btn>
              <v-toolbar-title>Upload Image</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items>
                 
                <v-btn dark flat><file-upload
                      class="btn btn--flat btn_content"
                      extensions="gif,jpg,jpeg,png,webp"
                      v-model="files"
                      accept="image/png,image/gif,image/jpeg,image/webp"
                      :size="1024 * 1024 * 10"
                      @input-filter="inputFilter"
                      @input-file="inputFile"
                      :multiple="true"
                      :drop="true"
                      :drop-directory="true"
                      ref="upload" style="padding-top: 20px;">
                      Select files
                      </file-upload></v-btn>
              </v-toolbar-items>
              <v-menu bottom right offset-y>
                <v-btn slot="activator" dark icon>
                  <v-icon>more_vert</v-icon>
                </v-btn>
                <v-list>
                 
                </v-list>
              </v-menu>
               
            </v-toolbar>
            <v-container fluid grid-list-sm >
              <v-layout row wrap>
                <v-flex xs4 v-for="(file, i) in files" :key="i">
                  <img  @click="selectImage(file)" class="image" :src="file.url" :class="`${file.selected? 'img-active':'' }`" style="width:200px; height:200px">
                </v-flex>
              </v-layout>
              <div v-show="$refs.upload && $refs.upload.dropActive" class="drop-active">
                      <h3>Drop files to upload</h3>
                    </div>
            </v-container>
          <v-card-actions>
            <v-btn color="primary" flat @click.stop="dialog3=false">Close</v-btn>
            <v-btn color="primary" flat @click="confirm">Ok</v-btn>
          </v-card-actions>
      </v-card>
      </v-dialog> -->
</template>
<script>
  import Vue from 'vue'
  import FileUpload from 'vue-upload-component'
  import {mapMutations} from 'vuex'
Vue.component('file-upload', FileUpload)
export default {
    name: 'imageModal',
    props: [ 'modal', 'dialog','layer'],
    data () {
      return {
       files: [],
       selectedImage: {}
      }
    },
    methods:{
      ...mapMutations(['addImage']),
        inputFilter(newFile, oldFile, prevent) {
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
            console.log("DIRI",URL.createObjectURL(newFile.file))
            newFile.url = URL.createObjectURL(newFile.file)
            // img.onload = function(){
            //   console.log('width', img.naturalWidth)
            //   console.log('width', img.naturalHeight)
            // }
          }
        }
      },
      inputFile(newFile, oldFile,prevent) {
        if (newFile && !oldFile) {
          // add
          console.log('add', newFile)
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
        this.layer.image = this.selectedImage
        this.addImage(this.layer)
        // this.dialog = false
        this.$emit('updated-dialog',false)
        // console.log('files:',this.selectedImage)
        // this.selectedImage = this.selectedImage
      }
  },
  // upated () {
  //   this.files()  {
  //     console.log ('update')
  //   }
  // }
}
</script>
<style scoped>
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
</style>


