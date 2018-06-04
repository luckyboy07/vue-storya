import colorHelper from './color-helper'
export default {
    focusCanvasEditor(layerData) {
        var elem = document.getElementsByClassName('editor-box')[0];
        if (layerData) {
            var bgColor = elem.style.backgroundColor;
            var borderColor = colorHelper.invertColor(bgColor); // opposiute color of the bg color
            elem.style.border = '2px solid gold';
            console.log('elem dsds dsd', elem)
        } else {
            console.log('21', elem)
            elem.style.border = '';
        }
    },
}