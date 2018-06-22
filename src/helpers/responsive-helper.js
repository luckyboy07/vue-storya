export default {
    generateCssToAllLayers(ratioLayers, originalLayer) {
        console.log(ratioLayers)
        var allResponsiveCss = '';
        // generating css to all ratios
        for (var i = 0; i < ratioLayers.length; i++) {
            allResponsiveCss += this.$_createStyle(ratioLayers[i].name, ratioLayers[i].layers);
        }

        console.log(allResponsiveCss)

        return allResponsiveCss;
    },
    /**
     * Returns per ratio css (@media (aspect-ratio: [ratio]))
     * @param {*} ratio 
     * @param {*} layers 
     */
    $_createStyle(ratio, layers) {
        var r = this.$_getRatio(ratio);
        if (!r) {
            return '';
        }
        console.log('ratio', r)
        var css = '@media (aspect-ratio: ' + r + ') { \n';
        for (var i = 0; i < layers.length; i++) {
            var layer = layers[i];
            var att = layer.attributes;
            css += '#' + layer.id + '{\n';
            css += 'transform: rotateZ(' + att.rotation + 'deg)!important;\n';
            css += 'left:' + layer.x + 'px;\n';
            css += 'top:' + layer.y + 'px;\n';
            css += 'width:' + layer.width + 'px;\n';
            css += 'height:' + layer.height + 'px;\n';
            css += 'z-index:' + layer.order + ';\n';
            css += 'transition: all 400ms ease;';
            css += '\n}\n';
        }
        css += '\n body{ background-color: red!important;} }';

        return css;
    },
    $_getRatio(ratio) {
        if (!ratio || ratio.indexOf('-') === -1) {
            return ratio;
        }
        return ratio[0] + '/' + ratio[2];
    },
}