<template>
<modal name="responsive-modal" transition="pop-out" :width="900" :height="600" @before-open="beforeOpen" @before-close="beforeClose">
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
                               <div style="display: flex;"  v-for="(item,i) in banners"  :key="i" v-if="item.category === 'landscape'"  @click="selectRatio(item,'banners',$event)">
                                    <!-- :class="{'overlay-active': item.selected}" -->
                                     <div class="overlay" :class="{'overlay-active': item.selected || item.isPick}">
                                        <img v-if="item.isPick" class="img-overlay" src="../../assets/icoCheck.png" />
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
                            <div style="display: flex;"  v-for="(item,i) in banners"  :key="i" v-if="item.category === 'Portrait'" @click="selectRatio(item,'banners',$event)">
                                <div class="overlay" :class="{'overlay-active': item.selected || item.isPick}">
                                        <img v-if="item.isPick" class="img-overlay" src="../../assets/icoCheck.png" />
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
                        <mu-grid-list  :cols="5" :padding="10" class="gridlist">
                           <div style="display: flex;" v-for="(item,i) in screens" :key="i"  v-if="item.category === 'portrait'"  @click="selectRatio(item, 'screens', $event)">
                                    <!-- :class="{'overlay-active': item.selected}" -->
                                     <div class="overlay" :class="{'overlay-active': item.selected || item.isPick}">
                                        <img v-if="item.isPick" class="img-overlay" src="../../assets/icoCheck.png" />
                                    </div>
                                    <mu-grid-tile  style="width: 160px; padding: 5px 20px;border: 1px solid rgba(117, 117, 117, 0.48);margin-right: 10px;"> 
                                        <div class="img-container">
                                            <img :src="item.image" class="avatar"/>
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
                    <mu-raised-button label="Landscape" fullWidth  v-no-ripple/>
                    <div class="tab-detail">
                        <mu-grid-list  :cols="5" :padding="10" class="gridlist">
                             <div style="display: flex;" v-for="(item,i) in screens" :key="i"  v-if="item.category === 'landscape'"  @click="selectRatio(item, 'screens', $event)">
                                    <!-- :class="{'overlay-active': item.selected}" -->
                                     <div class="overlay" :class="{'overlay-active': item.selected || item.isPick}">
                                        <img v-if="item.isPick" class="img-overlay" src="../../assets/icoCheck.png" />
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
                 </div>
            </div>
             <div ref="tempPopupMenu" class="tem-action-menu" :class="[showMenu ? 'tem-action-menu-shown' : 'tem-action-menu-hidden']">
                <mu-list style="padding: 0">
                    <mu-list-item v-if="!isRemove" title="Add current design" class="tem-action-item" @click.stop="addCurentDesign()"/>
                    <mu-list-item  v-else title="Open" class="tem-action-item" @click.stop="open()"/>
                    <mu-divider inset class="temp-action-item-divider"/>
                    <mu-list-item v-if="isRemove" title-class="cust-title" title="Remove design" class="tem-action-item" @click.stop="removeDesign()"/>
                </mu-list>
            </div>
       </div>
</modal>
</template>
<script>
import {mapActions} from 'vuex'
import zoomHelper from '../../helpers/zoom.helper';
export default {
    name: 'responsiveModal',
    data () {
        return {
            activeTab: '1',
            tabStyle: {'color': '#fff'},
            template : '',
            showMenu: false,
            ratioSelected: {},
            currentElement: {}, 
            isRemove: false,
            modal: {},
            layers: [],
            screens: [
                {
                    id:1,
                    name:'2-3',
                    image: 'http://www.mediafire.com/convkey/5042/wrhx6oqn5ld8zeyzg.jpg',
                    category: 'portrait',
                    selected: false,
                    width:'600',
                    height: '900',
                    isPick: false
                
                },
                {
                    id:2,
                    name:'3-4',
                    image: 'http://www.mediafire.com/convkey/5042/wrhx6oqn5ld8zeyzg.jpg',
                    category: 'portrait',
                    selected: false,
                    width:'900',
                    height: '1200',
                    isPick: false
                
                },
                {
                    id:3,
                    name:'3-5',
                    image: 'http://www.mediafire.com/convkey/5042/wrhx6oqn5ld8zeyzg.jpg',
                    category: 'portrait',
                    selected: false,
                    width:'900',
                    height: '1500',
                    isPick: false
                
                },{
                    id:4,
                    name:'9-16',
                    image: 'http://www.mediafire.com/convkey/5042/wrhx6oqn5ld8zeyzg.jpg',
                    category: 'portrait',
                    selected: false,
                    width:'300',
                    height: '1800',
                    isPick: false
                
                },{
                    id:5,
                    name:'10-16',
                    image: 'http://www.mediafire.com/convkey/5042/wrhx6oqn5ld8zeyzg.jpg',
                    category: 'portrait',
                    selected: false,
                    width:'',
                    height: '',
                    isPick: false
                
                },{
                    id:6,
                    name:'9-18.5',
                    image: 'http://www.mediafire.com/convkey/5042/wrhx6oqn5ld8zeyzg.jpg',
                    category: 'portrait',
                    selected: false,
                    width:'',
                    height: '',
                    isPick: false
                
                },{
                    id:7,
                    name:'3-2',
                    image: 'http://www.mediafire.com/convkey/8d3c/0af2e1r94w7d25qzg.jpg?size_id=6',
                    category: 'landscape',
                    selected: false,
                    width:'900',
                    height: '600',
                    isPick: false
                
                },
                {
                    id:8,
                    name:'4-3',
                    image: 'http://www.mediafire.com/convkey/8d3c/0af2e1r94w7d25qzg.jpg?size_id=6',
                    category: 'landscape',
                    selected: false,
                    width:'1200',
                    height: '900',
                    isPick: false
                
                },{
                    id:9,
                    name:'5-3',
                    image: 'http://www.mediafire.com/convkey/8d3c/0af2e1r94w7d25qzg.jpg?size_id=6',
                    category: 'landscape',
                    selected: false,
                    width:'1500',
                    height: '900',
                    isPick: false
                
                },{
                    id:10,
                    name:'16-9',
                    image: 'http://www.mediafire.com/convkey/8d3c/0af2e1r94w7d25qzg.jpg?size_id=6',
                    category: 'landscape',
                    selected: false,
                    width:'1920',
                    height: '1080',
                    isPick: false
                
                },{
                    id:11,
                    name:'16-10',
                    image: 'http://www.mediafire.com/convkey/8d3c/0af2e1r94w7d25qzg.jpg?size_id=6',
                    category: 'landscape',
                    selected: false,
                    width:'',
                    height: '',
                    isPick: false
                
                }
            ],
            banners: [
                {
                    id:1,
                    name:'2-1',
                    image: 'http://www.mediafire.com/convkey/8d3c/0af2e1r94w7d25qzg.jpg?size_id=6',
                    category: 'landscape',
                    selected: false,
                    width:'600',
                    height: '300',
                    isPick: false
                
                },{
                    id:2,
                    name:'4-1',
                    image: 'http://www.mediafire.com/convkey/9a28/s99999yq9554453zg.jpg',
                    category: 'landscape',
                    selected: false,
                    width: '1200',
                    height: '300' ,
                    isPick: false
                },
                {
                    id:3,
                    name:'6-1',
                    image: 'http://www.mediafire.com/convkey/9fa4/b7zz7y84hhgi13pzg.jpg',
                    category: 'landscape',
                    selected: false,
                    width:'1800',
                    height: '300',
                    isPick: false
                },{
                    id:4,
                    name:'8-1',
                    image: 'http://www.mediafire.com/convkey/1eca/yocyt55k27878e3zg.jpg',
                    category: 'landscape',
                    selected: false,
                    width:'2400',
                    height: '300',
                    isPick: false
                },{
                    id:5,
                    name:'10-1',
                    image: 'http://www.mediafire.com/convkey/5f48/patm8ybc1cul96gzg.jpg',
                    category: 'landscape',
                    selected: false,
                    width:'3000',
                    height: '300',
                    isPick: false
                },{
                    id:6,
                    name:'1-2',
                    image: 'http://www.mediafire.com/convkey/2f40/09ur7jt75i6r06mzg.jpg',
                    category: 'Portrait',
                    selected: false,
                    width: '300',
                    height: '600',
                    isPick: false
                },{
                    id:7,
                    name:'1-4',
                    image: 'http://www.mediafire.com/convkey/5042/wrhx6oqn5ld8zeyzg.jpg',
                    category: 'Portrait',
                    selected: false,
                    width:'300',
                    height: '1200',
                    isPick: false
                },{
                    id:8,
                    name:'1-6',
                    image: 'http://www.mediafire.com/convkey/4936/5q5rv4rmtyr1gaizg.jpg',
                    category: 'Portrait',
                    selected: false,
                    width:'300',
                    height: '1800',
                    isPick: false
                },{
                    id:9,
                    name:'1-8',
                    image: 'http://www.mediafire.com/convkey/9deb/91xnbpic37dw4y2zg.jpg',
                    category: 'Portrait',
                    selected: false,
                    width:'300',
                    height: '2400',
                    isPick: false
                },{
                    id:10,
                    name:'1-10',
                    image: 'http://www.mediafire.com/convkey/ca09/0w9feiopqg0e168zg.jpg',
                    category: 'Portrait',
                    selected: false,
                    width:'300',
                    height: '3000',
                    isPick: false
                }
            ],
           
        }
    },
    mounted () {
        let grid = document.getElementsByClassName('list-container')
    },
    methods: {
        ...mapActions(['updateLayers','updatecanvasData']),
        beforeOpen (event) {
            console.log('evenmt:',event)
            this.modal = event
            this.template = event.params.data
            this.layers = event.params.layers
            let ratios = this.template.ratios
            if(this.template.selectedRatio !== '') {
               this.refresh(this.activeTab)
            }
        },
         tabChanged(val) {
             console.log("ASDASD",val)
            this.activeTab = val;
            this.refresh(this.activeTab)
        },
         closeModal () {
           this.$modal.hide('responsive-modal')
         },
        selectRatio (item, name,event) {
            let arr = []
            if(name === 'banners') {
                arr = this.banners
            }else{
                arr = this.screens
            }
            for(let i = 0;i < arr.length;i++){
                    if(item.id === arr[i].id){
                        arr[i].selected = true
                    }else {
                        arr[i].selected = false
                    }
            }
            if(item.isPick) {
                this.isRemove = true
            }else{
                this.isRemove = false
            }
            this.currentElement = event
            this.ratioSelected = item
            this.ratioSelected.tabSelected = name
            this.showMenu = this.ratioSelected != null;
            this.removeSelectedfn(item,event)
        },
        removeSelectedfn (item, event) {
                event.stopPropagation()
                let popover = document.getElementsByClassName('tem-action-menu')[0]
                popover.style.zIndex = '9999'
                if(item.isPick) {
                    event.path[1].appendChild(popover)
                }else{
                    this.currentElement.target.appendChild(popover)
                }
                // event.srcElement.style.background = 'rgba(0, 0, 0, 0.29)'
                // for(let i = 0; this.gridElements.length > i; i++){
                //     if(this.gridElements[i].id === item.id){
                //     this.currentElement.srcElement.style.background = 'rgba(0, 0, 0, 0.29)'
                //     this.currentElement.target.appendChild(popover)
                //     }else{
                //     this.gridElements[i].getElementsByClassName('mu-ripple-wrapper')[0].removeAttribute('style')
                //     }
                // }
        },
        addCurentDesign() {
            // this.template.height = this.ratioSelected.height
            // this.template.width = this.ratioSelected.width
            this.template.activeSize = {
                height: this.ratioSelected.height,
                width: this.ratioSelected.width
            }
            let clone = JSON.parse(JSON.stringify(this.layers))
            let newLayer = []
                clone.forEach(val => {
                    if(val.isBackground) {
                        val.width = parseInt(this.ratioSelected.width)+8
                        val.height = parseInt(this.ratioSelected.height)+5
                        val.x = -5
                        val.y = -2
                    }else {
                        val.x = 100
                        val.y = 100
                    }
                    newLayer.push(val)
                })
                console.log('selectedRatio:',this.template)
            if(this.template.selectedRatio !== '') {
                var index = this.template.ratios.findIndex((e)=>{return this.template.selectedRatio === e.name})
                this.ratioSelected.layers = JSON.parse(JSON.stringify(newLayer))
            }
            else{
                // let newlayer = this.template.layers
                this.ratioSelected.layers = JSON.parse(JSON.stringify(newLayer))
            }

            this.updateLayers(this.ratioSelected.layers)
            // console.log('going back', this.template.zoom)
            zoomHelper.gotoZoom(this.template, this.ratioSelected.layers, this.template.zoom, 100,  this.ratioSelected.zoom < 100 ? 'in' : 'out', false);
            this.ratioSelected.zoom = 100
            this.template.zoom = 100;
            // console.log('his.ratioSelected.layers', this.ratioSelected.layers)

            this.ratioSelected.isPick = true
            this.template.ratios.push(this.ratioSelected)
            this.currentElement.target.removeAttribute('style')
            this.showMenu = false
            this.template.selectedRatio = this.ratioSelected.name
            this.template.tabSelected = this.ratioSelected.tabSelected
            // console.log('this.template:',this.template)
            this.$localStorage.set('canvas',JSON.stringify(this.template))
            this.closeModal()
        },
        removeDesign (){
            let ratios = JSON.parse(JSON.stringify(this.template.ratios))
            let arr = []
            if(this.template.tabSelected === 'banners'){
                arr = this.banners
            }else {
                arr = this.screens
            }
            for(let i = 0;i < arr.length;i++){
                 if(this.ratioSelected.name === arr[i].name && this.ratioSelected.id === arr[i].id){
                        arr[i].selected = false
                        arr[i].isPick = false
                    }
            }
            var index = ratios.findIndex((e)=>{return this.ratioSelected.name === e.name})
            ratios.splice(index,1)
            this.template.ratios = ratios
            if(ratios.length === 0) {
                this.template.activeSize.height = this.template.height
                this.template.activeSize.width = this.template.width
                this.template.selectedRatio= ''
                // this.template.layers = this.template.originalLayers
                this.updateLayers(this.template.originalLayers)
            }
            if(this.ratioSelected.name === this.template.selectedRatio) {
                 this.template.selectedRatio = this.template.ratios[ratios.length-1].name
            }
            this.updatecanvasData(this.template);
            this.$localStorage.set('canvas',JSON.stringify(this.template))
            this.showMenu = false
        },
        refresh(activeTab) {
            let ratios = this.template.ratios
            let arr = []
            if (activeTab === '1'){
                arr = this.banners
            }else {
                arr = this.screens
            }
            for(let i = 0;i < arr.length;i++){
                if(ratios.length>0){
                    for(let j = 0;j < ratios.length;j++){
                        if(ratios[j].name === arr[i].name){
                            arr[i].selected = true
                            arr[i].isPick = true
                        }
                    }
                }
            } 
        },
        open () {
             this.template.activeSize = {
                height: this.ratioSelected.height,
                width: this.ratioSelected.width
            }
            this.template.selectedRatio = this.ratioSelected.name
            console.log('this.ratioSelected:',this.ratioSelected)
           var index = this.template.ratios.findIndex((e)=>{return this.template.selectedRatio === e.name})
            this.template.ratios[index].layers.forEach(e=>{
                e.selected = false
                e.open = false
            })
           this.updateLayers(this.template.ratios[index].layers)
            this.template.tabSelected = this.ratioSelected.tabSelected
            this.$localStorage.set('canvas',JSON.stringify(this.template))
            this.closeModal()
        },
        beforeClose () {
            this.showMenu = false
            this.ratioSelected.selected = false
            this.ratioSelected.isPick = false
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
  .mu-item-title .cust-title {
    font-size: 13px !important;
}
</style>


