import Vue from 'vue'
Vue.directive('digitsonly', {
    bind(el, binding, vnode) {
        var filter = function(evt) {
            var key = evt.key.toLowerCase();
            if (isNaN(key) && key !== 'backspace' && key !== '.' && key !== 'delete' && key !== 'enter') {
                evt.preventDefault();
            }
            if (key === '.' && evt.target.value && evt.target.value.indexOf('.') !== -1) {
                evt.preventDefault();
            }
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