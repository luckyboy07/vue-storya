/*
 * Removes ripple to the element
 */
import Vue from 'vue'
Vue.directive('no-ripple', {
    bind(el, binding, vnode) {
        var ripple = el.querySelector('.mu-ripple-wrapper');
        if (ripple) {
            ripple.parentNode.removeChild(ripple)
        }
    },
    unbind(el) {}
});