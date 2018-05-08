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

import undoRedo from './helpers/undo-redo'
import { mapMutations, mapGetters, mapState } from 'vuex'
export default {
  data () {
    return {
      show: false,
      eventWritten: false, // a flag to check if event listeners are written or attached
      idleTimeout: 3000, // the idle timeout to trigger the 'idleTimer' event. The value is in milliseconds
      idleTime: 0, // the idle time in seconds
      idleTimer: null, // the idle timer function. Assigned to a variable to be able to use it such as stopping the timer
      allowedKeys: ['y', 'z'], // allowed keys
    }
  },
  name: 'App',
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
    // on loaded, start the timer
    //this.idleTimer = setInterval(this.handleIdleTimerElapsed, this.idleTimeout)
  },
  methods :{
    ...mapMutations(['addLayer', 'updateLayers']),
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
          if (redoData) {
           this.$_handleRedo(redoData.layer, redoData.lastAction);
          }
        } else if (evt.key === 'z') {
          var undoData = undoRedo.undo();
          if (undoData) {
             this.$_handleUndo(undoData.layer, undoData.lastAction)
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
         console.log('layers', this.layers);
        if (this.layers.length > 0) {
          // trigger the idle time event
          this.$_debugLogger('Call auto save here (App.vue:67)');
        } else {
          console.log('layer is empty');
        }
        this.idleTime = 0;
      }
    },
    $_handleUndo(item, action) {
      // console.log('_handleUndoRedo', item, action);
      if (action === 'create') {
        // if it was created, remove it
        this.updateLayers(this.$_removeFromArray(this.layers, item.id));
      } else if (action === 'modify') {

      }
    },
    $_handleRedo(item, action) {
      // console.log('_handleRedo', item, action);
      // for sure 
      // if its redo, the first actin should be undo
      // you can only REDO if the last operation was UNDO
      if (action === 'create') {
        // if the last action was create and it will be redo,
        // re-create the layer on the list
        item.fromUndoRedo = true;
        
        this.addLayer(item);
      }
    },
    $_removeFromArray(arr, id) {
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
      console.log('---------------------- lastLayerAddTime changes');
      if (this.layers.length > 0) {
        undoRedo.add(this.layers[this.layers.length -1], 'create');
      }
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
  .content {
    /* margin-top: 64px; */
  }
</style>
