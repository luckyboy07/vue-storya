import ResizerState from './resizer-state.ts';
import draggable from './draggable.ts';
import * as $ from 'linq'
const TYPE_PREFIX = 'rr-ord-';
const HANDLE_SELECTOR = '.rr-handle';

export default {
  name: 'rotatable-resizer',
  props: {
    id: {
      type: String
    },
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
      type: Number
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
    }
  },
  data() {
    const state: ResizerState = new ResizerState({
      left: this.left,
      top: this.top,
      width: this.width,
      height: this.height,
    }, this.rotation, this.fixedProportion);

    return {
      state,
      dragging: false
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

    const STATE_PROPS = ['width', 'height', 'rotation', 'left', 'top'];
    STATE_PROPS.forEach((prop) => {
      this.$watch(prop, function(val) {
        if (!this.dragging) {
          this.state[prop] = val;
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
    this.$refs.rotateHandle.addEventListener('mousedown', this.emitActivated)

    // when resizing
    const handles = this.$el.querySelectorAll(HANDLE_SELECTOR);
    for (let i = 0, j = handles.length; i < j; i++) {
      handles[i].addEventListener('mousedown', this.emitActivated)
    }
  },
  beforeDestroy() {
    this.$el.removeEventListener('mousedown', this.emitActivated)
    this.$refs.rotateHandle.removeEventListener('mousedown', this.emitActivated)

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
        left: state.left,
        top: state.top,
        width: state.width,
        height: state.height,
        rotation: state.rotation,
        octant: state.octant
      };
    }
  },

  methods: {
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

    // for vertical lines
    $_getDraggableGuideline() {
      for (var i = 0;i < this.$el.children.length; i++) {
        if (this.$el.children[i].className === 'p-d-g')
        return this.$el.children[i].children[0]
      }
    },
    $_toggleDraggableLines(show, line) {
      line.style.display = show ? 'block' : 'none';
    },
    showGridLine(deg) {
      if (!this.id) {
        return;
      }
      var line = this.$_getDraggableGuideline();
      this.$_toggleDraggableLines(false, line);
      // 0 degree & 180
      // show the horizontal ruler line
      // 90 degrees and 270
      // show the vertical ruler line 
      if ((deg - 1 >= -2 && deg + 1 <= 2) ||
          (deg - 1 >= 178 && deg + 1 <= 182) ||
          (deg - 1 >= 88 && deg + 1 <= 91) ||
          (deg - 1 >= 268 && deg + 1 >= -88)) {
          this.$_toggleDraggableLines(true, line);
      }
    },

    hideDraggableLines: function() {
      var line = this.$_getDraggableGuideline(this.id);
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
          const center = {
            left: bounds.left + bounds.width / 2,
            top: bounds.top + bounds.height / 2
          };
          var degree = (Math.atan2(event.clientY - center.top, event.clientX - center.left) * 180 / Math.PI + 90) % 360;
          if(self.value.rotation >= 31 && self.value.rotation <= 68) {
            self.state.octant = 1
          }else if(self.value.rotation >= 68 && self.value.rotation <= 90){
            self.state.octant = 2
          }else if(self.value.rotation >= 95 && self.value.rotation <= 135) {
            self.state.octant = 3
          }else if(self.value.rotation >= 160 && self.value.rotation <= 182){
            self.state.octant = 4
          }else if(self.value.rotation >= 215 && self.value.rotation <= 240){
            self.state.octant = 5
          }else if(self.value.rotation >= 241 && self.value.rotation <= 270){
            self.state.octant = 6
          }else if(self.value.rotation >= -89 && self.value.rotation < 0){
            self.state.octant = 7
          }else if(self.value.rotation >= 0 && self.value.rotation <= 30) {
            self.state.octant = 0
          }

          // added grid lines (same as canva)
          if (degree - 1 >= -5 && degree + 1 <= 5) {
            degree = 0;
          }
          if (degree - 1 >= 175 && degree + 1 <= 185) {
            degree = 180;
          }
          if (degree - 1 >= 85 && degree + 1 <= 95) {
            degree = 90;
          }
          if (degree - 1 >= 265 && degree + 1 >= -85) {
            degree = 270;
          }
          
          self.state.rotation = degree;
          self.showGridLine(self.state.rotation);
          self.emitInputEvent(self.value);
          self.emitRotated(self.state.rotation);
        },
        end() {
          self.emitChangeEvent();
          self.dragging = false;
          self.emitRotateEnded();
          self.hideDraggableLines();
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

          dom.style.left = rect.left + 'px';
          dom.style.top = rect.top + 'px';
          dom.style.width = rect.width + 'px';
          dom.style.height = rect.height + 'px';

          // emit dragging event
          self.emitDragging(rect.left,  rect.top);
        },
        end() {
          if (dragState.rect) {
            self.state.reset(dragState.rect);
            self.emitChangeEvent();
          }
          self.dragging = false;
          // throw drag-ended event
          self.emitDragEnd();
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
        },
        end() {
          if (resizeState.rect) {
            self.state.reset(resizeState.rect);
            self.emitChangeEvent();
          }
          self.dragging = false;
          // throw the resize-ended event
          self.emitEndResize(el.style.left, el.style.top, el.style.width, el.style.height);
        }
      });
    }
  }
};