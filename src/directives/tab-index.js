/*
 * Removes ripple to the element
 */
import Vue from 'vue'
Vue.directive('tabindex-override', {
    bind(el, binding, vnode) {
        var parentContainer = el.querySelector('.mu-item-wrapper');
        if (parentContainer) {
            parentContainer.setAttribute('tabindex', binding.value)
        }
    },
    unbind(el) {}
});