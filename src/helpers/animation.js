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
        // console.log(layer.attributes.animation);
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
                    // console.log('Slide left/Right', mtr)
                    animations.push(mtr);
                    break;
                case "Slide Top/Bottom":
                    var t_start = layer.attributes.animation.animations[i].start;
                    var b_end = layer.attributes.animation.animations[i].end;
                    var mtb = templates.move.getTopToBottom(layer.id, this.getFlowsArr(animFlow), ts, t_start, b_end);
                    // console.log('Slide Top/Bottom', mtb)
                    animations.push(mtb);
                    break;
                case "Rotate":
                    var start = layer.attributes.animation.animations[i].start;
                    var end = layer.attributes.animation.animations[i].end;
                    var scale_start = 100,
                        scale_end = 100;
                    // finding scale value
                    for (var j = 0; j < layer.attributes.animation.animations.length; j++) {
                        if (layer.attributes.animation.animations[j].animation === 'Size') {
                            scale_start = layer.attributes.animation.animations[j].start;
                            scale_end = layer.attributes.animation.animations[j].end;
                        }
                    }
                    var rotate = templates.rotate.toRotate(layer.id, this.getFlowsArr(animFlow), ts, start, end, scale_start, scale_end);
                    // console.log('rotate', rotate)
                    animations.push(rotate);
                    break;
                case "Size":
                    // scale will be included in rotate
                    // only activate if rotation is not defined
                    var canExecute = true;
                    for (var j = 0; j < layer.attributes.animation.animations.length; j++) {
                        if (layer.attributes.animation.animations[j].animation === 'Rotate') {
                            canExecute = false;
                            break;
                        }
                    }
                    if (canExecute) {
                        var scale_start = layer.attributes.animation.animations[i].start || '100';
                        var scale_end = layer.attributes.animation.animations[i].end || '100';
                        var scaled = templates.scale.getScale(layer.id, this.getFlowsArr(animFlow), ts, scale_start, scale_end);
                        animations.push(scaled);
                    }
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
        if (animations.length <= 0) return;

        // console.log(id, animations, ts, loop, custom)
        if (!loop) loop = 'Infinite';
        if (loop === 'Once') loop = 1;
        if (loop === 'Custom') loop = custom;

        var oldStyle = document.getElementById('style-' + id);
        if (oldStyle) {
            oldStyle.parentElement.removeChild(oldStyle);
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
            style: 'style-' + id
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
            oldStyle.parentElement.removeChild(oldStyle);
        }
    },
    getAnimatedLayers() {
        return this.$_animatedLayers;
    },
    removePreview(layer) {
        if (document.getElementById('animaiton-preview-' + layer.id)) {
            document.body.removeChild(document.getElementById('animaiton-preview-' + layer.id));
        }
    },
    createShadow(layer, anim, changed) {
        if (!layer) return;
        if (document.getElementById('animaiton-preview-' + layer.id)) {
            document.body.removeChild(document.getElementById('animaiton-preview-' + layer.id));
        }
        var elem = document.getElementById(layer.id);
        if (!elem) return;
        var bounds = elem.getBoundingClientRect();

        var containerBounds = (document.getElementsByClassName('editor-box')[0]).getBoundingClientRect();

        // console.log('--------------------------------', containerBounds)

        var cloned = elem.cloneNode(true);
        // console.log('--------------------------------', cloned)
        cloned.id = 'animaiton-preview-' + layer.id;
        cloned.style.cssText += 'z-index: 9999; opacity: 0.7;';
        cloned.style.left = bounds.left + 'px';
        cloned.style.top = bounds.top + 'px';

        // console.log(cloned)
        // console.log(layer, anim)
        if (anim.animation === "Slide Top/Bottom") {
            cloned.style.top = changed === 'start' ? (containerBounds.top + parseInt(anim.start)) + 'px' : (containerBounds.top + parseInt(anim.end)) + 'px';
        } else if (anim.animation === "Slide Left/Right") {
            cloned.style.left = changed === 'start' ? (containerBounds.left + parseInt(anim.start)) + 'px' : (containerBounds.left + parseInt(anim.end)) + 'px';
        } else if (anim.animation === 'Rotate') {
            cloned.style.cssText += changed === 'start' ? 'transform: rotateZ(' + anim.start + 'deg);' : 'transform: rotateZ(' + anim.end + 'deg);';
        } else if (anim.animation === 'Size') {
            cloned.style.cssText += changed === 'start' ? 'transform: scale(' + parseInt(anim.start) / 100 + ');' : 'transform: scale(' + parseInt(anim.end) / 100 + ');';
        }

        document.body.appendChild(cloned);
    },
}