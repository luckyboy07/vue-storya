import ResizerState from './resizer-state.ts';
import draggable from './draggable.ts';
import * as $ from 'linq'
import colorHelper from '../../helpers/color-helper.js'
import browserHelper from '../../helpers/browser.js'
const TYPE_PREFIX = 'rr-ord-';
const HANDLE_SELECTOR = '.rr-handle';

export default {
  name: 'rotatable-resizer',
  props: {
    // id: {
    //   type: String
    // },
    disabled: {
      type: Boolean
    },
    active: {
      type: Boolean,
      default: true
    },
    rotatable: {
      type: Boolean
    },
    dragMode: {
      type: String,
      default: 'content'
    },
    draggable: {
      type: Boolean,
      default: true
    },
    handles: {
      type: String
    },
    left: {
      type: Number
    },
    top: {
      type: Number
    },
    width: {
      type: Number
    },
    height: {
      type: Number
    },
    rotation: {
      type: String
    },
    fixedProportion: {
      type: Boolean,
      default: false
    },
    octant: {
      type: Number,
      default: 0
    },
    parent: {
      type: Boolean,
      default: false
    },
    z: {
      type: Number,
      default: 'auto'
    },
    zoom: {
      type: Number,
      default: 100
    },
    islocked: {
      type: Boolean,
      default: false,
    },
    canExecute: {
      type: Boolean,
      default: true,
    }
  },
  data() {
    const state: ResizerState = new ResizerState({
      active: this.active,
      left: this.left,
      top: this.top,
      width: this.width,
      height: this.height,
      z: this.z, 
      zoom: this.zoom
    }, this.rotation, this.fixedProportion);

    return {
      state,
      dragging: false,
      isRotating: false,
      isResizing: false,
      isDragging: false,
    };
  },

  created() {
    this.$watch('rotatable', function(val) {
      if (val) {
        this.$nextTick(() => this.bindRotateEvent());
      }
    });

    this.$watch('handles', function() {
      this.$nextTick(() => this.bindResizeEvent());
    });

    const STATE_PROPS = ['active', 'width', 'height', 'rotation', 'left', 'top','z', 'zoom'];
    STATE_PROPS.forEach((prop) => {
      this.$watch(prop, function(val) {
        if (!this.dragging) {
          this.state[prop] = val;
          this.setOctantValue(this.state.rotation)
        }
      });
    });
  },

  mounted() {
    this.bindResizeEvent();
    this.bindDragEvent();
    this.bindRotateEvent();

    // to trigegr activated event
    this.$el.addEventListener('mousedown', this.emitActivated)
    if (this.$refs.rotateHandle) {
      this.$refs.rotateHandle.addEventListener('mousedown', this.emitActivated)
    }

    // when resizing
    const handles = this.$el.querySelectorAll(HANDLE_SELECTOR);
    for (let i = 0, j = handles.length; i < j; i++) {
      handles[i].addEventListener('mousedown', this.emitActivated)
    }
  },
  beforeDestroy() {
    this.$el.removeEventListener('mousedown', this.emitActivated)
    if (this.$refs.rotateHandle) {
      this.$refs.rotateHandle.removeEventListener('mousedown', this.emitActivated)
    }

    // removing event listeners on handles
    const handles = this.$el.querySelectorAll(HANDLE_SELECTOR);
    for (let i = 0, j = handles.length; i < j; i++) {
      handles[i].removeEventListener('mousedown', this.emitActivated)
    }
  },

  computed: {
    rectHandles() {
      const handles = this.handles || 'n,e,s,w,nw,ne,se,sw';
      return handles.split(',').map((handle) => handle.trim());
    },

    value(): Rect {
      const state = this.state;
      return {
        active: state.active,
        left: state.left,
        top: state.top,
        width: state.width,
        height: state.height,
        rotation: state.rotation,
        octant: state.octant,
        z: state.z,
        zoom: state.zoom
      };
    },
    style: function () {
      return {
        zIndex: this.zIndex
      }
    }
  },
  watch: {
    z: function (val){
      if(val >= 0 || val === 'auto') {
        this.zIndex = val
      }
    }
  },
  methods: {
    onFocus(e: any) {
      if (!e) {
        this.$el.style.outline = 'thin grey dashed';
      }
    },

    onFocusOut(e: any) {
      this.$el.style.outline = null;
    },
    
    emitInputEvent(rect: Rect) {
      this.$emit('input', rect);
    },

    emitChangeEvent() {
      this.$emit('change', this.value);
    },

    emitBeforeInputEvent() {
      this.$emit('before-input', this.value);
    },

    emitActivated() {
      this.$emit("activated");
      this.$emit("focused", this.$el, {id: this.$el.id, islocked: this.islocked});

      // removing mouseover focus outline
      this.$el.style.outline = null;
    },

    emitRotateStated() {
      this.$emit("rotateStarted");
    },

    emitRotated(deg) {
      this.$emit("rotated", deg);
    },

    emitRotateEnded() {
      this.$emit("rotateEnded");
    },

    emitDragStart() {
      this.$emit("dragStarted");
    },
    emitDragging(left, top) {
      this.$emit("dragging", left,  top);
    },

    emitDragEnd() {
      this.$emit("dragEnded");
    },

    emitResizeStarted() {
      this.$emit('resizeStarted');
    },

    emitResizing(left, top, width, height) {
      this.$emit('resizing', left, top, width, height);
    },

    emitEndResize(left, top, width, height) {
      this.$emit('resizeEnded', left, top, width, height);
    },

    emitShowLeftGridLine(showLeft, left, precise) {
      this.$emit('showXGridLine', showLeft, left, precise);
    },

    emitShowRightGridLine(showRight, right, precise) {
      this.$emit('showYGridLine', showRight, right, precise);
    },

    emitOnItemOutOfTheBox(show) {
      this.$emit('onItemOutOfTheBox', show);
    },

    setOctantValue(deg) {
      if(deg >= 31 && deg <= 68) {
        this.state.octant = 1
      }else if(deg >= 68 && deg <= 90){
        this.state.octant = 2
      }else if(deg >= 95 && deg <= 135) {
        this.state.octant = 3
      }else if(deg >= 160 && deg <= 182){
        this.state.octant = 4
      }else if(deg >= 215 && deg <= 240){
        this.state.octant = 5
      }else if(deg >= 241 && deg <= 270){
        this.state.octant = 6
      }else if(deg >= -89 && deg < 0){
        this.state.octant = 7
      }else if(deg >= 0 && deg <= 30) {
        this.state.octant = 0
      }
    },

    // for vertical lines
    $_getDraggableGuideline() {
      return this.$el.querySelector('.h-l-g');
    },
    $_toggleDraggableLines(show, line) {
      line.style.display = show ? 'block' : 'none';
    },
    showGridLine(degree) {
      var line = this.$_getDraggableGuideline();
      this.$_toggleDraggableLines(false, line);
      if ( (degree - 3 >= -5 && degree + 3 <= 5) ||
           (degree - 3 >= 40 && degree + 3 <= 50) || 
           (degree - 3 >= 85 && degree + 3 <= 95) ||
           (degree - 3 >= 130 && degree + 3 <= 140) ||
           (degree - 3 >= 175 && degree + 3 <= 185) ||
           (degree - 3 >= 220 && degree + 3 <= 230) ||
           (degree - 3 >= 265 && degree + 3 >= -85) || 
           (degree - 3 <= -40 && degree + 3 >= -50)) {
          this.$_toggleDraggableLines(true, line);
      }
    },

    hideDraggableLines: function() {
      var line = this.$_getDraggableGuideline();
      this.$_toggleDraggableLines(false, line);
    },

    hasHandle(ord) {
      return this.rectHandles.indexOf(ord) !== -1;
    },

    bindRotateEvent() {
      const handle = <HTMLElement>this.$refs.rotateHandle;
      if (!handle) return;

      const self = this;
      const el = self.$el;
      draggable(handle, {
        start() {
          if (self.disabled) return false;
          self.dragging = true;
          self.emitBeforeInputEvent();
          self.showGridLine(self.state.rotation);
          self.emitRotateStated();
        },
        drag(event: MouseEvent) {
          const bounds = el.getBoundingClientRect();
         
          var center = {
            left: bounds.left + bounds.width / 2,
            top: bounds.top + bounds.height / 2
          };

          var degree = (Math.atan2(event.clientY - center.top, event.clientX - center.left) * 180 / Math.PI + 90) % 360;
          self.setOctantValue(self.value.rotation);
          
          if (degree - 3 >= -5 && degree + 3 <= 5) {
            degree = 0;
          }
          if (degree - 3 >= 40 && degree + 3 <= 50) {
            degree = 45;
          }
          if (degree - 3 >= 85 && degree + 3 <= 95) {
            degree = 90;
          }
          if (degree - 3 >= 130 && degree + 3 <= 140) {
            degree = 135;
          }
          if (degree - 3 >= 175 && degree + 3 <= 185) {
            degree = 180;
          }
          if (degree - 3 >= 220 && degree + 3 <= 230) {
            degree = 225;
          }
          if (degree - 3 >= 265 && degree + 3 >= -85) {
            degree = 270;
          }
          if (degree - 3 <= -40 && degree + 3 >= -50) {
            degree = -45;
          }
          
          self.state.rotation = degree;
          self.showGridLine(self.state.rotation);
          self.emitInputEvent(self.value);
          self.emitRotated(self.state.rotation);
          self.isRotating = true;
        },
        end() {
          self.emitChangeEvent();
          self.dragging = false;
          self.emitRotateEnded();
          self.hideDraggableLines();
          self.isRotating = false;
        }
      });
    },

    bindDragEvent() {
      const self = this;
      const dom = this.$el;
      const dragState: any = {};
      let mX = 0, mY = 0; // max x and y moves
      let pW =  0, pH = 0; // parent width and height

      draggable(dom, {
        handle: self.dragMode === 'border' ? '.rr-bar' : null,
        start(event: MouseEvent) {
          if (!self.draggable || self.disabled) return false;
          dragState.startX = event.clientX;
          dragState.startY = event.clientY;
          self.dragging = true;

          pW = dom.parentElement.parentElement.offsetWidth; // parent width;
          pH = dom.parentElement.parentElement.offsetHeight;
          mX = pW - dom.offsetWidth;
          mY = pH - dom.offsetHeight;

          self.emitBeforeInputEvent();
          self.emitDragStart();
        },
        drag(event: MouseEvent) {
          const deltaX = event.clientX - dragState.startX;
          const deltaY = event.clientY - dragState.startY;

          const rect = self.state.translate(deltaX, deltaY);
          rect.rotation = self.state.rotation;
          self.emitInputEvent(rect);

          dragState.rect = rect;

          // checking to avoid draggable going out to the parents content
          // left
          if (self.parent && rect.left < 0) {
            rect.left = -2;
          }
          // right
          if (self.parent && ((rect.left + dom.offsetWidth) - 2) >= pW) {
            rect.left = mX;
          }
          // top
          if (self.parent && rect.top < 0) {
            rect.top = 0;
          }
          // bottom
          if (self.parent && ((rect.top + dom.offsetHeight) - 2) >= pH) {
           rect.top = mY;
          }

          // pilit2 style XD
          self.emitShowLeftGridLine(false);
          self.emitShowRightGridLine(false);
          self.emitOnItemOutOfTheBox(false);

          var cX = rect.left + rect.width / 2;
          var cY = rect.top + rect.height / 2;
          // X
          if (rect.left <= 3 && rect.left >= -3) {
            rect.left = 0;
            self.emitShowLeftGridLine(true, 0, true);
            self.emitDragging(rect.left,  rect.top);
          }
          if (rect.left + rect.width >= pW - 3 && rect.left + rect.width <= pW + 3) {
            rect.left = pW - rect.width;
            self.emitShowLeftGridLine(true,rect.width, true);
            self.emitDragging(rect.left,  rect.top);
          }

          if (cX - 10 <=  (pW / 4) && (cX + 10 >=  (pW / 4))) {
            rect.left = (pW / 4) - rect.width / 2;
            self.emitShowLeftGridLine(true, (pW / 4));
            self.emitDragging(rect.left,  rect.top);
          }

          if (cX - 10 <=  (pW / 2) && (cX + 10 >=  (pW / 2))) {
            rect.left = (pW / 2) - rect.width / 2;
            self.emitShowLeftGridLine(true, (pW / 2));
            self.emitDragging(rect.left,  rect.top);
          }

          if (cX - 10 <= pW - (pW / 4) && (cX + 10 >= pW - (pW / 4))) {
            rect.left = pW - (pW / 4) - rect.width / 2;
            self.emitShowLeftGridLine(true, pW - (pW / 4));
            self.emitDragging(rect.left,  rect.top);
          }

          // Y
          // console.log(rect.left, pW - 3, pW + 3)
          if (rect.top <= 3 && rect.top >= -3) {
            rect.top = 0;
            self.emitShowRightGridLine(true, 0, true);
          }

          if (rect.top + rect.height >= pH - 3 && rect.top + rect.height <= pH + 3) {
            rect.top = pH - rect.height;
            self.emitShowRightGridLine(true,rect.height, true);
            self.emitDragging(rect.left,  rect.top);
          }

          if (cY - 10 <=  (pH / 4) && (cY + 10 >=  (pH / 4))) {
            rect.top = (pH / 4) - rect.height / 2;
            self.emitShowRightGridLine(true,  (pH / 4));
            self.emitDragging(rect.left,  rect.top);
          }

          if (cY - 10 <=  (pH / 2) && (cY + 10 >=  (pH / 2))) {
            rect.top = (pH / 2) - rect.height / 2;
            self.emitShowRightGridLine(true,  (pH / 2));
            self.emitDragging(rect.left,  rect.top);
          }

          if (cY - 10 <= pH - (pH / 4) && (cY + 10 >= pH - (pH / 4))) {
            rect.top = pH - (pH / 4) - rect.height / 2;
            self.emitShowRightGridLine(true,  pH - (pH / 4));
            self.emitDragging(rect.left,  rect.top);
          }

          // showing a border when an element is out of the box when dragging
          if ( (rect.left + rect.width < 0) || 
              (rect.top + rect.height < 0) || 
               (rect.left > pW) || (rect.top > pH) ) {
            self.emitOnItemOutOfTheBox(true);
          }

          if (self.canExecute) {
            dom.style.left = rect.left + 'px';
            dom.style.top = rect.top + 'px';
            dom.style.width = rect.width + 'px';
            dom.style.height = rect.height + 'px';
          }

          // emit dragging event
          self.emitDragging(rect.left,  rect.top);
          self.isDragging = true;
        },
        end() {
          if (dragState.rect) {
            self.state.reset(dragState.rect);
            self.emitChangeEvent();
          }
          self.dragging = false;
          // throw drag-ended event
          self.emitDragEnd();
          self.isDragging = false;
          self.emitShowLeftGridLine(false);
          self.emitShowRightGridLine(false);
          self.emitOnItemOutOfTheBox(false);
        }
      });
    },

    bindResizeEvent() {
      const self = this;
      const dom = this.$el;

      let aspectRatio = self.aspectRatio;

      if (typeof aspectRatio !== 'number') {
        aspectRatio = undefined;
      }

      const handles = dom.querySelectorAll(HANDLE_SELECTOR);

      for (let i = 0, j = handles.length; i < j; i++) {
        this.makeHandleResizable(<HTMLElement>handles[i]);
      }
    },

    makeHandleResizable(handle: HTMLElement) {
      const self = this;
      const el = this.$el;
      const type = handle.className.split(' ')[1].replace(TYPE_PREFIX, '');

      let resizeState: any = {};
      let startPoint;
      let startSize = {};

      draggable(handle, {
        start(event: MouseEvent) {
          if (self.disabled) return false;
          resizeState.startX = event.clientX;
          resizeState.startY = event.clientY;
          startPoint = self.state.getPoint(<PointType>type);
          startSize = {
            width: self.state.width,
            height: self.state.height
          };
          self.dragging = true;
          self.emitBeforeInputEvent();
          self.emitResizeStarted();
        },
        drag(event: MouseEvent) {
          const deltaX = event.clientX - resizeState.startX;
          const deltaY = event.clientY - resizeState.startY;

          const rect = self.state.dragPoint(type, deltaX, deltaY, startPoint, startSize);
          resizeState.rect = rect;

          rect.rotation = self.state.rotation;
          self.emitInputEvent(rect);

          if (rect.left !== undefined) {
            el.style.left = rect.left + 'px';
            el.style.top = rect.top + 'px';
          }

          if (rect.width !== undefined) {
            el.style.width = rect.width + 'px';
            el.style.height = rect.height + 'px';
          }

          // throw the resizing event
          self.emitResizing(rect.left, rect.top, rect.width, rect.height)
          self.isResizing = true;
        },
        end() {
          if (resizeState.rect) {
            self.state.reset(resizeState.rect);
            self.emitChangeEvent();
          }
          self.dragging = false;
          // throw the resize-ended event
          self.emitEndResize(el.style.left, el.style.top, el.style.width, el.style.height);
          self.isResizing = false;
        }
      });
    }
  }
};