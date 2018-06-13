import templates from './animation-templates'

export default {
    currentTimeout: 0,
    $_animatedLayers: {},
    applyAnimation(layer) {
        var animFlow = layer.attributes.animation.animationFlow;
        var ts = this.$_sumFlow(animFlow);
        // keyframes
        //var kf0 default
        var kf1 = this.$_getAnimFlowAt(animFlow, 0);
        var kf2 = this.$_getAnimFlowAt(animFlow, 1);
        var kf3 = this.$_getAnimFlowAt(animFlow, 2);
        var kf4 = this.$_getAnimFlowAt(animFlow, 3);
        var kf5 = this.$_getAnimFlowAt(animFlow, 4);
        var tem = '';

        var animations = [];
        console.log(layer.attributes.animation);
        for (var i = 0; i < layer.attributes.animation.animations.length; i++) {
            switch (layer.attributes.animation.animations[i].animation) {
                case "Fade":
                    var cssVal = null;
                    if (layer.attributes.animation.animations[i].start === 'In') {
                        cssVal = templates.fade.toFadeOut(layer.id, this.getFlowsArr(animFlow), ts)
                    } else {
                        cssVal = templates.fade.toFadeIn(layer.id, this.getFlowsArr(animFlow), ts)
                    }
                    animations.push(cssVal);
                    break;
                case "Slide Left/Right":
                    var start = layer.attributes.animation.animations[i].start;
                    var end = layer.attributes.animation.animations[i].end;
                    var mtr = templates.move.getLeftToRight(layer.id, this.getFlowsArr(animFlow), ts, start, end);
                    console.log('Slide left/Right', mtr)
                    animations.push(mtr);
                    break;
                case "Slide Top/Bottom":
                    var t_start = layer.attributes.animation.animations[i].start;
                    var b_end = layer.attributes.animation.animations[i].end;
                    var mtb = templates.move.getTopToBottom(layer.id, this.getFlowsArr(animFlow), ts, t_start, b_end);
                    console.log('Slide Top/Bottom', mtb)
                    animations.push(mtb);
                    break;
                case "Rotate":
                    var start = layer.attributes.animation.animations[i].start;
                    var end = layer.attributes.animation.animations[i].end;
                    var rotate = templates.rotate.toRotate(layer.id, this.getFlowsArr(animFlow), ts, start, end);
                    console.log('rotate', rotate)
                    animations.push(rotate);
                    break;
                    break;
                default:
                    break;
            }
        }

        // console.log('layer', layer);
        // previewing
        this.addAnimation(layer.id, animations, ts, layer.attributes.animation.loop, layer.attributes.animation.custom)
    },
    addAnimation(id, animations, ts, loop, custom) {
        console.log(id, animations, ts, loop, custom)
        if (loop === 'Once') loop = 1;
        if (loop === 'Custom') loop = custom;

        var oldStyle = document.getElementById('style-' + id);
        if (oldStyle) {
            document.head.removeChild(oldStyle);
        }
        var cssVal = '';
        for (var i = 0; i < animations.length; i++) {
            cssVal += animations[i].css;
        }
        cssVal += '.animation-' + id;
        cssVal += '{  animation: ';
        for (var i = 0; i < animations.length; i++) {
            cssVal += animations[i].kfn + ' ' + ts + 's ' + loop;
            if (i !== animations.length - 1) {
                cssVal += ', '
            }
        }

        cssVal += ';}';

        var styleElem = document.createElement('style');
        styleElem.id = 'style-' + id;
        styleElem.innerHTML = cssVal;
        document.head.appendChild(styleElem);

        var elem = document.getElementById(id);
        for (var i = 0; i < elem.classList.length; i++) {
            // console.log(elem.classList[i])
            if (elem.classList[i] === 'animation-' + id) {
                elem.classList.remove(elem.classList[i]);
                break;
            }
        }
        // console.log(elem.classList)
        elem.className += ' animation-' + id;

        if (this.$_animatedLayers[id]) {
            delete this.$_animatedLayers[id];
        }
        this.$_animatedLayers[id] = {
            class: 'animation-' + id,
            style: 'style' + id
        };
    },
    $_sumFlow(obj) {
        var sum = 0;
        for (var p in obj) {
            sum += parseInt(obj[p])
        }
        return sum;
    },
    $_getAnimFlowAt(obj, i) {
        var c = 0;
        for (var p in obj) {
            if (c === i) {
                return parseInt(obj[p])
            }
            c++;
        }
        return 0;
    },
    getFlowsArr(obj) {
        var arr = [];
        for (var p in obj) {
            arr.push(parseInt(obj[p]));
        }

        return arr;
    },
    stopActiveAnimations(layers) {
        for (var i = 0; i < layers.length; i++) {
            if (layers[i].attributes.animation.playing) {
                this.updateAnimations(layers[i]);
                this.stopAnimation(layers[i]);
                layers[i].attributes.animation.playing = false;
            }
        }
    },
    stopAnimation(layer) {
        var elem = document.getElementById(layer.id);
        for (var i = 0; i < elem.classList.length; i++) {
            if (elem.classList[i] === 'animation-' + layer.id) {
                elem.classList.remove(elem.classList[i]);
                break;
            }
        }
    },
    updateAnimations(layer) {
        if (layer.attributes.animation.animations.length <= 0) {
            delete this.$_animatedLayers[layer.id]
            var elem = document.getElementById(layer.id);
            for (var i = 0; i < elem.classList.length; i++) {
                if (elem.classList[i] === 'animation-' + layer.id) {
                    elem.classList.remove(elem.classList[i]);
                    break;
                }
            }
        }

        var oldStyle = document.getElementById('style-' + layer.id);
        if (oldStyle) {
            document.head.removeChild(oldStyle);
        }
    },
    getAnimatedLayers() {
        return this.$_animatedLayers;
    },
}