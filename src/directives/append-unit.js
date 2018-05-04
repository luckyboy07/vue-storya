/*
 * Filters user inputs to only digits
 */
import Vue from 'vue'
Vue.directive('append-unit', {
    bind(el, binding, vnode) {
        var handleFocus = function(evt) {
            if (evt.target && evt.target.value) {
                evt.target.value = evt.target.value.replace(binding.value, '');
            }
        };
        var handleBlur = function(evt) {
            if (evt.target && evt.target.value) {
                evt.target.value += '' + binding.value;
            }
        };
        el.addEventListener('focus', handleFocus);
        el.addEventListener('blur', handleBlur);
        el.$destroy = () => {
            el.removeEventListener('focus', handleFocus);
            el.removeEventListener('blur', handleBlur);
        };
    },
    unbind(el) {
        el.$destroy();
    }
});