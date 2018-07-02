/*
 * Filters user inputs to only digits.
 * usage:
 *  <input type="text" v-digitsonly>
 */
import Vue from 'vue'
Vue.directive('digitsonly', {
    bind(el, binding, vnode) {
        var filter = function(evt) {
            var key = evt.key.toLowerCase();
            if (isNaN(key) && key !== 'backspace' && key !== '.' &&
                key !== 'delete' && key !== 'enter' && key !== 'a' &&
                key !== 'tab' && key !== 'arrowright' && key !== 'arrowleft' &&
                key !== '-') {
                evt.preventDefault();
            }
            // check for . (dots)
            if (key === '.' && evt.target.value && evt.target.value.indexOf('.') !== -1) {
                evt.preventDefault();
            }
            // for ctrl + a or select all text
            if (key === 'a' && !evt.ctrlKey) {
                evt.preventDefault();
            }
            var val = evt.target.value.toString();
            if (key === 'arrowup') {
                val = parseFloat(val) + 1;
            }
            if (key === 'arrowdown' && parseFloat(val) > 0) {
                val = parseFloat(val) - 1;
            }
            evt.target.value = val;
        };
        var unfocus = function(evt) {
            if (evt.target.value) {
                evt.target.value = parseFloat(evt.target.value);
            }
        };
        el.addEventListener('keydown', filter);
        el.addEventListener('blur', unfocus);
        el.$destroy = () => {
            el.removeEventListener('keydown', filter);
            el.removeEventListener('blur', unfocus);
        }
    },
    unbind(el) {
        el.$destroy();
    }
})