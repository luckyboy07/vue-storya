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
                    <mu-raised-button label="Portrait" fullWidth  v-no-ripple/>
                    <div class="tab-detail">
                         <mu-grid-list :cols="1" :padding="10" class="gridlist">
                             <mu-grid-tile style="width: 160px; padding: 5px 20px;border: 1px solid rgba(117, 117, 117, 0.48);margin-right: 10px;"> 
                                <div class="img-container">
                                    <img src="../../assets/tile_grey.png" class="avatar"/>
                                </div>
                                <span class="img-detail">
                                    Portrait
                                    <br>
                                    2:1
                                </span>
                             </mu-grid-tile>
                              <mu-grid-tile style="width: 160px; padding: 5px 20px;border: 1px solid rgba(117, 117, 117, 0.48);margin-right: 10px;"> 
                                <div class="img-container">
                                    <img src="../../assets/tile_grey.png" class="avatar"/>
                                </div>
                                 <span class="img-detail">
                                    Portrait
                                    <br>
                                    2:1
                                </span>
                             </mu-grid-tile>
                              <mu-grid-tile style="width: 160px; padding: 5px 20px;border: 1px solid rgba(117, 117, 117, 0.48);margin-right: 10px;"> 
                                <div class="img-container">
                                    <img src="../../assets/tile_grey.png" class="avatar"/>
                                </div>
                                 <span class="img-detail">
                                    Portrait
                                    <br>
                                    2:1
                                </span>
                             </mu-grid-tile>
                             <mu-grid-tile style="width: 160px; padding: 5px 20px;border: 1px solid rgba(117, 117, 117, 0.48);margin-right: 10px;"> 
                                <div class="img-container">
                                    <img src="../../assets/tile_grey.png" class="avatar"/>
                                </div>
                                 <span class="img-detail">
                                    Portrait
                                    <br>
                                    2:1
                                </span>
                             </mu-grid-tile>
                             <mu-grid-tile style="width: 160px; padding: 5px 20px;border: 1px solid rgba(117, 117, 117, 0.48);margin-right: 10px;"> 
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
                    </div>  
                    <mu-raised-button label="Landscape" fullWidth  v-no-ripple/>
                     <div class="tab-detail">
                          <mu-grid-list :cols="1" :padding="10" class="gridlist">
                             <mu-grid-tile style="width: 160px; padding: 5px 20px;border: 1px solid rgba(117, 117, 117, 0.48);margin-right: 10px;"> 
                                <div class="img-container">
                                    <img src="../../assets/tile_grey.png" class="avatar"/>
                                </div>
                                 <span class="img-detail">
                                    Portrait
                                    <br>
                                    2:1
                                </span>
                             </mu-grid-tile>
                              <mu-grid-tile style="width: 160px; padding: 5px 20px;border: 1px solid rgba(117, 117, 117, 0.48);margin-right: 10px;"> 
                                <div class="img-container">
                                    <img src="../../assets/tile_grey.png" class="avatar"/>
                                </div>
                                 <span class="img-detail">
                                    Portrait
                                    <br>
                                    2:1
                                </span>
                             </mu-grid-tile>
                              <mu-grid-tile style="width: 160px; padding: 5px 20px;border: 1px solid rgba(117, 117, 117, 0.48);margin-right: 10px;"> 
                                <div class="img-container">
                                    <img src="../../assets/tile_grey.png" class="avatar"/>
                                </div>
                                 <span class="img-detail">
                                    Portrait
                                    <br>
                                    2:1
                                </span>
                             </mu-grid-tile>
                             <mu-grid-tile style="width: 160px; padding: 5px 20px;border: 1px solid rgba(117, 117, 117, 0.48);margin-right: 10px;"> 
                                <div class="img-container">
                                    <img src="../../assets/tile_grey.png" class="avatar"/>
                                </div>
                                 <span class="img-detail">
                                    Portrait
                                    <br>
                                    2:1
                                </span>
                             </mu-grid-tile>
                             <mu-grid-tile style="width: 160px; padding: 5px 20px;border: 1px solid rgba(117, 117, 117, 0.48);margin-right: 10px;"> 
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
                                        2:1
                                    </span>
                                </mu-grid-tile>
                                <mu-grid-tile style="width: 160px; padding: 5px 20px;border: 1px solid rgba(117, 117, 117, 0.48);margin-right: 10px;margin-bottom: 10px;"> 
                                    <div class="img-container">
                                        <img src="../../assets/tile_grey.png" class="avatar"/>
                                    </div>
                                    <span class="img-detail">
                                        Portrait
                                        <br>
                                        2:1
                                    </span>
                                </mu-grid-tile>
                                <mu-grid-tile style="width: 160px; padding: 5px 20px;border: 1px solid rgba(117, 117, 117, 0.48);margin-right: 10px;margin-bottom: 10px;"> 
                                    <div class="img-container">
                                        <img src="../../assets/tile_grey.png" class="avatar"/>
                                    </div>
                                    <span class="img-detail">
                                        Portrait
                                        <br>
                                        2:1
                                    </span>
                                </mu-grid-tile>
                                <mu-grid-tile style="width: 160px; padding: 5px 20px;border: 1px solid rgba(117, 117, 117, 0.48);margin-right: 10px;margin-bottom: 10px;"> 
                                    <div class="img-container">
                                        <img src="../../assets/tile_grey.png" class="avatar"/>
                                    </div>
                                    <span class="img-detail">
                                        Portrait
                                        <br>
                                        2:1
                                    </span>
                                </mu-grid-tile>
                                <mu-grid-tile style="width: 160px; padding: 5px 20px;border: 1px solid rgba(117, 117, 117, 0.48);margin-right: 10px;margin-bottom: 10px;"> 
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
            tabStyle: {'color': '#fff'}
        }
    },
    methods: {
        beforeOpen () {
            // setTimeout(()=>{
            //   let tabs = document.getElementsByClassName('mu-tab-link')
            //   for (let i = 0;i< tabs.length;i++){
            //       tabs[i].style.width = '210px'
            //       tabs[i].style.position = 'absolute'
            //     }
            // },50)
        
        
        },
         tabChanged(val) {
            this.activeTab = val;
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
  .img-detail {
    text-align: center;
    position: absolute;
    width: 118px;
  }
</style>


