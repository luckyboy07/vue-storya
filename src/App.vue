<template>
  <div id="app">
    <div class="content">
      <div class="body">
        <router-view/>
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
export default {
  data () {
    return {
      show: false,
      eventWritten: false, // a flag to check if event listeners are written or attached
      idleTimeout: 1000, // the idle timeout to trigger the 'idleTimer' event. The value is in milliseconds
      idleTime: 0, // the idle time in seconds
      idleTimer: null, // the idle timer function. Assigned to a variable to be able to use it such as stopping the timer
      allowedKeys: ['y', 'z', 'Delete'], // allowed keys
      autoSaveInfoDisplayDuration: 0,
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
         this.$store.watch(this.$store.getters.altGetlayer, v =>{
      console.log('v:',v)
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
      'setLayer'
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
      if (evt.ctrlKey) {
        if (evt.key === 'y') {
           var redoData = undoRedo.redo();
          //  if (redoData && redoData.lastAction === 'scale') {
          //   redoData = undoRedo.redo();
          // }
          if (redoData) {
           this.$_handleRedo(redoData.layer, redoData.lastAction);
          }
          this.$_debugLogger("key action: redo");
        } else if (evt.key === 'z') {
          var undoData = undoRedo.undo();
          // if (undoData && undoData.lastAction === 'scale') {
          //   undoData = undoRedo.undo();
          // }
          if (undoData) {
             this.$_handleUndo(undoData.layer, undoData.lastAction)
          }
           this.$_debugLogger("key action: undo");
        } 
      } else {
        if (evt.key === 'Delete') {
          console.log('Delete app');
          var item = this.getSelectedLayerId();
          if (item) {
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
        if (this.layers.length > 0 && this.getAutosaveStatusData() === '1') {
          // trigger the idle time event
          console.log('ASDASDASDASD')
          this.$_debugLogger('Call auto save here (App.vue:113)');
          this.setAutosaveData("2");
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
        this.$localStorage.set('layers',JSON.stringify(this.layers))
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
    $_debugLogger(log) {
       console.log('%c ' + log, 'background: green; color: #fff');
    }
  },
  computed: {
    ...mapGetters({
      layers: 'getLayers',
      lastLayerAddTime: 'getLastLayerAddTime'
    })
  },
  watch: {
    lastLayerAddTime: function() {
      // console.log('---------------------- lastLayerAddTime changes');
      if (this.layers.length > 0) {
        var newLayer = this.layers[this.layers.length -1];
        this.setSelectedLayerId(newLayer.id);
        undoRedo.add(newLayer, 'create');
      }
    },
    layers: {
      handler() {
        this.setAutosaveData("1");
      },
      deep: true
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
</style>
