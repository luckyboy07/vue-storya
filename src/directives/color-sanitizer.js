/*
 * Sanitizes inputted string as hex color
 */
import Vue from 'vue'
Vue.directive('sanize-color', {
    bind(el, binding, vnode) {
        var handleKeyup = function(evt) {
            if (/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(evt.target.value)) {
                // color is okay
            }
        };

        el.addEventListener('keyup', handleKeyup)
    },
    unbind(el) {}
});