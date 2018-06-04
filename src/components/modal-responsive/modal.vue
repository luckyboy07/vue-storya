<template>
<modal name="responsive-modal" transition="pop-out" :width="900" :height="600" @before-open="beforeOpen">
   <div class="box">
       <!-- :value="activeTab" @change="tabChanged"  -->
        <div class="tabss">
            <mu-tabs :value="activeTab" @change="tabChanged">
                <mu-tab :titleClass="tabStyle" value="1" title="Banner"/>
                <mu-tab value="2" title="Sreens"/>
            </mu-tabs>
        </div>
       <div style="position: relative">
            <div v-if="activeTab === '1'" class="tab-item">
                <div class="tabs">
                    <div class="tab-detail">
                        <mu-grid-list :cols="1" :padding="10" class="gridlist">
                            <div style="width: 160px;margin-right: 10px;">
                                    <div class="overlay">
                                        <img class="img-overlay" src="../../assets/icoCheck.png" />
                                    </div>
                                <mu-grid-tile  style="width: 160px; padding: 5px 20px;border: 1px solid rgba(117, 117, 117, 0.48);margin-right: 10px;"> 
                                    <div class="img-container">
                                        <img src="../../assets/Responsive/1-1-original.png" style="width: 100%"/>
                                    </div>
                                    <br>
                                    <span class="img-detail">
                                        Original
                                        <br>
                                        356 x 360
                                    </span>
                                </mu-grid-tile>
                            </div>
                            <div style="width: 160px;margin-right: 10px;">
                                    <div class="overlay">
                                        <img class="img-overlay" src="../../assets/icoCheck.png" />
                                    </div>
                                <mu-grid-tile style="width: 160px; padding: 5px 20px;border: 1px solid rgba(117, 117, 117, 0.48);margin-right: 10px;"> 
                                    <div class="img-container">
                                        <img src="../../assets/Responsive/1-1.png" style="width: 100%"/>
                                    </div>
                                    <span class="img-detail">
                                        1:1
                                    </span>
                                </mu-grid-tile>
                            </div>
                        </mu-grid-list>
                    </div>
                    <mu-raised-button label="Landscape" fullWidth  v-no-ripple/>
                    <div class="tab-detail">
                         <mu-grid-list :cols="1" :padding="10" class="gridlist">
                               <div style="display: flex;"  v-for="(item,i) in items"  :key="i" v-if="item.category === 'landscape'" @click="selectRatio(item)">
                                     <div class="overlay" :class="{'overlay-active': item.selected}">
                                        <img class="img-overlay" src="../../assets/icoCheck.png" />
                                    </div>
                                    <mu-grid-tile  style="width: 160px; padding: 5px 20px;border: 1px solid rgba(117, 117, 117, 0.48);margin-right: 10px;"> 
                                        <div class="img-container">
                                            <img :src="item.image" class="avatar"/>
                                        </div>
                                        <span class="img-detail">
                                            Landscape
                                            <br>
                                            {{item.name}}
                                        </span>
                                    </mu-grid-tile>
                            </div>
                         </mu-grid-list>
                    </div>  
                    <mu-raised-button label="Portrait" fullWidth  v-no-ripple/>
                     <div class="tab-detail">
                          <mu-grid-list :cols="1" :padding="10" class="gridlist">
                            <div style="display: flex;"  v-for="(item,i) in items"  :key="i" v-if="item.category === 'Portrait'" @click="selectRatio(item)">
                                <div class="overlay" :class="{'overlay-active': item.selected}">
                                        <img class="img-overlay" src="../../assets/icoCheck.png" />
                                </div>
                                <mu-grid-tile  style="width: 160px; padding: 5px 20px;border: 1px solid rgba(117, 117, 117, 0.48);margin-right: 10px;"> 
                                    <div class="img-container">
                                        <img :src="item.image" style="width: 50%;"/>
                                    </div>
                                    <span class="img-detail">
                                        Portrait
                                        <br>
                                        {{item.name}}
                                    </span>
                                </mu-grid-tile>
                            </div>
                         </mu-grid-list>
                     </div>  
                </div>
            </div>
            </div>
            <div v-if="activeTab === '2'" class="tab-item">
                 <div class="tabs">
                    <mu-raised-button label="Portrait" fullWidth  v-no-ripple/>
                    <div class="tab-detail">
                        <mu-flex justify-content="center">
                            <mu-grid-list  :cols="5" :padding="10" class="gridlist">
                                <mu-grid-tile  style="width: 160px; padding: 5px 20px;border: 1px solid rgba(117, 117, 117, 0.48);margin-right: 10px;margin-bottom: 10px;"> 
                                    <div class="img-container">
                                        <img src="../../assets/tile_grey.png" class="avatar"/>
                                    </div>
                                    <span class="img-detail">
                                        Portrait
                                        <br>
                                        1:2
                                    </span>
                                </mu-grid-tile>
                                <mu-grid-tile style="width: 160px; padding: 5px 20px;border: 1px solid rgba(117, 117, 117, 0.48);margin-right: 10px;margin-bottom: 10px;"> 
                                    <div class="img-container">
                                        <img src="../../assets/tile_grey.png" class="avatar"/>
                                    </div>
                                    <span class="img-detail">
                                        Portrait
                                        <br>
                                        1:4
                                    </span>
                                </mu-grid-tile>
                                <mu-grid-tile style="width: 160px; padding: 5px 20px;border: 1px solid rgba(117, 117, 117, 0.48);margin-right: 10px;margin-bottom: 10px;"> 
                                    <div class="img-container">
                                        <img src="../../assets/tile_grey.png" class="avatar"/>
                                    </div>
                                    <span class="img-detail">
                                        Portrait
                                        <br>
                                        1:6
                                    </span>
                                </mu-grid-tile>
                                <mu-grid-tile style="width: 160px; padding: 5px 20px;border: 1px solid rgba(117, 117, 117, 0.48);margin-right: 10px;margin-bottom: 10px;"> 
                                    <div class="img-container">
                                        <img src="../../assets/tile_grey.png" class="avatar"/>
                                    </div>
                                    <span class="img-detail">
                                        Portrait
                                        <br>
                                        1:8
                                    </span>
                                </mu-grid-tile>
                                <mu-grid-tile style="width: 160px; padding: 5px 20px;border: 1px solid rgba(117, 117, 117, 0.48);margin-right: 10px;margin-bottom: 10px;"> 
                                    <div class="img-container">
                                        <img src="../../assets/tile_grey.png" class="avatar"/>
                                    </div>
                                    <span class="img-detail">
                                        Portrait
                                        <br>
                                        1:10
                                    </span>
                                </mu-grid-tile>
                                <mu-grid-tile  style="width: 160px; padding: 5px 20px;border: 1px solid rgba(117, 117, 117, 0.48);margin-right: 10px;margin-bottom: 10px;"> 
                                    <div class="img-container">
                                        <img src="../../assets/tile_grey.png" class="avatar"/>
                                    </div>
                                    <span class="img-detail">
                                        Portrait
                                        <br>
                                        2:1
                                    </span>
                                </mu-grid-tile>
                            </mu-grid-list>
                        </mu-flex>
                    </div>
                    <mu-raised-button label="Landscape" fullWidth  v-no-ripple/>
                    <div class="tab-detail">
                         <mu-flex justify-content="center">
                            <mu-grid-list  :cols="5" :padding="10" class="gridlist">
                                <mu-grid-tile  style="width: 160px; padding: 5px 20px;border: 1px solid rgba(117, 117, 117, 0.48);margin-right: 10px;margin-bottom: 10px;"> 
                                    <div class="img-container">
                                        <img src="../../assets/tile_grey.png" class="avatar"/>
                                    </div>
                                    <span class="img-detail">
                                        Portrait
                                        <br>
                                        2:1
                                    </span>
                                </mu-grid-tile>
                                <mu-grid-tile  style="width: 160px; padding: 5px 20px;border: 1px solid rgba(117, 117, 117, 0.48);margin-right: 10px;margin-bottom: 10px;"> 
                                    <div class="img-container">
                                        <img src="../../assets/tile_grey.png" class="avatar"/>
                                    </div>
                                    <span class="img-detail">
                                        Portrait
                                        <br>
                                        2:1
                                    </span>
                                </mu-grid-tile>
                                <mu-grid-tile  style="width: 160px; padding: 5px 20px;border: 1px solid rgba(117, 117, 117, 0.48);margin-right: 10px;margin-bottom: 10px;"> 
                                    <div class="img-container">
                                        <img src="../../assets/tile_grey.png" class="avatar"/>
                                    </div>
                                    <span class="img-detail">
                                        Portrait
                                        <br>
                                        2:1
                                    </span>
                                </mu-grid-tile>
                                <mu-grid-tile  style="width: 160px; padding: 5px 20px;border: 1px solid rgba(117, 117, 117, 0.48);margin-right: 10px;margin-bottom: 10px;"> 
                                    <div class="img-container">
                                        <img src="../../assets/tile_grey.png" class="avatar"/>
                                    </div>
                                    <span class="img-detail">
                                        Portrait
                                        <br>
                                        2:1
                                    </span>
                                </mu-grid-tile>
                            </mu-grid-list>
                         </mu-flex>
                    </div>
                 </div>
            </div>
       </div>
   </div>
</modal>
</template>
<script>
export default {
    name: 'responsiveModal',
    data () {
        return {
            activeTab: '1',
            tabStyle: {'color': '#fff'},
            template : '',
            items: [{
                id:1,
                name:'2-1',
                image: 'http://www.mediafire.com/convkey/8d3c/0af2e1r94w7d25qzg.jpg?size_id=6',
                category: 'landscape',
                selected: false,
                width:'',
                height: ''
               
            },{
                id:2,
                name:'4-1',
                image: 'http://www.mediafire.com/convkey/9a28/s99999yq9554453zg.jpg',
                category: 'landscape',
                selected: false,
                width:'',
                height: ''
            },
            {
                id:3,
                name:'6-1',
                image: 'http://www.mediafire.com/convkey/9fa4/b7zz7y84hhgi13pzg.jpg',
                category: 'landscape',
                selected: false,
                width:'',
                height: ''
            },{
                id:4,
                name:'8-1',
                image: 'http://www.mediafire.com/convkey/1eca/yocyt55k27878e3zg.jpg',
                category: 'landscape',
                selected: false,
                width:'',
                height: ''
            },{
                id:5,
                name:'10-1',
                image: 'http://www.mediafire.com/convkey/5f48/patm8ybc1cul96gzg.jpg',
                category: 'landscape',
                selected: false,
                width:'',
                height: ''
            },{
                id:6,
                name:'1-2',
                image: 'http://www.mediafire.com/convkey/2f40/09ur7jt75i6r06mzg.jpg',
                category: 'Portrait',
                selected: false,
                width:'',
                height: ''
            },{
                id:7,
                name:'1-4',
                image: 'http://www.mediafire.com/convkey/5042/wrhx6oqn5ld8zeyzg.jpg',
                category: 'Portrait',
                selected: false,
                width:'',
                height: ''
            },{
                id:8,
                name:'1-6',
                image: 'http://www.mediafire.com/convkey/4936/5q5rv4rmtyr1gaizg.jpg',
                category: 'Portrait',
                selected: false,
                width:'',
                height: ''
            },{
                id:9,
                name:'1-8',
                image: 'http://www.mediafire.com/convkey/9deb/91xnbpic37dw4y2zg.jpg',
                category: 'Portrait',
                selected: false,
                width:'',
                height: ''
            },{
                id:10,
                name:'1-10',
                image: 'http://www.mediafire.com/convkey/ca09/0w9feiopqg0e168zg.jpg',
                category: 'Portrait',
                selected: false,
                width:'',
                height: ''
            }]
        }
    },
    methods: {
        beforeOpen (event) {
            this.template = event.params.data
            console.log('this.template:',this.template)
            if(this.template.selectedRatio !== '') {
               for(let i = 0;i < this.items.length;i++){
                    if(this.template.selectedRatio === this.items[i].name){
                        this.items[i].selected = true
                    }else {
                        this.items[i].selected = false
                    }
                } 
            console.log('this.items:',this.items)
            }
        },
         tabChanged(val) {
            this.activeTab = val;
        },
         closeModal () {
           this.$modal.hide('responsive-modal')
         },
        selectRatio (item) {
            for(let i = 0;i < this.items.length;i++){
                if(item.id === this.items[i].id){
                    this.items[i].selected = true
                }else {
                    this.items[i].selected = false
                }
            }
            this.template.selectedRatio = item.name
            this.$localStorage.set('canvas',JSON.stringify(this.template))
            this.closeModal()
        }
    }
}
</script>
<style scoped>
.box {
    background: #191919;
    overflow: hidden;
    width: 900px;
    height: 600px;
    box-shadow: 0 0 40px black;
    border: 1px rgb(103, 96, 96) solid;
    overflow-y: auto;
}
 .mu-tabs {
    background-color: #000000;
    border-bottom: #323232 solid 1px;
    width: 250px;
    /* position: absolute; */
  }
  .mu-tab-active {
    color: #70c585!important;
  }
  .mu-tab-link-highlight {
    background-color: red !important;
    height: 0!important;
  }
  .mu-tabs .mu-tab-link {
    color: #606060;
    /* width: 210px;
    position: absolute; */
  }
  .tabss {
      height: 49px;
    width: inherit;
    background-color: black;
    border-bottom: #323232 solid 1px;
  }
  .tabs {
    position: relative;
    margin-top: 15px;
  }
  .tabs .tab-detail {
    margin-top: 20px;
    padding-left: 35px;
    margin-bottom: 25px;
  }
  .gridlist{     
    margin: -10px;
    display: flex;
    /* flex-wrap: nowrap; */
    overflow-x: auto;
  }
  .gridtile{ 
      width: 160px;
      padding: 5px 20px;
      
  }
  .img-container {
    margin-top: 10px;
    height: 120px;
    overflow: hidden;
    text-align: center;
  }
  .img-detail {
    text-align: center;
    position: absolute;
    width: 118px;
    top: 130px;
    
  }
  .overlay {
    background-color: rgba(8, 107, 47, 0.15);
    height: 27%;
    width: 18%;
    position: absolute;
    z-index: 9999;
    opacity: 0
  }
  .overlay-active {
      opacity: 1
  }
  .overlay .img-overlay {
    left: 25%;
    top: 19%;
    width: 50%;
    position: absolute;
  }

  .img-container .avatar {
    /* position: absolute; */
    width: 100%;
    left: 0;
    bottom: 0;
    right: 0;
    top: 20px;
  }
</style>


