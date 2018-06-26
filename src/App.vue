<template>
  <div id="app">
    <div class="content">
      <div class="body">
        <router-view/>
        <!-- <div id="loader-wrapper">
			<div id="loader"></div>
		</div> -->
      </div>
    </div>
  </div>
</template>

<script>
/*
* - Key events are place here as the main component of the app
    @keys:
      ctrl + z: undo
      ctrl + y: redo
      ctrl + s: save to default saving action

  - Idle events are place here as the main component of the app
    @desc: idle event will trigger if inactive for 3 seconds
*/

import appHelper  from './helpers/app.helper.js'
import undoRedo from './helpers/undo-redo'
import fontHelper from './helpers/fonts.helper.js'
import { mapMutations, mapGetters, mapState } from 'vuex'
import* as $ from 'linq'
import snackbar from './helpers/snackbar.js';
import animation from './helpers/animation.js';
import API from './helpers/API.js'
export default {
  data () {
    return {
      show: false,
      eventWritten: false, // a flag to check if event listeners are written or attached
      idleTimeout: 1000, // the idle timeout to trigger the 'idleTimer' event. The value is in milliseconds
      idleTime: 0, // the idle time in seconds
      idleTimer: null, // the idle timer function. Assigned to a variable to be able to use it such as stopping the timer
      allowedKeys: ['y', 'z', 'Delete','Escape', 'c', 'v'], // allowed keys
      autoSaveInfoDisplayDuration: 0,
      copiedLayer: null, // the container of copied layer
    }
  },
  name: 'App',
  beforeCreate() {
     fontHelper.appendFont();
  },
  created() {
    if (this.eventWritten) {
      return;
    }
    // for key events such as ctrl y or z
    document.addEventListener('keydown', this.keydownEventHandler);
    // for idle detection
    // for now, just mousemove
    // but could be added if neede
    document.addEventListener('mousemove', this.handleMouseMoveEvent);
    this.eventWritten = true;
  },
  mounted() {
     this.setLayer()
    // on loaded, start the timer
    this.idleTimer = setInterval(this.handleIdleTimerElapsed, this.idleTimeout)
    this.$store.watch(this.$store.getters.altGetlayer, v =>{})
    API.getCanvas().then(response =>{
      console.log('response:',response)
    })
  },
  methods :{
    ...mapGetters(['getSelectedLayerId', 'getAutosaveStatusData']),
    ...mapMutations([
      'addLayer', 
      'setLayerValue', 
      'setSelectedLayerId', 
      'updateUndoRedoAction', 
      'setAutosaveData',
      'setLayer',
      'broadCastStatus'
      ]),
    keydownEventHandler(evt) {
      // resetting idle time in key activities
      if (this.idleTime !== 0) {
        this.idleTime = 0;
      }
      if (!this.allowedKeys.includes(evt.key)) {
        // if key is not in allowed keys, do not continue
        return;
      }
      // for keys with ctrl
      // metaKey for MAC
      if (evt.ctrlKey || evt.metaKey) {
        evt.preventDefault();
        if (evt.key === 'y') {
           var redoData = undoRedo.redo();
           if (redoData && redoData.lastAction === 'scale') {
            redoData = undoRedo.redo();
          }
          if (redoData) {
           this.$_handleRedo(redoData.layer, redoData.lastAction);
          }
          this.$_debugLogger("key action: redo");
        } else if (evt.key === 'z') {
          var undoData = undoRedo.undo();
          if (undoData && undoData.lastAction === 'scale') {
            undoData = undoRedo.undo();
          }
          if (undoData) {
             this.$_handleUndo(undoData.layer, undoData.lastAction)
          }
           this.$_debugLogger("key action: undo");
        }  else if (evt.key === 'c') {
           var item = this.getSelectedLayerId();
          if (item && item.sourceLayer.selected) {
           this.copiedLayer = appHelper.createLayer(item.sourceLayer);
          }
        } else if (evt.key === 'v') {
          if (this.layers.length <= 0) return;

          // this.copiedLayer.order = $.from(this.layers).max(l => l.order) + 1;
          this.copiedLayer.fromUndoRedo = true; // hack lol; this should be like this
          this.addLayer(this.copiedLayer);
          for (var i = 0; i < this.layers.length; i++) {
            this.layers[i].selected = false;
          }

         this.copiedLayer.selected = true;
          this.setSelectedLayerId(this.copiedLayer.id)
          this.copiedLayer = null;
        }
      } else {
        if (evt.key === 'Delete') {
          var item = this.getSelectedLayerId();
          if (item) {
            if (item.sourceLayer.islocked) {
              snackbar.show("Layer is locked");
              this.broadCastStatus({action: 'notify', layerId: item.sourceLayer.id});
              return;
            }
            undoRedo.add(appHelper.cloneLayer(item.sourceLayer), 'delete');
            this.$_removeFromArray(this.layers, item.id)
          }
        }
      }
    },
    handleMouseMoveEvent(evt) {
      if (this.idleTime !== 0) {
        this.idleTime = 0;
      }
    },
    handleIdleTimerElapsed(evt) {
      this.idleTime += 1;
      if (this.idleTime >= 3) {
         // check if the main layer array has items
        if (this.getAutosaveStatusData() === '1') {
          // trigger the idle time event
          this.$_debugLogger('Call auto save here (App.vue:113)');
          this.setAutosaveData("2");
          // moved to save only at every 3 seconds idle
          this.$localStorage.set('layers',JSON.stringify(this.layers))
        } 
        // else {
        //   this.$_debugLogger('Auto save: No data to save');
        // }
        this.idleTime = 0;
      }
      // handling save info 
      // hide info if time reaches 2 seconds
      if (this.getAutosaveStatusData() === '2') {
        this.autoSaveInfoDisplayDuration += 1000;
        // if save info is shown in 2 seconds
        // hide it
        if (this.autoSaveInfoDisplayDuration >= 2000) {
           this.setAutosaveData("0");
          this.autoSaveInfoDisplayDuration = 0;
        }
      }
    },
    $_handleUndo(item, action) {
        // console.log('_handleUndoRedo', item, action);
      // set the selected layer to the item from
      // undo/redo module
      this.setSelectedLayerId(item.id);

      if (action === 'create') {
        // if it was created, remove it
        this.$_removeFromArray(this.layers, item.id)
      } else if (action === 'scale') {
        this.setLayerValue(item);
      } else if (action === 'delete') {
        this.$_removeDuplicates(item.id)
        this.addLayer(item);
      } 

      this.updateUndoRedoAction();
    },
    $_handleRedo(item, action) {
      // console.log('_handleRedo', item, action);
      // set the selected layer to the item from
      // undo/redo module
      this.setSelectedLayerId(item.id);

      // for sure 
      // if its redo, the first actin should be undo
      // you can only REDO if the last operation was UNDO
      if (action === 'create') {
        // if the last action was create and it will be redo,
        // re-create the layer on the list
        item.fromUndoRedo = true;
        this.$_removeDuplicates(item.id);
        this.addLayer(item);
      } else if (action === 'scale') {
        // console.log('_handleUndoRedo', item, action);
        this.setLayerValue(item);
      }
      this.updateUndoRedoAction();
    },
    $_removeFromArray(arr, id) {
      // console.log('_removeFromArray', arr, id)
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].id === id) {
          arr.splice(i, 1);
          break;
        }
      }

      return arr;
    },
    $_removeDuplicates(id) {
      for (var i = 0; i < this.layers.length; i++) {
        if (this.layers[i].id === id) {
          this.layers.splice(i, 1);
        }
      }
    },
    $_debugLogger(log) {
       console.log('%c ' + log, 'background: green; color: #fff');
    }
  },
  computed: {
    ...mapGetters({
      layers: 'getLayers',
      lastLayerAddTime: 'getLastLayerAddTime',
      selectedLayer: 'getSelectedLayerId'
    })
  },
  watch: {
     lastLayerAddTime: function(data) {
      // console.log('---------------------- lastLayerAddTime changes', data);
      var newLayer = data.layer;
      animation.stopActiveAnimations(this.layers); // stoppping currently palying animation
      undoRedo.add(newLayer, 'create');
    },
    layers: {
      handler() {
        this.setAutosaveData("1");
      },
      deep: true
    },
    selectedLayer: function(val) {
      // stopping animations
      // removing class
       animation.stopActiveAnimations(this.layers); // stoppping currently palying animation
    }
  }
}
</script>

<style>
  html, body {
    font-family: Lato
  }
  .appBarIcon {
    height: 100%;
    width: 60px;
  }

  
#loader-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
}
#loader {
    display: block;
    position: relative;
    left: 50%;
    top: 50%;
    width: 150px;
    height: 150px;
    margin: -75px 0 0 -75px;
    border-radius: 50%;
    border: 3px solid transparent;
    border-top-color: #3498db;

    -webkit-animation: spin 2s linear infinite; /* Chrome, Opera 15+, Safari 5+ */
    animation: spin 2s linear infinite; /* Chrome, Firefox 16+, IE 10+, Opera */
}

    #loader:before {
        content: "";
        position: absolute;
        top: 5px;
        left: 5px;
        right: 5px;
        bottom: 5px;
        border-radius: 50%;
        border: 3px solid transparent;
        border-top-color: #e74c3c;

        -webkit-animation: spin 3s linear infinite; /* Chrome, Opera 15+, Safari 5+ */
        animation: spin 3s linear infinite; /* Chrome, Firefox 16+, IE 10+, Opera */
    }

    #loader:after {
        content: "";
        position: absolute;
        top: 15px;
        left: 15px;
        right: 15px;
        bottom: 15px;
        border-radius: 50%;
        border: 3px solid transparent;
        border-top-color: #f9c922;

        -webkit-animation: spin 1.5s linear infinite; /* Chrome, Opera 15+, Safari 5+ */
          animation: spin 1.5s linear infinite; /* Chrome, Firefox 16+, IE 10+, Opera */
    }

    @-webkit-keyframes spin {
        0%   { 
            -webkit-transform: rotate(0deg);  /* Chrome, Opera 15+, Safari 3.1+ */
            -ms-transform: rotate(0deg);  /* IE 9 */
            transform: rotate(0deg);  /* Firefox 16+, IE 10+, Opera */
        }
        100% {
            -webkit-transform: rotate(360deg);  /* Chrome, Opera 15+, Safari 3.1+ */
            -ms-transform: rotate(360deg);  /* IE 9 */
            transform: rotate(360deg);  /* Firefox 16+, IE 10+, Opera */
        }
    }
    @keyframes spin {
        0%   { 
            -webkit-transform: rotate(0deg);  /* Chrome, Opera 15+, Safari 3.1+ */
            -ms-transform: rotate(0deg);  /* IE 9 */
            transform: rotate(0deg);  /* Firefox 16+, IE 10+, Opera */
        }
        100% {
            -webkit-transform: rotate(360deg);  /* Chrome, Opera 15+, Safari 3.1+ */
            -ms-transform: rotate(360deg);  /* IE 9 */
            transform: rotate(360deg);  /* Firefox 16+, IE 10+, Opera */
        }
    }
</style>
